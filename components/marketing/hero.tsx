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
