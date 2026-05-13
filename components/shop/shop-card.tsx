import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { formatKsh } from "@/lib/format";
import type { Product } from "@/lib/commerce";

export function ShopCard({ product }: { product: Product }) {
  const primaryShade = product.shades[0];
  return (
    <Link
      href={`/products/${product.slug}`}
      className="glass-panel group block overflow-hidden"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        {product.inStock && (
          <div className="absolute top-4 right-4">
            <Tag>In Stock</Tag>
          </div>
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-on-surface/30 to-transparent"
        />
      </div>
      <div className="relative p-stack-md flex flex-col gap-1">
        <h2 className="font-sans font-medium text-on-background text-[18px]">
          {product.name}
        </h2>
        <p className="font-display italic text-[28px] leading-[1.1] text-primary-fixed-dim">
          {formatKsh(product.price)}
        </p>
        <p className="font-label-caps text-on-surface-variant mt-1">
          {primaryShade.name}
        </p>
      </div>
    </Link>
  );
}
