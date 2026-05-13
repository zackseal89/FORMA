"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Shade } from "@/data/products";

type Style = "signature" | "essentials";

export function ColorSelector({
  shades,
  style = "signature",
}: {
  shades: Shade[];
  style?: Style;
}) {
  const [selected, setSelected] = useState<Shade>(shades[1] ?? shades[0]);

  return (
    <div className="flex flex-col gap-stack-md">
      <span className="font-label-caps text-on-surface-variant">
        COLOR:{" "}
        <span className="text-on-surface ml-2 normal-case tracking-normal">
          {selected.name}
        </span>
      </span>
      <div className="flex gap-3">
        {shades.map((shade) => {
          const active = shade.name === selected.name;
          if (style === "essentials") {
            return (
              <button
                key={shade.name}
                type="button"
                aria-label={shade.name}
                title={shade.name}
                onClick={() => setSelected(shade)}
                style={{ backgroundColor: shade.hex }}
                className={cn(
                  "w-8 h-8 transition-all",
                  active
                    ? "border border-on-surface ring-1 ring-on-surface-variant ring-offset-2 ring-offset-background"
                    : "border border-transparent hover:border-outline",
                )}
              />
            );
          }
          return (
            <button
              key={shade.name}
              type="button"
              aria-label={shade.name}
              title={shade.name}
              onClick={() => setSelected(shade)}
              style={{ backgroundColor: shade.hex }}
              className={cn(
                "w-8 h-8 rounded-full transition-all",
                active
                  ? "border border-primary ring-1 ring-primary"
                  : "border border-outline-variant hover:ring-1 hover:ring-primary",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
