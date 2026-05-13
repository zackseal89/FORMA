import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

export default function Home() {
  return (
    <div className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-[var(--container-max)] mx-auto">
      <p className="font-label-caps text-primary mb-stack-sm">
        Phase 1 · Foundation
      </p>
      <h1 className="font-display italic text-[40px] md:text-[64px] leading-[1.05] tracking-tight mb-stack-lg max-w-3xl">
        Confidence, <br />
        Reimagined.
      </h1>
      <p className="font-sans text-[18px] leading-[1.6] text-on-surface-variant max-w-xl mb-stack-lg">
        Editorial Noir tokens loaded. EB Garamond italic and DM Sans wired
        through next/font. The pages from the Stitch system will plug into this
        shell in Phase 2.
      </p>

      <div className="flex flex-wrap items-center gap-stack-md mb-section-gap">
        <Button>Explore the Collection</Button>
        <Button variant="ghost">Size Guide</Button>
        <Tag>New Arrival</Tag>
        <Tag tone="neutral">Best Seller</Tag>
      </div>

      <section className="grid grid-cols-2 md:grid-cols-6 gap-gutter">
        {[
          ["surface", "bg-surface"],
          ["surface-container", "bg-surface-container"],
          ["surface-container-high", "bg-surface-container-high"],
          ["primary", "bg-primary"],
          ["primary-container", "bg-primary-container"],
          ["tertiary", "bg-tertiary"],
        ].map(([name, cls]) => (
          <div key={name} className="flex flex-col">
            <div
              className={`${cls} aspect-square border border-outline-variant`}
            />
            <span className="font-label-caps text-[10px] text-on-surface-variant mt-stack-sm">
              {name}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
