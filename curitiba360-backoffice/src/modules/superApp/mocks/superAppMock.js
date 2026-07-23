export const superAppMock = {
  user: {
    id: "user-001",
    fullName: "Ana Silva Santos",
    preferredName: "Ana",
    email: "ana.silva@curitiba.br",
    phone: "(41) 99999-1234",
    documentType: "CPF",
    documentNumberMasked: "123.***.***-00",
    profileType: "resident",
    profileTypes: ["resident", "citizen", "customer"],
    loyaltyLevel: "Curitiba Conectado",
    accessibilityPreferences: ["high_contrast", "large_fonts"],
    verifiedEmail: true,
    verifiedPhone: true,
    identityLevel: "verified",
    status: "active",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2026-07-23T10:00:00Z"
  },

  summary: {
    walletBalance: 82.5,
    cashbackBalance: 34.8,
    loyaltyPoints: 2840,
    activeTickets: 3,
    upcomingReservations: 2,
    openProtocols: 1,
    unreadNotifications: 5
  },

  quickActions: [
    { id: "tickets", label: "Ingressos", route: "/app/tickets" },
    { id: "reservations", label: "Reservas", route: "/app/reservations" },
    { id: "map", label: "Mapa", route: "/app/map" },
    { id: "events", label: "Eventos", route: "/app/events" },
    { id: "mobility", label: "Mobilidade", route: "/app/mobility" },
    { id: "parking", label: "Estacionamento", route: "/app/parking" },
    { id: "benefits", label: "Benefícios", route: "/app/benefits" },
    { id: "services", label: "Serviços Públicos", route: "/app/services" },
    { id: "sos", label: "Botão SOS", route: "/app/emergency" }
  ],

  nextEvent: {
    id: "event-001",
    name: "Festival Cultural de Curitiba",
    date: "2026-08-15",
    startTime: "18:00",
    location: "Centro de Eventos Curitiba",
    status: "confirmed"
  },

  recommendations: [
    {
      id: "recommendation-001",
      type: "attraction",
      title: "Museu Oscar Niemeyer",
      distanceKm: 3.4,
      rating: 4.8
    },
    {
      id: "recommendation-002",
      type: "experience",
      title: "Roteiro Gastronômico do Centro",
      distanceKm: 1.8,
      rating: 4.7
    }
  ],

  alerts: [
    {
      id: "alert-001",
      level: "attention",
      title: "Alteração no trânsito",
      description: "Há bloqueios temporários no centro devido a um evento."
    }
  ],

  tickets: [
    {
      id: "ticket-001",
      userId: "user-001",
      orderId: "order-101",
      eventId: "event-001",
      eventName: "Festival Cultural de Curitiba",
      participantName: "Ana Silva Santos",
      date: "2026-08-15",
      startTime: "18:00",
      sector: "Pista Premium",
      seat: "A-24",
      qrToken: "TOKEN_DYNAMIC_QR_FESTIVAL_123",
      qrExpiresAt: "2026-08-15T21:00:00Z",
      status: "active",
      transferredToUserId: null,
      createdAt: "2026-07-20T14:30:00Z",
      updatedAt: "2026-07-20T14:30:00Z"
    },
    {
      id: "ticket-002",
      userId: "user-001",
      orderId: "order-102",
      eventId: "event-002",
      eventName: "Visita Guiada Jardim Botânico",
      participantName: "Ana Silva Santos",
      date: "2026-07-25",
      startTime: "10:00",
      sector: "Estufa Principal",
      seat: null,
      qrToken: "TOKEN_DYNAMIC_QR_BOTANICO_456",
      qrExpiresAt: "2026-07-25T12:00:00Z",
      status: "active",
      transferredToUserId: null,
      createdAt: "2026-07-22T09:15:00Z",
      updatedAt: "2026-07-22T09:15:00Z"
    }
  ],

  reservations: [
    {
      id: "res-001",
      userId: "user-001",
      partnerId: "partner-99",
      serviceType: "Restaurante",
      serviceId: "rest-madalosso",
      date: "2026-07-24",
      startTime: "20:00",
      quantity: 4,
      grossAmount: 320.0,
      discountAmount: 32.0,
      paidAmount: 288.0,
      status: "confirmed",
      voucherCode: "MADALOSSO-RES-9988",
      createdAt: "2026-07-21T18:00:00Z",
      updatedAt: "2026-07-21T18:05:00Z"
    },
    {
      id: "res-002",
      userId: "user-001",
      partnerId: "partner-55",
      serviceType: "Estacionamento",
      serviceId: "parking-central-plaza",
      date: "2026-07-23",
      startTime: "13:00",
      quantity: 1,
      grossAmount: 15.0,
      discountAmount: 0,
      paidAmount: 15.0,
      status: "confirmed",
      voucherCode: "PARK-CNTR-8821",
      createdAt: "2026-07-23T11:00:00Z",
      updatedAt: "2026-07-23T11:00:00Z"
    }
  ],

  wallet: {
    id: "wallet-001",
    userId: "user-001",
    availableBalance: 82.5,
    pendingBalance: 15.0,
    cashbackBalance: 34.8,
    loyaltyPoints: 2840,
    currency: "BRL",
    status: "active",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2026-07-23T10:00:00Z",
    transactions: [
      { id: "tx-001", type: "cashback_received", amount: 4.8, description: "Cashback Madalosso", date: "2026-07-21T18:05:00Z" },
      { id: "tx-002", type: "payment_out", amount: -15.0, description: "Estacionamento Central Plaza", date: "2026-07-23T11:00:00Z" },
      { id: "tx-003", type: "top_up", amount: 50.0, description: "Recarga de Saldo via PIX", date: "2026-07-15T09:00:00Z" }
    ]
  },

  cityServices: [
    { id: "srv-001", name: "Informar Iluminação Defeituosa", category: "Urbano", desc: "Reportar lâmpada apagada ou piscando em via pública." },
    { id: "srv-002", name: "Solicitar Poda de Árvore", category: "Meio Ambiente", desc: "Poda preventiva ou remoção de galhos com risco de queda." },
    { id: "srv-003", name: "Consulta de IPTU", category: "Tributário", desc: "Emitir guias de pagamento e consultar débitos de imóveis." },
    { id: "srv-004", name: "Agendamento Saúde Já", category: "Saúde", desc: "Marcar consultas em unidades básicas de saúde municipais." }
  ],

  protocols: [
    {
      id: "prot-001",
      userId: "user-001",
      serviceId: "srv-001",
      protocolNumber: "2026-1899281-CUR",
      subject: "Iluminação pública queimada",
      description: "Poste em frente ao número 340 está apagado desde a última segunda-feira.",
      assignedOrganizationId: "org-iluminacao-publica",
      assignedUserId: "worker-987",
      currentStep: "Análise Técnica de Campo",
      status: "under_review",
      createdAt: "2026-07-22T21:10:00Z",
      updatedAt: "2026-07-23T08:30:00Z"
    }
  ],

  miniApps: [
    { id: "ma-001", name: "Linha Turismo", desc: "Mapa e horários do ônibus panorâmico de Curitiba.", version: "1.2.0", rating: 4.9, icon: "Bus" },
    { id: "ma-002", name: "EstaR Digital", desc: "Estacionamento regulamentado eletrônico da cidade.", version: "3.4.1", rating: 4.6, icon: "ParkingSquare" },
    { id: "ma-003", name: "Museus Livres", desc: "Guia interativo de acervos e pinacotecas locais.", version: "1.0.4", rating: 4.8, icon: "Image" }
  ]
};
