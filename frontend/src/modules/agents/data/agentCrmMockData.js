export const INITIAL_CRM_CUSTOMERS = [
  {
    id: 'CLI-801',
    agentId: 'AGT-2001',
    nome: 'Carlos Alberto Spínola',
    cpf: '123.456.789-00',
    email: 'carlos.spinola@email.com',
    telefone: '(41) 99888-7766',
    cidade: 'Curitiba',
    uf: 'PR',
    endereco: 'Rua XV de Novembro, 1500 - Centro',
    ltv: 2450.00,
    totalCompras: 4,
    ultimaCompraData: '2026-07-18',
    segmento: 'VIP', // VIP, Recorrente, Novo, Inativo, Risco Churn
    tags: ['VIP', 'Turismo Executivo', 'Prefere PIX', 'Cliente Top 5%'],
    ticketMedio: 612.50,
    frequenciaMeses: 1.5,
    status: 'ativo',
    observacoes: 'Cliente corporativo de alto valor. Prefere viagens no setor VIP do trem de Morretes.',

    historicoCompras: [
      { id: 'PED-99801', data: '2026-07-18', evento: 'Passeio de Trem Morretes VIP', valor: 450.00, status: 'Concluído' },
      { id: 'PED-99420', data: '2026-06-02', evento: 'Jantar Dançante Madalosso Batel', valor: 680.00, status: 'Concluído' },
      { id: 'PED-98900', data: '2026-04-15', evento: 'Kit Pass Linha Turismo 4 Pessoas', valor: 640.00, status: 'Concluído' },
      { id: 'PED-98100', data: '2026-02-10', evento: 'Excursão Ilha do Mel Receptiva', valor: 680.00, status: 'Concluído' }
    ],

    interacoes: [
      { id: 'INT-1', data: '2026-07-18 14:05', tipo: 'whatsapp', descricao: 'Venda realizada e voucher enviado via WhatsApp', usuario: 'Carolina Ferraz' },
      { id: 'INT-2', data: '2026-07-15 10:30', tipo: 'chamada', descricao: 'Ligação de relacionamento realizada para oferta de pacote corporativo', usuario: 'Carolina Ferraz' },
      { id: 'INT-3', data: '2026-06-02 18:00', tipo: 'email', descricao: 'Envio de confirmação de reserva do Madalosso', usuario: 'Sistema CRM' }
    ]
  },
  {
    id: 'CLI-802',
    agentId: 'AGT-2001',
    nome: 'Mariana Duarte',
    cpf: '987.654.321-11',
    email: 'mariana.duarte@email.com',
    telefone: '(41) 99222-1100',
    cidade: 'São José dos Pinhais',
    uf: 'PR',
    endereco: 'Av. das Torres, 450 - Afonso Pena',
    ltv: 1280.00,
    totalCompras: 2,
    ultimaCompraData: '2026-07-05',
    segmento: 'Recorrente',
    tags: ['Recorrente', 'Família', 'Prefere Cartão'],
    ticketMedio: 640.00,
    frequenciaMeses: 2.0,
    status: 'ativo',
    observacoes: 'Costuma comprar bilhetes para a família aos finais de semana.',

    historicoCompras: [
      { id: 'PED-99710', data: '2026-07-05', evento: 'Kit Pass Linha Turismo 4 Pessoas', valor: 640.00, status: 'Concluído' },
      { id: 'PED-98800', data: '2026-05-12', evento: 'Tour Cervejeiro Curitiba', valor: 640.00, status: 'Concluído' }
    ],

    interacoes: [
      { id: 'INT-10', data: '2026-07-05 11:20', tipo: 'whatsapp', descricao: 'Confirmação de compra recebida via gateway', usuario: 'Carolina Ferraz' }
    ]
  },
  {
    id: 'CLI-803',
    agentId: 'AGT-2001',
    nome: 'Rodrigo Santoro Filho',
    cpf: '456.789.123-22',
    email: 'rodrigo.santoro@email.com',
    telefone: '(11) 98765-1122',
    cidade: 'São Paulo',
    uf: 'SP',
    endereco: 'Alameda Santos, 1000 - Cerqueira César',
    ltv: 680.00,
    totalCompras: 1,
    ultimaCompraData: '2026-04-10',
    segmento: 'Risco Churn',
    tags: ['Inativo 90d', 'Turista SP', 'Pendente Reativação'],
    ticketMedio: 680.00,
    frequenciaMeses: 4.0,
    status: 'inativo',
    observacoes: 'Cliente de São Paulo em viagem de negócios a Curitiba. Sem compras há mais de 90 dias.',

    historicoCompras: [
      { id: 'PED-98500', data: '2026-04-10', evento: 'Jantar Dançante Madalosso Batel', valor: 680.00, status: 'Concluído' }
    ],

    interacoes: [
      { id: 'INT-20', data: '2026-04-10 19:00', tipo: 'email', descricao: 'Envio de ingressos no e-mail', usuario: 'Sistema CRM' }
    ]
  }
];

export const INITIAL_OPPORTUNITIES = [
  {
    id: 'OPP-301',
    agentId: 'AGT-2001',
    clienteNome: 'Empresa Tecnologia X (20 Pacotes)',
    clienteEmail: 'contato@tecnologiax.com',
    valorEstimado: 9000.00,
    etapa: 'negociacao', // lead, contato, negociacao, fechado_ganho, fechado_perdido
    probabilidade: 80, // %
    dataPrevisaoFechamento: '2026-07-28',
    eventoInteresse: 'Passeio de Trem Morretes VIP',
    origem: 'Indicação de Cliente VIP'
  },
  {
    id: 'OPP-302',
    agentId: 'AGT-2001',
    clienteNome: 'Grupo Excursão Santa Catarina (15 Pessoas)',
    clienteEmail: 'guiasc@email.com',
    valorEstimado: 4800.00,
    etapa: 'contato',
    probabilidade: 50,
    dataPrevisaoFechamento: '2026-08-05',
    eventoInteresse: 'Kit Pass Linha Turismo 4 Pessoas',
    origem: 'Formulário Web'
  },
  {
    id: 'OPP-303',
    agentId: 'AGT-2001',
    clienteNome: 'Mariana Duarte (Pacote Aniversário)',
    clienteEmail: 'mariana.duarte@email.com',
    valorEstimado: 1800.00,
    etapa: 'fechado_ganho',
    probabilidade: 100,
    dataPrevisaoFechamento: '2026-07-20',
    eventoInteresse: 'Jantar Dançante Madalosso Batel',
    origem: 'Reativação WhatsApp'
  }
];
