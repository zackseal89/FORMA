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
      <div className="relative bg-surface-container-high overflow-hidden mb-stack-md aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="px-2">
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
