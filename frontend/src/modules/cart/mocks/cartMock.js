export const cartMock = {
  id: "cart-curitiba-360",
  userId: null,

  items: [
    {
      id: "cart-item-001",
      productId: "festival-gastronomico",
      slug: "festival-gastronomico-curitiba",

      type: "event",

      title: "Festival Gastronômico de Curitiba",
      image: "/images/santa-felicidade.jpg",
      location: "Centro de Eventos Positivo (Parque Barigui)",

      date: "2026-08-18",
      time: "18:00",

      ticketType: "Ingresso Geral",
      lotId: "lot-02",
      lotName: "Segundo lote",
      sector: null,

      quantity: 2,
      unitPrice: 39.9,
      serviceFeeRate: 0.1,

      stock: 20,
      minimumQuantity: 1,
      maximumQuantity: 6,

      addedAt: new Date().toISOString(),
    },
  ],

  coupon: {
    code: null,
    type: null,
    value: 0,
    discount: 0,
  },

  pricing: {
    subtotal: 0,
    serviceFee: 0,
    discount: 0,
    total: 0,
  },

  expiresAt: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
