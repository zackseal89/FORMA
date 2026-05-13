"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { Cart, getCart, createCart, addToCart, removeFromCart, updateCartQuantity } from "@/lib/cart";

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  isPending: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Initialize cart from localStorage
  useEffect(() => {
    const initCart = async () => {
      const savedCartId = localStorage.getItem("forma_cart_id");
      if (savedCartId) {
        const fetchedCart = await getCart(savedCartId);
        if (fetchedCart) {
          setCart(fetchedCart);
          return;
        }
      }
      // If no cart or expired, create one
      const newCart = await createCart();
      localStorage.setItem("forma_cart_id", newCart.id);
      setCart(newCart);
    };

    initCart();
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = async (variantId: string) => {
    if (!cart) return;
    startTransition(async () => {
      const updatedCart = await addToCart(cart.id, variantId);
      setCart(updatedCart);
      setIsOpen(true); // Open cart after adding
    });
  };

  const removeItem = async (lineId: string) => {
    if (!cart) return;
    startTransition(async () => {
      const updatedCart = await removeFromCart(cart.id, lineId);
      setCart(updatedCart);
    });
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart || quantity < 1) return;
    startTransition(async () => {
      const updatedCart = await updateCartQuantity(cart.id, lineId, quantity);
      setCart(updatedCart);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isPending,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
