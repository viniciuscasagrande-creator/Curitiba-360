export const checkoutResultMock = {
  orderId: "order-ctb-2048",
  orderCode: "CTB360-2048",

  orderStatus: "confirmed",

  payment: {
    id: "payment-2048",
    method: "credit_card",
    status: "approved",
    amount: 87.78,
    transactionId: "TXN-CTB-982734",

    pix: {
      copyPasteCode: null,
      qrCodeValue: null,
      expiresAt: null,
    },
  },

  customer: {
    name: "Visitante Curitiba 360",
    email: "visitante@curitiba360.com.br",
  },

  items: [
    {
      id: "item-001",
      title: "Festival Gastronômico de Curitiba",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      location: "Centro de Eventos Positivo",
      date: "2026-08-18",
      time: "18:00",
      quantity: 2,
      ticketType: "Ingresso Geral",
    },
  ],

  pricing: {
    subtotal: 79.8,
    serviceFee: 7.98,
    discount: 0,
    total: 87.78,
  },

  ticketsAvailable: true,
  createdAt: new Date().toISOString(),
};
