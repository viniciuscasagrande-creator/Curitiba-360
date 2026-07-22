import { cartMock } from "../mocks/cartMock";
import {
  calculateCartPricing,
} from "../utils/cartCalculations";

export const CART_STORAGE_KEY =
  "curitiba360:cart";

export const CART_CHANGED_EVENT =
  "curitiba360:cart-changed";

function clone(value) {
  return JSON.parse(
    JSON.stringify(value)
  );
}

function emitCartChanged(cart) {
  window.dispatchEvent(
    new CustomEvent(
      CART_CHANGED_EVENT,
      {
        detail: clone(cart),
      }
    )
  );
}

function normalizeCart(cart) {
  const normalized = {
    ...cart,
    items: Array.isArray(cart?.items)
      ? cart.items
      : [],
    coupon: {
      code: null,
      type: null,
      value: 0,
      discount: 0,
      ...cart?.coupon,
    },
    updatedAt:
      new Date().toISOString(),
  };

  normalized.pricing =
    calculateCartPricing(normalized);

  return normalized;
}

function saveCart(cart) {
  const normalized =
    normalizeCart(cart);

  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(normalized)
  );

  emitCartChanged(normalized);

  return clone(normalized);
}

export async function getCartRepository() {
  await new Promise((resolve) =>
    window.setTimeout(resolve, 150)
  );

  try {
    const stored =
      localStorage.getItem(
        CART_STORAGE_KEY
      );

    if (stored) {
      return normalizeCart(
        JSON.parse(stored)
      );
    }
  } catch {
    localStorage.removeItem(
      CART_STORAGE_KEY
    );
  }

  return saveCart(cartMock);
}

export async function saveCartRepository(
  cart
) {
  return saveCart(cart);
}

export async function clearCartRepository() {
  const emptyCart = {
    ...cartMock,
    items: [],
    coupon: {
      code: null,
      type: null,
      value: 0,
      discount: 0,
    },
    expiresAt: null,
    createdAt:
      new Date().toISOString(),
  };

  return saveCart(emptyCart);
}
