"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { Logo } from "@/components/brand/logo";

const nav = [
  { label: "Collections", href: "/shop" },
  { label: "The Edit", href: "/collections/the-edit" },
  { label: "Our Story", href: "/about" },
  { label: "Journal", href: "/journal" },
];

const secondaryNav = [
  { label: "Size Guide", href: "/size-guide" },
  { label: "Chat on WhatsApp", href: "https://wa.me/254795023213", external: true },
];

export function Header() {
  const { openCart, cart } = useCart();
  const totalItems = cart?.totalQuantity || 0;
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape; lock scroll while open
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-20 glass-bar">
        <div className="h-full px-margin-mobile md:px-margin-desktop flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link
              href="/"
              aria-label="FORMA — Home"
              className="block leading-none text-on-background"
            >
              <span className="md:hidden">
                <Logo variant="mark" size="sm" animate hoverRedraw />
              </span>
              <span className="hidden md:block">
                <Logo variant="full" size="md" animate hoverRedraw />
              </span>
            </Link>
            <nav className="hidden md:flex gap-8">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-label-caps text-[12px] text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <button
              aria-label="Search"
              className="text-on-background hover:text-primary transition-colors"
            >
              <SearchIcon />
            </button>
            <button
              aria-label="Cart"
              onClick={openCart}
              className="text-on-background hover:text-primary transition-colors relative"
            >
              <BagIcon />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((v) => !v)}
              className="md:hidden text-on-background"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — slides down beneath the header, full-height */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        hidden={!isMenuOpen}
        className="md:hidden fixed inset-x-0 top-20 bottom-0 z-40 glass-bar overflow-y-auto"
      >
        <nav className="px-margin-mobile py-12 flex flex-col gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display italic text-[32px] leading-[1.2] py-3 text-on-surface hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="h-px bg-outline-variant/40 my-8" />
          {secondaryNav.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-caps text-[14px] py-2 text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="font-label-caps text-[14px] py-2 text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M5 7h14l-1 13H6L5 7Z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  );
}
