export const INITIAL_MOBILE_PRODUCER_DATA = {
  userProfile: {
    nome: 'Carlos Eduardo Spínola',
    cargo: 'Produtor Executivo',
    empresa: 'Curitiba 360 Eventos LTDA',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    biometriaAtiva: true,
    modoOffline: false,
    pendentesSincronizacao: 0
  },

  kpis: {
    receitaHoje: 42850.00,
    ingressosVendidosHoje: 95,
    publicoPresenteTotal: 245,
    capacidadeTotal: 300,
    ocupacaoPct: 81.6,
    lucroEstimadoHoje: 12400.00
  },

  aiAssistantAlerts: [
    {
      id: 'AI-MOB-1',
      tipo: 'vendas',
      titulo: '🔥 Lote Próximo do Esgotamento',
      mensagem: 'O Lote 02 do Passeio VIP atingiu 92% de vendas. Recomendado virada para Lote 03 em até 30 minutos.'
    },
    {
      id: 'AI-MOB-2',
      tipo: 'operacao',
      titulo: '⏱️ Leve Fila no Portão Principal',
      mensagem: 'Fluxo de check-in na Catraca 02 subiu para 22 pax/min. Ative a Catraca Reserva 04.'
    }
  ],

  notifications: [
    { id: 'NTF-1', titulo: '🎟️ Venda Realizada!', descricao: '2x Ingressos VIP comprados por Mariana D. (R$ 1.040,00)', horario: 'Há 3 min', lida: false },
    { id: 'NTF-2', titulo: '⚡ Metas de Venda Atingida', descricao: '80% da capacidade total do evento vendida com sucesso.', horario: 'Há 25 min', lida: true },
    { id: 'NTF-3', titulo: '🛡️ Vistoria Aprovada', descricao: 'Laudo do Corpo de Bombeiros validado e anexado ao evento.', horario: 'Há 1 hora', lida: true }
  ],

  eventosProdutor: [
    { id: 'EVT-9001', nome: 'Passeio de Trem Morretes VIP 🚂', data: 'Hoje • 08:00', receita: 136125.00, vendas: 275, capacidade: 300, status: 'Em Andamento' },
    { id: 'EVT-9002', nome: 'Festival Gastronômico da Lapa 🍷', data: '15 de Agosto', receita: 360000.00, vendas: 1200, capacidade: 1200, status: 'Esgotado' }
  ]
};
