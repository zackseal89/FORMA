import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PLACEHOLDERS } from "@/lib/placeholders";

export function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[640px] md:h-[921px] w-full flex items-center overflow-hidden -mt-20">
      <Image
        src={PLACEHOLDERS.homeHero}
        alt="A confident woman in minimalist premium FORMA shapewear, photographed in low-key Nairobi light."
        fill
        priority
        sizes="100vw"
        className="object-cover grayscale brightness-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-4xl">
        <h1 className="font-display italic text-[56px] md:text-[120px] leading-[1.0] mb-stack-lg">
          Confidence, <br />
          Reimagined.
        </h1>
        <p className="font-sans text-[18px] leading-[1.6] text-secondary mb-stack-lg max-w-xl">
          Quiet luxury sculpted for the modern woman. Discover the intersection
          of Nairobi warmth and global sophistication in our signature shapewear
          collection.
        </p>
        <Link href="/shop">
          <Button size="lg" fullWidth className="md:w-auto">
            Explore the Collection
          </Button>
        </Link>
      </div>
    </section>
  );
}
