"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AccordionItemProps {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  label,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-outline-variant py-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center group"
        aria-expanded={open}
      >
        <span className="font-label-caps text-on-surface">{label}</span>
        <span
          aria-hidden
          className={cn(
            "text-on-surface-variant group-hover:text-on-surface text-2xl leading-none transition-transform",
            open && "rotate-180",
          )}
        >
          ⌄
        </span>
      </button>
      {open && (
        <div className="mt-4 text-on-surface-variant text-[14px] leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="mt-8 border-t border-outline-variant">{children}</div>;
}
