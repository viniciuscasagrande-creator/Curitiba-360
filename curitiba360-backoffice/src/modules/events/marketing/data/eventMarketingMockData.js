export const INITIAL_EVENT_MARKETING_DATA = {
  eventId: 'EVT-9001',
  nomeEvento: 'Passeio de Trem Morretes VIP 🚂',

  kpis: {
    cacEvento: 18.50, // Custo de Aquisição de Cliente
    roiCampanhas: 4.8, // ROI 4.8x
    taxaConversaoCheckoutPct: 3.4,
    vendasOrigemUtm: 185,
    descontoTotalConcedido: 3450.00
  },

  cupons: [
    { id: 'CUP-1', codigo: 'CURITIBA360', tipo: 'porcentagem', valor: 15, limiteUso: 100, usosRealizados: 42, validade: '2026-08-31', status: 'ativo' },
    { id: 'CUP-2', codigo: 'MORRETESVIP', tipo: 'fixo', valor: 50.00, limiteUso: 50, usosRealizados: 18, validade: '2026-07-30', status: 'ativo' },
    { id: 'CUP-3', codigo: 'BLACKFRIDAY', tipo: 'porcentagem', valor: 25, limiteUso: 200, usosRealizados: 200, validade: '2026-06-30', status: 'expirado' }
  ],

  afiliados: [
    { id: 'AFL-101', nome: 'Guia Curitiba Tur', link: 'https://curitiba360.com.br/e/9001?ref=guiacuritiba', comissaoPct: 8.0, cliques: 1420, vendas: 35, receitaGerada: 15750.00 },
    { id: 'AFL-102', nome: 'Blog Dicas do Paraná', link: 'https://curitiba360.com.br/e/9001?ref=dicaspr', comissaoPct: 7.0, cliques: 890, vendas: 18, receitaGerada: 8100.00 },
    { id: 'AFL-103', nome: 'Agência Serra Tours', link: 'https://curitiba360.com.br/e/9001?ref=serratours', comissaoPct: 10.0, cliques: 2100, vendas: 52, receitaGerada: 23400.00 }
  ],

  utmTracking: [
    { utmSource: 'instagram', utmMedium: 'cpc', utmCampaign: 'passeio_trem_julho', acessos: 3400, conversoes: 85, receita: 38250.00 },
    { utmSource: 'google', utmMedium: 'search', utmCampaign: 'trem_morretes_keywords', acessos: 2800, conversoes: 62, receita: 27900.00 },
    { utmSource: 'newsletter', utmMedium: 'email', utmCampaign: 'oferta_feriados', acessos: 950, conversoes: 28, receita: 12600.00 }
  ]
};
