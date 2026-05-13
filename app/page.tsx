import { Hero } from "@/components/marketing/hero";
import { OurStory } from "@/components/marketing/our-story";
import { BentoFeature } from "@/components/marketing/bento-feature";
import { Newsletter } from "@/components/marketing/newsletter";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { featuredProducts } from "@/data/products";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-[var(--container-max)] mx-auto">
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
