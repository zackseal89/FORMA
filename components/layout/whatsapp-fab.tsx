"use client";

import { clsx } from "clsx";
import { useCart } from "@/components/cart/cart-context";

/**
 * Floating WhatsApp button — mobile-only.
 * Hides when the cart drawer is open to avoid stacking on the same edge.
 *
 * See: forma-ui-conversion-audit.md, Recommendation 7.3
 */
export function WhatsappFab() {
  const { isOpen } = useCart();

  return (
    <a
      href="https://wa.me/254795023213?text=Hi%20FORMA%2C%20I%27d%20like%20to%20know%20more."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with FORMA on WhatsApp"
      className={clsx(
        "md:hidden fixed z-40",
        "right-[max(env(safe-area-inset-right),1rem)]",
        "bottom-[calc(max(env(safe-area-inset-bottom),1rem)+5rem)]",
        // sits above the sticky mobile ATC bar (~64px), below the cart drawer
        "w-14 h-14 rounded-full flex items-center justify-center",
        "bg-[#25D366] shadow-lg shadow-black/30 ring-1 ring-black/10",
        "transition-all duration-300",
        "active:scale-95 hover:brightness-110",
        isOpen
          ? "opacity-0 pointer-events-none translate-y-2"
          : "opacity-100 translate-y-0",
      )}
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 fill-white"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
      <span className="sr-only">Chat on WhatsApp</span>
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 flex h-3 w-3"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366] ring-2 ring-background" />
      </span>
    </a>
  );
}
