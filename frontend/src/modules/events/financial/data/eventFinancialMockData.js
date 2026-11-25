export const INITIAL_EVENT_FINANCIAL_DATA = {
  eventId: 'EVT-9001',
  nomeEvento: 'Passeio de Trem Morretes VIP 🚂',

  kpis: {
    receitaBrutaIngressos: 123750.00,
    taxaServicoRetida: 12375.00,
    receitaTotalBruta: 136125.00,
    custosOperacionaisTotal: 81500.00,
    repassesComissoesTotal: 11137.50,
    impostosTotal: 8167.50,
    lucroLiquidoEvento: 35320.00,
    margemLiquidaPct: 25.9,
    statusFechamento: 'Em Aberto / Em Vendas'
  },

  dreGerencial: [
    { linha: '(+) Receita Bruta de Ingressos', valor: 123750.00, tipo: 'receita' },
    { linha: '(+) Taxa de Conveniência / Serviço (10%)', valor: 12375.00, tipo: 'receita' },
    { linha: '(=) RECEITA OPERACIONAL BRUTA', valor: 136125.00, tipo: 'subtotal' },
    { linha: '(-) Impostos sobre Vendas (ISS / Simples - 6%)', valor: -8167.50, tipo: 'deducao' },
    { linha: '(-) Repasses de Comissões (Agências & Agentes)', valor: -11137.50, tipo: 'deducao' },
    { linha: '(=) RECEITA OPERACIONAL LÍQUIDA', valor: 116820.00, tipo: 'subtotal' },
    { linha: '(-) Custos de Locação (Serra Verde Express)', valor: -45000.00, tipo: 'custo' },
    { linha: '(-) Custos de Catering & Bebidas VIP', valor: -28000.00, tipo: 'custo' },
    { linha: '(-) Equipe de Produção & Som', valor: -8500.00, tipo: 'custo' },
    { linha: '(=) LUCRO LÍQUIDO DO EVENTO', valor: 35320.00, tipo: 'resultado' }
  ],

  custosDetalhado: [
    { id: 'CST-1', categoria: 'Locação & Tração', fornecedor: 'Serra Verde Locações', valor: 45000.00, status: 'pago' },
    { id: 'CST-2', categoria: 'Alimentação & Bistro', fornecedor: 'Catering Batel Bistro', valor: 28000.00, status: 'pago' },
    { id: 'CST-3', categoria: 'Equipamentos de Som', fornecedor: 'Grupo Paranaense de Som', valor: 8500.00, status: 'pendente' }
  ],

  receitaPorCanal: [
    { canal: 'Portal Web Online (Direct)', receita: 74250.00, pctTotal: 60.0 },
    { canal: 'Rede de Agências Parceiras', receita: 30937.50, pctTotal: 25.0 },
    { canal: 'Agentes Comerciais Afiliados', receita: 12375.00, pctTotal: 10.0 },
    { canal: 'Bilheteria Presencial (Estação)', receita: 6187.50, pctTotal: 5.0 }
  ]
};
