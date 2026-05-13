import { PLACEHOLDERS } from "@/lib/placeholders";
import type { ProductCardData } from "@/components/product/product-card";

/**
 * Phase-3 mock catalog. Swapped for the commerce adapter in Phase 5.
 * Schema mirrors what the Shopify/Medusa client will eventually return:
 * a single product carries shades, an intensity rating, and a category.
 */

export type Intensity = "Light" | "Medium" | "Maximum";

export interface Shade {
  name: string;
  hex: string;
}

export interface Product extends ProductCardData {
  intensity: Intensity;
  shades: Shade[];
  inStock: boolean;
}

const SHADES: Record<string, Shade> = {
  espresso: { name: "Deep Espresso", hex: "#3D2B1F" },
  terracotta: { name: "Terracotta", hex: "#8E6D52" },
  sand: { name: "Warm Sand", hex: "#D4B8A0" },
  obsidian: { name: "Obsidian", hex: "#1C1C1A" },
  nude: { name: "Nude", hex: "#D4B8A0" },
  mocha: { name: "Mocha", hex: "#574330" },
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
    slug: "sculpt-v-neck-bodysuit",
    name: "Sculpt V-Neck Bodysuit",
    category: "Sculpting Bodysuits",
    price: 11000,
    image: PLACEHOLDERS.shop1,
    alt: "Terracotta sculpting bodysuit in warm cinematic light.",
    intensity: "Maximum",
    shades: [SHADES.espresso, SHADES.terracotta, SHADES.obsidian],
    inStock: true,
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
  },
  {
    slug: "sculpting-mid-thigh-bodysuit",
    name: "Sculpting Mid-Thigh Bodysuit",
    category: "Sculpting Bodysuits",
    price: 13500,
    image: PLACEHOLDERS.collection1,
    alt: "Minimalist sculpting bodysuit in mocha against deep obsidian.",
    intensity: "Maximum",
    shades: [SHADES.nude, SHADES.obsidian, SHADES.mocha],
    inStock: true,
  },
  {
    slug: "core-support-essential",
    name: "Core Support Essential",
    category: "Sculpting Bodysuits",
    price: 10500,
    image: PLACEHOLDERS.collection2,
    alt: "Black shaping bodysuit on a minimalist form, architectural lighting.",
    intensity: "Medium",
    shades: [SHADES.nude, SHADES.obsidian, SHADES.mocha],
    inStock: true,
  },
];

/** Subset used on the home hero — first three by curatorial order. */
export const featuredProducts: ProductCardData[] = products.slice(0, 3);

export function productsByCategory(category: string): Product[] {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  );
}
