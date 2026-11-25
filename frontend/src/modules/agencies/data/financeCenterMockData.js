export const INITIAL_FINANCIAL_CENTER_METRICS = {
  resumo: {
    receitaBruta: 243400.00,
    receitaLiquida: 235115.00,
    saldoDisponivel: 30950.00,
    saldoRetido: 6300.00,
    totalRepassado: 187000.00,
    taxasTotais: 6085.00,
    totalComissoes: 30425.00,
    totalReembolsos: 2200.00,
    previsao30Dias: 124500.00
  },
  evolucao6Meses: [
    { mes: 'Fev/26', receita: 110000, repasses: 85000, reembolsos: 1500 },
    { mes: 'Mar/26', receita: 135000, repasses: 102000, reembolsos: 1800 },
    { mes: 'Abr/26', receita: 160000, repasses: 125000, reembolsos: 2100 },
    { mes: 'Mai/26', receita: 185000, repasses: 140000, reembolsos: 1900 },
    { mes: 'Jun/26', receita: 145000, repasses: 112000, reembolsos: 1200 },
    { mes: 'Jul/26', receita: 98400, repasses: 75000, reembolsos: 840 }
  ],
  distribuicaoMeiosPagamento: [
    { meio: 'PIX Instantâneo', percentual: 62.5, valor: 152125.00, cor: '#10B981' },
    { meio: 'Cartão de Crédito', percentual: 31.0, valor: 75454.00, cor: '#3B82F6' },
    { meio: 'Boleto Bancário', percentual: 6.5, valor: 15821.00, cor: '#8B5CF6' }
  ],
  alertas: [
    {
      id: 'ALT-101',
      tipo: 'divergencia',
      severidade: 'alta',
      titulo: '3 Vendas Pendentes de Conciliação em Julho/2026',
      descricao: 'Divergência de taxas reportadas pelo gateway. O fechamento contábil mensal está travado.',
      link: '/agencias/AG-1001/financeiro/conciliacao',
      linkText: 'Resolver na Conciliação'
    },
    {
      id: 'ALT-102',
      tipo: 'reembolso',
      severidade: 'media',
      titulo: '1 Solicitação de Reembolso Aguardando Análise',
      descricao: 'Solicitação REF-7001 (R$ 450,00) de Carlos Alberto Spínola com Score IA Baixo (12/100).',
      link: '/financeiro/fila-financeira',
      linkText: 'Analisar na Fila IA'
    },
    {
      id: 'ALT-103',
      tipo: 'repasse',
      severidade: 'info',
      titulo: 'Janela de Repasse PIX Programada',
      descricao: 'Próxima liquidação em lote agendada para Segunda-feira às 09:00.',
      link: '/agencias/AG-1001/financeiro',
      linkText: 'Ver Carteira PIX'
    }
  ],
  operacoesRecentes: [
    {
      id: 'OP-5001',
      data: '2026-07-21 10:16',
      tipo: 'Reembolso Estornado',
      descricao: 'Estorno via Mercado Pago PIX (REF-7001)',
      agencia: 'Tour CWB Premium',
      valor: -450.00,
      status: 'Concluído',
      meio: 'PIX'
    },
    {
      id: 'OP-5002',
      data: '2026-07-20 14:32',
      tipo: 'Repasse PIX',
      descricao: 'Transferência de comissão (REP-8001)',
      agencia: 'Tour CWB Premium',
      valor: -12500.00,
      status: 'Concluído',
      meio: 'PIX'
    },
    {
      id: 'OP-5003',
      data: '2026-07-20 10:30',
      tipo: 'Venda de Ingresso',
      descricao: 'Passeio de Trem Morretes VIP (TK-889012)',
      agencia: 'Tour CWB Premium',
      valor: 450.00,
      status: 'Conciliado',
      meio: 'PIX'
    },
    {
      id: 'OP-5004',
      data: '2026-07-19 15:05',
      tipo: 'Reembolso Parcial',
      descricao: 'Estorno Cartão de Crédito Pagar.me (REF-7002)',
      agencia: 'Tour CWB Premium',
      valor: -288.00,
      status: 'Concluído',
      meio: 'Cartão de Crédito'
    },
    {
      id: 'OP-5005',
      data: '2026-07-19 11:20',
      tipo: 'Venda de Ingresso',
      descricao: 'Tour Cervejeiro Curitiba (TK-888800)',
      agencia: 'Tour CWB Premium',
      valor: 280.00,
      status: 'Conciliado',
      meio: 'PIX'
    }
  ]
};
