export const INITIAL_BI_DATA = {
  executiveKpis: {
    receitaBruta: 2450000.00,
    receitaLiquida: 2150000.00,
    ticketMedio: 152.00,
    ebitdaEstimado: 890000.00,
    margemLucro: 36.3,
    npsGeral: 82,
    cac: 18.50,
    ltv: 240.00,
    roiMarketing: '4.2x'
  },

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
