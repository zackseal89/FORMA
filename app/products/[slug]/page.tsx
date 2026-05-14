import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductByHandle, getProducts, getAccessories } from "@/lib/commerce";
import { SignaturePdp } from "@/components/pdp/signature-pdp";
import { EssentialsPdp } from "@/components/pdp/essentials-pdp";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.example";

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

  const firstImage = product.detail.images[0];

  return {
    title: product.name,
    description: product.detail.shortDescription,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} · FORMA`,
      description: product.detail.shortDescription,
      url: `${SITE_URL}/products/${slug}`,
      images: firstImage
        ? [{ url: firstImage.src, alt: firstImage.alt, width: 800, height: 1000 }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} · FORMA`,
      description: product.detail.shortDescription,
      images: firstImage ? [firstImage.src] : [],
    },
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

  const accessories =
    product.template === "essentials" ? await getAccessories() : [];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.detail.shortDescription,
    brand: { "@type": "Brand", name: "FORMA" },
    url: `${SITE_URL}/products/${slug}`,
    image: product.detail.images.map((img) => img.src),
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: process.env.NEXT_PUBLIC_CURRENCY ?? "KES",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "FORMA" },
      url: `${SITE_URL}/products/${slug}`,
    },
    ...(product.detail.materialAndCare
      ? { material: product.detail.materialAndCare }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${SITE_URL}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${SITE_URL}/products/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {product.template === "essentials" ? (
        <EssentialsPdp product={product} accessories={accessories} />
      ) : (
        <SignaturePdp product={product} />
      )}
    </>
  );
}
