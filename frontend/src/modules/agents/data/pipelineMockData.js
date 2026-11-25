export const INITIAL_PIPELINE_OPPORTUNITIES = [
  {
    id: 'OPP-301',
    agentId: 'AGT-2001',
    titulo: 'Venda de Pacotes Corporativos Empresa Tech X',
    clienteNome: 'Empresa Tecnologia X (20 Colaboradores)',
    clienteEmail: 'contato@tecnologiax.com',
    clienteTelefone: '(41) 99123-4455',
    valorEstimado: 9000.00,
    probabilidade: 80, // %
    etapa: 'negociacao', // lead, qualificado, proposta, negociacao, fechado_ganho, fechado_perdido
    prioridade: 'alta', // alta, media, baixa
    origem: 'Indicação de Cliente VIP',
    eventoInteresse: 'Passeio de Trem Morretes VIP',
    dataCriacao: '2026-07-10 09:00',
    dataPrevisaoFechamento: '2026-07-28',
    responsavel: 'Carolina Ferraz',
    observacoes: 'Cliente em fase final de aprovação da proposta pelo departamento financeiro.',

    atividades: [
      { id: 'ACT-1', tipo: 'reuniao', dataHora: '2026-07-20 14:00', descricao: 'Reunião de apresentação da proposta de valor', concluido: true },
      { id: 'ACT-2', tipo: 'email', dataHora: '2026-07-21 10:00', descricao: 'Envio da minuta de contrato corporativo', concluido: true },
      { id: 'ACT-3', tipo: 'ligacao', dataHora: '2026-07-25 11:00', descricao: 'Follow-up telefônico para confirmação de pagamento', concluido: false }
    ]
  },
  {
    id: 'OPP-302',
    agentId: 'AGT-2001',
    titulo: 'Grupo de Excursão Regional Santa Catarina',
    clienteNome: 'Grupo Excursão Santa Catarina (15 Pessoas)',
    clienteEmail: 'guiasc@email.com',
    clienteTelefone: '(47) 98877-1122',
    valorEstimado: 4800.00,
    probabilidade: 50,
    etapa: 'proposta',
    prioridade: 'alta',
    origem: 'Formulário Web',
    eventoInteresse: 'Kit Pass Linha Turismo 4 Pessoas',
    dataCriacao: '2026-07-15 11:30',
    dataPrevisaoFechamento: '2026-08-05',
    responsavel: 'Carolina Ferraz',
    observacoes: 'Orçamento enviado com desconto progressivo para 15 pax.',

    atividades: [
      { id: 'ACT-10', tipo: 'whatsapp', dataHora: '2026-07-16 15:00', descricao: 'Proposta detalhada enviada no WhatsApp do guia', concluido: true }
    ]
  },
  {
    id: 'OPP-303',
    agentId: 'AGT-2001',
    titulo: 'Reserva Aniversário Mariana Duarte',
    clienteNome: 'Mariana Duarte (Pacote Aniversário)',
    clienteEmail: 'mariana.duarte@email.com',
    clienteTelefone: '(41) 99222-1100',
    valorEstimado: 1800.00,
    probabilidade: 100,
    etapa: 'fechado_ganho',
    prioridade: 'media',
    origem: 'Reativação WhatsApp',
    eventoInteresse: 'Jantar Dançante Madalosso Batel',
    dataCriacao: '2026-07-18 10:00',
    dataPrevisaoFechamento: '2026-07-20',
    responsavel: 'Carolina Ferraz',
    observacoes: 'Venda realizada com sucesso via PIX.',

    atividades: [
      { id: 'ACT-20', tipo: 'whatsapp', dataHora: '2026-07-20 16:30', descricao: 'Vouchers emitidos e entregues', concluido: true }
    ]
  },
  {
    id: 'OPP-304',
    agentId: 'AGT-2001',
    titulo: 'Novo Lead Evento Cervejeiro Executivo',
    clienteNome: 'Clube de Cerveja Curitiba',
    clienteEmail: 'contato@clubecerveja.com.br',
    clienteTelefone: '(41) 99333-8899',
    valorEstimado: 2500.00,
    probabilidade: 30,
    etapa: 'qualificado',
    prioridade: 'media',
    origem: 'Campanha Instagram',
    eventoInteresse: 'Tour Cervejeiro Curitiba',
    dataCriacao: '2026-07-21 08:30',
    dataPrevisaoFechamento: '2026-08-10',
    responsavel: 'Carolina Ferraz',
    observacoes: 'Lead qualificado com interesse para meados de Agosto.',

    atividades: [
      { id: 'ACT-30', tipo: 'ligacao', dataHora: '2026-07-22 10:00', descricao: 'Agendar primeira chamada de qualificação', concluido: false }
    ]
  }
];
