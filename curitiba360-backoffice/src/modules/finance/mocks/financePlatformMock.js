export const financePlatformMock = {
  summary: {
    totalBalance: 2847600.5,
    availableBalance: 1648240.3,
    blockedBalance: 184900,
    pendingReceivables: 1014460.2,
    monthlyGrossRevenue: 4268900,
    monthlyNetRevenue: 3684750,
    accountsPayable: 684200,
    accountsReceivable: 1048600,
    pendingSettlements: 426300,
    reconciliationRate: 96.7,
    defaultRate: 2.4,
    forecastThirtyDays: 3920000
  },

  cashFlow: [
    { period: "Semana 1", inflow: 840000, outflow: 520000, balance: 320000 },
    { period: "Semana 2", inflow: 920000, outflow: 610000, balance: 310000 },
    { period: "Semana 3", inflow: 1080000, outflow: 740000, balance: 340000 },
    { period: "Semana 4", inflow: 1428900, outflow: 890000, balance: 538900 }
  ],

  settlements: [
    { id: "settlement-001", beneficiaryName: "Parceiro Turismo Sul", grossAmount: 184600, feesAmount: 12400, netAmount: 172200, status: "scheduled", scheduledAt: "2026-07-25" },
    { id: "settlement-002", beneficiaryName: "Eventos Curitiba Ltda.", grossAmount: 286400, feesAmount: 21800, netAmount: 264600, status: "under_review", scheduledAt: null }
  ],

  alerts: [
    { id: "alert-001", severity: "warning", title: "Conciliações pendentes", description: "Existem 42 transações bancárias aguardando correspondência." },
    { id: "alert-002", severity: "high", title: "Orçamento excedido", description: "O centro de custo Marketing utilizou 108% do orçamento mensal." }
  ],

  transactions: [
    { id: "tx-001", type: "sale", referenceId: "ref-901", referenceType: "ticket", grossAmount: 150.0, feeAmount: 4.5, taxAmount: 3.0, netAmount: 142.5, status: "approved", paymentMethod: "pix" },
    { id: "tx-002", type: "refund", referenceId: "ref-408", referenceType: "ticket", grossAmount: 200.0, feeAmount: 0.0, taxAmount: 0.0, netAmount: -200.0, status: "reversed", paymentMethod: "credit_card" }
  ],

  payables: [
    { id: "pay-001", supplierId: "sup-202", description: "Infraestrutura Cloud Julho", categoryId: "tecnologia", costCenterId: "cc-tech", originalAmount: 12400, paidAmount: 0, dueDate: "2026-07-31", competenceDate: "2026-07-01", status: "pending_approval", paymentMethod: "transfer" },
    { id: "pay-002", supplierId: "sup-092", description: "Equipe de Segurança - Evento", categoryId: "operacao", costCenterId: "cc-events", originalAmount: 8500, paidAmount: 8500, dueDate: "2026-07-20", competenceDate: "2026-07-01", status: "paid", paymentMethod: "pix" }
  ],

  receivables: [
    { id: "rec-001", customerId: "cust-504", referenceId: "ref-901", referenceType: "sale", description: "Ingresso Festival VIP", originalAmount: 350.0, receivedAmount: 350.0, feeAmount: 10.5, netAmount: 339.5, dueDate: "2026-07-22", expectedSettlementDate: "2026-07-24", status: "received" }
  ],

  splitRules: [
    { id: "spl-01", name: "Divisão Comum Atrações", referenceType: "product", status: "active", validFrom: "2026-01-01" }
  ],

  subscriptions: [
    { id: "sub-01", customerId: "cust-102", planId: "plan-gold", status: "active", billingCycle: "monthly", amount: 49.9, currentPeriodStart: "2026-07-01", currentPeriodEnd: "2026-08-01" }
  ],

  invoices: [
    { id: "inv-01", customerId: "cust-102", number: "002845", competenceDate: "2026-07-01", issueDate: "2026-07-02", dueDate: "2026-07-10", subtotalAmount: 49.9, discountAmount: 0, taxAmount: 2.5, totalAmount: 49.9, paidAmount: 49.9, status: "paid" }
  ],

  budgets: [
    { id: "bud-01", name: "Orçamento de TI 2026", year: 2026, costCenterId: "cc-tech", accountId: "acc-5.2", budgetedAmount: 120000, committedAmount: 45000, realizedAmount: 38000, forecastAmount: 115000, status: "active" }
  ],

  costCenters: [
    { id: "cc-tech", name: "Tecnologia & Cloud" },
    { id: "cc-mkt", name: "Marketing & Growth" }
  ]
};
