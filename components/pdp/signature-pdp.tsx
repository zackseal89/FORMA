"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ColorSelector } from "@/components/pdp/color-selector";
import { SizeSelector } from "@/components/pdp/size-selector";
import { SignatureGallery } from "@/components/pdp/gallery";
import { TrustBadges } from "@/components/pdp/trust-badges";
import { PdpTrustStrip } from "@/components/pdp/trust-strip";
import { MobileStickyAtc } from "@/components/pdp/mobile-sticky-atc";
import { formatKsh } from "@/lib/format";
import type { Product } from "@/lib/commerce";
import { useCart } from "@/components/cart/cart-context";

export function SignaturePdp({ product }: { product: Product }) {
  const { detail } = product;
  const { addItem, isPending } = useCart();
  const ctaRef = useRef<HTMLButtonElement>(null);

  // Basic selection state
  const [selectedSize, setSelectedSize] = useState(detail.sizes[0]);
  const [selectedShade, setSelectedShade] = useState(product.shades[0]);

  // Find the exact variant based on selected size and shade
  const getSelectedVariantId = () => {
    const variant = product.variants.find((v) => {
      if (!v.selectedOptions) return false;
      
      const hasSizeOption = v.selectedOptions.some((opt) => opt.name.toLowerCase() === "size");
      const hasColorOption = v.selectedOptions.some((opt) => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "shade");

      const matchesSize = v.selectedOptions.some((opt) => opt.name.toLowerCase() === "size" && opt.value === selectedSize);
      const matchesColor = v.selectedOptions.some((opt) => (opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "shade") && opt.value === selectedShade.name);

      const sizeMatch = hasSizeOption ? matchesSize : true;
      const colorMatch = hasColorOption ? matchesColor : true;

      return sizeMatch && colorMatch;
    });
    
    return variant?.id || product.variants[0]?.id;
  };

  const handleAddToCart = async () => {
    const variantId = getSelectedVariantId();
    if (variantId) {
      await addItem(variantId);
    }
  };

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

            {detail.longDescription && !detail.narrativeHeadline && (
              <div
                className="font-sans text-[15px] leading-[1.7] text-on-surface-variant max-w-md prose prose-sm [&_h2]:font-display [&_h2]:text-[20px] [&_h2]:text-on-surface [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_li]:mb-1 [&_p]:mb-3"
                dangerouslySetInnerHTML={{ __html: detail.longDescription }}
              />
            )}

            <ColorSelector
              shades={product.shades}
              selectedShade={selectedShade}
              onShadeChange={setSelectedShade}
            />

            {detail.sizes.length > 0 && (
              <div className="flex flex-col gap-stack-md">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="font-label-caps text-on-surface-variant">
                    SIZE
                  </span>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/size-guide"
                      className="font-label-caps text-on-surface-variant underline underline-offset-4 hover:text-primary transition-colors"
                    >
                      See the size guide
                    </Link>
                    <a
                      href={`https://wa.me/254795023213?text=${encodeURIComponent(`Hi FORMA, I'd like help choosing a size for the ${product.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-label-caps text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
                    >
                      Ask on WhatsApp
                    </a>
                  </div>
                </div>
                <SizeSelector
                  sizes={detail.sizes}
                  selectedSize={selectedSize}
                  onSizeChange={setSelectedSize}
                  style="signature"
                />
                <p className="font-label-caps text-[10px] text-on-surface-variant/80 leading-[1.5]">
                  Fits true to size. If between sizes, size up for comfort.
                  <span className="block mt-1">Restocks monthly.</span>
                </p>
              </div>
            )}

            <div className="flex flex-col gap-stack-md pt-4">
              <button
                ref={ctaRef}
                onClick={handleAddToCart}
                disabled={isPending || !product.inStock}
                className="w-full h-16 bg-primary-container text-on-primary-container font-sans uppercase tracking-[0.1em] text-[14px] font-medium active:scale-[0.98] transition-transform duration-200 disabled:opacity-50"
              >
                {isPending ? "Adding..." : product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              <button className="w-full h-16 border border-on-surface text-on-surface font-sans uppercase tracking-[0.1em] text-[14px] font-medium hover:bg-on-surface hover:text-surface transition-colors duration-300">
                Join the Waitlist
              </button>
            </div>

            <PdpTrustStrip />

            <p className="font-label-caps text-[10px] text-on-surface-variant text-center -mt-2">
              Free exchanges in Nairobi · 7-day return countrywide
            </p>

            <TrustBadges />
          </div>
        </div>
      </section>

      <MobileStickyAtc
        targetRef={ctaRef}
        productName={product.name}
        price={product.price}
        selectedSize={selectedSize}
        inStock={product.inStock}
        isPending={isPending}
        onAdd={handleAddToCart}
        ctaLabel="Add to Cart"
      />

      {detail.narrativeHeadline && (
        <section className="bg-surface-container-low py-section-gap">
          <div className="max-w-[var(--container-max)] mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-gutter items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-display italic text-[32px] md:text-[64px] leading-[1.1] text-on-surface mb-8">
                {detail.narrativeHeadline}
              </h2>
              {detail.longDescription && (
                <div
                  className="font-sans text-[18px] leading-[1.6] text-on-surface-variant mb-10 max-w-lg [&_h2]:font-display [&_h2]:text-[22px] [&_h2]:text-on-surface [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_li]:mb-1 [&_p]:mb-3"
                  dangerouslySetInnerHTML={{ __html: detail.longDescription }}
                />
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
            {detail.images[0] && (
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
            )}
          </div>
        </section>
      )}
    </>
  );
}
