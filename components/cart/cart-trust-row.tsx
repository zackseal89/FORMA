/**
 * Cart drawer trust row — three signals at the moment of commitment:
 * M-Pesa accepted · Free exchanges in Nairobi · 2–3 day countrywide delivery
 *
 * See: forma-ui-conversion-audit.md, Recommendation 8.1
 */

const items: { label: string; icon: React.ReactNode }[] = [
  {
    label: "M-Pesa accepted",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="6"
          y="2"
          width="12"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M10 18h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M9 9.5h6M12 7v5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Free exchanges in Nairobi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M18 3v3.7h-3.7M6 21v-3.7h3.7"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "2–3 day delivery",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M3 7.5 12 12l9-4.5M12 12v9" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
];

export function CartTrustRow() {
  return (
    <ul
      aria-label="Order guarantees"
      className="grid grid-cols-3 gap-2 py-4 mb-6 border-y border-outline-variant/40"
    >
      {items.map((item) => (
        <li key={item.label} className="flex flex-col items-center text-center gap-1.5">
          <span className="w-5 h-5 text-primary" aria-hidden="true">
            {item.icon}
          </span>
          <span className="font-label-caps text-[9px] leading-[1.3] text-on-surface-variant">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
