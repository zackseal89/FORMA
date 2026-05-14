import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/commerce";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.example";

const COLLECTION_SLUGS = [
  "new-arrivals",
  "best-sellers",
  "the-edit",
  "sculpting-bodysuits",
  "high-waist-briefs",
  "seamless-bras",
  "second-skin-sets",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/size-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = COLLECTION_SLUGS.map(
    (slug) => ({
      url: `${SITE_URL}/collections/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }),
  );

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
