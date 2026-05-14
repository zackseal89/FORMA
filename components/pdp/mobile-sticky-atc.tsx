"use client";

import { useEffect, useState, type RefObject } from "react";
import { clsx } from "clsx";
import { formatKsh } from "@/lib/format";

/**
 * Mobile-only sticky Add to Cart bar.
 * Hides itself when the in-page Add to Cart button is visible
 * (no duplicate CTAs on screen at the same time).
 *
 * See: forma-ui-conversion-audit.md, Recommendation 7.2
 */
export function MobileStickyAtc({
  targetRef,
  productName,
  price,
  selectedSize,
  inStock,
  isPending,
  onAdd,
  ctaLabel = "Add to Cart",
}: {
  targetRef: RefObject<HTMLElement | null>;
  productName: string;
  price: number;
  selectedSize?: string;
  inStock: boolean;
  isPending: boolean;
  onAdd: () => void;
  ctaLabel?: string;
}) {
  const [hideBecauseInView, setHideBecauseInView] = useState(true);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHideBecauseInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef]);

  return (
    <div
      aria-hidden={hideBecauseInView}
      className={clsx(
        "md:hidden fixed inset-x-0 bottom-0 z-40 glass-bar border-t border-outline-variant/40",
        "transition-transform duration-300 ease-out",
        "pb-[max(env(safe-area-inset-bottom),0.5rem)]",
        hideBecauseInView ? "translate-y-full" : "translate-y-0",
      )}
    >
      <div className="px-margin-mobile py-3 flex items-center gap-4">
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-sans text-[13px] text-on-surface truncate">
            {productName}
            {selectedSize && (
              <span className="text-on-surface-variant"> · {selectedSize}</span>
            )}
          </span>
          <span className="font-display italic text-[16px] leading-none text-primary-container">
            {formatKsh(price)}
          </span>
        </div>
        <button
          onClick={onAdd}
          disabled={isPending || !inStock}
          className="shrink-0 h-12 px-6 bg-primary-container text-on-primary-container font-sans uppercase tracking-[0.1em] text-[12px] font-medium active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          {isPending ? "Adding..." : inStock ? ctaLabel : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
