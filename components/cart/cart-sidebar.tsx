"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "./cart-context";
import { CartTrustRow } from "./cart-trust-row";
import { FreeShipBar } from "./free-ship-bar";
import { formatKsh } from "@/lib/format";
import { clsx } from "clsx";

export function CartSidebar() {
  const { cart, isOpen, closeCart, removeItem, updateQuantity, isPending } = useCart();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeCart]);

  if (!cart) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={clsx(
          "fixed right-0 top-0 z-[101] h-full w-full max-w-[450px] bg-background shadow-2xl transition-transform duration-500 ease-out-expo flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="px-8 h-20 flex items-center justify-between border-b border-surface-container-high">
          <h2 className="font-display italic text-[24px]">Your Bag</h2>
          <button
            onClick={closeCart}
            className="font-label-caps text-[12px] hover:text-primary transition-colors"
          >
            CLOSE
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-10 scrollbar-hide">
          {cart.lines.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <p className="font-display italic text-[20px] text-on-surface-variant">
                Your bag is empty.
              </p>
              <button
                onClick={closeCart}
                className="font-label-caps text-[12px] underline underline-offset-4"
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {cart.lines.map((line) => (
                <div key={line.id} className="flex gap-6 group">
                  <div className="relative aspect-[3/4] w-24 overflow-hidden bg-surface-container-high">
                    <Image
                      src={line.merchandise.product.featuredImage.url}
                      alt={line.merchandise.product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-display text-[18px] leading-tight">
                          {line.merchandise.product.title}
                        </h3>
                        <p className="font-sans font-medium text-[14px]">
                          {formatKsh(parseFloat(line.cost.totalAmount.amount))}
                        </p>
                      </div>
                      <p className="text-on-surface-variant text-[13px] font-sans">
                        {line.merchandise.title}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-surface-container-high">
                        <button
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                          className="px-3 py-1 hover:bg-surface-container-high transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-[13px] border-x border-surface-container-high">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          className="px-3 py-1 hover:bg-surface-container-high transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(line.id)}
                        className="text-[11px] font-label-caps text-on-surface-variant hover:text-error transition-colors"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.lines.length > 0 && (
          <footer className="px-8 py-8 border-t border-surface-container-high bg-surface-container-lowest">
            <FreeShipBar
              subtotal={parseFloat(cart.cost.subtotalAmount.amount)}
            />

            <div className="flex justify-between items-end mb-6">
              <span className="font-label-caps text-[12px] text-on-surface-variant">
                SUBTOTAL
              </span>
              <span className="font-display text-[24px]">
                {formatKsh(parseFloat(cart.cost.subtotalAmount.amount))}
              </span>
            </div>

            <CartTrustRow />

            <a
              href={cart.checkoutUrl}
              className="block w-full h-16 bg-primary-container text-on-primary-container flex items-center justify-center font-sans uppercase tracking-[0.1em] text-[14px] font-medium active:scale-[0.98] transition-transform duration-200"
            >
              Checkout with M-Pesa · {formatKsh(parseFloat(cart.cost.subtotalAmount.amount))}
            </a>

            <p className="font-label-caps text-[10px] text-on-surface-variant/70 text-center mt-4 leading-[1.5]">
              Free exchanges in Nairobi · 7-day return countrywide
            </p>
          </footer>
        )}
      </div>
    </>
  );
}
