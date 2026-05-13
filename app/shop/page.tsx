import type { Metadata } from "next";
import { products } from "@/data/products";
import { resolveShopVariant } from "@/lib/config";
import { SidebarFilters } from "@/components/shop/sidebar-filters";
import { ShopCard } from "@/components/shop/shop-card";
import { CollectionCard } from "@/components/shop/collection-card";
import { Pagination } from "@/components/shop/pagination";
import { PillFilters } from "@/components/shop/pill-filters";
import { VariantToggle } from "@/components/shop/variant-toggle";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Refined architectural shapewear designed for the modern silhouette. Technical precision meets the warmth of Nairobi's editorial aesthetic.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string | string[] }>;
}) {
  const { variant: variantParam } = await searchParams;
  const variant = resolveShopVariant(variantParam);

  return (
    <div className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-[var(--container-max)] mx-auto">
      <header className="mb-section-gap flex flex-col md:flex-row md:items-end md:justify-between gap-stack-lg">
        <div className="max-w-2xl">
          <h1 className="font-display italic text-[40px] md:text-[64px] leading-[1.1] mb-stack-md">
            Shop All
          </h1>
          <p className="font-sans text-[18px] leading-[1.6] text-on-surface-variant">
            Refined architectural shapewear designed for the modern silhouette.
            Our collection merges technical precision with the warmth of
            Nairobi&apos;s editorial aesthetic.
          </p>
        </div>
        <VariantToggle active={variant} />
      </header>

      {variant === "sidebar" ? (
        <SidebarLayout />
      ) : (
        <EditorialLayout />
      )}
    </div>
  );
}

function SidebarLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
      <SidebarFilters />
      <div className="md:col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {products.map((product) => (
            <ShopCard key={product.slug} product={product} />
          ))}
        </div>
        <Pagination />
      </div>
    </div>
  );
}

function EditorialLayout() {
  const pillOptions = [
    { label: "All", href: "/shop?variant=editorial" },
    { label: "Bodysuits", href: "/shop?variant=editorial&filter=bodysuits" },
    { label: "Briefs", href: "/shop?variant=editorial&filter=briefs" },
    { label: "Bras", href: "/shop?variant=editorial&filter=bras" },
  ];
  return (
    <>
      <PillFilters
        options={pillOptions}
        activeHref="/shop?variant=editorial"
      />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {products.map((product) => (
          <CollectionCard key={product.slug} product={product} />
        ))}
      </section>
      <Pagination />
    </>
  );
}
