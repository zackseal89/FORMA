/**
 * PDP trust strip — answers the four category-specific shapewear objections
 * at the exact moment of decision (directly under Add to Cart).
 *
 * Anti-roll · Invisible · 8-hour comfort · Breathable
 *
 * See: forma-ui-conversion-audit.md, Recommendation 5.1
 */

const items: { label: string; icon: React.ReactNode }[] = [
  {
    label: "Anti-roll silicone",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 9c0-2.5 3.5-4 8-4s8 1.5 8 4-3.5 4-8 4-8-1.5-8-4Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M4 14v2c0 2.5 3.5 4 8 4s8-1.5 8-4v-2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path d="M8 9v8M16 9v8" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    label: "Invisible under clothes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "8-hour comfort",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M12 7v5l3.5 2.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Breathable mesh",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 3v18M12 3v18M18 3v18" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="6" cy="6" r="1.4" fill="currentColor" />
        <circle cx="18" cy="18" r="1.4" fill="currentColor" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
];

export function PdpTrustStrip() {
  return (
    <div
      role="list"
      aria-label="Product guarantees"
      className="grid grid-cols-2 md:grid-cols-4 gap-x-stack-md gap-y-stack-md py-stack-md border-y border-outline-variant/40"
    >
      {items.map((item) => (
        <div
          key={item.label}
          role="listitem"
          className="flex flex-col items-center text-center gap-2"
        >
          <span className="w-6 h-6 text-primary" aria-hidden="true">
            {item.icon}
          </span>
          <span className="font-label-caps text-[10px] leading-[1.3] text-on-surface-variant">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
