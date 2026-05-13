import Image from "next/image";
import { PLACEHOLDERS } from "@/lib/placeholders";

export function BentoFeature() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-[var(--container-max)] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto md:h-[600px]">
        <div className="md:col-span-4 bg-surface-container-high p-stack-lg flex flex-col justify-end">
          <DiversityGlyph />
          <h4 className="font-display italic text-[24px] mb-2 mt-stack-md">
            Inclusive by Design
          </h4>
          <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant">
            Available in 12 shades meticulously matched to the diverse spectrum
            of melanin-rich skin.
          </p>
        </div>

        <div className="md:col-span-8 relative overflow-hidden group">
          <Image
            src={PLACEHOLDERS.bento}
            alt="A model in a nude FORMA bodysuit against a marble column — clean editorial composition."
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-stack-lg">
            <h3 className="font-display italic text-[32px] md:text-[40px] leading-[1.1]">
              Engineered Breathability
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

function DiversityGlyph() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className="text-primary"
      aria-hidden
    >
      <circle cx="7" cy="9" r="3" />
      <circle cx="17" cy="9" r="3" />
      <circle cx="12" cy="16" r="3" />
    </svg>
  );
}
