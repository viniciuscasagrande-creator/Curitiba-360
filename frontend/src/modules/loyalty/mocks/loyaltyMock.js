export const loyaltyMock = {
  userId: "user-demo",
  memberCode: "CLUBE-CTB-360-001",

  level: "silver",

  points: {
    available: 1450,
    pending: 180,
    lifetime: 2250,
    expiring: 250,
    nextExpirationDate: "2026-10-31T23:59:59.000Z",
  },

  cashback: {
    available: 28.5,
    pending: 7.9,
    lifetime: 54.3,
    expiresAt: "2026-12-31T23:59:59.000Z",
  },

  levelProgress: {
    currentValue: 2250,
    nextLevelValue: 3000,
    percentage: 75,
  },

  benefitsUnlocked: [
    "benefit-001",
    "benefit-002",
  ],

  coupons: [
    {
      id: "coupon-001",
      code: "CURITIBA10",
      title: "10% em experiências selecionadas",
      description:
        "Válido para categorias participantes.",
      discountType: "percentage",
      discountValue: 10,
      minimumPurchase: 50,
      maximumDiscount: 30,
      categorySlugs: [
        "experiencias",
        "turismo",
      ],
      partnerIds: [],
      status: "available",
      startsAt: new Date().toISOString(),
      expiresAt: "2026-09-30T23:59:59.000Z",
    },
  ],

  missions: [
    {
      id: "mission-001",
      title: "Explore Curitiba",
      description:
        "Visite três atrações diferentes.",
      type: "visit_places",
      progress: 2,
      target: 3,
      reward: {
        type: "points",
        amount: 150,
        benefitId: null,
      },
      status: "in_progress",
      startsAt: new Date().toISOString(),
      expiresAt: "2026-09-30T23:59:59.000Z",
    },

    {
      id: "mission-002",
      title: "Compartilhe experiências",
      description:
        "Faça duas avaliações aprovadas.",
      type: "submit_reviews",
      progress: 1,
      target: 2,
      reward: {
        type: "cashback",
        amount: 10,
        benefitId: null,
      },
      status: "in_progress",
      startsAt: new Date().toISOString(),
      expiresAt: null,
    },
  ],

  referrals: {
    code: "CTB360-AMIGO",
    completed: 2,
    pending: 1,
    totalEarned: 600,
  },

  transactions: [
    {
      id: "transaction-001",
      type: "purchase_points",
      currency: "points",
      direction: "credit",
      amount: 88,
      status: "completed",
      description:
        "Pontos da compra CTB360-2048",
      referenceType: "order",
      referenceId: "order-ctb-2048",
      expiresAt: "2027-08-18T23:59:59.000Z",
      createdAt: new Date().toISOString(),
    },

    {
      id: "transaction-002",
      type: "cashback_released",
      currency: "cashback",
      direction: "credit",
      amount: 8.78,
      status: "completed",
      description:
        "Cashback liberado da compra CTB360-2048",
      referenceType: "order",
      referenceId: "order-ctb-2048",
      expiresAt: "2026-12-31T23:59:59.000Z",
      createdAt: new Date().toISOString(),
    },
  ],

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
