import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductByHandle, getProducts, getAccessories } from "@/lib/commerce";
import { SignaturePdp } from "@/components/pdp/signature-pdp";
import { EssentialsPdp } from "@/components/pdp/essentials-pdp";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
  if (!product) return { title: "Product Not Found" };
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
  const product = await getProductByHandle(slug);
  if (!product) notFound();

  const accessories = product.template === "essentials" ? await getAccessories() : [];

  return product.template === "essentials" ? (
    <EssentialsPdp product={product} accessories={accessories} />
  ) : (
    <SignaturePdp product={product} />
  );
}
