import { shopifyFetch, PRODUCT_FRAGMENT } from "./shopify";

/**
 * Unified commerce types.
 * Mirrored from the original mock data structure to ensure UI compatibility.
 */

export const categories = [
  "Sculpting Bodysuits",
  "High-Waist Briefs",
  "Seamless Bras",
  "Second Skin Sets",
] as const;

export type Category = (typeof categories)[number];

export const intensities: Intensity[] = ["Light", "Medium", "Maximum"];

export const shadePalette = [
  { name: "Deep Espresso", hex: "#3D2B1F" },
  { name: "Terracotta", hex: "#C4622D" },
  { name: "Warm Sand", hex: "#D4B8A0" },
  { name: "Obsidian", hex: "#1C1C1A" },
  { name: "Nude", hex: "#D4B8A0" },
  { name: "Deep Mocha", hex: "#574330" },
];

export type Intensity = "Light" | "Medium" | "Maximum";
export type Template = "signature" | "essentials";

export interface Shade {
  name: string;
  hex: string;
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
  intensity: Intensity;
  shades: Shade[];
  inStock: boolean;
  template: Template;
  detail: ProductDetail;
  variants: { id: string; title: string; selectedOptions: { name: string; value: string }[] }[];
}

// --- Shopify Mapping Logic ---

function mapShopifyProduct(node: any): Product {
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAtPrice = node.variants.edges[0]?.node.compareAtPrice
    ? parseFloat(node.variants.edges[0].node.compareAtPrice.amount)
    : undefined;

  // Extract sizes from variants
  const sizes = Array.from(
    new Set(
      node.variants.edges
        .flatMap((edge: any) => edge.node.selectedOptions)
        .filter((opt: any) => opt.name.toLowerCase() === "size")
        .map((opt: any) => opt.value),
    ),
  ) as string[];

  // Fallbacks for metafields
  const intensity = (node.intensity?.value as Intensity) || "Medium";
  const template = (node.template?.value as Template) || "signature";
  const eyebrow = node.eyebrow?.value || "FORMA Signature";
  const narrativeHeadline = node.narrativeHeadline?.value || "";
  const longDescription = node.longDescription?.value || "";

  // Extract shades from "Color" or "Shade" options
  const shadeOption = node.options?.find(
    (opt: any) => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "shade",
  );
  const shades: Shade[] =
    shadeOption?.values.map((val: string) => ({
      name: val,
      hex: "#C6977E", // Default skin tone hex, could be mapped from a metafield or lookup table
    })) || [];

  return {
    id: node.id,
    slug: node.handle,
    name: node.title,
    category: node.productType || "General",
    price: price,
    image: node.featuredImage?.url || "",
    alt: node.featuredImage?.altText || node.title,
    intensity: intensity,
    shades: shades.length > 0 ? shades : [{ name: "Standard", hex: "#C6977E" }],
    inStock: node.availableForSale,
    template: template,
    variants: node.variants.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      selectedOptions: edge.node.selectedOptions,
    })),
    detail: {
      eyebrow: eyebrow,
      shortDescription: node.descriptionHtml?.replace(/<[^>]*>/g, "").slice(0, 200) || "",
      longDescription: longDescription || node.descriptionHtml,
      narrativeHeadline: narrativeHeadline,
      sizes: sizes.length > 0 ? sizes : ["S", "M", "L", "XL"],
      compareAtPrice: compareAtPrice,
      images: node.images.edges.map((edge: any) => ({
        src: edge.node.url,
        alt: edge.node.altText || node.title,
      })),
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
  // Shopify filter by product_type
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
    { query: `product_type:'${category}'` },
    { tags: ["products", `category-${category}`], revalidate: 3600 }
  );
  return data.products.edges.map((edge: any) => mapShopifyProduct(edge.node));
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
