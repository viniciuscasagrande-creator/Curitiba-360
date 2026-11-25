export const ordersMock = [
  {
    id: "order-ctb-2048",
    code: "CTB360-2048",
    userId: "user-demo",

    status: "confirmed",
    paymentStatus: "approved",
    paymentMethod: "credit_card",

    customer: {
      name: "Visitante Curitiba 360",
      email: "visitante@curitiba360.com.br",
      phone: "(41) 99999-9999",
      cpf: "000.000.000-00",
    },

    items: [
      {
        id: "item-001",
        type: "event",
        slug: "festival-gastronomico-curitiba",
        title: "Festival Gastronômico de Curitiba",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
        location: "Centro de Eventos Positivo",
        date: "2026-08-18",
        time: "18:00",
        quantity: 2,
        ticketType: "Ingresso Geral",
        lotName: "Segundo lote",
        unitPrice: 39.9,
      },
    ],

    tickets: [
      {
        id: "ticket-001",
        orderId: "order-ctb-2048",
        itemId: "item-001",

        code: "CTB360-TKT-001",
        secureValue:
          "curitiba360:ticket:ticket-001:secure-demo-value",

        holder: {
          name: "Visitante Curitiba 360",
          email: "visitante@curitiba360.com.br",
          cpf: "000.000.000-00",
        },

        event: {
          title: "Festival Gastronômico de Curitiba",
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
          date: "2026-08-18",
          time: "18:00",
          location: "Centro de Eventos Positivo",
        },

        ticketType: "Ingresso Geral",
        lotName: "Segundo lote",
        sector: null,
        seat: null,

        status: "active",

        transfer: {
          allowed: true,
          transferredTo: null,
          transferredAt: null,
        },

        checkIn: {
          checkedIn: false,
          checkedInAt: null,
          gate: null,
        },

        createdAt: new Date().toISOString(),
      },

      {
        id: "ticket-002",
        orderId: "order-ctb-2048",
        itemId: "item-001",

        code: "CTB360-TKT-002",
        secureValue:
          "curitiba360:ticket:ticket-002:secure-demo-value",

        holder: {
          name: "Acompanhante",
          email: "acompanhante@email.com",
          cpf: "111.111.111-11",
        },

        event: {
          title: "Festival Gastronômico de Curitiba",
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
          date: "2026-08-18",
          time: "18:00",
          location: "Centro de Eventos Positivo",
        },

        ticketType: "Ingresso Geral",
        lotName: "Segundo lote",
        sector: null,
        seat: null,

        status: "active",

        transfer: {
          allowed: true,
          transferredTo: null,
          transferredAt: null,
        },

        checkIn: {
          checkedIn: false,
          checkedInAt: null,
          gate: null,
        },

        createdAt: new Date().toISOString(),
      },
    ],

    pricing: {
      subtotal: 79.8,
      serviceFee: 7.98,
      discount: 0,
      total: 87.78,
      refundedAmount: 0,
    },

    timeline: [
      {
        id: "timeline-001",
        status: "created",
        title: "Pedido criado",
        description: "O pedido foi criado com sucesso.",
        createdAt: new Date().toISOString(),
      },
      {
        id: "timeline-002",
        status: "approved",
        title: "Pagamento aprovado",
        description: "O pagamento foi confirmado.",
        createdAt: new Date().toISOString(),
      },
      {
        id: "timeline-003",
        status: "tickets_issued",
        title: "Ingressos emitidos",
        description: "Os ingressos estão disponíveis.",
        createdAt: new Date().toISOString(),
      },
    ],

    refund: {
      requested: false,
      status: null,
      reason: null,
      requestedAt: null,
      processedAt: null,
    },

    review: {
      submitted: false,
      rating: null,
      comment: null,
      submittedAt: null,
    },

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
