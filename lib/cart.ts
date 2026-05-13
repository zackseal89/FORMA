import { shopifyFetch, CART_FRAGMENT } from "./shopify";

export interface CartItem {
  id: string;
  quantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: { name: string; value: string }[];
    product: {
      title: string;
      handle: string;
      featuredImage: { url: string; altText: string };
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: CartItem[];
}

function mapCart(data: any): Cart {
  return {
    id: data.id,
    checkoutUrl: data.checkoutUrl,
    totalQuantity: data.totalQuantity,
    cost: {
      subtotalAmount: data.cost.subtotalAmount,
      totalAmount: data.cost.totalAmount,
    },
    lines: data.lines.edges.map((edge: any) => edge.node),
  };
}

export async function createCart(): Promise<Cart> {
  const mutation = /* GraphQL */ `
    mutation cartCreate {
      cartCreate {
        cart {
          ...cart
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<any>(mutation);
  if (data.cartCreate.userErrors && data.cartCreate.userErrors.length > 0) {
    console.error("Shopify Cart API userErrors on create:", data.cartCreate.userErrors);
  }
  return mapCart(data.cartCreate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const query = /* GraphQL */ `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...cart
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<any>(query, { cartId });
  if (!data.cart) return null;
  return mapCart(data.cart);
}

export async function addToCart(
  cartId: string,
  variantId: string,
): Promise<Cart> {
  const mutation = /* GraphQL */ `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...cart
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<any>(mutation, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity: 1 }],
  });
  if (data.cartLinesAdd.userErrors && data.cartLinesAdd.userErrors.length > 0) {
    console.error("Shopify Cart API userErrors on add:", data.cartLinesAdd.userErrors);
  }
  return mapCart(data.cartLinesAdd.cart);
}

export async function removeFromCart(
  cartId: string,
  lineId: string,
): Promise<Cart> {
  const mutation = /* GraphQL */ `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...cart
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<any>(mutation, {
    cartId,
    lineIds: [lineId],
  });
  if (data.cartLinesRemove.userErrors && data.cartLinesRemove.userErrors.length > 0) {
    console.error("Shopify Cart API userErrors on remove:", data.cartLinesRemove.userErrors);
  }
  return mapCart(data.cartLinesRemove.cart);
}

export async function updateCartQuantity(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<Cart> {
  const mutation = /* GraphQL */ `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...cart
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `;

  const data = await shopifyFetch<any>(mutation, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  if (data.cartLinesUpdate.userErrors && data.cartLinesUpdate.userErrors.length > 0) {
    console.error("Shopify Cart API userErrors on update:", data.cartLinesUpdate.userErrors);
  }
  return mapCart(data.cartLinesUpdate.cart);
}
