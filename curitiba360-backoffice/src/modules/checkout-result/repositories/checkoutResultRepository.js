import { checkoutResultMock } from "../mocks/checkoutResultMock";

const CHECKOUT_RESULTS_KEY =
  "curitiba360:checkout-results";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getStoredResults() {
  try {
    const stored = localStorage.getItem(
      CHECKOUT_RESULTS_KEY
    );

    return stored
      ? JSON.parse(stored)
      : {};
  } catch {
    return {};
  }
}

function saveResults(results) {
  localStorage.setItem(
    CHECKOUT_RESULTS_KEY,
    JSON.stringify(results)
  );
}

export async function getCheckoutResultRepository(
  orderId
) {
  await new Promise((resolve) =>
    window.setTimeout(resolve, 250)
  );

  const storedResults =
    getStoredResults();

  if (storedResults[orderId]) {
    return clone(
      storedResults[orderId]
    );
  }

  // Fallback to fetching order details from curitiba360:orders to populate dynamic result
  const ordersData = localStorage.getItem("curitiba360:orders");
  let ordersList = [];
  try {
    ordersList = ordersData ? JSON.parse(ordersData) : [];
  } catch {}

  const orderDetails = ordersList.find(o => o.id === orderId);

  const mockResult = {
    ...checkoutResultMock,
    orderId,
    orderCode: orderDetails?.code || `CTB360-${orderId.replace(/\D/g, "").slice(-4).padStart(4, "0")}`,
    orderStatus: orderDetails?.status || "confirmed",
    customer: {
      name: orderDetails?.customer?.name || checkoutResultMock.customer.name,
      email: orderDetails?.customer?.email || checkoutResultMock.customer.email,
    },
    payment: {
      id: `payment-${orderId}`,
      method: orderDetails?.payment?.method || "credit_card",
      status: orderDetails?.payment?.status === "approved" ? "approved" : (orderDetails?.payment?.method === "pix" ? "pending" : "approved"),
      amount: orderDetails?.pricing?.total || checkoutResultMock.pricing.total,
      transactionId: orderDetails?.payment?.transactionId || "TXN-CTB-MOCK",
      pix: {
        copyPasteCode: orderDetails?.payment?.method === "pix" ? "00020101021226870014br.gov.bcb.pix2565https://pix.curitiba360.com.br/pagar/52040000" : null,
        qrCodeValue: orderDetails?.payment?.method === "pix" ? "https://pix.curitiba360.com.br/pagar" : null,
        expiresAt: orderDetails?.payment?.method === "pix" ? new Date(Date.now() + 900000).toISOString() : null,
      }
    },
    items: orderDetails?.items?.map(it => ({
      id: it.id,
      title: it.title,
      image: it.image,
      location: it.location,
      date: it.date || "2026-08-18",
      time: it.time,
      quantity: it.quantity,
      ticketType: it.ticketType,
    })) || checkoutResultMock.items,
    pricing: {
      subtotal: orderDetails?.pricing?.subtotal || checkoutResultMock.pricing.subtotal,
      serviceFee: orderDetails?.pricing?.serviceFee || checkoutResultMock.pricing.serviceFee,
      discount: orderDetails?.pricing?.discount || checkoutResultMock.pricing.discount,
      total: orderDetails?.pricing?.total || checkoutResultMock.pricing.total,
    },
    ticketsAvailable: orderDetails?.payment?.status === "approved" || orderDetails?.payment?.method !== "pix",
    createdAt: orderDetails?.createdAt || new Date().toISOString(),
  };

  storedResults[orderId] =
    mockResult;

  saveResults(storedResults);

  return clone(mockResult);
}

export async function saveCheckoutResultRepository(
  result
) {
  const storedResults =
    getStoredResults();

  storedResults[result.orderId] = {
    ...result,
    updatedAt:
      new Date().toISOString(),
  };

  saveResults(storedResults);

  return clone(
    storedResults[result.orderId]
  );
}

export {
  CHECKOUT_RESULTS_KEY,
};
