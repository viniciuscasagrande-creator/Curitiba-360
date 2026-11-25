import {
  clearCartRepository,
  getCartRepository,
  saveCartRepository,
} from "../repositories/cartRepository";

const AVAILABLE_COUPONS = {
  CURITIBA10: {
    type: "percentage",
    value: 10,
  },

  BEMVINDO20: {
    type: "fixed",
    value: 20,
  },
};

function createCartItemId(item) {
  return [
    item.productId,
    item.date,
    item.time,
    item.ticketType,
    item.lotId || "no-lot",
    item.sector || "no-sector",
  ].join(":");
}

export async function getCart() {
  return getCartRepository();
}

export async function addCartItem(
  newItem
) {
  const cart =
    await getCartRepository();

  const itemId =
    createCartItemId(newItem);

  const existingItem =
    cart.items.find(
      (item) => item.id === itemId
    );

  let nextItems;

  if (existingItem) {
    const nextQuantity =
      existingItem.quantity +
      Number(newItem.quantity || 1);

    if (
      nextQuantity >
      existingItem.maximumQuantity
    ) {
      throw new Error(
        `O limite é de ${existingItem.maximumQuantity} unidades para este item.`
      );
    }

    if (
      nextQuantity >
      existingItem.stock
    ) {
      throw new Error(
        "Quantidade indisponível."
      );
    }

    nextItems = cart.items.map(
      (item) =>
        item.id === itemId
          ? {
              ...item,
              quantity:
                nextQuantity,
            }
          : item
    );
  } else {
    const quantity = Number(
      newItem.quantity || 1
    );

    if (
      quantity >
      Number(newItem.stock || 0)
    ) {
      throw new Error(
        "Quantidade indisponível."
      );
    }

    nextItems = [
      ...cart.items,
      {
        ...newItem,
        id: itemId,
        quantity,
        addedAt:
          new Date().toISOString(),
      },
    ];
  }

  // Set cart expiration when adding the first item
  const expiresAt = cart.items.length === 0
    ? new Date(Date.now() + 15 * 60 * 1000).toISOString()
    : cart.expiresAt;

  return saveCartRepository({
    ...cart,
    items: nextItems,
    expiresAt,
  });
}

export async function updateCartItemQuantity(
  itemId,
  quantity
) {
  const cart =
    await getCartRepository();

  const item = cart.items.find(
    (currentItem) =>
      currentItem.id === itemId
  );

  if (!item) {
    throw new Error(
      "Item não encontrado."
    );
  }

  const parsedQuantity =
    Number(quantity);

  if (
    parsedQuantity <
    item.minimumQuantity
  ) {
    throw new Error(
      `A quantidade mínima é ${item.minimumQuantity}.`
    );
  }

  if (
    parsedQuantity >
    item.maximumQuantity
  ) {
    throw new Error(
      `A quantidade máxima é ${item.maximumQuantity}.`
    );
  }

  if (
    parsedQuantity >
    item.stock
  ) {
    throw new Error(
      "Estoque insuficiente."
    );
  }

  const items = cart.items.map(
    (currentItem) =>
      currentItem.id === itemId
        ? {
            ...currentItem,
            quantity:
              parsedQuantity,
          }
        : currentItem
  );

  return saveCartRepository({
    ...cart,
    items,
  });
}

export async function removeCartItem(
  itemId
) {
  const cart =
    await getCartRepository();

  const items = cart.items.filter(
    (item) => item.id !== itemId
  );

  const expiresAt = items.length === 0 ? null : cart.expiresAt;

  return saveCartRepository({
    ...cart,
    items,
    expiresAt,
  });
}

export async function applyCartCoupon(
  code
) {
  const normalizedCode =
    code.trim().toUpperCase();

  const coupon =
    AVAILABLE_COUPONS[
      normalizedCode
    ];

  if (!coupon) {
    throw new Error(
      "Cupom inválido ou expirado."
    );
  }

  const cart =
    await getCartRepository();

  if (!cart.items.length) {
    throw new Error(
      "Adicione itens antes de aplicar o cupom."
    );
  }

  return saveCartRepository({
    ...cart,
    coupon: {
      code: normalizedCode,
      ...coupon,
      discount: 0,
    },
  });
}

export async function removeCartCoupon() {
  const cart =
    await getCartRepository();

  return saveCartRepository({
    ...cart,
    coupon: {
      code: null,
      type: null,
      value: 0,
      discount: 0,
    },
  });
}

export async function clearCart() {
  return clearCartRepository();
}
