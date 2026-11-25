import {
  getCheckoutRepository,
  saveCheckoutRepository,
} from "../repositories/checkoutRepository";
import { saveOrderRepository } from "../../orders/repositories/ordersRepository";
import { clearCart } from "../../cart/services/cartService";

export async function getCheckout() {
  return getCheckoutRepository();
}

export async function saveCheckout(state) {
  return saveCheckoutRepository(state);
}

export async function lookupAddressByCEP(cep) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const cleanCEP = cep.replace(/\D/g, "");

  if (cleanCEP === "80020100") {
    return {
      street: "Praça Tiradentes",
      neighborhood: "Centro",
      city: "Curitiba",
      state: "PR",
    };
  }

  if (cleanCEP.startsWith("80") || cleanCEP.startsWith("81") || cleanCEP.startsWith("82")) {
    return {
      street: "Avenida Visconde de Guarapuava",
      neighborhood: "Batel",
      city: "Curitiba",
      state: "PR",
    };
  }

  return {
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  };
}

export async function createCheckoutOrder(checkoutState, cart) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!cart?.items?.length) {
    throw new Error("O carrinho está vazio.");
  }

  // Basic mock payload for the order
  const orderId = `order-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderCode = `CTB360-${Math.floor(1000 + Math.random() * 9000)}`;

  const newOrder = {
    id: orderId,
    code: orderCode,
    status: checkoutState.payment.method === "pix" ? "pending" : "confirmed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    eventDate: cart.items[0].date,
    items: cart.items.map((item, index) => ({
      id: `${orderId}-item-${index}`,
      productId: item.productId,
      slug: item.slug,
      title: item.title,
      image: item.image,
      location: item.location,
      time: item.time,
      ticketType: item.ticketType,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.unitPrice * item.quantity,
      tickets: Array.from({ length: item.quantity }).map((_, tIdx) => {
        const pInfo = checkoutState.participants[tIdx] || {};
        return {
          id: `${orderId}-ticket-${index}-${tIdx}`,
          code: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
          status: "valid",
          holderName: pInfo.name || `${checkoutState.buyer.name} ${checkoutState.buyer.surname}`,
          document: pInfo.cpf || checkoutState.buyer.cpf,
          qrCodeValue: `https://curitiba360.com.br/validar/TKT-${Math.floor(100000 + Math.random() * 900000)}`,
        };
      }),
    })),
    pricing: {
      subtotal: cart.pricing.subtotal,
      serviceFee: cart.pricing.serviceFee,
      discount: cart.pricing.discount,
      total: cart.pricing.total,
    },
    payment: {
      method: checkoutState.payment.method,
      status: checkoutState.payment.method === "pix" ? "pending" : "approved",
      transactionId: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      paidAt: checkoutState.payment.method === "pix" ? null : new Date().toISOString(),
    },
    customer: {
      name: `${checkoutState.buyer.name} ${checkoutState.buyer.surname}`,
      email: checkoutState.buyer.email,
      phone: checkoutState.buyer.phone,
      document: checkoutState.buyer.cpf,
    },
    review: {
      allowed: false,
      submitted: false,
      rating: 0,
      comment: "",
    },
  };

  // Persist order
  await saveOrderRepository(newOrder);

  // Clear cart
  await clearCart();

  return newOrder;
}
