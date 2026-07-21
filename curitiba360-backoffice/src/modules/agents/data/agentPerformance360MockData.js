export const INITIAL_PERFORMANCE_360_DATA = {
  kpis: {
    receitaTotalMes: 24800.00,
    metaMensalValor: 27000.00,
    metaMensalPct: 91.8,
    comissaoDisponivel: 8530.00,
    comissaoPrevista: 2150.00,
    ingressosEmitidos: 68,
    ticketMedio: 364.70,
    taxaConversaoPct: 34.2,
    xpTotal: 4850,
    nivelGamificacao: 'Platina II',
    posicaoRankingRegional: 5,
    posicaoRankingNacional: 21,
    slaCumpridoPct: 96.4,
    clientesAtivosCrm: 48
  },
  evolucao6Meses: [
    { mes: 'Fevereiro', receita: 14200, ingressos: 42, comissao: 4970 },
    { mes: 'Março', receita: 16800, ingressos: 48, comissao: 5880 },
    { mes: 'Abril', receita: 19500, ingressos: 54, comissao: 6825 },
    { mes: 'Maio', receita: 21000, ingressos: 58, comissao: 7350 },
    { mes: 'Junho', receita: 23400, ingressos: 62, comissao: 8190 },
    { mes: 'Julho (Atual)', receita: 24800, ingressos: 68, comissao: 8530 }
  ],
  benchmarking: {
    agenteReceita: 24800.00,
    mediaAgenciaReceita: 18400.00,
    top1Receita: 34500.00,
    agenteConversao: 34.2,
    mediaAgenciaConversao: 28.5,
    top1Conversao: 42.0,
    agenteSla: 96.4,
    mediaAgenciaSla: 91.2
  },
  alertasPerformance: [
    {
      id: 'ALT-1',
      tipo: 'meta',
      titulo: 'Meta Mensal em 91.8%',
      descricao: 'Faltam R$ 2.200 para fechar 100% da meta de Julho e liberar bônus de +2% sobre comissões.',
      acao: 'Ver Oportunidades Prioritárias',
      rota: '/agentes/oportunidades'
    },
    {
      id: 'ALT-2',
      tipo: 'financeiro',
      titulo: 'Saldo de R$ 8.530.00 Disponível',
      descricao: 'Você possui comissões liberadas prontas para saque via PIX.',
      acao: 'Solicitar Resgate PIX',
      rota: '/agentes/dashboard'
    },
    {
      id: 'ALT-3',
      tipo: 'crm',
      titulo: '2 Clientes em Risco de Churn',
      descricao: 'Clientes inativos há mais de 60 dias necessitam de ação de reativação.',
      acao: 'Enviar Cupons de Reativação',
      rota: '/agentes/copiloto'
    }
  ]
};
