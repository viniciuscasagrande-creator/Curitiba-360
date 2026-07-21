export const INITIAL_EVENTS_PERFORMANCE_DATA = {
  kpis: {
    totalEventosAtivos: 14,
    ingressosVendidosGlobais: 4850,
    receitaBrutaGlobal: 1845000.00,
    ocupacaoMediaPct: 88.4,
    npsMedioEventos: 94,
    ticketMedioGlobal: 380.41
  },

  rankingEventos: [
    { id: 'EVT-9001', nome: 'Passeio de Trem Morretes VIP 🚂', categoria: 'Turístico / Gastronômico', ingressosVendidos: 275, capacidade: 300, receitaBruta: 136125.00, ocupacaoPct: 91.6, status: 'Em Vendas' },
    { id: 'EVT-9002', nome: 'Festival Gastronômico da Lapa 🍷', categoria: 'Gastronomia / Cultura', ingressosVendidos: 1200, capacidade: 1200, receitaBruta: 360000.00, ocupacaoPct: 100.0, status: 'Esgotado' },
    { id: 'EVT-9003', nome: 'Passeio Noturno Jardim Botânico 🌸', categoria: 'Ecoturismo', ingressosVendidos: 850, capacidade: 1000, receitaBruta: 212500.00, ocupacaoPct: 85.0, status: 'Em Vendas' },
    { id: 'EVT-9004', nome: 'Tour Cervejeiro Curitiba 🍺', categoria: 'Experiência Urbana', ingressosVendidos: 450, capacidade: 500, receitaBruta: 112500.00, ocupacaoPct: 90.0, status: 'Em Vendas' }
  ],

  executiveInsights: [
    {
      id: 'INS-1',
      tipo: 'oportunidade',
      titulo: '🚀 Alta Procura em Morretes: Lote Extra Recomendado',
      descricao: 'A velocidade de venda pax/min no Passeio de Trem VIP indica potencial para abertura de 1 vagão extra no próximo final de semana (+R$ 26.000 em receita).'
    },
    {
      id: 'INS-2',
      tipo: 'otimizacao',
      titulo: '💡 Otimização de Precificação Dinâmica',
      descricao: 'Eventos de Ecoturismo Noturno possuem taxa de conversão 40% maior nas quintas-feiras. Recomendado ajuste no 2º lote em +8%.'
    }
  ]
};
