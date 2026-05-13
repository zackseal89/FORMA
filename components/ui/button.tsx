import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "link";
type Size = "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-container text-on-tertiary-container hover:opacity-90 active:scale-[0.98]",
  ghost:
    "border border-on-surface text-on-surface bg-transparent hover:bg-on-surface/5",
  link: "text-primary border-b border-primary pb-1 rounded-none px-0 py-0",
};

const sizes: Record<Size, string> = {
  md: "px-8 py-3",
  lg: "px-12 py-5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-sans uppercase",
        "text-[14px] font-medium tracking-[0.05em] leading-none",
        "transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
        variant !== "link" && sizes[size],
        variants[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
