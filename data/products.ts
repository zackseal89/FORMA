import { PLACEHOLDERS } from "@/lib/placeholders";
import type { ProductCardData } from "@/components/product/product-card";

/**
 * Phase-3/4 mock catalog. Swapped for the commerce adapter in Phase 5.
 * Mirrors the eventual Shopify/Medusa shape: each product carries
 * shades, intensity, sizes, and a PDP template choice.
 */

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

export interface Product extends ProductCardData {
  intensity: Intensity;
  shades: Shade[];
  inStock: boolean;
  template: Template;
  detail: ProductDetail;
}

const SHADES: Record<string, Shade> = {
  espresso: { name: "Deep Espresso", hex: "#3D2B1F" },
  terracotta: { name: "Terracotta", hex: "#C4622D" },
  sand: { name: "Warm Sand", hex: "#D4B8A0" },
  obsidian: { name: "Obsidian", hex: "#1C1C1A" },
  nude: { name: "Nude", hex: "#D4B8A0" },
  mocha: { name: "Deep Mocha", hex: "#574330" },
};

export const categories = [
  "Sculpting Bodysuits",
  "High-Waist Briefs",
  "Seamless Bras",
  "Second Skin Sets",
] as const;

export type Category = (typeof categories)[number];

export const intensities: Intensity[] = ["Light", "Medium", "Maximum"];

export const shadePalette = Object.values(SHADES);

export const products: Product[] = [
  {
    slug: "the-sculpt-bodysuit",
    name: "The Sculpt Bodysuit",
    category: "Sculpting Bodysuits",
    price: 3500,
    image: PLACEHOLDERS.sculptHero,
    alt: "Editorial portrait of a model in a sleek terracotta sculpt bodysuit.",
    intensity: "Maximum",
    shades: [SHADES.nude, SHADES.obsidian, SHADES.mocha],
    inStock: true,
    template: "signature",
    detail: {
      eyebrow: "FORMA Signature",
      shortDescription:
        "Seamless. Snap-crotch. 80% nylon 20% spandex. Engineered to disappear under your clothes.",
      narrativeHeadline: "Second skin, first priority.",
      longDescription:
        "The Sculpt Bodysuit is more than shapewear. It is an architectural foundation for your wardrobe, designed in Nairobi to provide effortless support without compromising on breathability.",
      meta: [
        { label: "Material", value: "Spandex-Rich Blend" },
        { label: "Finish", value: "Seamless Matte" },
      ],
      sizes: ["S", "M", "L", "XL", "XXL", "2XL"],
      images: [
        { src: PLACEHOLDERS.sculptHero, alt: "Sculpt Bodysuit — full editorial portrait." },
        { src: PLACEHOLDERS.sculptThumb1, alt: "Sculpt Bodysuit — Nude fabric texture detail." },
        { src: PLACEHOLDERS.sculptThumb2, alt: "Sculpt Bodysuit — Deep Black matte finish." },
        { src: PLACEHOLDERS.sculptThumb3, alt: "Sculpt Bodysuit — Deep Mocha fabric texture." },
      ],
    },
  },
  {
    slug: "the-essential-bodysuit",
    name: "Essential Bodysuit",
    category: "Sculpting Bodysuits",
    price: 7500,
    image: PLACEHOLDERS.essentialHero,
    alt: "Editorial portrait of a model wearing a sleek black Essential Bodysuit.",
    intensity: "Medium",
    shades: [SHADES.obsidian, SHADES.sand, SHADES.terracotta],
    inStock: true,
    template: "essentials",
    detail: {
      eyebrow: "Collection 01 / Essentials",
      shortDescription:
        "Designed to sculpt and support with a second-skin feel. Crafted from our signature compression fabric that moves with you, providing a seamless base for any ensemble. A testament to intentional minimalism and structural confidence.",
      compareAtPrice: 9200,
      sizes: ["XS", "S", "M", "L"],
      images: [
        { src: PLACEHOLDERS.essentialHero, alt: "Essential Bodysuit — cinematic editorial portrait." },
        { src: PLACEHOLDERS.essentialDetail, alt: "Close-up of stitching and seamless finish in obsidian." },
        { src: PLACEHOLDERS.essentialLifestyle, alt: "Lifestyle shot in a sunlit interior with tailored trousers." },
      ],
      materialAndCare:
        "78% Recycled Polyamide, 22% Elastane. Machine wash cold with like colors. Lay flat to dry to maintain structural integrity.",
      shippingAndReturns:
        "Free shipping on orders above KSh 5,000 within Kenya. International shipping calculated at checkout. Free returns within 30 days on unworn items.",
    },
  },
  {
    slug: "sculpt-v-neck-bodysuit",
    name: "Sculpt V-Neck Bodysuit",
    category: "Sculpting Bodysuits",
    price: 11000,
    image: PLACEHOLDERS.shop1,
    alt: "Terracotta sculpting bodysuit in warm cinematic light.",
    intensity: "Maximum",
    shades: [SHADES.espresso, SHADES.terracotta, SHADES.obsidian],
    inStock: true,
    template: "signature",
    detail: {
      eyebrow: "FORMA Signature",
      shortDescription:
        "A deep V silhouette over our maximum-control compression base. 80% nylon 20% spandex.",
      narrativeHeadline: "Built for the bare neckline.",
      longDescription:
        "Engineered for evening looks where the bodysuit is the foundation, not the finish. Seamless construction throughout.",
      meta: [
        { label: "Material", value: "Spandex-Rich Blend" },
        { label: "Finish", value: "Seamless Matte" },
      ],
      sizes: ["S", "M", "L", "XL", "XXL", "2XL"],
      images: [
        { src: PLACEHOLDERS.shop1, alt: "Sculpt V-Neck — editorial portrait." },
      ],
    },
  },
  {
    slug: "core-high-waist-brief",
    name: "Core High-Waist Brief",
    category: "High-Waist Briefs",
    price: 6500,
    image: PLACEHOLDERS.shop2,
    alt: "Seamless high-waist brief in warm sand under diffused studio light.",
    intensity: "Medium",
    shades: [SHADES.sand, SHADES.espresso, SHADES.obsidian],
    inStock: true,
    template: "essentials",
    detail: {
      eyebrow: "Collection 01 / Essentials",
      shortDescription:
        "Anchor piece. Engineered to disappear under any waistline.",
      sizes: ["XS", "S", "M", "L"],
      images: [
        { src: PLACEHOLDERS.shop2, alt: "Core High-Waist Brief — close-up." },
      ],
      materialAndCare:
        "78% Recycled Polyamide, 22% Elastane. Machine wash cold. Lay flat to dry.",
    },
  },
  {
    slug: "essential-sculpt-bra",
    name: "Essential Sculpt Bra",
    category: "Seamless Bras",
    price: 8500,
    image: PLACEHOLDERS.shop3,
    alt: "Obsidian seamless bra against a moody tonal background.",
    intensity: "Medium",
    shades: [SHADES.obsidian, SHADES.terracotta, SHADES.nude],
    inStock: true,
    template: "essentials",
    detail: {
      eyebrow: "Collection 01 / Essentials",
      shortDescription:
        "Foundational support. Zero visible structure under the lightest fabrics.",
      sizes: ["XS", "S", "M", "L"],
      images: [{ src: PLACEHOLDERS.shop3, alt: "Essential Sculpt Bra in obsidian." }],
      materialAndCare:
        "78% Recycled Polyamide, 22% Elastane. Hand wash cold. Air dry.",
    },
  },
  {
    slug: "architectural-slip-dress",
    name: "Architectural Slip Dress",
    category: "Second Skin Sets",
    price: 14500,
    image: PLACEHOLDERS.shop4,
    alt: "Architectural midi slip in terracotta — precise seams in natural light.",
    intensity: "Light",
    shades: [SHADES.terracotta, SHADES.mocha, SHADES.obsidian],
    inStock: true,
    template: "signature",
    detail: {
      eyebrow: "FORMA Signature",
      shortDescription:
        "A second-skin midi that holds its own architectural line.",
      narrativeHeadline: "The slip, reimagined.",
      longDescription:
        "Compression where you need it, drape where it matters. Designed to wear as outerwear or as a foundation.",
      meta: [
        { label: "Material", value: "Italian Spandex Blend" },
        { label: "Finish", value: "Matte Drape" },
      ],
      sizes: ["S", "M", "L", "XL", "XXL", "2XL"],
      images: [{ src: PLACEHOLDERS.shop4, alt: "Architectural Slip Dress in terracotta." }],
    },
  },
  {
    slug: "power-control-bodysuit",
    name: "Power Control Bodysuit",
    category: "Sculpting Bodysuits",
    price: 12000,
    image: PLACEHOLDERS.shop5,
    alt: "Deep compression panels in dark chocolate — structural luxury.",
    intensity: "Maximum",
    shades: [SHADES.mocha, SHADES.obsidian, SHADES.espresso],
    inStock: true,
    template: "signature",
    detail: {
      eyebrow: "FORMA Signature",
      shortDescription:
        "Maximum control bodysuit with engineered compression panels.",
      narrativeHeadline: "Built for the most demanding silhouettes.",
      longDescription:
        "Bonded panels, no stitching, no compromise. Our most architectural piece.",
      meta: [
        { label: "Material", value: "Bonded Spandex" },
        { label: "Finish", value: "Matte" },
      ],
      sizes: ["S", "M", "L", "XL", "XXL", "2XL"],
      images: [{ src: PLACEHOLDERS.shop5, alt: "Power Control Bodysuit in deep mocha." }],
    },
  },
  {
    slug: "minimalist-high-waist-set",
    name: "Minimalist High-Waist Set",
    category: "High-Waist Briefs",
    price: 9500,
    image: PLACEHOLDERS.shop6,
    alt: "Macro of technical fabric seams in warm sand tone.",
    intensity: "Light",
    shades: [SHADES.sand, SHADES.nude, SHADES.obsidian],
    inStock: true,
    template: "essentials",
    detail: {
      eyebrow: "Collection 01 / Essentials",
      shortDescription:
        "A two-piece foundation — bra and brief, sold together.",
      sizes: ["XS", "S", "M", "L"],
      images: [{ src: PLACEHOLDERS.shop6, alt: "Minimalist High-Waist Set in warm sand." }],
      materialAndCare:
        "78% Recycled Polyamide, 22% Elastane. Machine wash cold. Lay flat to dry.",
    },
  },
];

export const featuredProducts: ProductCardData[] = products.slice(2, 5);

export function productsByCategory(category: string): Product[] {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  );
}

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
