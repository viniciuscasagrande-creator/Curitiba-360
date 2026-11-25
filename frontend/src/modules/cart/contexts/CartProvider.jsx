import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CART_CHANGED_EVENT,
} from "../repositories/cartRepository";

import {
  addCartItem,
  applyCartCoupon,
  clearCart,
  getCart,
  removeCartCoupon,
  removeCartItem,
  updateCartItemQuantity,
} from "../services/cartService";

export const CartContext =
  createContext(null);

export default function CartProvider({
  children,
}) {
  const [cart, setCart] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const loadCart =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        setCart(await getCart());
      } catch (requestError) {
        console.error(requestError);

        setError(
          "Não foi possível carregar o carrinho."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    function handleCartChanged(
      event
    ) {
      setCart(event.detail);
    }

    window.addEventListener(
      CART_CHANGED_EVENT,
      handleCartChanged
    );

    return () =>
      window.removeEventListener(
        CART_CHANGED_EVENT,
        handleCartChanged
      );
  }, []);

  async function runAction(
    action,
    successText
  ) {
    setSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      const response =
        await action();

      setCart(response);

      if (successText) {
        setSuccessMessage(
          successText
        );
      }

      return response;
    } catch (requestError) {
      setError(
        requestError.message ||
          "Não foi possível atualizar o carrinho."
      );

      throw requestError;
    } finally {
      setSaving(false);
    }
  }

  const value = useMemo(
    () => ({
      cart,
      loading,
      saving,
      error,
      successMessage,

      itemCount:
        cart?.items?.reduce(
          (total, item) =>
            total + item.quantity,
          0
        ) || 0,

      addItem: (item) =>
        runAction(
          () => addCartItem(item),
          "Item adicionado ao carrinho."
        ),

      updateQuantity: (
        itemId,
        quantity
      ) =>
        runAction(() =>
          updateCartItemQuantity(
            itemId,
            quantity
          )
        ),

      removeItem: (itemId) =>
        runAction(
          () =>
            removeCartItem(itemId),
          "Item removido."
        ),

      applyCoupon: (code) =>
        runAction(
          () =>
            applyCartCoupon(code),
          "Cupom aplicado."
        ),

      removeCoupon: () =>
        runAction(
          removeCartCoupon,
          "Cupom removido."
        ),

      clear: () =>
        runAction(
          clearCart,
          "Carrinho limpo."
        ),

      items: cart?.items || [],
      total: cart?.pricing?.total || 0,
      addToCart: (item) =>
        runAction(
          () => addCartItem(item),
          "Item adicionado ao carrinho."
        ),
      removeFromCart: (itemId) =>
        runAction(
          () => removeCartItem(itemId),
          "Item removido."
        ),
      clearCart: () =>
        runAction(
          clearCart,
          "Carrinho limpo."
        ),

      clearMessages: () => {
        setError("");
        setSuccessMessage("");
      },

      reload: loadCart,
    }),
    [
      cart,
      loading,
      saving,
      error,
      successMessage,
      loadCart,
    ]
  );

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}
