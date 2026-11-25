export const INITIAL_AGENT_DASHBOARD_DATA = {
  'AGT-2001': {
    agentInfo: {
      id: 'AGT-2001',
      nome: 'Carolina Ferraz',
      cpf: '321.654.987-00',
      email: 'carolina.ferraz@turismocwb.com.br',
      telefone: '(41) 98877-6655',
      fotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      cargo: 'Agente Comercial Sênior',
      agenciaId: 'AG-1001',
      agenciaNome: 'Tour CWB Premium',
      regiao: 'Sul (Curitiba & RMC)',
      cidade: 'Curitiba',
      uf: 'PR',
      status: 'ativo',
      ultimoAcesso: '2026-07-21 10:45'
    },
    kpis: {
      vendasHojeQtd: 8,
      vendasHojeValor: 1450.00,
      vendasSemanaQtd: 34,
      vendasSemanaValor: 6800.00,
      vendasMesQtd: 124,
      vendasMesValor: 24800.00,
      receitaAcumulada: 142500.00,
      ingressosEmitidos: 342,
      ticketMedio: 200.00,
      taxaConversao: 24.5, // %
      metaMensalValor: 27000.00,
      metaMensalPct: 91.8, // %
      comissaoDisponivel: 8530.00,
      comissaoPrevista: 2150.00,
      posicaoRankingRegional: 5,
      posicaoRankingNacional: 21,
      totalClientes: 320,
      clientesAtivos: 280,
      clientesInativos: 40,
      eventosAtivos: 18
    },
    graficoVendas12Meses: [
      { mes: 'Ago/25', receita: 14500, ingressos: 82 },
      { mes: 'Set/25', receita: 16200, ingressos: 94 },
      { mes: 'Out/25', receita: 18000, ingressos: 110 },
      { mes: 'Nov/25', receita: 21500, ingressos: 130 },
      { mes: 'Dez/25', receita: 28900, ingressos: 175 },
      { mes: 'Jan/26', receita: 22400, ingressos: 135 },
      { mes: 'Fev/26', receita: 19800, ingressos: 118 },
      { mes: 'Mar/26', receita: 21000, ingressos: 125 },
      { mes: 'Abr/26', receita: 23500, ingressos: 140 },
      { mes: 'Mai/26', receita: 25000, ingressos: 152 },
      { mes: 'Jun/26', receita: 26800, ingressos: 160 },
      { mes: 'Jul/26', receita: 24800, ingressos: 145 }
    ],
    produtosMaisVendidos: [
      { id: 'EVT-101', nome: 'Passeio de Trem Morretes VIP', vendas: 68, receita: 30600.00 },
      { id: 'EVT-102', nome: 'Kit Pass Linha Turismo 4 Pessoas', vendas: 45, receita: 14400.00 },
      { id: 'EVT-103', nome: 'Jantar Dançante Madalosso Batel', vendas: 32, receita: 21760.00 },
      { id: 'EVT-104', nome: 'Tour Cervejeiro Curitiba', vendas: 28, receita: 7840.00 }
    ],
    agendaHoje: [
      { id: 'AGD-1', hora: '09:00', titulo: 'Reunião Receptivo de Grupo (Hotéis)', tipo: 'reuniao', status: 'concluido' },
      { id: 'AGD-2', hora: '11:30', titulo: 'WhatsApp: Confirmar Reserva Carlos Spínola', tipo: 'contato', status: 'pendente' },
      { id: 'AGD-3', hora: '14:00', titulo: 'Aniversário do Cliente VIP: Marcos Vinícius', tipo: 'aniversario', status: 'pendente' },
      { id: 'AGD-4', hora: '16:00', titulo: 'Acompanhar Fila de Reembolso #REF-7001', tipo: 'pendencia', status: 'pendente' }
    ],
    tarefasKanban: [
      { id: 'TSK-1', titulo: 'Ligar para clientes inativos há 90 dias', status: 'a_fazer', prioridade: 'alta' },
      { id: 'TSK-2', titulo: 'Enviar proposta de pacote empresarial Morretes', status: 'em_andamento', prioridade: 'alta' },
      { id: 'TSK-3', titulo: 'Confirmar vouchers do grupo de 15 pessoas', status: 'concluido', prioridade: 'media' }
    ],
    clientesCrm: [
      {
        id: 'CLI-801',
        nome: 'Carlos Alberto Spínola',
        email: 'carlos.spinola@email.com',
        telefone: '(41) 99888-7766',
        cidade: 'Curitiba - PR',
        ltv: 2450.00,
        ultimaCompra: '2026-07-18',
        totalCompras: 4,
        tag: 'VIP',
        status: 'ativo'
      },
      {
        id: 'CLI-802',
        nome: 'Mariana Duarte',
        email: 'mariana.duarte@email.com',
        telefone: '(41) 99222-1100',
        cidade: 'São José dos Pinhais - PR',
        ltv: 1280.00,
        ultimaCompra: '2026-07-05',
        totalCompras: 2,
        tag: 'Recorrente',
        status: 'ativo'
      },
      {
        id: 'CLI-803',
        nome: 'Rodrigo Santoro Filho',
        email: 'rodrigo.santoro@email.com',
        telefone: '(11) 98765-1122',
        cidade: 'São Paulo - SP',
        ltv: 680.00,
        ultimaCompra: '2026-04-10',
        totalCompras: 1,
        tag: 'Inativo 90d',
        status: 'inativo'
      }
    ],
    aiInsights: [
      {
        id: 'INS-1',
        tipo: 'reativacao',
        titulo: '3 Clientes sem comprar há mais de 90 dias',
        descricao: 'Rodrigo Santoro Filho não compra desde Abril. Sugerido enviar cupom de 10% para o Passeio de Trem.',
        acao: 'Enviar Cupom 10%',
        cor: 'amber'
      },
      {
        id: 'INS-2',
        tipo: 'oportunidade',
        titulo: 'Lançamento de Novo Evento Semelhante',
        descricao: 'Novo evento "Noite Italiana Opera de Arame" tem 94% de afinidade com seus clientes VIP.',
        acao: 'Notificar Lista VIP',
        cor: 'purple'
      },
      {
        id: 'INS-3',
        tipo: 'meta',
        titulo: 'Meta de Julho em 91.8% (Restam R$ 2.200)',
        descricao: 'Faltam apenas 11 bilhetes para atingir a meta de R$ 27.000 e desbloquear o bônus de 2%.',
        acao: 'Ver Ações Recomendadas',
        cor: 'emerald'
      }
    ]
  }
};
