import Image from "next/image";
import Link from "next/link";
import { PLACEHOLDERS } from "@/lib/placeholders";

export function OurStory() {
  return (
    <section className="bg-surface-container-low py-section-gap">
      <div className="px-margin-mobile md:px-margin-desktop max-w-[var(--container-max)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 order-2 md:order-1">
            <div className="relative aspect-video md:aspect-[16/10] overflow-hidden">
              <Image
                src={PLACEHOLDERS.ourStory}
                alt="A cinematic Nairobi skyline at sunset, anchoring FORMA's roots."
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:pl-stack-lg order-1 md:order-2 mb-stack-lg md:mb-0">
            <p className="font-label-caps text-primary mb-stack-sm">
              Our Roots
            </p>
            <h2 className="font-display italic text-[40px] md:text-[48px] leading-[1.15] mb-stack-md">
              Born in Nairobi, <br />
              Made for Everywhere.
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant mb-stack-lg">
              FORMA was conceived in the heart of Nairobi as a response to the
              need for shapewear that understands the diverse silhouettes of
              African women. We believe in intentional design — where every
              seam serves a purpose and every fabric choice honors the skin it
              touches.
            </p>
            <p className="font-sans text-[16px] italic text-on-surface-variant mb-stack-lg">
              &ldquo;Luxury isn&rsquo;t about being noticed, it&rsquo;s about
              being remembered.&rdquo;
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-label-caps hover:text-primary transition-colors"
            >
              The Full Journey <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
