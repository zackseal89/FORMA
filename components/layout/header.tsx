import Link from "next/link";

const nav = [
  { label: "Collections", href: "/shop" },
  { label: "The Edit", href: "/collections/the-edit" },
  { label: "Our Story", href: "/about" },
  { label: "Journal", href: "/journal" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 glass-bar">
      <div className="h-full px-margin-mobile md:px-margin-desktop flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="font-display italic text-[28px] md:text-[32px] tracking-tight leading-none text-on-background"
          >
            FORMA
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
            className="text-on-background hover:text-primary transition-colors"
          >
            <BagIcon />
          </button>
          <button
            aria-label="Open menu"
            className="md:hidden text-on-background"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
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
