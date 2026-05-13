"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Style = "signature" | "essentials";

interface SizeSelectorProps {
  sizes: string[];
  defaultSize?: string;
  style?: Style;
  columns?: number;
}

export function SizeSelector({
  sizes,
  defaultSize,
  style = "signature",
  columns,
}: SizeSelectorProps) {
  const [selected, setSelected] = useState<string | null>(
    defaultSize ?? sizes[1] ?? sizes[0] ?? null,
  );
  const cols = columns ?? (style === "essentials" ? 4 : 6);
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {sizes.map((size) => {
        const active = size === selected;
        const base =
          "flex items-center justify-center font-label-caps transition-colors";
        if (style === "essentials") {
          return (
            <button
              key={size}
              type="button"
              onClick={() => setSelected(size)}
              className={cn(
                base,
                "py-4 border",
                active
                  ? "border-on-surface bg-surface-container-high text-on-surface"
                  : "border-outline-variant text-on-surface hover:border-on-surface",
              )}
            >
              {size}
            </button>
          );
        }
        return (
          <button
            key={size}
            type="button"
            onClick={() => setSelected(size)}
            className={cn(
              base,
              "h-12 border",
              active
                ? "border-primary-container bg-primary-container text-on-primary"
                : "border-outline-variant text-on-surface hover:border-primary",
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
