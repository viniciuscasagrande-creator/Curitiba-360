export const customerExperienceMock = {
  summary: {
    activeCustomers: 68420,
    newCustomersThisMonth: 8460,
    returningCustomerRate: 38.7,
    openConversations: 186,
    averageFirstResponseMinutes: 4.8,
    resolutionRate: 92.4,
    nps: 72,
    csat: 91.6,
    averageLifetimeValue: 684.9,
    loyaltyMembers: 28450,
    cashbackAvailable: 486200,
    couponsRedeemedThisMonth: 4280,
    churnRiskCustomers: 1840
  },

  channels: [
    { id: "channel-001", name: "WhatsApp", conversations: 3480, conversionRate: 18.6, averageResponseMinutes: 3.2, status: "operational" },
    { id: "channel-002", name: "Chat Web", conversations: 2180, conversionRate: 14.8, averageResponseMinutes: 2.6, status: "operational" },
    { id: "channel-003", name: "E-mail", conversations: 1640, conversionRate: 8.4, averageResponseMinutes: 26, status: "operational" }
  ],

  campaigns: [
    { id: "campaign-001", name: "Curitiba no Inverno", type: "cross_sell", audience: 18400, delivered: 17820, opened: 10840, clicked: 4260, converted: 984, status: "running" },
    { id: "campaign-002", name: "Carrinho abandonado", type: "abandoned_cart", audience: 3480, delivered: 3340, opened: 2480, clicked: 1270, converted: 486, status: "running" }
  ],

  alerts: [
    { id: "alert-001", severity: "warning", title: "Fila de atendimento elevada", description: "A fila de pagamentos está com tempo médio de espera de 18 minutos." },
    { id: "alert-002", severity: "high", title: "Aumento no risco de churn", description: "O segmento de visitantes inativos cresceu 14% nos últimos 30 dias." }
  ],

  customers: [
    { id: "cust-101", name: "Vinicius Casagrande", email: "vinicius@domain.com", phone: "(41) 99887-1122", preferredChannel: "whatsapp", status: "active", engagementScore: 92, churnRiskScore: 5, lifetimeValue: 1250, tags: ["VIP", "Frequente"], lastInteractionAt: "2026-07-22" },
    { id: "cust-102", name: "Mariana Souza", email: "mariana@domain.com", phone: "(41) 98822-3344", preferredChannel: "email", status: "active", engagementScore: 78, churnRiskScore: 12, lifetimeValue: 680, tags: ["Cultura"], lastInteractionAt: "2026-07-20" }
  ],

  conversations: [
    { id: "conv-001", customerId: "cust-101", channel: "whatsapp", subject: "Dúvida sobre Transfer Aeroporto", status: "open", priority: "high", sentiment: "neutral", createdAt: "2026-07-23 08:30" }
  ],

  segments: [
    { id: "seg-01", name: "Clientes Campeões (Alta Frequência)", type: "dynamic", estimatedCustomers: 8500, status: "active" },
    { id: "seg-02", name: "Em Risco de Churn", type: "predictive", estimatedCustomers: 1840, status: "active" }
  ],

  loyaltyTransactions: [
    { id: "loy-tx-01", customerId: "cust-101", type: "earn", source: "Compra Ingresso Festival", points: 150, balanceAfter: 650, createdAt: "2026-07-22" }
  ],

  coupons: [
    { id: "coup-01", code: "CURITIBA360VIP", name: "Cupom Promocional de Boas-vindas", discountType: "percentage", discountValue: 15, status: "active", validFrom: "2026-01-01", validUntil: "2026-12-31" }
  ]
};
