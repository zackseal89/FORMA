"use client";

import { cn } from "@/lib/cn";
import type { Shade } from "@/lib/commerce";

type Style = "signature" | "essentials";

export function ColorSelector({
  shades,
  selectedShade,
  onShadeChange,
  style = "signature",
}: {
  shades: Shade[];
  selectedShade?: Shade;
  onShadeChange?: (shade: Shade) => void;
  style?: Style;
}) {
  if (shades.length === 0) return null;
  const selected = selectedShade ?? shades[0];

  return (
    <div className="flex flex-col gap-stack-md">
      <span className="font-label-caps text-on-surface-variant">
        COLOR:{" "}
        <span className="text-on-surface ml-2 normal-case tracking-normal">
          {selected.name}
        </span>
      </span>
      <div className="flex gap-3 flex-wrap">
        {shades.map((shade) => {
          const active = shade.name === selected.name;
          if (!shade.hex) {
            return (
              <button
                key={shade.name}
                type="button"
                onClick={() => onShadeChange?.(shade)}
                className={cn(
                  "px-3 h-8 font-label-caps text-[10px] tracking-wider transition-colors",
                  active
                    ? "border border-on-surface text-on-surface"
                    : "border border-outline-variant text-on-surface-variant hover:border-outline",
                )}
              >
                {shade.name}
              </button>
            );
          }
          if (style === "essentials") {
            return (
              <button
                key={shade.name}
                type="button"
                aria-label={shade.name}
                title={shade.name}
                onClick={() => onShadeChange?.(shade)}
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
              onClick={() => onShadeChange?.(shade)}
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
