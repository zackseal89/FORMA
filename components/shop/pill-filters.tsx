import Link from "next/link";

interface PillFiltersProps {
  options: { label: string; href: string }[];
  activeHref?: string;
}

export function PillFilters({ options, activeHref }: PillFiltersProps) {
  return (
    <nav
      aria-label="Collection filters"
      className="flex flex-wrap justify-center gap-stack-md mb-section-gap"
    >
      {options.map((opt) => {
        const active = opt.href === activeHref;
        return (
          <Link
            key={opt.href}
            href={opt.href}
            className={`px-8 py-2 rounded-pill border font-sans uppercase text-[14px] tracking-[0.05em] font-medium transition-colors ${
              active
                ? "border-primary bg-primary text-on-primary"
                : "border-outline text-on-surface hover:border-primary"
            }`}
          >
            {opt.label}
          </Link>
        );
      })}
    </nav>
  );
}
