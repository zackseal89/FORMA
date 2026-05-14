"use client";

import { formatKsh } from "@/lib/format";

/**
 * Free-shipping progress bar.
 *
 * Persistent in the cart drawer footer, just above the subtotal. Renders one of two states:
 *   - In progress: "KES X,XXX to free Nairobi delivery" + partial terracotta fill
 *   - Unlocked:    "Free Nairobi delivery unlocked ✓" + full terracotta fill
 *
 * Threshold is configurable via NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD (in KES, default 5000).
 *
 * See: forma-ui-conversion-audit.md, Recommendation 8.2
 */

const THRESHOLD =
  Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD) || 5000;

export function FreeShipBar({ subtotal }: { subtotal: number }) {
  const unlocked = subtotal >= THRESHOLD;
  const remaining = Math.max(0, THRESHOLD - subtotal);
  const pct = Math.min(100, Math.max(0, (subtotal / THRESHOLD) * 100));

  return (
    <div className="mb-6" aria-live="polite">
      <div className="flex items-center justify-between mb-2 min-h-[1rem]">
        {unlocked ? (
          <span className="font-label-caps text-[11px] text-primary inline-flex items-center gap-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Free Nairobi delivery unlocked
          </span>
        ) : (
          <span className="font-label-caps text-[11px] text-on-surface-variant">
            <span className="text-on-surface">{formatKsh(remaining)}</span>{" "}
            to free Nairobi delivery
          </span>
        )}
      </div>
      <div
        className="h-1 bg-surface-container-high overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress toward free Nairobi delivery"
      >
        <div
          className="h-full bg-primary-container transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
