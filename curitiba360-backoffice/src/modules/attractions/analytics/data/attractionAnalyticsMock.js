export const attractionAnalyticsMock = {
  kpis: {
    totalVisits: { value: 28450, variation: 14.2, direction: 'up', previousPeriod: 24900 },
    totalTickets: { value: 8920, variation: 8.7, direction: 'up', previousPeriod: 8200 },
    uniqueUsers: { value: 19840, variation: 11.5, direction: 'up', previousPeriod: 17790 },
    conversionRate: { value: 31.3, variation: 2.1, direction: 'up', previousPeriod: 29.2 },
    grossRevenue: { value: 245800, variation: 18.4, direction: 'up', previousPeriod: 207600 },
    netRevenue: { value: 221220, variation: 18.4, direction: 'up', previousPeriod: 186840 },
    averageTicket: { value: 27.55, variation: -1.2, direction: 'down', previousPeriod: 27.88 },
    adminFees: { value: 24580, variation: 5.0, direction: 'up', previousPeriod: 23400 },
    approvedOrders: { value: 4120, variation: 9.3, direction: 'up', previousPeriod: 3770 },
    pendingOrders: { value: 145, variation: -12.0, direction: 'down', previousPeriod: 165 },
    cancelledOrders: { value: 88, variation: -5.4, direction: 'down', previousPeriod: 93 },
    refunds: { value: 12, variation: -25.0, direction: 'down', previousPeriod: 16 },
    avgStayTime: { value: '42 min', variation: 6.5, direction: 'up', previousPeriod: '39 min' }
  },

  visitsSeries: [
    { date: '14/Jul', visits: 3200, previousVisits: 2800 },
    { date: '15/Jul', visits: 3850, previousVisits: 3100 },
    { date: '16/Jul', visits: 4100, previousVisits: 3600 },
    { date: '17/Jul', visits: 3900, previousVisits: 3400 },
    { date: '18/Jul', visits: 5200, previousVisits: 4500 },
    { date: '19/Jul', visits: 6400, previousVisits: 5800 },
    { date: '20/Jul', visits: 5800, previousVisits: 5200 }
  ],

  ticketsSeries: [
    { date: '14/Jul', issued: 950, paid: 880, cancelled: 15 },
    { date: '15/Jul', issued: 1120, paid: 1040, cancelled: 22 },
    { date: '16/Jul', issued: 1300, paid: 1210, cancelled: 18 },
    { date: '17/Jul', issued: 1250, paid: 1180, cancelled: 12 },
    { date: '18/Jul', issued: 1650, paid: 1540, cancelled: 25 },
    { date: '19/Jul', issued: 2100, paid: 1980, cancelled: 30 },
    { date: '20/Jul', issued: 1850, paid: 1720, cancelled: 20 }
  ],

  funnelData: [
    { step: '1. Acesso à Página', count: 28450, percent: '100%' },
    { step: '2. Seleção de Ingresso', count: 18200, percent: '64%' },
    { step: '3. Adicionado ao Carrinho', count: 11400, percent: '40.1%' },
    { step: '4. Início de Checkout', count: 9800, percent: '34.4%' },
    { step: '5. Pagamento Aprovado', count: 8920, percent: '31.3%' }
  ],

  accessByHour: [
    { hour: '00h', count: 240 },
    { hour: '03h', count: 90 },
    { hour: '06h', count: 480 },
    { hour: '09h', count: 2150 },
    { hour: '12h', count: 4890 },
    { hour: '15h', count: 6780 },
    { hour: '18h', count: 8420 },
    { hour: '21h', count: 4900 },
    { hour: '23h', count: 1100 }
  ],

  accessByAge: [
    { ageGroup: 'Menor de 18', count: 1420, percent: 5 },
    { ageGroup: '18–24', count: 7110, percent: 25 },
    { ageGroup: '25–34', count: 11380, percent: 40 },
    { ageGroup: '35–44', count: 5690, percent: 20 },
    { ageGroup: '45–54', count: 1990, percent: 7 },
    { ageGroup: '55–64', count: 570, percent: 2 },
    { ageGroup: '65+', count: 290, percent: 1 }
  ],

  paymentMethods: [
    { name: 'Crédito à Vista', value: 42, amount: 103236, color: '#10b981' },
    { name: 'PIX Instantâneo', value: 38, amount: 93404, color: '#06b6d4' },
    { name: 'Crédito Parcelado', value: 12, amount: 29496, color: '#3b82f6' },
    { name: 'Débito', value: 5, amount: 12290, color: '#8b5cf6' },
    { name: 'Boleto / Outros', value: 3, amount: 7374, color: '#f59e0b' }
  ],

  salesAndVisitsSeries: [
    { date: '14/Jul', visits: 3200, sales: 880 },
    { date: '15/Jul', visits: 3850, sales: 1040 },
    { date: '16/Jul', visits: 4100, sales: 1210 },
    { date: '17/Jul', visits: 3900, sales: 1180 },
    { date: '18/Jul', visits: 5200, sales: 1540 },
    { date: '19/Jul', visits: 6400, sales: 1980 },
    { date: '20/Jul', visits: 5800, sales: 1720 }
  ],

  trafficSources: [
    { source: 'Busca Orgânica (Google)', count: 9850, percent: 34.6 },
    { source: 'Instagram (Bio & Stories)', count: 7420, percent: 26.1 },
    { source: 'Google Ads (Search/PMax)', count: 4890, percent: 17.2 },
    { source: 'Acesso Direto', count: 3210, percent: 11.3 },
    { source: 'Meta Ads (FB/IG)', count: 1840, percent: 6.5 },
    { source: 'WhatsApp & Afiliados', count: 1240, percent: 4.3 }
  ],

  genderData: [
    { name: 'Feminino', value: 54, color: '#ec4899' },
    { name: 'Masculino', value: 40, color: '#3b82f6' },
    { name: 'Não binário', value: 4, color: '#a855f7' },
    { name: 'Não informado', value: 2, color: '#94a3b8' }
  ],

  devicesData: [
    { name: 'Mobile (iOS / Android)', value: 74, color: '#10b981' },
    { name: 'Desktop / Notebook', value: 22, color: '#3b82f6' },
    { name: 'Tablet', value: 3, color: '#f59e0b' },
    { name: 'Outros', value: 1, color: '#64748b' }
  ],

  statesRanking: [
    { state: 'Paraná (PR)', count: 18490, percent: 65 },
    { state: 'Santa Catarina (SC)', count: 4830, percent: 17 },
    { state: 'São Paulo (SP)', count: 3130, percent: 11 },
    { state: 'Rio Grande do Sul (RS)', count: 1420, percent: 5 },
    { state: 'Rio de Janeiro (RJ)', count: 580, percent: 2 }
  ],

  citiesRanking: [
    { city: 'Curitiba', count: 13370, percent: 47 },
    { city: 'São José dos Pinhais', count: 2845, percent: 10 },
    { city: 'Colombo', count: 1700, percent: 6 },
    { city: 'Pinhais', count: 1420, percent: 5 },
    { city: 'Araucária', count: 1140, percent: 4 }
  ]
};

export default attractionAnalyticsMock;
