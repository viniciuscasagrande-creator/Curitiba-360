export const INITIAL_REFUND_POLICIES = {
  limiteValorAutoAprovacao: 100.00,
  maxDiasCompra: 7, // Regra CDC 7 dias
  exigirEventoNaoRealizado: true,
  exigirSemUso: true,
  autoAprovacaoAtiva: true
};

export const INITIAL_REFUND_REQUESTS = [
  {
    id: 'REF-7001',
    pedidoId: 'PED-99801',
    bilheteId: 'TK-889012',
    eventoNome: 'Passeio de Trem Morretes VIP',
    clienteNome: 'Carlos Alberto Spínola',
    clienteEmail: 'carlos.spinola@email.com',
    clienteTelefone: '(41) 99888-7766',
    agencyId: 'AG-1001',
    agenciaNome: 'Tour CWB Premium',
    agenteNome: 'Carolina Ferraz',
    formaPagamento: 'PIX',
    gateway: 'Mercado Pago',
    gatewayTxId: 'MP-PIX-9988771122',
    valorTotal: 450.00,
    taxaRetida: 0.00,
    valorReembolsado: 450.00,
    tipoReembolso: 'total', // total, parcial
    status: 'pendente_financeiro', // solicitado, analise_ia, pendente_financeiro, pendente_produtor, em_processamento, concluido, negado
    motivo: 'Desistência da viagem dentro do prazo legal de 7 dias (Art 49 CDC)',
    dataSolicitacao: '2026-07-21 10:15',
    dataCompra: '2026-07-18 14:00',
    dataEvento: '2026-07-28',
    bilheteUsado: false,

    // Motor IA & Análise de Risco
    scoreRiscoIA: 12, // 0 a 100 (baixo risco)
    recomendacaoIA: 'Aprovação Automática Recomendada',
    fraudeDetectada: false,

    // Timeline de 6 passos (bo-06 / bo-08)
    etapaAtual: 3,
    timeline: [
      { passo: 1, label: 'Solicitado pelo Cliente', data: '2026-07-21 10:15', status: 'concluido', obs: 'Via portal do participante' },
      { passo: 2, label: 'Análise Automática / IA', data: '2026-07-21 10:16', status: 'concluido', obs: 'Validação CDC 7 dias e score de risco baixo (12/100)' },
      { passo: 3, label: 'Análise Financeira', data: '2026-07-21 10:16', status: 'em_andamento', obs: 'Aguardando validação da equipe de tesouraria' },
      { passo: 4, label: 'Análise Produtor', data: null, status: 'pendente', obs: 'Validação de cota do evento' },
      { passo: 5, label: 'Envio ao Gateway', data: null, status: 'pendente', obs: 'Estorno via API Mercado Pago PIX' },
      { passo: 6, label: 'Concluído', data: null, status: 'pendente', obs: 'Comprovante gerado' }
    ],

    historicoAprovacoes: [
      { data: '2026-07-21 10:16', papel: 'Motor IA Curitiba360', acao: 'Aprovado na pré-análise automática', usuario: 'AI Engine v2.4' }
    ]
  },
  {
    id: 'REF-7002',
    pedidoId: 'PED-99750',
    bilheteId: 'TK-888915',
    eventoNome: 'Kit Pass Linha Turismo 4 Pessoas',
    clienteNome: 'Fernanda Albuquerque',
    clienteEmail: 'fernanda.alb@email.com',
    clienteTelefone: '(41) 99111-4433',
    agencyId: 'AG-1001',
    agenciaNome: 'Tour CWB Premium',
    agenteNome: 'Bruno Carvalho',
    formaPagamento: 'Cartão de Crédito',
    gateway: 'Pagar.me',
    gatewayTxId: 'PAGARME-CC-44556677',
    valorTotal: 320.00,
    taxaRetida: 32.00,
    valorReembolsado: 288.00,
    tipoReembolso: 'parcial',
    status: 'concluido',
    motivo: 'Cancelamento por imprevisto de saúde de 1 dos passageiros',
    dataSolicitacao: '2026-07-19 11:00',
    dataCompra: '2026-07-10 09:30',
    dataEvento: '2026-07-25',
    bilheteUsado: false,

    scoreRiscoIA: 25,
    recomendacaoIA: 'Revisão Financeira Necessária',
    fraudeDetectada: false,

    etapaAtual: 6,
    timeline: [
      { passo: 1, label: 'Solicitado pelo Cliente', data: '2026-07-19 11:00', status: 'concluido', obs: 'Solicitação registrada' },
      { passo: 2, label: 'Análise Automática / IA', data: '2026-07-19 11:01', status: 'concluido', obs: 'Encaminhado para retenção de taxa operacional' },
      { passo: 3, label: 'Análise Financeira', data: '2026-07-19 14:20', status: 'concluido', obs: 'Aprovado reembolso parcial com retenção de 10%' },
      { passo: 4, label: 'Análise Produtor', data: '2026-07-19 15:00', status: 'concluido', obs: 'Ingresso devolvido ao inventário' },
      { passo: 5, label: 'Envio ao Gateway', data: '2026-07-19 15:05', status: 'concluido', obs: 'Estorno no Cartão efetuado via Pagar.me' },
      { passo: 6, label: 'Concluído', data: '2026-07-19 15:06', status: 'concluido', obs: 'Comprovante EST-99120 gerado' }
    ],

    historicoAprovacoes: [
      { data: '2026-07-19 14:20', papel: 'Gerente Financeiro', acao: 'Aprovado reembolso parcial (R$ 288,00)', usuario: 'Maria Oliveira' },
      { data: '2026-07-19 15:05', papel: 'Pagar.me Gateway', acao: 'Estorno de R$ 288,00 confirmado no cartão', usuario: 'Gateway Bot' }
    ]
  },
  {
    id: 'REF-7003',
    pedidoId: 'PED-99610',
    bilheteId: 'TK-887500',
    eventoNome: 'Jantar Dançante Madalosso Batel',
    clienteNome: 'Roberto Justus Filho',
    clienteEmail: 'roberto.justus@email.com',
    clienteTelefone: '(11) 98765-4321',
    agencyId: 'AG-1002',
    agenciaNome: 'Batel Turismo & Pass',
    agenteNome: 'Amanda Rossi',
    formaPagamento: 'PIX',
    gateway: 'Stripe',
    gatewayTxId: 'STRIPE-PIX-334455',
    valorTotal: 680.00,
    taxaRetida: 0.00,
    valorReembolsado: 0.00,
    tipoReembolso: 'total',
    status: 'negado',
    motivo: 'Solicitação efetuada após a realização do evento',
    dataSolicitacao: '2026-07-18 18:00',
    dataCompra: '2026-07-05 10:00',
    dataEvento: '2026-07-17',
    bilheteUsado: true,

    scoreRiscoIA: 85, // Alto risco
    recomendacaoIA: 'Rejeição Recomendada (Evento Já Realizado)',
    fraudeDetectada: true,

    etapaAtual: 2,
    timeline: [
      { passo: 1, label: 'Solicitado pelo Cliente', data: '2026-07-18 18:00', status: 'concluido', obs: 'Solicitação recebida' },
      { passo: 2, label: 'Análise Automática / IA', data: '2026-07-18 18:01', status: 'negado', obs: 'Bloqueado por violação de regra: Evento já realizado e bilhete validado no acesso' }
    ],

    historicoAprovacoes: [
      { data: '2026-07-18 18:01', papel: 'Motor de Regras IA', acao: 'Solicitação Negada Automaticamente (Bilhete já utilizado)', usuario: 'AI Engine v2.4' }
    ]
  }
];
