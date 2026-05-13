import Image from "next/image";
import Link from "next/link";
import { ColorSelector } from "@/components/pdp/color-selector";
import { SizeSelector } from "@/components/pdp/size-selector";
import { SignatureGallery } from "@/components/pdp/gallery";
import { TrustBadges } from "@/components/pdp/trust-badges";
import { formatKsh } from "@/lib/format";
import type { Product } from "@/data/products";

export function SignaturePdp({ product }: { product: Product }) {
  const { detail } = product;
  return (
    <>
      <section className="max-w-[var(--container-max)] mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter lg:gap-32 items-start">
          <SignatureGallery images={detail.images} />

          <div className="flex flex-col gap-10 md:sticky md:top-32">
            <div className="flex flex-col gap-stack-sm">
              <span className="font-label-caps text-primary-container tracking-[0.2em]">
                {detail.eyebrow.toUpperCase()}
              </span>
              <h1 className="font-display text-[32px] md:text-[64px] leading-[1.1] text-on-surface">
                {product.name}
              </h1>
              <p className="font-display italic text-[32px] text-primary-container leading-none">
                {formatKsh(product.price)}
              </p>
            </div>

            <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant max-w-md">
              {detail.shortDescription}
            </p>

            <ColorSelector shades={product.shades} />

            <div className="flex flex-col gap-stack-md">
              <div className="flex justify-between items-center">
                <span className="font-label-caps text-on-surface-variant">
                  SIZE
                </span>
                <Link
                  href="/size-guide"
                  className="font-label-caps text-on-surface-variant underline underline-offset-4 hover:text-primary transition-colors"
                >
                  See the size guide
                </Link>
              </div>
              <SizeSelector sizes={detail.sizes} style="signature" />
            </div>

            <div className="flex flex-col gap-stack-md pt-4">
              <button className="w-full h-16 bg-primary-container text-on-primary-container font-sans uppercase tracking-[0.1em] text-[14px] font-medium active:scale-[0.98] transition-transform duration-200">
                Add to Cart
              </button>
              <button className="w-full h-16 border border-on-surface text-on-surface font-sans uppercase tracking-[0.1em] text-[14px] font-medium hover:bg-on-surface hover:text-surface transition-colors duration-300">
                Join the Waitlist
              </button>
            </div>

            <TrustBadges />
          </div>
        </div>
      </section>

      {detail.narrativeHeadline && (
        <section className="bg-surface-container-low py-section-gap">
          <div className="max-w-[var(--container-max)] mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-gutter items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-display italic text-[32px] md:text-[64px] leading-[1.1] text-on-surface mb-8">
                {detail.narrativeHeadline}
              </h2>
              {detail.longDescription && (
                <p className="font-sans text-[18px] leading-[1.6] text-on-surface-variant mb-10 max-w-lg">
                  {detail.longDescription}
                </p>
              )}
              {detail.meta && (
                <div className="grid grid-cols-2 gap-stack-lg">
                  {detail.meta.map((m) => (
                    <div key={m.label} className="flex flex-col gap-stack-sm">
                      <span className="font-label-caps text-primary-container">
                        {m.label.toUpperCase()}
                      </span>
                      <span className="text-on-surface">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="order-1 md:order-2 relative aspect-square overflow-hidden bg-surface-container-high">
              <Image
                src={detail.images[0].src}
                alt="Editorial silhouette accompanying the narrative."
                fill
                quality={92}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover grayscale brightness-75"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
