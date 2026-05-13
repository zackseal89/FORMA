import { PLACEHOLDERS } from "@/lib/placeholders";
import type { ProductCardData } from "@/components/product/product-card";

/**
 * Phase-2 mock catalog. Replaced by the commerce adapter in Phase 5.
 */
export const featuredProducts: ProductCardData[] = [
  {
    slug: "the-essential-bodysuit",
    name: "The Essential Bodysuit",
    category: "Body Sculpt",
    price: 8500,
    image: PLACEHOLDERS.newArrival1,
    alt: "Terracotta compression bodysuit, cinematic studio lighting.",
  },
  {
    slug: "the-high-waist-brief",
    name: "The High-Waist Brief",
    category: "Signature",
    price: 4200,
    image: PLACEHOLDERS.newArrival2,
    alt: "Two models in espresso and nude shapewear, sun-drenched loft.",
  },
  {
    slug: "the-second-skin-slip",
    name: "The Second Skin Slip",
    category: "Invisibles",
    price: 12000,
    image: PLACEHOLDERS.newArrival3,
    alt: "Editorial back shot showing the seamless edges of a black slip.",
  },
];
