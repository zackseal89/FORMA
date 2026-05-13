import Image from "next/image";
import Link from "next/link";
import { formatKsh } from "@/lib/format";

export interface ProductCardData {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
}

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="glass-panel relative overflow-hidden mb-stack-md aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover group-hover:scale-[1.04] transition-transform duration-[900ms] ease-out"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-on-surface/30 to-transparent"
        />
      </div>
      <div className="px-1">
        <p className="font-label-caps text-on-surface-variant mb-1">
          {product.category}
        </p>
        <h3 className="font-display italic text-[22px] leading-[1.2] mb-2">
          {product.name}
        </h3>
        <p className="font-sans text-[16px] text-secondary">
          {formatKsh(product.price)}
        </p>
      </div>
    </Link>
  );
}
