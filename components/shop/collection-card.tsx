import Image from "next/image";
import Link from "next/link";
import { formatKsh } from "@/lib/format";
import type { Product } from "@/lib/commerce";

export function CollectionCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col group">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[3/4] bg-surface-container overflow-hidden block"
      >
        <Image
          src={product.image}
          alt={product.alt}
          fill
          quality={90}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-10 py-3 border border-on-surface text-on-surface font-sans uppercase text-[14px] tracking-[0.05em] font-medium hover:bg-on-surface hover:text-background transition-colors">
            View Product
          </span>
        </div>
      </Link>
      <div className="py-stack-lg flex flex-col gap-2">
        <div className="flex justify-between items-start gap-stack-md">
          <h3 className="font-sans text-[16px] text-on-surface">
            <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
              {product.name}
            </Link>
          </h3>
          <span className="font-display italic text-[20px] leading-none text-primary-container shrink-0">
            {formatKsh(product.price)}
          </span>
        </div>
        {product.shades.length > 0 && (
          <div className="flex gap-2 mt-1" aria-label="Available shades">
            {product.shades.map((shade) =>
              shade.hex ? (
                <span
                  key={shade.name}
                  title={shade.name}
                  className="w-4 h-4 rounded-full border border-outline/30"
                  style={{ backgroundColor: shade.hex }}
                />
              ) : (
                <span
                  key={shade.name}
                  className="font-label-caps text-[10px] text-on-surface-variant"
                >
                  {shade.name}
                </span>
              ),
            )}
          </div>
        )}
      </div>
    </article>
  );
}
