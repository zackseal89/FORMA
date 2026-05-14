import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProducts,
  getProductsByCategory,
  getProductsByCollectionHandle,
} from "@/lib/commerce";
import { CollectionCard } from "@/components/shop/collection-card";
import { PillFilters } from "@/components/shop/pill-filters";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.example";

const KNOWN_COLLECTIONS: Record<string, { title: string; tagline: string }> = {
  "new-arrivals": {
    title: "New Arrivals",
    tagline: "The latest pieces from the FORMA atelier — fresh from Nairobi.",
  },
  "best-sellers": {
    title: "Best Sellers",
    tagline: "Silhouettes worn most. Confidence, on repeat.",
  },
  "the-edit": {
    title: "The Edit",
    tagline: "Our quarterly curation — three silhouettes, three colorways.",
  },
  "sculpting-bodysuits": {
    title: "Sculpting Bodysuits",
    tagline: "Architectural compression for the defining silhouette.",
  },
  "high-waist-briefs": {
    title: "High-Waist Briefs",
    tagline: "Anchor pieces. Engineered to disappear.",
  },
  "seamless-bras": {
    title: "Seamless Bras",
    tagline: "Foundational support, with zero visible structure.",
  },
  "second-skin-sets": {
    title: "Second Skin Sets",
    tagline: "Coordinated pieces that move as one.",
  },
};

export function generateStaticParams() {
  return Object.keys(KNOWN_COLLECTIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = KNOWN_COLLECTIONS[slug];
  if (!collection) return { title: "Collection" };
  return {
    title: collection.title,
    description: collection.tagline,
    alternates: { canonical: `/collections/${slug}` },
    openGraph: {
      type: "website",
      title: `${collection.title} · FORMA`,
      description: collection.tagline,
      url: `${SITE_URL}/collections/${slug}`,
      images: [
        {
          url: "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: `${collection.title} — FORMA`,
        },
      ],
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = KNOWN_COLLECTIONS[slug];
  if (!collection) notFound();

  // Prefer a real Shopify collection matching the slug. Fall back to category
  // filtering using the slug's title-cased form. Editorial slugs without a
  // matching Shopify collection fall through to the full catalog.
  const slugAsCategory = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  let items = await getProductsByCollectionHandle(slug);
  if (items.length === 0) {
    items = await getProductsByCategory(slugAsCategory);
  }
  if (items.length === 0) {
    items = await getProducts();
  }

  const pillOptions = [
    { label: "All", href: `/shop` },
    { label: "Bodysuits", href: `/collections/sculpting-bodysuits` },
    { label: "Coming Soon", href: `/collections/the-edit` },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${SITE_URL}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: collection.title,
        item: `${SITE_URL}/collections/${slug}`,
      },
    ],
  };

  const itemListJsonLd =
    items.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: collection.title,
          description: collection.tagline,
          numberOfItems: items.length,
          itemListElement: items.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/products/${product.slug}`,
            name: product.name,
          })),
        }
      : null;

  return (
    <main className="max-w-[var(--container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}

      <section className="mt-section-gap mb-stack-lg text-center">
        <h1 className="font-display italic text-[40px] md:text-[64px] leading-[1.1] mb-stack-sm">
          {collection.title}
        </h1>
        <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant max-w-lg mx-auto">
          {collection.tagline}
        </p>
      </section>

      <PillFilters
        options={pillOptions}
        activeHref={`/collections/${slug}`}
      />

      {items.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display italic text-[24px] text-on-surface-variant">
            No pieces found in this collection.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {items.map((product) => (
            <CollectionCard key={product.slug} product={product} />
          ))}
        </section>
      )}

      <div className="pb-section-gap" />
    </main>
  );
}
