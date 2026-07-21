export const INITIAL_GAMIFICATION_DATA = {
  agentProfile: {
    agentId: 'AGT-2001',
    nome: 'Carolina Ferraz',
    xpTotal: 4850,
    nivelAtual: 'Platina II', // Bronze, Prata, Ouro, Platina, Diamante, Elite, Master, Legend
    proximoNivelXP: 6000,
    moedasBonus: 1250, // Coins resgatáveis
    posicaoRegional: 5,
    posicaoNacional: 21,
    metaMensalValor: 27000.00,
    metaMensalRealizado: 24800.00,
    metaMensalPct: 91.8,
    metaAnualValor: 320000.00,
    metaAnualRealizado: 185000.00,
    metaAnualPct: 57.8
  },
  ranking: [
    { posicao: 1, nome: 'João Pedro Silva', agencia: 'Batel Pass', regional: 'Sul', xp: 9420, receitaMes: 34500.00, medalha: '🥇' },
    { posicao: 2, nome: 'Carlos Eduardo Ramos', agencia: 'Tour CWB Premium', regional: 'Sul', xp: 8100, receitaMes: 31200.00, medalha: '🥈' },
    { posicao: 3, nome: 'Ana Beatriz Souza', agencia: 'Curitiba360 Direct', regional: 'Sul', xp: 7450, receitaMes: 29800.00, medalha: '🥉' },
    { posicao: 4, nome: 'Marcelo Augusto', agencia: 'Pinheirais Turismo', regional: 'Sul', xp: 6200, receitaMes: 26100.00, medalha: '4º' },
    { posicao: 5, nome: 'Carolina Ferraz (Você)', agencia: 'Tour CWB Premium', regional: 'Sul', xp: 4850, receitaMes: 24800.00, medalha: '5º' },
    { posicao: 6, nome: 'Juliana Paes', agencia: 'Econômico Pass', regional: 'Sul', xp: 4300, receitaMes: 22100.00, medalha: '6º' }
  ],
  medalhas: [
    { id: 'BDG-1', icone: '🥇', titulo: 'Primeira Venda', descricao: 'Realizou a primeira venda no sistema', conquistada: true, dataConquista: '2025-08-10' },
    { id: 'BDG-2', icone: '🎫', titulo: '100 Ingressos', descricao: 'Emitiu mais de 100 bilhetes', conquistada: true, dataConquista: '2025-11-20' },
    { id: 'BDG-3', icone: '🎯', titulo: 'Meta 100%', descricao: 'Bateu a meta mensal de vendas', conquistada: true, dataConquista: '2026-06-30' },
    { id: 'BDG-4', icone: '👥', titulo: '100 Clientes', descricao: 'Conquistou 100 clientes na carteira CRM', conquistada: true, dataConquista: '2026-05-15' },
    { id: 'BDG-5', icone: '💰', titulo: 'Top Comissão', descricao: 'Alcançou R$ 10.000 em comissões acumuladas', conquistada: true, dataConquista: '2026-07-01' },
    { id: 'BDG-6', icone: '⭐', titulo: 'Campeão do Mês', descricao: '1º Lugar no ranking mensal regional', conquistada: false, dataConquista: null }
  ],
  missoes: [
    {
      id: 'MIS-101',
      titulo: 'Missão Semanal: Vender 15 Ingressos do Trem VIP',
      progressoAtual: 12,
      metaQtd: 15,
      recompensaXP: 500,
      recompensaBonus: 'R$ 150 PIX Extra',
      status: 'em_andamento',
      prazo: 'Restam 2 dias'
    },
    {
      id: 'MIS-102',
      titulo: 'Reativação CRM: Converter 3 Clientes Inativos',
      progressoAtual: 2,
      metaQtd: 3,
      recompensaXP: 350,
      recompensaBonus: '200 Moedas Bonus',
      status: 'em_andamento',
      prazo: 'Restam 4 dias'
    },
    {
      id: 'MIS-103',
      titulo: 'Desafio Relâmpago: Venda no Final de Semana',
      progressoAtual: 5,
      metaQtd: 5,
      recompensaXP: 400,
      recompensaBonus: 'Badge Exclusiva + R$ 100',
      status: 'concluido',
      prazo: 'Concluído 🎉'
    }
  ],
  campanhas: [
    {
      id: 'CMP-201',
      nome: 'Desafio Inverno Curitiba 2026 ❄️',
      objetivo: 'Alcançar a maior receita de vendas no período de Inverno (Julho/Agosto)',
      premioPrincipal: 'Viagem com Acompanhante para Foz do Iguaçu (Resort All-Inclusive)',
      premioSegundo: 'Notebook Dell XPS 15',
      premioTerceiro: 'iPhone 15 Pro Max',
      periodo: '01/07/2026 a 31/08/2026',
      status: 'ativa',
      participantesTotal: 48,
      suaPosicao: 3
    },
    {
      id: 'CMP-202',
      nome: 'Corrida das Estrelas Madalosso 🍽️',
      objetivo: 'Maior volume de vouchers de Gastronomia emitidos',
      premioPrincipal: 'Cartão Presente R$ 2.500 no Shopping Pátio Batel',
      periodo: '15/07/2026 a 15/08/2026',
      status: 'ativa',
      participantesTotal: 32,
      suaPosicao: 2
    }
  ],
  aiRecommendations: [
    {
      id: 'REC-1',
      texto: '🎯 Faltam apenas R$ 2.200 para você atingir 100% da sua meta mensal! Venda 5 bilhetes do Passeio de Trem para fechar.',
      tipo: 'meta',
      cor: 'emerald'
    },
    {
      id: 'REC-2',
      texto: '🏆 Você está a apenas R$ 1.300 de ultrapassar Marcelo Augusto e assumir a 4ª posição no Ranking Regional!',
      tipo: 'ranking',
      cor: 'purple'
    },
    {
      id: 'REC-3',
      texto: '🔥 Complete a missão "Vender 15 Ingressos do Trem VIP" (faltam 3) para ganhar +500 XP e subir para o nível Platina III!',
      tipo: 'gamificacao',
      cor: 'amber'
    }
  ]
};
