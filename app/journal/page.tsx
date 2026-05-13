import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Newsletter } from "@/components/marketing/newsletter";
import { PLACEHOLDERS } from "@/lib/placeholders";
import {
  featuredEntry,
  journalEntries,
  latestHeadlines,
} from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Editorial entries on East African design, shapewear innovation, and the FORMA studio.",
};

export default function JournalPage() {
  return (
    <>
      {/* Featured editorial */}
      <section className="px-margin-mobile md:px-margin-desktop pt-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center max-w-[var(--container-max)] mx-auto">
          <div className="md:col-span-7 group">
            <div className="relative aspect-[4/5] md:aspect-[16/10] bg-surface-container overflow-hidden">
              <Image
                src={featuredEntry.image}
                alt={featuredEntry.alt}
                fill
                priority
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
              />
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col justify-center gap-stack-md py-10 md:pl-10">
            <span className="font-label-caps text-primary">
              {featuredEntry.category}
            </span>
            <h1 className="font-display italic text-[40px] md:text-[64px] leading-[1.1]">
              {featuredEntry.title}
            </h1>
            <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant max-w-md">
              {featuredEntry.excerpt}
            </p>
            <div className="mt-stack-lg">
              <Link
                href={`/journal/${featuredEntry.slug}`}
                className="inline-flex items-center gap-4 group"
              >
                <span className="font-label-caps border-b border-on-background pb-1 group-hover:border-primary group-hover:text-primary transition-colors">
                  Read Journal Entry
                </span>
                <span
                  aria-hidden
                  className="group-hover:translate-x-2 transition-transform"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three-up editorial grid */}
      <section className="px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-gutter gap-y-section-gap max-w-[var(--container-max)] mx-auto">
          {journalEntries.map((entry) => (
            <article
              key={entry.slug}
              className="md:col-span-4 flex flex-col gap-stack-md group"
            >
              <Link
                href={`/journal/${entry.slug}`}
                className="relative aspect-[3/4] bg-surface-container overflow-hidden block"
              >
                <Image
                  src={entry.image}
                  alt={entry.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </Link>
              <span className="font-label-caps text-on-surface-variant mt-4">
                {entry.category}
              </span>
              <h2 className="font-display italic text-[32px] leading-[1.2]">
                <Link
                  href={`/journal/${entry.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {entry.title}
                </Link>
              </h2>
              <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant">
                {entry.excerpt}
              </p>
              <Link
                href={`/journal/${entry.slug}`}
                className="font-label-caps text-primary border-b border-primary self-start pb-1 mt-2"
              >
                Explore Article
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Newsletter
        eyebrow="The FORMA Letter"
        title="Join the Conversation"
        body="Receive quarterly editorial updates on East African design, shapewear innovation, and exclusive early access to our curated collections."
        surface="low"
      />

      {/* Asymmetric studio visit + latest headlines */}
      <section className="px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter max-w-[var(--container-max)] mx-auto">
          <article className="md:col-span-8 group">
            <div className="relative aspect-[16/9] bg-surface-container overflow-hidden">
              <Image
                src={PLACEHOLDERS.studioVisit}
                alt="The FORMA design studio in Nairobi at twilight, sparse and quietly creative."
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
            <div className="mt-stack-md max-w-2xl">
              <span className="font-label-caps text-on-surface-variant">
                The Journal: Vol. 04
              </span>
              <h2 className="font-display italic text-[32px] leading-[1.2] mt-2">
                A Studio Visit with Our Founder
              </h2>
              <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant mt-4">
                Step inside the FORMA studio to see where every silhouette
                begins its journey from concept to reality.
              </p>
            </div>
          </article>

          <aside className="md:col-span-4 flex flex-col justify-end">
            <div className="glass-panel p-stack-lg">
              <h3 className="font-label-caps text-primary mb-6">
                Latest in Journal
              </h3>
              <ul className="flex flex-col gap-8">
                {latestHeadlines.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/journal/${item.slug}`}
                      className="block group"
                    >
                      <span className="font-label-caps text-on-surface-variant/60">
                        {item.date}
                      </span>
                      <h4 className="font-display italic text-[24px] leading-[1.2] mt-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
