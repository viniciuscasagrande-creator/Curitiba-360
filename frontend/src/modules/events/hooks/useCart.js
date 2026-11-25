import { useState, useEffect, useCallback, useMemo } from 'react';
import { CartService } from '../services/CartService';

export function useCart() {
  const [cartState, setCartState] = useState(() => CartService.loadCart());
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);

  useEffect(() => {
    CartService.saveCart(cartState);
  }, [cartState]);

  const updateQuantity = (lotId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(lotId);
      return;
    }
    setCartState((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.lotId === lotId ? { ...item, quantity: newQuantity } : item))
    }));
  };

  const removeItem = (lotId) => {
    setCartState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.lotId !== lotId)
    }));
  };

  const applyCoupon = (code) => {
    const result = CartService.applyCoupon(code || couponInput);
    if (result.success) {
      setCartState((prev) => ({ ...prev, coupon: result.coupon }));
      setCouponMessage({ type: 'success', text: result.message });
    } else {
      setCouponMessage({ type: 'error', text: result.message });
    }
  };

  const removeCoupon = () => {
    setCartState((prev) => ({ ...prev, coupon: null }));
    setCouponInput('');
    setCouponMessage(null);
  };

  const toggleCashback = (useCashback, amount = 15.0) => {
    setCartState((prev) => ({
      ...prev,
      cashbackUsed: useCashback ? amount : 0
    }));
  };

  const clearCart = () => {
    CartService.clearCart();
    setCartState({ items: [], coupon: null, cashbackUsed: 0 });
    setCouponMessage(null);
  };

  const summary = useMemo(() => {
    return CartService.calculateTotal(cartState);
  }, [cartState]);

  const validation = useMemo(() => {
    return CartService.validate(cartState);
  }, [cartState]);

  return {
    cartState,
    items: cartState.items,
    coupon: cartState.coupon,
    cashbackUsed: cartState.cashbackUsed,
    couponInput,
    setCouponInput,
    couponMessage,
    summary,
    validation,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    toggleCashback,
    clearCart
  };
}
