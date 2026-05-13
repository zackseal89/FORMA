import { PLACEHOLDERS } from "@/lib/placeholders";

export interface JournalEntry {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  alt: string;
  date: string;
}

export const featuredEntry: JournalEntry = {
  slug: "the-nairobi-influence",
  title: "The Nairobi Influence",
  category: "Featured Editorial",
  excerpt:
    "An exploration of how East African craftsmanship and modern architectural silhouettes are redefining the global standards of luxury essentials.",
  image: PLACEHOLDERS.journalFeatured,
  alt: "Confident woman in architectural shapewear against a brutalist structure in Nairobi at golden hour.",
  date: "Apr 02",
};

export const journalEntries: JournalEntry[] = [
  {
    slug: "designing-for-confidence",
    title: "Designing for Confidence",
    category: "Design Philosophy",
    excerpt:
      "Unveiling the structural secrets behind the FORMA silhouette and why intentionality matters in every stitch.",
    image: PLACEHOLDERS.journalEntry1,
    alt: "Close-up artistic shot of premium fabric textures in warm terracotta and cream tones.",
    date: "Mar 28",
  },
  {
    slug: "the-monolith-capsule",
    title: "The Monolith Capsule",
    category: "Collection Spotlight",
    excerpt:
      "A curated look at our latest release, where brutalist lines meet the softness of organic cotton blends.",
    image: PLACEHOLDERS.journalEntry2,
    alt: "Minimalist studio with neutral-toned garments on a sculptural metal rack.",
    date: "Mar 18",
  },
  {
    slug: "urban-movement",
    title: "Urban Movement",
    category: "Culture",
    excerpt:
      "Capturing the pulse of the city through the lens of movement and functional luxury for the modern woman.",
    image: PLACEHOLDERS.journalEntry3,
    alt: "Editorial lifestyle photo of a woman walking through architecturally significant urban Nairobi.",
    date: "Mar 06",
  },
];

export const latestHeadlines = [
  { date: "Mar 24", title: "The Art of Layering", slug: "the-art-of-layering" },
  {
    date: "Mar 12",
    title: "Sustainability in Form",
    slug: "sustainability-in-form",
  },
  { date: "Feb 28", title: "Texture & Tones", slug: "texture-and-tones" },
];
