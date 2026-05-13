/**
 * Shopify Storefront API client.
 * Reference: https://shopify.dev/docs/api/storefront/latest
 *
 * The Storefront token is safe to ship to the browser, but all reads in this
 * codebase go through server components / route handlers so we get caching
 * and keep network panels clean.
 */

const DEFAULT_API_VERSION = "2026-04";

export class ShopifyConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShopifyConfigError";
  }
}

export class ShopifyApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly errors?: unknown,
  ) {
    super(message);
    this.name = "ShopifyApiError";
  }
}

type ShopifyResponse<T> = {
  data?: T;
  errors?: Array<{ message: string; [k: string]: unknown }>;
};

type Auth =
  | { kind: "private"; token: string }
  | { kind: "public"; token: string };

function readConfig() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim();
  const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim();
  const publicToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN?.trim();
  const version =
    process.env.SHOPIFY_API_VERSION?.trim() || DEFAULT_API_VERSION;

  if (!domain) {
    throw new ShopifyConfigError(
      "NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is missing. Set it in .env.local.",
    );
  }

  if (publicToken?.startsWith("shpat_")) {
    throw new ShopifyConfigError(
      "NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN looks like a private token (starts with 'shpat_'). " +
        "Move it to SHOPIFY_STOREFRONT_PRIVATE_TOKEN in .env.local to fix the 401 error.",
    );
  }

  // Private token wins when present — it's the server-only, less-throttled path.
  const auth: Auth | null = privateToken
    ? { kind: "private", token: privateToken }
    : publicToken
      ? { kind: "public", token: publicToken }
      : null;

  if (!auth) {
    throw new ShopifyConfigError(
      "No Storefront token set. Provide SHOPIFY_STOREFRONT_PRIVATE_TOKEN (server-only) or NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env.local.",
    );
  }

  return { domain, auth, version };
}

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  init?: { cache?: RequestCache; revalidate?: number; tags?: string[] },
): Promise<T> {
  const { domain, auth, version } = readConfig();
  const endpoint = `https://${domain}/api/${version}/graphql.json`;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth.kind === "private") {
    headers["Shopify-Storefront-Private-Token"] = auth.token;
  } else {
    headers["X-Shopify-Storefront-Access-Token"] = auth.token;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    cache: init?.cache,
    next:
      init?.revalidate !== undefined || init?.tags
        ? { revalidate: init?.revalidate, tags: init?.tags }
        : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ShopifyApiError(
      `Shopify returned ${res.status}${text ? ` — ${text.slice(0, 200)}` : ""}`,
      res.status,
    );
  }

  const json = (await res.json()) as ShopifyResponse<T>;

  // GraphQL errors can land with HTTP 200 — explicit per the docs.
  if (json.errors?.length) {
    throw new ShopifyApiError(
      json.errors.map((e) => e.message).join("; "),
      200,
      json.errors,
    );
  }

  if (!json.data) {
    throw new ShopifyApiError("Shopify response missing `data` field.", 200);
  }

  return json.data;
}

export const SHOPIFY_API_VERSION = DEFAULT_API_VERSION;

// --- GraphQL Fragments ---

export const IMAGE_FRAGMENT = /* GraphQL */ `
  fragment image on Image {
    url
    altText
    width
    height
  }
`;

export const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment product on Product {
    id
    title
    handle
    descriptionHtml
    productType
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      ...image
    }
    images(first: 10) {
      edges {
        node {
          ...image
        }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    # Design-system specific metafields
    intensity: metafield(namespace: "custom", key: "intensity") {
      value
    }
    template: metafield(namespace: "custom", key: "template") {
      value
    }
    eyebrow: metafield(namespace: "custom", key: "eyebrow") {
      value
    }
    narrativeHeadline: metafield(namespace: "custom", key: "narrative_headline") {
      value
    }
    longDescription: metafield(namespace: "custom", key: "long_description") {
      value
    }
  }
  ${IMAGE_FRAGMENT}
`;

// --- Cart Fragments ---
export const CART_FRAGMENT = /* GraphQL */ `
  fragment cart on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                title
                handle
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;
