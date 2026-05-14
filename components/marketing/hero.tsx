import Image from "next/image";
import Link from "next/link";
import { PLACEHOLDERS } from "@/lib/placeholders";

export function Hero() {
  return (
    <section className="relative -mt-20 flex flex-col md:flex-row min-h-[100svh]">
      <div className="w-full md:w-[60%] flex flex-col justify-center px-margin-mobile md:pl-margin-desktop md:pr-12 pt-32 md:pt-24 pb-16 md:pb-24">
        <div className="max-w-[720px] flex flex-col gap-12">
          <h1 className="font-display italic text-[44px] sm:text-[56px] md:text-[72px] leading-[1.05] tracking-[-0.01em] text-on-surface">
            The invisible layer behind every powerful look.
          </h1>

          <div className="flex flex-col gap-10">
            <p className="font-sans text-[18px] leading-[1.6] text-tertiary max-w-lg">
              Seamless shapewear built for Nairobi&apos;s corporate women.
              Precision engineering meets editorial elegance for the modern
              professional.
            </p>

            <div className="flex flex-col gap-stack-md">
              <div className="flex flex-col sm:flex-row gap-stack-md">
                <Link
                  href="#waitlist"
                  className="inline-flex items-center justify-center bg-primary-container text-on-primary-container px-10 py-5 font-sans text-[14px] font-medium uppercase tracking-[0.15em] hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Join the Waitlist
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center border border-on-surface text-on-surface px-10 py-5 font-sans text-[14px] font-medium uppercase tracking-[0.15em] hover:bg-on-surface hover:text-surface transition-colors"
                >
                  See the Product
                </Link>
              </div>

              <div className="pt-3 border-t hairline">
                <a
                  href="https://wa.me/254795023213?text=Hi%20FORMA%2C%20I%27d%20like%20to%20know%20more%20about%20your%20shapewear."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with FORMA on WhatsApp"
                  className="glass-panel inline-flex items-center gap-3 px-6 py-3.5 group hover:border-primary/30 transition-all"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[18px] h-[18px] fill-primary shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>

                  <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
                  </span>

                  <span className="font-label-caps text-[12px] text-on-surface-variant group-hover:text-on-surface transition-colors">
                    Chat on WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>

          <p className="font-label-caps text-[12px] text-tertiary/70">
            First 100 women get 20% off at launch.
          </p>
        </div>
      </div>

      <div className="relative w-full md:w-[40%] min-h-[480px] md:min-h-screen overflow-hidden bg-surface-container-high">
        <Image
          src={PLACEHOLDERS.homeHero}
          alt="An editorial portrait of a confident Nairobi professional in structured tailoring layered over FORMA shapewear."
          fill
          priority
          quality={95}
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover brightness-90"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
        />

        <div className="absolute bottom-12 left-8 right-8 md:left-12 md:right-12 flex justify-between items-end text-on-surface z-10">
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-[10px]">Nairobi Edition</span>
            <span className="font-label-caps text-[10px] opacity-60">
              Series 01 / 2026
            </span>
          </div>
          <a
            href="#new-arrivals"
            className="flex items-center gap-2 group"
            aria-label="Discover new arrivals"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              className="transition-transform group-hover:translate-y-0.5"
            >
              <path d="M12 4v16M5 13l7 7 7-7" />
            </svg>
            <span className="font-label-caps text-[10px]">Discover</span>
          </a>
        </div>
      </div>
    </section>
  );
}
