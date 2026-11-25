export function calculateItemSubtotal(item) {
  return Number(item.unitPrice || 0) *
    Number(item.quantity || 0);
}

export function calculateItemServiceFee(item) {
  return (
    calculateItemSubtotal(item) *
    Number(item.serviceFeeRate || 0)
  );
}

export function calculateCouponDiscount(
  subtotal,
  coupon
) {
  if (!coupon?.code) {
    return 0;
  }

  if (coupon.type === "percentage") {
    return Math.min(
      subtotal,
      subtotal *
        (Number(coupon.value || 0) / 100)
    );
  }

  if (coupon.type === "fixed") {
    return Math.min(
      subtotal,
      Number(coupon.value || 0)
    );
  }

  return 0;
}

export function calculateCartPricing(cart) {
  const subtotal = cart.items.reduce(
    (total, item) =>
      total +
      calculateItemSubtotal(item),
    0
  );

  const serviceFee = cart.items.reduce(
    (total, item) =>
      total +
      calculateItemServiceFee(item),
    0
  );

  const discount =
    calculateCouponDiscount(
      subtotal,
      cart.coupon
    );

  const total = Math.max(
    0,
    subtotal +
      serviceFee -
      discount
  );

  return {
    subtotal: Number(
      subtotal.toFixed(2)
    ),
    serviceFee: Number(
      serviceFee.toFixed(2)
    ),
    discount: Number(
      discount.toFixed(2)
    ),
    total: Number(total.toFixed(2)),
  };
}
