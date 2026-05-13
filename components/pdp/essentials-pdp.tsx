"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ColorSelector } from "@/components/pdp/color-selector";
import { SizeSelector } from "@/components/pdp/size-selector";
import { EssentialsGallery } from "@/components/pdp/gallery";
import { Accordion, AccordionItem } from "@/components/pdp/accordion";
import { formatKsh } from "@/lib/format";
import type { Product } from "@/lib/commerce";
import { useCart } from "@/components/cart/cart-context";

export function EssentialsPdp({
  product,
  accessories = [],
}: {
  product: Product;
  accessories?: Product[];
}) {
  const { detail } = product;
  const { addItem, isPending } = useCart();
  
  const [selectedSize, setSelectedSize] = useState(detail.sizes[0]);
  const [selectedShade, setSelectedShade] = useState(product.shades[0]);

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

          {detail.longDescription && (
            <div
              className="font-sans text-[15px] leading-[1.7] text-on-surface-variant max-w-md [&_h2]:font-display [&_h2]:text-[20px] [&_h2]:text-on-surface [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_li]:mb-1 [&_p]:mb-3"
              dangerouslySetInnerHTML={{ __html: detail.longDescription }}
            />
          )}

          <div className="flex flex-col gap-8">
            <ColorSelector 
              shades={product.shades} 
              selectedShade={selectedShade}
              onShadeChange={setSelectedShade}
              style="essentials" 
            />

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
              <SizeSelector 
                sizes={detail.sizes} 
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                style="essentials" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleAddToCart}
              disabled={isPending || !product.inStock}
              className="w-full bg-primary-container text-on-primary-container font-sans py-5 hover:opacity-90 transition-opacity uppercase tracking-widest text-[16px] font-medium disabled:opacity-50"
            >
              {isPending ? "Adding..." : product.inStock ? "Add to Bag" : "Out of Stock"}
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
                <Link
                  href={`/products/${item.slug}`}
                  className="relative overflow-hidden aspect-[3/4] bg-surface-container"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-[10px] text-on-surface-variant">
                    {item.category.toUpperCase()}
                  </span>
                  <h3 className="font-sans text-[16px] text-on-surface">
                    <Link href={`/products/${item.slug}`} className="hover:text-primary">
                      {item.name}
                    </Link>
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
