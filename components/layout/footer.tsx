import Link from "next/link";
import { Logo } from "@/components/brand/logo";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full px-margin-mobile md:px-margin-desktop py-section-gap bg-surface-container border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-gap max-w-[var(--container-max)] mx-auto">
        <div className="md:col-span-4 mb-stack-lg md:mb-0">
          <Link href="/" aria-label="FORMA — Home" className="inline-block mb-stack-md">
            <Logo variant="full" size="lg" hoverRedraw />
          </Link>
          <p className="font-sans text-[16px] leading-[1.6] text-on-surface-variant max-w-xs">
            Redefining confidence through intentional design and the warmth of
            Nairobi heritage.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h5 className="font-label-caps text-on-background mb-stack-md">
              {col.title}
            </h5>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-label-caps text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-2">
          <h5 className="font-label-caps text-on-background mb-stack-md">
            Connect
          </h5>
          <div className="flex gap-4 text-on-surface-variant">
            <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors">
              <SocialIcon path="M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.8-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 8.3c-.1-1.5-.4-2.9-1.5-4-1.1-1.1-2.5-1.4-4-1.5-1.5-.1-6.1-.1-7.6 0-1.5.1-2.9.4-4 1.5-1.1 1.1-1.4 2.5-1.5 4-.1 1.5-.1 6.1 0 7.6.1 1.5.4 2.9 1.5 4 1.1 1.1 2.5 1.4 4 1.5 1.5.1 6.1.1 7.6 0 1.5-.1 2.9-.4 4-1.5 1.1-1.1 1.4-2.5 1.5-4 .1-1.5.1-6.1 0-7.6Z" />
            </a>
            <a href="#" aria-label="Email" className="hover:text-primary transition-colors">
              <SocialIcon path="M3 6h18v12H3z M3 6l9 7 9-7" stroke />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[var(--container-max)] mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-outline-variant/30">
        <span className="font-label-caps text-on-surface-variant text-[10px] mb-4 md:mb-0">
          © {new Date().getFullYear()} FORMA. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-8">
          <span className="font-label-caps text-on-surface-variant text-[10px]">
            NAIROBI, KENYA
          </span>
          <span className="font-label-caps text-on-surface-variant text-[10px]">
            GLOBAL SHIPPING AVAILABLE
          </span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ path, stroke }: { path: string; stroke?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={stroke ? "none" : "currentColor"}
      stroke={stroke ? "currentColor" : "none"}
      strokeWidth={stroke ? 1.5 : undefined}
    >
      <path d={path} />
    </svg>
  );
}
