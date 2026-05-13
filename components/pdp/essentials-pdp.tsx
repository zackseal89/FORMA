import Image from "next/image";
import Link from "next/link";
import { ColorSelector } from "@/components/pdp/color-selector";
import { SizeSelector } from "@/components/pdp/size-selector";
import { EssentialsGallery } from "@/components/pdp/gallery";
import { Accordion, AccordionItem } from "@/components/pdp/accordion";
import { formatKsh } from "@/lib/format";
import { accessories } from "@/data/accessories";
import type { Product } from "@/data/products";

export function EssentialsPdp({ product }: { product: Product }) {
  const { detail } = product;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
        <section className="md:col-span-7 bg-surface">
          <EssentialsGallery images={detail.images} />
        </section>

        <section className="md:col-span-5 px-margin-mobile md:px-16 py-12 md:py-24 flex flex-col gap-12 md:sticky md:top-20 self-start">
          <div className="flex flex-col gap-4">
            <span className="font-label-caps text-on-surface-variant tracking-[0.2em]">
              {detail.eyebrow.toUpperCase()}
            </span>
            <h1 className="font-display text-[48px] md:text-[56px] text-on-background leading-[1.1]">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-4">
              <span className="font-sans text-[24px] text-primary">
                {formatKsh(product.price)}
              </span>
              {detail.compareAtPrice && (
                <span className="font-sans text-[16px] text-on-surface-variant line-through opacity-50">
                  {formatKsh(detail.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant max-w-md">
            {detail.shortDescription}
          </p>

          <div className="flex flex-col gap-8">
            <ColorSelector shades={product.shades} style="essentials" />

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-label-caps text-on-surface">
                  SELECT SIZE
                </span>
                <Link
                  href="/size-guide"
                  className="font-label-caps text-[10px] text-on-surface-variant border-b border-outline-variant hover:text-on-surface transition-colors"
                >
                  SIZE GUIDE
                </Link>
              </div>
              <SizeSelector sizes={detail.sizes} style="essentials" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button className="w-full bg-primary-container text-on-primary-container font-sans py-5 hover:opacity-90 transition-opacity uppercase tracking-widest text-[16px] font-medium">
              Add to Bag
            </button>
            <button className="w-full border border-on-surface text-on-surface font-sans py-5 hover:bg-surface-container transition-colors uppercase tracking-widest text-[16px] font-medium">
              Wishlist
            </button>
          </div>

          <Accordion>
            {detail.materialAndCare && (
              <AccordionItem label="MATERIAL & CARE">
                {detail.materialAndCare}
              </AccordionItem>
            )}
            {detail.shippingAndReturns && (
              <AccordionItem label="SHIPPING & RETURNS">
                {detail.shippingAndReturns}
              </AccordionItem>
            )}
          </Accordion>
        </section>
      </div>

      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-[var(--container-max)] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="font-label-caps text-primary mb-4 block">
                COMPLETE THE LOOK
              </span>
              <h2 className="font-display text-[32px] text-on-background leading-[1.2]">
                Pairs Perfectly With
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-label-caps border-b border-on-surface pb-1 text-on-surface hover:text-primary transition-colors"
            >
              VIEW COLLECTION
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {accessories.map((item, i) => (
              <article
                key={item.slug}
                className={`flex flex-col gap-6 group ${i >= 2 ? "hidden md:flex" : ""}`}
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-surface-container">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-[10px] text-on-surface-variant">
                    {item.category.toUpperCase()}
                  </span>
                  <h3 className="font-sans text-[16px] text-on-surface">
                    {item.name}
                  </h3>
                  <span className="font-sans text-[16px] text-on-surface-variant">
                    {formatKsh(item.price)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
