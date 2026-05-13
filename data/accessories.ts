import { PLACEHOLDERS } from "@/lib/placeholders";

export interface Accessory {
  slug: string;
  category: string;
  name: string;
  price: number;
  image: string;
  alt: string;
}

export const accessories: Accessory[] = [
  {
    slug: "tailored-high-waist-pant",
    category: "Bottoms",
    name: "Tailored High-Waist Pant",
    price: 12000,
    image: PLACEHOLDERS.pairsPant,
    alt: "High-waisted tailored black trousers, crisp premium fabric with clean pleats.",
  },
  {
    slug: "oversized-sculpted-blazer",
    category: "Outerwear",
    name: "Oversized Sculpted Blazer",
    price: 18500,
    image: PLACEHOLDERS.pairsBlazer,
    alt: "Oversized structured blazer in neutral sand, draped to show architectural shoulders.",
  },
  {
    slug: "minimalist-leather-mule",
    category: "Accessories",
    name: "Minimalist Leather Mule",
    price: 9000,
    image: PLACEHOLDERS.pairsMule,
    alt: "Sleek leather mules in matte obsidian, arranged editorially.",
  },
  {
    slug: "terracotta-daily-tote",
    category: "Bags",
    name: "Terracotta Daily Tote",
    price: 15000,
    image: PLACEHOLDERS.pairsTote,
    alt: "High-fashion leather tote in rich terracotta, clean unbranded lines.",
  },
];
