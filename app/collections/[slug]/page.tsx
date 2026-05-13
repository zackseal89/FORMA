import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getProducts, getProductsByCategory } from "@/lib/commerce";
import { CollectionCard } from "@/components/shop/collection-card";
import { PillFilters } from "@/components/shop/pill-filters";

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

  // Map slug to a curated product list.
  const matchedCategory = categories.find(
    (c) => c.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  const items = matchedCategory
    ? await getProductsByCategory(matchedCategory)
    : await getProducts();

  const pillOptions = [
    { label: "All", href: `/shop` },
    { label: "Bodysuits", href: `/collections/sculpting-bodysuits` },
    { label: "Coming Soon", href: `/collections/the-edit` },
  ];

  return (
    <main className="max-w-[var(--container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
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
