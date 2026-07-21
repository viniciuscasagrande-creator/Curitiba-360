export const INITIAL_COMMERCIAL_EXECUTIVE_DATA = {
  kpis: {
    receitaTotal: 485000.00,
    metaMes: 520000.00,
    metaPct: 93.2,
    forecastIA: 528000.00,
    forecastConfiancaPct: 94,
    conversaoPct: 36.8,
    ticketMedio: 385.00,
    ltvMedio: 2150.00,
    cacMedio: 42.00,
    roiMarketing: '4.8x',
    margemBrutaPct: 22.5,
    npsComercial: 92,
    clientesAtivosTotal: 3450,
    eventosAtivosTotal: 42,
    agenciasAtivas: 18,
    agentesAtivos: 310,
    produtividadeGeralPct: 94.2,
    slaCumpridoGeralPct: 96.8
  },
  evolucaoReceitaMeses: [
    { mes: 'Fevereiro', receita: 310000, meta: 300000, conversao: 32.1 },
    { mes: 'Março', receita: 360000, meta: 350000, conversao: 34.0 },
    { mes: 'Abril', receita: 410000, meta: 400000, conversao: 35.2 },
    { mes: 'Maio', receita: 435000, meta: 450000, conversao: 35.8 },
    { mes: 'Junho', receita: 468000, meta: 480000, conversao: 36.1 },
    { mes: 'Julho (Atual)', receita: 485000, meta: 520000, conversao: 36.8 }
  ],
  funilExecutivo: [
    { etapa: 'Novos Leads 🎯', quantidade: 4200, valor: 1617000.00 },
    { etapa: 'Contatos Realizados 📞', quantidade: 2850, valor: 1097250.00 },
    { etapa: 'Propostas em Negociação 💬', quantidade: 1850, valor: 712250.00 },
    { etapa: 'Vendas Concluídas 🎉', quantidade: 1260, valor: 485000.00 }
  ],
  topAgencias: [
    { posicao: 1, nome: 'Batel Pass Turismo', regiao: 'Sul', faturamento: 128500.00, metaPct: 102.8, agentes: 24 },
    { posicao: 2, nome: 'Tour CWB Premium', regiao: 'Sul', faturamento: 114200.00, metaPct: 98.4, agentes: 18 },
    { posicao: 3, nome: 'Curitiba360 Direct', regiao: 'Sul', faturamento: 98400.00, metaPct: 95.1, agentes: 15 },
    { posicao: 4, nome: 'Pinheirais Receptivo', regiao: 'Sul', faturamento: 82100.00, metaPct: 91.2, agentes: 12 }
  ],
  topRegioes: [
    { regiao: 'Região Sul (PR/SC/RS)', faturamento: 342000.00, pctTotal: 70.5, crescimento: '+18%' },
    { regiao: 'Região Sudeste (SP/RJ)', faturamento: 98000.00, pctTotal: 20.2, crescimento: '+24%' },
    { regiao: 'Outras Regiões / Brasil', faturamento: 45000.00, pctTotal: 9.3, crescimento: '+12%' }
  ],
  executiveInsights: [
    {
      id: 'INS-1',
      tipo: 'crescimento',
      titulo: '🚀 Região Sul apresentou crescimento de 18% no faturamento mensal',
      descricao: 'Destaque para o aumento na venda de ingressos do Passeio de Trem VIP e Gastronomia no Batel.'
    },
    {
      id: 'INS-2',
      tipo: 'oportunidade',
      titulo: '📈 46 Oportunidades corporativas com probabilidade de fechamento > 80%',
      descricao: 'O valor estimado dessas oportunidades soma R$ 184.000, o que garante a ultrapassagem da meta mensal.'
    },
    {
      id: 'INS-3',
      tipo: 'alerta',
      titulo: '⚠️ Agência Curitiba Centro está 12% abaixo da meta estipulada',
      descricao: 'Recomenda-se ativar campanha de incentivo relâmpago com comissão dobrada no final de semana.'
    }
  ]
};
