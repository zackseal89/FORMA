import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | FORMA",
  description: "Born in Nairobi, Made for Everywhere. The story behind FORMA shapewear.",
};

export default function AboutPage() {
  return (
    <div className="pt-20"> {/* offset for header */}
      {/* Hero Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-[var(--container-max)] mx-auto pt-section-gap pb-stack-lg">
        <h1 className="font-display italic text-center text-[48px] md:text-[72px] leading-[1.1] mb-stack-md">
          Born in Nairobi,<br />Made for Everywhere.
        </h1>
        <p className="font-sans text-[18px] md:text-[20px] leading-[1.6] text-on-surface-variant max-w-2xl mx-auto text-center">
          FORMA was conceived in the heart of Nairobi as a response to the need for shapewear that understands the diverse silhouettes of African women.
        </p>
      </section>

      {/* Main Image */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-[var(--container-max)] mx-auto pb-section-gap">
        <div className="relative aspect-video md:aspect-[21/9] overflow-hidden">
          <Image
            src="/founder_portrait.png"
            alt="Founder portrait"
            fill
            quality={90}
            className="object-cover object-top"
          />
        </div>
      </section>

      {/* The Mission */}
      <section className="bg-surface-container-low py-section-gap">
        <div className="px-margin-mobile md:px-margin-desktop max-w-[var(--container-max)] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
            <div className="order-2 md:order-1 relative aspect-square md:aspect-[4/5] overflow-hidden">
              <Image
                src="/fabric_detail.png"
                alt="Premium seamless fabric texture"
                fill
                quality={90}
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2 md:pl-stack-lg mb-stack-lg md:mb-0">
              <p className="font-label-caps text-primary mb-stack-sm">The Philosophy</p>
              <h2 className="font-display italic text-[40px] md:text-[48px] leading-[1.15] mb-stack-md">
                Intentional Design
              </h2>
              <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant mb-stack-lg">
                We believe in intentional design — where every seam serves a purpose and every fabric choice honors the skin it touches. Forma isn&apos;t about hiding who you are; it&apos;s about amplifying your natural silhouette and giving you the confidence to own every room you walk into.
              </p>
              <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant">
                Our materials are rigorously tested to ensure they provide sculpting support without sacrificing breathability. It&apos;s a second skin that moves with you, designed for the realities of daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Studio */}
      <section className="py-section-gap">
        <div className="px-margin-mobile md:px-margin-desktop max-w-[var(--container-max)] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
            <div className="md:pr-stack-lg mb-stack-lg md:mb-0">
              <p className="font-label-caps text-primary mb-stack-sm">The Process</p>
              <h2 className="font-display italic text-[40px] md:text-[48px] leading-[1.15] mb-stack-md">
                Studio to Street
              </h2>
              <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant mb-stack-lg">
                Each piece in our collection goes through dozens of iterations. From initial sketches on our studio moodboards to the final seamlessly knitted garments, our process is obsessive. We fit on real women, adjusting tension and compression zones to perfect the balance of comfort and control.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 font-label-caps hover:text-primary transition-colors"
              >
                Shop The Collection <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden">
              <Image
                src="/studio_bts.png"
                alt="Behind the scenes in the Forma design studio"
                fill
                quality={90}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
