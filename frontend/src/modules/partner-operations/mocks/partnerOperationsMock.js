export const partnerOperationsMock = {
  product: {
    id: "product-festival-001",
    title: "Festival Gastronômico de Curitiba",
    image: "/images/events/festival-gastronomico.jpg",
  },

  session: {
    id: "session-001",
    startsAt: "2026-08-18T18:00:00-03:00",
    endsAt: "2026-08-18T23:00:00-03:00",
    capacity: 1000,
  },

  stats: {
    totalCapacity: 1000,
    ticketsIssued: 842,
    ticketsActive: 811,
    checkedIn: 438,
    pendingCheckIn: 373,
    blocked: 4,
    cancelled: 27,
    occupancyRate: 43.8,
    checkInsPerMinute: 12,
    peakTime: "18:42",
  },

  tickets: [
    {
      id: "ticket-001",
      orderId: "order-ctb-2048",
      partnerId: "partner-curitiba-001",
      productId: "product-festival-001",
      sessionId: "session-001",
      lotId: "lot-002",

      code: "CTB360-TKT-001",
      securePayload:
        "ticket-001.payload.mock-signature",

      holder: {
        name: "Visitante Curitiba 360",
        email: "visitante@curitiba360.com.br",
        document: "000.000.000-00",
      },

      type: "Ingresso Geral",
      lotName: "Segundo lote",
      sector: null,
      seat: null,

      status: "active",

      checkIn: {
        checkedIn: false,
        checkedInAt: null,
        gate: null,
        deviceId: null,
        operatorId: null,
        validationMode: null,
      },

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    {
      id: "ticket-002",
      orderId: "order-ctb-2048",
      partnerId: "partner-curitiba-001",
      productId: "product-festival-001",
      sessionId: "session-001",
      lotId: "lot-002",

      code: "CTB360-TKT-002",
      securePayload:
        "ticket-002.payload.mock-signature",

      holder: {
        name: "Acompanhante",
        email: "acompanhante@email.com",
        document: "111.111.111-11",
      },

      type: "Ingresso Geral",
      lotName: "Segundo lote",
      sector: null,
      seat: null,

      status: "used",

      checkIn: {
        checkedIn: true,
        checkedInAt:
          new Date().toISOString(),
        gate: "Portão A",
        deviceId: "device-checkin-01",
        operatorId: "user-operator-01",
        validationMode: "online",
      },

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],

  checkIns: [],
  courtesies: [],
  accreditations: [],
  ticketBlocks: [],
};
