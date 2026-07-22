export const INITIAL_BI_DATA = {
  period: {
    start: "2026-07-01",
    end: "2026-07-31"
  },
  freshness: {
    lastUpdatedAt: new Date().toISOString(),
    status: "fresh"
  },
  kpis: {
    grossRevenue: 1284500.9,
    netRevenue: 1096200.4,
    approvedOrders: 8420,
    averageTicket: 152.55,
    conversionRate: 4.82,
    activeCustomers: 6840,
    occupancyRate: 76.4,
    checkins: 12980,
    roiMarketing: "4.2x",
    cac: 18.50,
    ltv: 240.00
  },
  comparisons: {
    grossRevenue: 18.4,
    netRevenue: 16.8,
    approvedOrders: 12.6,
    conversionRate: -2.1
  },
  revenueSeries: [
    { date: "2026-07-01", revenue: 35200 },
    { date: "2026-07-02", revenue: 41800 },
    { date: "2026-07-03", revenue: 38900 }
  ],
  topProducts: [
    { id: "product-001", name: "Experiência Curitiba", revenue: 284500, orders: 1820, conversionRate: 6.4 },
    { id: "product-002", name: "Passeio Turístico", revenue: 198400, orders: 1240, conversionRate: 5.8 }
  ],
  insights: [
    { id: "insight-001", type: "growth", title: "Crescimento de receita", description: "A receita bruta cresceu 18,4% em comparação ao período anterior." },
    { id: "insight-002", type: "warning", title: "Conversão mobile em queda", description: "A conversão em dispositivos móveis caiu 2,1% no período." }
  ],

  // AI predictions matching WF-022 / WF-027 integrations
  previsoesIa: [
    { id: 'FC-01', descricao: 'Público estimado passeio Trem do Pôr do Sol', previsto: '1.250 pessoas', confianca: '94%', noShowProbabilidade: '2%' },
    { id: 'FC-02', descricao: 'Faturamento esperado próximo lote Festival Inverno', previsto: 'R$ 180.000,00', confianca: '89%', noShowProbabilidade: '4%' },
    { id: 'FC-03', descricao: 'Probabilidade de no-show geral eventos final de semana', previsto: '3.1%', confianca: '96%', noShowProbabilidade: '3.1%' }
  ],

  rankingCidades: [
    { cidade: 'Curitiba', faturamento: 1890000.00, eventos: 42, ocupacaoMedia: '89%' },
    { cidade: 'Morretes', faturamento: 450000.00, eventos: 12, ocupacaoMedia: '92%' },
    { cidade: 'Paranaguá', faturamento: 110000.00, eventos: 4, ocupacaoMedia: '74%' }
  ]
};
