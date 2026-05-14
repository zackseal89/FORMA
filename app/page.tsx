import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { OurStory } from "@/components/marketing/our-story";
import { BentoFeature } from "@/components/marketing/bento-feature";
import { Newsletter } from "@/components/marketing/newsletter";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { getFeaturedProducts } from "@/lib/commerce";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.example";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FORMA",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />

      <section
        id="new-arrivals"
        className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-[var(--container-max)] mx-auto scroll-mt-20"
      >
        <SectionHeading
          title="New Arrivals"
          action={{ label: "View All", href: "/shop" }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <OurStory />
      <BentoFeature />
      <Newsletter />
    </>
  );
}
