export type ShopVariant = "sidebar" | "editorial";

/**
 * Resolved against:
 *  1. `?variant=` URL search param (per-request override)
 *  2. `NEXT_PUBLIC_SHOP_VARIANT` env (build-time default)
 *  3. "sidebar" fallback
 */
export function resolveShopVariant(param?: string | string[]): ShopVariant {
  const candidate = Array.isArray(param) ? param[0] : param;
  const fromEnv = process.env.NEXT_PUBLIC_SHOP_VARIANT;
  const choice = candidate ?? fromEnv;
  return choice === "editorial" ? "editorial" : "sidebar";
}
