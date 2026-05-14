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
        <p className="font-label-caps text-[11px] text-on-surface-variant/80 mt-6">
          Fits true to size · Free exchanges in Nairobi · 7-day return countrywide
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
              className="glass-panel p-stack-lg transition-colors group"
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
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="font-label-caps text-on-surface-variant tracking-widest text-center mb-6">
            If you usually wear…
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-on-surface">
              <thead>
                <tr className="border-b border-outline-variant/40">
                  <th className="py-3 px-4 text-left font-label-caps text-[11px] text-on-surface-variant">
                    FORMA
                  </th>
                  <th className="py-3 px-4 text-left font-label-caps text-[11px] text-on-surface-variant">
                    UK / KE Ready-to-Wear
                  </th>
                  <th className="py-3 px-4 text-left font-label-caps text-[11px] text-on-surface-variant">
                    US
                  </th>
                  <th className="py-3 px-4 text-left font-label-caps text-[11px] text-on-surface-variant">
                    EU
                  </th>
                </tr>
              </thead>
              <tbody className="font-sans text-[14px]">
                {[
                  { f: "S", uk: "8 – 10", us: "4 – 6", eu: "36 – 38" },
                  { f: "M", uk: "12 – 14", us: "8 – 10", eu: "40 – 42" },
                  { f: "L", uk: "16", us: "12", eu: "44" },
                  { f: "XL", uk: "18 – 20", us: "14 – 16", eu: "46 – 48" },
                  { f: "XXL", uk: "22", us: "18", eu: "50" },
                  { f: "2XL", uk: "24+", us: "20+", eu: "52+" },
                ].map((row) => (
                  <tr key={row.f} className="border-b border-outline-variant/20">
                    <td className="py-3 px-4 font-bold">{row.f}</td>
                    <td className="py-3 px-4">{row.uk}</td>
                    <td className="py-3 px-4">{row.us}</td>
                    <td className="py-3 px-4">{row.eu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-sans text-[12px] text-on-surface-variant/70 mt-4 leading-[1.6]">
            A guide, not a guarantee — brands vary. Use the cm chart above for the closest fit.
          </p>
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://wa.me/254795023213?text=Hi%20FORMA%2C%20I%27d%20like%20help%20choosing%20a%20size."
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[14px] uppercase tracking-[0.05em] text-primary inline-flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
          >
            Still unsure? WhatsApp us directly →
          </a>
        </div>
      </section>
    </div>
  );
}
