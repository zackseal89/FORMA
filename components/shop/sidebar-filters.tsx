import type { Product } from "@/lib/commerce";

interface SidebarFiltersProps {
  products: Product[];
  activeCategory?: string;
}

export function SidebarFilters({
  products,
  activeCategory,
}: SidebarFiltersProps) {
  const categoryOptions = uniq(
    products.map((p) => p.category).filter(Boolean),
  );
  const intensityOptions = uniq(
    products
      .map((p) => p.intensity)
      .filter((i): i is NonNullable<typeof i> => Boolean(i)),
  );
  const shadeOptions = uniqBy(
    products.flatMap((p) => p.shades),
    (s) => s.name,
  );

  return (
    <aside className="md:col-span-3 md:sticky md:top-32 self-start space-y-stack-lg">
      {categoryOptions.length > 0 && (
        <FilterGroup title="Category">
          <ul className="space-y-stack-sm">
            {categoryOptions.map((cat) => {
              const active = activeCategory === cat;
              return (
                <li key={cat}>
                  <button
                    className={`font-sans text-[16px] transition-colors ${
                      active
                        ? "text-primary"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              );
            })}
          </ul>
        </FilterGroup>
      )}

      {intensityOptions.length > 0 && (
        <FilterGroup title="Intensity">
          <ul className="space-y-stack-sm">
            {intensityOptions.map((i) => (
              <li key={i}>
                <button className="font-sans text-[16px] text-on-surface-variant hover:text-primary transition-colors">
                  {i}
                </button>
              </li>
            ))}
          </ul>
        </FilterGroup>
      )}

      {shadeOptions.length > 0 && (
        <FilterGroup title="Shade">
          <ul className="space-y-stack-sm">
            {shadeOptions.map((shade) => (
              <li key={shade.name}>
                <button
                  className="font-sans text-[16px] text-on-surface-variant hover:text-primary transition-colors text-left"
                  aria-label={shade.name}
                >
                  {shade.name}
                </button>
              </li>
            ))}
          </ul>
        </FilterGroup>
      )}
    </aside>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-label-caps text-on-surface mb-stack-md border-b hairline pb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function uniqBy<T>(arr: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of arr) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}
