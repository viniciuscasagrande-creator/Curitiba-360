import {
  getCheckoutResultRepository,
  saveCheckoutResultRepository,
} from "../repositories/checkoutResultRepository";

export async function getCheckoutResult(
  orderId
) {
  if (!orderId) {
    throw new Error(
      "Pedido não informado."
    );
  }

  const result =
    await getCheckoutResultRepository(
      orderId
    );

  if (!result) {
    throw new Error(
      "Pedido não encontrado."
    );
  }

  return normalizeCheckoutResult(
    result
  );
}

export async function updateCheckoutPaymentStatus(
  orderId,
  status
) {
  const current =
    await getCheckoutResult(
      orderId
    );

  const approved =
    status === "approved";

  return saveCheckoutResultRepository({
    ...current,

    orderStatus: approved
      ? "confirmed"
      : current.orderStatus,

    ticketsAvailable: approved,

    payment: {
      ...current.payment,
      status,
    },
  });
}

function normalizeCheckoutResult(
  result
) {
  return {
    ...result,

    items: Array.isArray(result.items)
      ? result.items
      : [],

    payment: {
      method: "pix",
      status: "pending",
      amount: 0,
      transactionId: null,

      pix: {
        copyPasteCode: null,
        qrCodeValue: null,
        expiresAt: null,
      },

      ...result.payment,

      pix: {
        copyPasteCode: null,
        qrCodeValue: null,
        expiresAt: null,
        ...result.payment?.pix,
      },
    },

    pricing: {
      subtotal: 0,
      serviceFee: 0,
      discount: 0,
      total: 0,
      ...result.pricing,
    },
  };
}
