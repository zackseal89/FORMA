import Image from "next/image";
import type { Metadata } from "next";
import { measurementSteps, sizeChart } from "@/data/size-chart";

export const metadata: Metadata = {
  title: "Find Your Fit",
  description:
    "FORMA's sizing is based on your measurements, not standard labels. Anchor on your hips first.",
};

export default function SizeGuidePage() {
  return (
    <div className="max-w-[var(--container-max)] mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-section-gap">
      <header className="text-center mb-24 max-w-2xl mx-auto">
        <h1 className="font-display italic text-[48px] md:text-[64px] leading-[1.1] mb-6">
          Find Your Fit
        </h1>
        <p className="font-sans text-[16px] leading-[1.6] text-tertiary max-w-lg mx-auto">
          Our sizing is based on your measurements, not standard labels. Measure
          your hips first — that is your anchor.
        </p>
      </header>

      <section className="mb-section-gap">
        <h2 className="font-label-caps text-on-surface-variant mb-12 tracking-widest text-center">
          How to measure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {measurementSteps.map((step) => (
            <article
              key={step.step}
              className="bg-surface-container-low p-stack-lg border border-transparent hover:border-outline-variant transition-colors group"
            >
              <div className="relative aspect-[3/4] mb-8 bg-surface-container-highest overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <h3 className="font-label-caps text-primary mb-4">
                {step.step}. {step.label}
              </h3>
              <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="font-label-caps text-on-surface-variant mb-12 tracking-widest text-center">
          International size chart
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary-container text-on-primary-container">
                <th className="py-6 px-8 text-left font-label-caps">Size</th>
                <th className="py-6 px-8 text-left font-label-caps">
                  Bust (cm)
                </th>
                <th className="py-6 px-8 text-left font-label-caps">
                  Waist (cm)
                </th>
                <th className="py-6 px-8 text-left font-label-caps">
                  Hips (cm)
                </th>
              </tr>
            </thead>
            <tbody className="text-on-surface">
              {sizeChart.map((row) => (
                <tr
                  key={row.size}
                  className="border-b border-outline-variant/40 hover:bg-surface-container-low transition-colors"
                >
                  <td className="py-6 px-8 font-sans font-bold">{row.size}</td>
                  <td className="py-6 px-8 font-sans">{row.bust}</td>
                  <td className="py-6 px-8 font-sans">{row.waist}</td>
                  <td className="py-6 px-8 font-sans">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-12 text-center">
          <a
            href="https://wa.me/254700000000"
            className="font-sans text-[14px] uppercase tracking-[0.05em] text-primary inline-flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
          >
            Still unsure? WhatsApp us directly →
          </a>
        </div>
      </section>
    </div>
  );
}
