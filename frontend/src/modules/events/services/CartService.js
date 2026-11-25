import { CartRepository } from '../repositories/CartRepository';

const VALID_COUPONS = {
  'CURITIBA10': { type: 'percent', value: 10, description: '10% de desconto no valor dos ingressos' },
  'SUPER360': { type: 'fixed', value: 25, description: 'R$ 25 de desconto fixo' },
  'EBR5': { type: 'percent', value: 5, description: '5% de desconto especial' }
};

export const CartService = {
  loadCart() {
    return CartRepository.load();
  },

  saveCart(cartData) {
    CartRepository.save(cartData);
  },

  clearCart() {
    CartRepository.clear();
  },

  calculateFees(subtotal, serviceFeePct = 10) {
    if (!subtotal || subtotal <= 0) return 0;
    return Number(((subtotal * serviceFeePct) / 100).toFixed(2));
  },

  calculateTotal(cartData) {
    const items = cartData.items || [];
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const serviceFeePct = items[0]?.taxaServicoPct || 10;
    const taxes = this.calculateFees(subtotal, serviceFeePct);

    let discount = 0;
    if (cartData.coupon && VALID_COUPONS[cartData.coupon.code.toUpperCase()]) {
      const couponObj = VALID_COUPONS[cartData.coupon.code.toUpperCase()];
      if (couponObj.type === 'percent') {
        discount = (subtotal * couponObj.value) / 100;
      } else if (couponObj.type === 'fixed') {
        discount = couponObj.value;
      }
    }

    const cashbackUsed = cartData.cashbackUsed || 0;
    const total = Math.max(0, subtotal + taxes - discount - cashbackUsed);

    return {
      subtotal,
      taxes,
      discount,
      cashbackUsed,
      total,
      itemCount: items.reduce((acc, i) => acc + i.quantity, 0)
    };
  },

  applyCoupon(code) {
    if (!code) return { success: false, message: 'Digite um código de cupom.' };
    const upperCode = code.toUpperCase().trim();
    const couponObj = VALID_COUPONS[upperCode];
    if (!couponObj) {
      return { success: false, message: 'Cupom inválido ou expirado.' };
    }
    return {
      success: true,
      coupon: {
        code: upperCode,
        ...couponObj
      },
      message: `Cupom '${upperCode}' aplicado: ${couponObj.description}!`
    };
  },

  validate(cartData) {
    const items = cartData.items || [];
    if (items.length === 0) {
      return { valid: false, message: 'Seu carrinho está vazio.' };
    }

    for (const item of items) {
      if (!item.quantity || item.quantity <= 0) {
        return { valid: false, message: `Quantidade inválida para o lote ${item.lotName}.` };
      }
      if (item.limitPerBuyer && item.quantity > item.limitPerBuyer) {
        return { valid: false, message: `O limite para ${item.lotName} é de ${item.limitPerBuyer} ingressos por comprador.` };
      }
    }

    return { valid: true };
  }
};
