import clsx from "clsx";

type LogoVariant = "full" | "mark";
type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  animate?: boolean;
  hoverRedraw?: boolean;
  className?: string;
  ariaLabel?: string;
}

const SIZE_HEIGHTS: Record<LogoSize, string> = {
  sm: "h-7",   // 28px — header mobile
  md: "h-9",   // 36px — header desktop
  lg: "h-14",  // 56px — footer
  xl: "h-20",  // 80px — hero / 404
};

const MARK_SIZE_HEIGHTS: Record<LogoSize, string> = {
  sm: "h-6",
  md: "h-8",
  lg: "h-12",
  xl: "h-16",
};

export function Logo({
  variant = "full",
  size = "md",
  animate = false,
  hoverRedraw = false,
  className,
  ariaLabel = "FORMA — Quiet luxury shapewear from Nairobi",
}: LogoProps) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 44 110"
        role="img"
        aria-label={ariaLabel}
        data-logo-animate={animate ? "true" : undefined}
        className={clsx(
          MARK_SIZE_HEIGHTS[size],
          "w-auto",
          hoverRedraw && "logo-hover-redraw",
          className,
        )}
      >
        <title>FORMA mark</title>
        <path
          className="logo-mark-path"
          d="M 22 8 C 40 26, 4 42, 22 55 C 4 68, 40 84, 22 102"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 248 115"
      role="img"
      aria-label={ariaLabel}
      data-logo-animate={animate ? "true" : undefined}
      className={clsx(
        SIZE_HEIGHTS[size],
        "w-auto",
        hoverRedraw && "logo-hover-redraw",
        className,
      )}
    >
      <title>FORMA</title>
      <desc>FORMA wordmark with terracotta S-curve mark and Nairobi label.</desc>

      {/* S-curve mark */}
      <path
        className="logo-mark-path"
        d="M 22 8 C 40 26, 4 42, 22 55 C 4 68, 40 84, 22 102"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Hairline separator */}
      <line
        x1="42"
        y1="28"
        x2="42"
        y2="82"
        stroke="var(--color-on-surface)"
        strokeWidth="0.5"
        strokeOpacity="0.12"
      />

      {/* Wordmark */}
      <text
        className="logo-wordmark"
        x="54"
        y="73"
        fontFamily="var(--font-eb-garamond), Georgia, 'Times New Roman', serif"
        fontSize="48"
        fontWeight="400"
        letterSpacing="5"
        fill="var(--color-on-surface)"
      >
        FORMA
      </text>

      {/* Sublabel */}
      <text
        className="logo-sublabel"
        x="56"
        y="92"
        fontFamily="var(--font-dm-sans), system-ui, Helvetica, sans-serif"
        fontSize="10"
        fontWeight="600"
        letterSpacing="1"
        fill="var(--color-outline)"
      >
        NAIROBI
      </text>
    </svg>
  );
}
