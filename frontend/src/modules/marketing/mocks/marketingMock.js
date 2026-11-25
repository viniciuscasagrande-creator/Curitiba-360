export const marketingMock = {
  summary: {
    activeCampaigns: 6,
    totalInvestment: 4280.5,
    revenueAttributed: 28640.9,
    conversions: 318,
    roas: 6.69,
    averageCPA: 13.46,
    averageCTR: 3.84,
    recoveredCarts: 74,
  },

  campaigns: [
    {
      id: "campaign-001",
      partnerId:
        "partner-curitiba-001",

      name:
        "Festival de Inverno Curitiba 360",

      description:
        "Campanha para aumento de vendas antecipadas.",

      type: "discount",
      status: "active",
      objective: "sales",

      products: [
        "product-festival-001",
      ],

      sessions: [],
      audienceId:
        "audience-curitiba-active",

      channels: [
        "platform",
        "email",
        "push",
        "meta",
      ],

      offer: {
        discountType:
          "percentage",
        discountValue: 10,
        maximumDiscount: 40,
        minimumPurchase: 100,
        cashbackPercentage: null,
        couponId:
          "coupon-inverno10",
      },

      budget: {
        total: 2500,
        daily: 100,
        spent: 1680.4,
        currency: "BRL",
      },

      schedule: {
        startsAt:
          "2026-07-01T00:00:00-03:00",
        endsAt:
          "2026-08-31T23:59:59-03:00",
        timezone:
          "America/Sao_Paulo",
      },

      metrics: {
        impressions: 68420,
        reach: 42150,
        clicks: 2840,
        ctr: 4.15,
        carts: 612,
        checkouts: 418,
        conversions: 205,
        conversionRate: 7.22,
        revenue: 17450.8,
        investment: 1680.4,
        roas: 10.38,
        cpa: 8.2,
      },

      createdBy: "user-demo",

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    },
  ],

  coupons: [
    {
      id: "coupon-inverno10",
      partnerId:
        "partner-curitiba-001",

      code: "INVERNO10",
      name:
        "Desconto de inverno",

      description:
        "10% de desconto em produtos selecionados.",

      type: "percentage",
      value: 10,

      limits: {
        totalUses: 500,
        usesPerUser: 1,
        currentUses: 142,
        minimumPurchase: 100,
        maximumDiscount: 40,
      },

      eligibility: {
        firstPurchaseOnly: false,
        userIds: [],
        audienceId:
          "audience-curitiba-active",
        productIds: [
          "product-festival-001",
        ],
        categoryIds: [],
        sessionIds: [],
      },

      schedule: {
        startsAt:
          "2026-07-01T00:00:00-03:00",
        endsAt:
          "2026-08-31T23:59:59-03:00",
      },

      status: "active",

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    },
  ],

  audiences: [
    {
      id:
        "audience-curitiba-active",

      partnerId:
        "partner-curitiba-001",

      name:
        "Clientes ativos de Curitiba",

      description:
        "Clientes de Curitiba com compra nos últimos 90 dias.",

      type: "dynamic",

      conditions: [
        {
          field: "city",
          operator: "equals",
          value: "Curitiba",
          logicalOperator: "and",
        },

        {
          field:
            "lastPurchaseAt",
          operator: "after",
          value:
            "2026-04-01",
          logicalOperator: "and",
        },
      ],

      estimatedSize: 4850,
      matchedUsers: 4724,
      status: "ready",

      lastCalculatedAt:
        new Date().toISOString(),

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    },
  ],
};
