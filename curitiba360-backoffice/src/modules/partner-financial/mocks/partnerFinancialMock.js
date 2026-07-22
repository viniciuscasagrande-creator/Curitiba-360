export const partnerFinancialMock = {
  account: {
    id: "financial-account-001",
    partnerId:
      "partner-curitiba-001",
    currency: "BRL",

    balance: {
      gross: 42850.7,
      available: 9170.3,
      pending: 7850.45,
      future: 18240.8,
      blocked: 620.0,
      reserved: 2180.4,
      requested: 2500.0,
      paidOut: 26120.1,
    },

    receivables: {
      total: 18240.8,
      available: 9170.3,
      pending: 9070.5,
      overdue: 0,
    },

    fees: {
      platform: 2988.4,
      payment: 1260.7,
      anticipation: 180.0,
      refund: 74.9,
      chargeback: 65.0,
      other: 0,
    },

    bankAccountId:
      "bank-account-001",

    payoutSettings: {
      mode: "manual",
      frequency: "weekly",
      minimumAmount: 100,
      reservePercentage: 5,
    },

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  },

  transactions: [
    {
      id: "financial-transaction-001",
      partnerId:
        "partner-curitiba-001",
      accountId:
        "financial-account-001",

      type: "sale",
      direction: "credit",
      status: "completed",
      amount: 440,

      balancesBefore: {
        available: 8730.3,
        pending: 7850.45,
        blocked: 620,
      },

      balancesAfter: {
        available: 9170.3,
        pending: 7850.45,
        blocked: 620,
      },

      referenceType: "order",
      referenceId:
        "order-ctb-2048",

      description:
        "Venda do pedido CTB360-2048",

      metadata: {
        productTitle:
          "Festival Gastronômico de Curitiba",
      },

      availableAt:
        new Date().toISOString(),

      processedAt:
        new Date().toISOString(),

      createdAt:
        new Date().toISOString(),
    },

    {
      id: "financial-transaction-002",
      partnerId:
        "partner-curitiba-001",
      accountId:
        "financial-account-001",

      type: "platform_fee",
      direction: "debit",
      status: "completed",
      amount: 35.2,

      balancesBefore: {
        available: 9205.5,
        pending: 7850.45,
        blocked: 620,
      },

      balancesAfter: {
        available: 9170.3,
        pending: 7850.45,
        blocked: 620,
      },

      referenceType: "order",
      referenceId:
        "order-ctb-2048",

      description:
        "Taxa da plataforma",

      metadata: {},

      availableAt: null,

      processedAt:
        new Date().toISOString(),

      createdAt:
        new Date().toISOString(),
    },
  ],

  receivables: [
    {
      id: "receivable-001",
      partnerId:
        "partner-curitiba-001",
      orderId:
        "order-ctb-2048",
      paymentId:
        "payment-ctb-2048",

      installmentNumber: 1,
      installmentCount: 1,

      grossAmount: 440,

      deductions: {
        platformFee: 35.2,
        paymentFee: 13.5,
        discount: 0,
        cashback: 0,
        reserve: 22,
        withholding: 0,
      },

      netAmount: 369.3,

      status: "available",

      originalAvailableAt:
        new Date().toISOString(),

      availableAt:
        new Date().toISOString(),

      payoutId: null,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    },
  ],

  payouts: [
    {
      id: "payout-001",
      code: "REP-2026-0001",

      partnerId:
        "partner-curitiba-001",

      bankAccountId:
        "bank-account-001",

      type: "manual",
      status: "paid",

      requestedAmount: 3500,

      deductions: {
        payoutFee: 0,
        anticipationFee: 0,
        withholding: 0,
        adjustment: 0,
      },

      netAmount: 3500,

      receivableIds: [
        "receivable-paid-001",
      ],

      bankAccountSnapshot: {
        bankName:
          "Banco do Brasil",
        agencyMasked: "12••",
        accountMasked:
          "••••••-7",
        holderName:
          "Experiências Curitiba Ltda.",
        holderDocumentMasked:
          "••.•••.•••/0001-••",
      },

      requestedBy:
        "user-demo",

      requestedAt:
        new Date().toISOString(),

      approvedAt:
        new Date().toISOString(),

      processedAt:
        new Date().toISOString(),

      paidAt:
        new Date().toISOString(),

      failureReason: null,

      provider: "pix",

      providerReference:
        "provider-payout-001",

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    },
  ],
};
