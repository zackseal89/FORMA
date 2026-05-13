import {
  shopifyFetch,
  PRODUCT_FRAGMENT,
  type ShopifyProductNode,
} from "./shopify";

export type Intensity = "Light" | "Medium" | "Maximum";
export type Template = "signature" | "essentials";

export interface Shade {
  name: string;
  hex: string | null;
}

export interface ProductDetail {
  eyebrow: string;
  shortDescription: string;
  longDescription?: string;
  narrativeHeadline?: string;
  meta?: { label: string; value: string }[];
  sizes: string[];
  compareAtPrice?: number;
  images: { src: string; alt: string }[];
  materialAndCare?: string;
  shippingAndReturns?: string;
}

export interface Product {
  id: string; // Product ID
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  intensity: Intensity | undefined;
  shades: Shade[];
  inStock: boolean;
  template: Template;
  detail: ProductDetail;
  variants: { id: string; title: string; selectedOptions: { name: string; value: string }[] }[];
}

// --- Shopify Mapping Logic ---

function mapShopifyProduct(node: ShopifyProductNode): Product {
  const price = parseFloat(node.priceRange.minVariantPrice.amount);

  // Use the aggregate range so sales show even when only some variants are
  // discounted. Shopify returns "0.0" when no compare-at is set; treat that
  // as "no sale" rather than a fake 0-priced compare value.
  const compareAtMax = parseFloat(
    node.compareAtPriceRange.maxVariantPrice.amount,
  );
  const compareAtPrice = compareAtMax > price ? compareAtMax : undefined;

  // Extract sizes from variants
  const sizes = Array.from(
    new Set(
      node.variants.edges
        .flatMap((edge) => edge.node.selectedOptions)
        .filter((opt) => opt.name.toLowerCase() === "size")
        .map((opt) => opt.value),
    ),
  );

  const intensity = node.intensity?.value as Intensity | undefined;
  const template = (node.template?.value as Template) || "signature";
  const eyebrow = node.eyebrow?.value ?? "";
  const narrativeHeadline = node.narrativeHeadline?.value ?? "";
  const longDescription = node.longDescription?.value ?? "";

  const shadeOption = node.options.find(
    (opt) =>
      opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "shade",
  );
  const shades: Shade[] =
    shadeOption?.optionValues.map((v) => ({
      name: v.name,
      hex: null,
    })) ?? [];

  // Images: prefer product images over a single featuredImage fallback so the
  // gallery gets every uploaded asset.
  const images = node.images.edges.map((edge) => ({
    src: edge.node.url,
    alt: edge.node.altText || node.title,
  }));

  return {
    id: node.id,
    slug: node.handle,
    name: node.title,
    category: node.productType || "",
    price: price,
    image: node.featuredImage?.url || images[0]?.src || "",
    alt: node.featuredImage?.altText || node.title,
    intensity: intensity,
    shades: shades,
    inStock: node.availableForSale,
    template: template,
    variants: node.variants.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      selectedOptions: edge.node.selectedOptions,
    })),
    detail: {
      eyebrow: eyebrow,
      shortDescription:
        node.seo.description ||
        node.descriptionHtml?.replace(/<[^>]*>/g, "").slice(0, 200) ||
        "",
      longDescription: longDescription || node.descriptionHtml,
      narrativeHeadline: narrativeHeadline,
      sizes: sizes,
      compareAtPrice: compareAtPrice,
      images: images,
    },
  };
}

// --- API Functions ---

export async function getProducts(): Promise<Product[]> {
  const query = /* GraphQL */ `
    query getProducts {
      products(first: 20) {
        edges {
          node {
            ...product
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const data = await shopifyFetch<any>(query, undefined, {
    tags: ["products"],
    revalidate: 3600, // cache for 1 hour
  });
  return data.products.edges.map((edge: any) => mapShopifyProduct(edge.node));
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const query = /* GraphQL */ `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        ...product
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const data = await shopifyFetch<any>(
    query, 
    { handle },
    { tags: ["products", `product-${handle}`], revalidate: 3600 }
  );
  if (!data.product) return null;
  return mapShopifyProduct(data.product);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // For now, just taking the first 3. In production, we'd use a collection handle like 'featured'.
  const products = await getProducts();
  return products.slice(0, 3);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // Shopify product_type values are typically the noun ("Bodysuits"), while our
  // editorial category names add a descriptor ("Sculpting Bodysuits"). Match on
  // any whole word so both spellings hit the same products, and also accept the
  // word as a tag.
  const words = category.split(/\s+/).filter(Boolean);
  const clauses = [
    `product_type:'${category}'`,
    ...words.map((w) => `product_type:${w}`),
    ...words.map((w) => `tag:${w.toLowerCase()}`),
  ];
  const queryString = clauses.join(" OR ");

  const query = /* GraphQL */ `
    query getProductsByCategory($query: String!) {
      products(first: 20, query: $query) {
        edges {
          node {
            ...product
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const data = await shopifyFetch<any>(
    query,
    { query: queryString },
    { tags: ["products", `category-${category}`], revalidate: 3600 }
  );
  return data.products.edges.map((edge: any) => mapShopifyProduct(edge.node));
}

export async function getProductsByCollectionHandle(
  handle: string,
): Promise<Product[]> {
  const query = /* GraphQL */ `
    query getCollectionProducts($handle: String!) {
      collection(handle: $handle) {
        id
        products(first: 20) {
          edges {
            node {
              ...product
            }
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const data = await shopifyFetch<any>(
    query,
    { handle },
    { tags: ["products", `collection-${handle}`], revalidate: 3600 },
  );
  if (!data.collection) return [];
  return data.collection.products.edges.map((edge: any) =>
    mapShopifyProduct(edge.node),
  );
}

export async function getAccessories(): Promise<Product[]> {
  // Fetch products with product_type:'Accessories' or similar.
  // In a real store, you might use a specific collection or tag.
  const query = /* GraphQL */ `
    query getAccessories($query: String!) {
      products(first: 4, query: $query) {
        edges {
          node {
            ...product
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const data = await shopifyFetch<any>(
    query, 
    { query: "product_type:Accessories OR tag:accessory" },
    { tags: ["products", "accessories"], revalidate: 3600 }
  );
  
  // If no accessories found in Shopify, we might want to return empty or mock
  // but for this migration, we expect them to be there.
  return data.products.edges.map((edge: any) => mapShopifyProduct(edge.node));
}
