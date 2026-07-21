export const INITIAL_AGENTS = [
  {
    id: 'AGT-2001',
    agencyId: 'AG-1001',
    fotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    nome: 'Carolina Ferraz',
    cpf: '321.654.987-00',
    email: 'carolina.ferraz@tourcwbpremium.com.br',
    telefone: '(41) 99111-2233',
    whatsapp: '(41) 99111-2233',
    cidade: 'Curitiba',
    uf: 'PR',
    status: 'ativo', // ativo, inativo, suspenso
    cargo: 'Agente Senior B2B',
    supervisor: 'Maria Oliveira',
    dataAdmissao: '2026-02-01',
    ultimoAcesso: '2026-07-21 10:45',
    
    // Regras comerciais
    tipoComissao: 'percentual', // percentual, fixo, faixas
    taxaComissao: 5.0, // 5% do valor da venda
    comissaoFixaPorVenda: 0.0,
    metaMensal: 50000.0,
    vendasMesAtual: 38400.0,
    qtdVendasMes: 48,
    
    // Carteira digital
    saldoDisponivel: 1920.00,
    saldoAguardando: 450.00,
    totalSacado: 12400.00,
    pix: {
      tipo: 'CPF',
      chave: '321.654.987-00',
      banco: 'Banco do Brasil (001)',
      agencia: '1234',
      conta: '56789-0'
    },
    
    // Matriz de Permissões (bo-01)
    permissoes: {
      podeVender: true,
      podeCancelar: true,
      podeSolicitarRepasse: true,
      podeVisualizarFinanceiro: true,
      podeEmitirVoucher: false,
      podeValidarIngresso: true,
      podeEditarCliente: true,
      podeGerarCupons: false
    },
    
    // CRM - Clientes Vinculados
    clientesCRM: [
      {
        id: 'CLI-501',
        nome: 'Marcos Vinicius Andrade',
        email: 'marcos.andrade@email.com',
        telefone: '(41) 98888-1234',
        cidade: 'Curitiba',
        ultimaCompra: '2026-07-19',
        eventosComprados: 3,
        totalGasto: 1450.00,
        ltv: 2800.00
      },
      {
        id: 'CLI-502',
        nome: 'Juliana Paes',
        email: 'juliana.paes@email.com',
        telefone: '(41) 99777-4321',
        cidade: 'São José dos Pinhais',
        ultimaCompra: '2026-07-20',
        eventosComprados: 5,
        totalGasto: 3200.00,
        ltv: 4500.00
      }
    ],

    // Log Auditado
    historicoAuditoria: [
      { data: '2026-07-21 10:45', acao: 'Login no terminal PDV Agente', ip: '177.12.89.4', categoria: 'Login' },
      { data: '2026-07-20 16:30', acao: 'Emissão de 4x Ingressos Passeio Trem Morretes', valor: 840.0, categoria: 'Venda' },
      { data: '2026-07-19 14:10', acao: 'Solicitação de repasse via PIX R$ 500,00', categoria: 'Repasse' },
      { data: '2026-07-15 09:00', acao: 'Permissão "podeValidarIngresso" ativada pelo gerente', categoria: 'Alterações' }
    ]
  },
  {
    id: 'AGT-2002',
    agencyId: 'AG-1001',
    fotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    nome: 'Bruno Carvalho',
    cpf: '654.987.321-22',
    email: 'bruno.carvalho@tourcwbpremium.com.br',
    telefone: '(41) 98844-5566',
    whatsapp: '(41) 98844-5566',
    cidade: 'Curitiba',
    uf: 'PR',
    status: 'ativo',
    cargo: 'Consultor de Vendas',
    supervisor: 'Maria Oliveira',
    dataAdmissao: '2026-03-10',
    ultimoAcesso: '2026-07-21 09:12',

    tipoComissao: 'percentual',
    taxaComissao: 4.5,
    comissaoFixaPorVenda: 0.0,
    metaMensal: 40000.0,
    vendasMesAtual: 29500.0,
    qtdVendasMes: 32,

    saldoDisponivel: 1327.50,
    saldoAguardando: 210.00,
    totalSacado: 8900.00,
    pix: {
      tipo: 'E-mail',
      chave: 'bruno.carvalho@tourcwbpremium.com.br',
      banco: 'Itaú Unibanco (341)',
      agencia: '0450',
      conta: '12345-6'
    },

    permissoes: {
      podeVender: true,
      podeCancelar: false,
      podeSolicitarRepasse: true,
      podeVisualizarFinanceiro: false,
      podeEmitirVoucher: false,
      podeValidarIngresso: true,
      podeEditarCliente: true,
      podeGerarCupons: false
    },

    clientesCRM: [
      {
        id: 'CLI-503',
        nome: 'Ricardo Mansur',
        email: 'ricardo.mansur@email.com',
        telefone: '(41) 99123-9988',
        cidade: 'Curitiba',
        ultimaCompra: '2026-07-18',
        eventosComprados: 2,
        totalGasto: 980.00,
        ltv: 1950.00
      }
    ],

    historicoAuditoria: [
      { data: '2026-07-21 09:12', acao: 'Login no PDV Mobile', ip: '189.44.12.3', categoria: 'Login' },
      { data: '2026-07-20 11:20', acao: 'Venda efetuada: Kit Linha Turismo 4 Pessoas', valor: 320.0, categoria: 'Venda' }
    ]
  },
  {
    id: 'AGT-2003',
    agencyId: 'AG-1002',
    fotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    nome: 'Amanda Rossi',
    cpf: '456.123.789-88',
    email: 'amanda.rossi@batelturismo.com.br',
    telefone: '(41) 99655-7788',
    whatsapp: '(41) 99655-7788',
    cidade: 'Curitiba',
    uf: 'PR',
    status: 'inativo',
    cargo: 'Atendente Receptivo',
    supervisor: 'Juliana Costa',
    dataAdmissao: '2026-01-15',
    ultimoAcesso: '2026-06-30 17:00',

    tipoComissao: 'fixo',
    taxaComissao: 0.0,
    comissaoFixaPorVenda: 15.00,
    metaMensal: 30000.0,
    vendasMesAtual: 0.0,
    qtdVendasMes: 0,

    saldoDisponivel: 0.00,
    saldoAguardando: 0.00,
    totalSacado: 4500.00,
    pix: {
      tipo: 'CPF',
      chave: '456.123.789-88',
      banco: 'Bradesco (237)',
      agencia: '2211',
      conta: '99887-1'
    },

    permissoes: {
      podeVender: false,
      podeCancelar: false,
      podeSolicitarRepasse: false,
      podeVisualizarFinanceiro: false,
      podeEmitirVoucher: false,
      podeValidarIngresso: false,
      podeEditarCliente: false,
      podeGerarCupons: false
    },

    clientesCRM: [],
    historicoAuditoria: [
      { data: '2026-06-30 17:00', acao: 'Agente desativado pela supervisão', categoria: 'Alterações' }
    ]
  }
];
