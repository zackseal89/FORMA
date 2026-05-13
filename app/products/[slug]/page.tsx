import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findProduct, products } from "@/data/products";
import { SignaturePdp } from "@/components/pdp/signature-pdp";
import { EssentialsPdp } from "@/components/pdp/essentials-pdp";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.detail.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  return product.template === "essentials" ? (
    <EssentialsPdp product={product} />
  ) : (
    <SignaturePdp product={product} />
  );
}
