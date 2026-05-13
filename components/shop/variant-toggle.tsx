import Link from "next/link";
import type { ShopVariant } from "@/lib/config";

const OPTIONS: { label: string; variant: ShopVariant }[] = [
  { label: "Sidebar", variant: "sidebar" },
  { label: "Editorial", variant: "editorial" },
];

export function VariantToggle({ active }: { active: ShopVariant }) {
  return (
    <div className="flex items-center gap-stack-sm font-label-caps text-on-surface-variant">
      <span className="opacity-60">Layout</span>
      <div className="flex border hairline">
        {OPTIONS.map((opt) => {
          const isActive = opt.variant === active;
          return (
            <Link
              key={opt.variant}
              href={`/shop?variant=${opt.variant}`}
              scroll={false}
              className={`px-3 py-1 transition-colors ${
                isActive
                  ? "bg-on-surface text-background"
                  : "hover:text-on-surface"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {opt.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
