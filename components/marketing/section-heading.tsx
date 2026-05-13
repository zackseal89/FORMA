import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  align?: "left" | "between" | "center";
  action?: { label: string; href: string };
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  action,
  className,
}: SectionHeadingProps) {
  if (align === "center") {
    return (
      <div className={cn("text-center mb-stack-lg", className)}>
        {eyebrow && (
          <span className="font-label-caps text-primary block mb-stack-sm">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display italic text-[40px] md:text-[64px] leading-[1.1] tracking-tight">
          {title}
        </h2>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:justify-between md:items-baseline gap-stack-md mb-stack-lg",
        className,
      )}
    >
      <div>
        {eyebrow && (
          <span className="font-label-caps text-primary block mb-stack-sm">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display italic text-[40px] md:text-[48px] leading-[1.15]">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="font-label-caps text-primary border-b border-primary pb-1 self-start md:self-auto"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
