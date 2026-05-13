import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "primary" | "neutral";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const tones: Record<Tone, string> = {
  primary: "border-primary text-primary",
  neutral: "border-outline-variant text-on-surface-variant",
};

export function Tag({ className, tone = "primary", ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 border font-sans uppercase",
        "text-[10px] tracking-[0.1em] font-semibold leading-none",
        "rounded-pill",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
