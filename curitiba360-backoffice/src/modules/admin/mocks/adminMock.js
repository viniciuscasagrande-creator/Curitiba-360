export const adminMock = {
  summary: {
    users: {
      total: 28450,
      active: 23180,
      blocked: 48,
      newToday: 126,
    },

    partners: {
      total: 684,
      active: 542,
      pending: 39,
      suspended: 7,
    },

    products: {
      published: 2418,
      pendingReview: 54,
      rejected: 18,
    },

    commerce: {
      orders: 18420,
      grossVolume: 2840650.4,
      netRevenue: 264380.7,
      refunds: 28940.2,
    },

    financial: {
      pendingPayouts: 31,
      payoutAmount: 182450.8,
      openChargebacks: 12,
      blockedAmount: 36420.5,
    },

    support: {
      openTickets: 74,
      overdueSla: 9,
    },

    platform: {
      uptime: 99.98,
      activeIncidents: 1,
      failedWebhooks: 14,
    },

    generatedAt:
      new Date().toISOString(),
  },

  pendingPartners: [
    {
      id: "partner-review-001",
      legalName:
        "Experiências Paraná Ltda.",
      tradeName:
        "Experiências Paraná",
      document:
        "00.000.000/0001-00",
      status: "under_review",

      risk: {
        level: "low",
        score: 18,
        reasons: [],
      },

      verification: {
        identity: true,
        company: true,
        address: true,
        bankAccount: false,
      },

      financialStatus: "restricted",
      publicationStatus: "restricted",

      createdAt:
        new Date().toISOString(),

      reviewedAt: null,
    },
  ],

  pendingPayouts: [
    {
      id: "payout-review-001",
      code: "REP-2026-0184",
      partnerId:
        "partner-curitiba-001",
      partnerName:
        "Experiências Curitiba",
      amount: 12500,
      status: "under_review",
      riskLevel: "low",
      requestedAt:
        new Date().toISOString(),
    },
  ],

  incidents: [
    {
      id: "incident-001",
      title:
        "Atraso no envio de notificações",
      description:
        "Parte das notificações push apresenta atraso.",
      severity: "medium",
      status: "monitoring",
      affectedServices: [
        "notifications",
      ],
      startedAt:
        new Date().toISOString(),
      resolvedAt: null,
      createdBy: "system",
    },
  ],
};
