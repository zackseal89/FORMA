import { categories, intensities, shadePalette } from "@/lib/commerce";

interface SidebarFiltersProps {
  activeCategory?: string;
}

export function SidebarFilters({ activeCategory }: SidebarFiltersProps) {
  return (
    <aside className="md:col-span-3 md:sticky md:top-32 self-start space-y-stack-lg">
      <FilterGroup title="Category">
        <ul className="space-y-stack-sm">
          {categories.map((cat) => {
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

      <FilterGroup title="Intensity">
        <ul className="space-y-stack-sm">
          {intensities.map((i) => (
            <li key={i}>
              <button className="font-sans text-[16px] text-on-surface-variant hover:text-primary transition-colors">
                {i} {i === "Maximum" ? "Control" : i === "Medium" ? "Support" : "Compression"}
              </button>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Shade">
        <div className="grid grid-cols-4 gap-2">
          {shadePalette.map((shade) => (
            <button
              key={shade.name}
              title={shade.name}
              aria-label={shade.name}
              className="w-full aspect-square border hairline hover:border-primary transition-colors"
              style={{ backgroundColor: shade.hex }}
            />
          ))}
        </div>
      </FilterGroup>
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
