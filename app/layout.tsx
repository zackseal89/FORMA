import type { Metadata } from "next";
import { DM_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";
import { CartProvider } from "@/components/cart/cart-context";
import { CartSidebar } from "@/components/cart/cart-sidebar";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.example";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FORMA — Confidence, Reimagined",
    template: "%s · FORMA",
  },
  description:
    "Quiet luxury shapewear sculpted in Nairobi for the modern woman. Intentional design, inclusive shades, premium fabrics.",
  openGraph: {
    siteName: "FORMA",
    type: "website",
    locale: "en_US",
    title: "FORMA — Confidence, Reimagined",
    description:
      "Quiet luxury shapewear sculpted in Nairobi for the modern woman. Intentional design, inclusive shades, premium fabrics.",
    url: SITE_URL,
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "FORMA — Quiet luxury shapewear from Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORMA — Confidence, Reimagined",
    description:
      "Quiet luxury shapewear sculpted in Nairobi for the modern woman.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    // SVG favicon works in all modern browsers; fallback .ico not needed
    icon: [{ url: "/logo-mark.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png", // export a 180×180px PNG from logo-mark.svg
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FORMA",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description:
    "Quiet luxury shapewear sculpted in Nairobi for the modern woman. Intentional design, inclusive shades, premium fabrics.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <CartProvider>
          <Header />
          <CartSidebar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <WhatsappFab />
        </CartProvider>
      </body>
    </html>
  );
}
