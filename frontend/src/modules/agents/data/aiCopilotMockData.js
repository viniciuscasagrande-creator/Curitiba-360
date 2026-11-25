export const INITIAL_AI_COPILOT_DATA = {
  scoredLeads: [
    {
      id: 'SCR-101',
      clienteNome: 'Empresa Tecnologia X',
      eventoInteresse: 'Passeio de Trem Morretes VIP',
      probabilidadeConversao: 88, // %
      scoreNivel: 'Muito Alto 🚀',
      motivoScore: 'Interação constante via WhatsApp e orçamento aceito verbalmente',
      valorPotencial: 9000.00,
      melhorHorarioContato: '14:30 às 16:00',
      canalRecomendado: 'WhatsApp'
    },
    {
      id: 'SCR-102',
      clienteNome: 'Grupo Excursão Santa Catarina',
      eventoInteresse: 'Kit Pass Linha Turismo 4 Pessoas',
      probabilidadeConversao: 65,
      scoreNivel: 'Médio / Alto 📈',
      motivoScore: 'Abriu o e-mail da proposta 3 vezes nas últimas 24 horas',
      valorPotencial: 4800.00,
      melhorHorarioContato: '10:00 às 11:30',
      canalRecomendado: 'Ligação Telefônica'
    },
    {
      id: 'SCR-103',
      clienteNome: 'Clube de Cerveja Curitiba',
      eventoInteresse: 'Tour Cervejeiro Curitiba',
      probabilidadeConversao: 42,
      scoreNivel: 'Médio ⚖️',
      motivoScore: 'Lead novo proveniente de campanha do Instagram',
      valorPotencial: 2500.00,
      melhorHorarioContato: '18:30 às 19:30',
      canalRecomendado: 'WhatsApp'
    }
  ],
  churnAlerts: [
    {
      id: 'CHN-201',
      clienteNome: 'Rodrigo Santoro Filho',
      diasSemComprar: 98,
      ltvHistorico: 680.00,
      riscoChurn: '85% (Crítico)',
      sugestaoIa: 'Enviar cupom de reativação com 15% de desconto no Madalosso',
      cupomSugerido: 'VOLTACWB15'
    },
    {
      id: 'CHN-202',
      clienteNome: 'Fernanda Lima Corp',
      diasSemComprar: 64,
      ltvHistorico: 3400.00,
      riscoChurn: '60% (Atenção)',
      sugestaoIa: 'Disparar mensagem personalizada oferecendo novo passeio de Morretes',
      cupomSugerido: 'VIPREBOOST'
    }
  ],
  automations: [
    {
      id: 'AUT-301',
      nome: 'Follow-up Automático Proposta 48h',
      gatilho: 'Proposta enviada sem resposta há 48 horas',
      acao: 'Disparo de mensagem cortês no WhatsApp',
      status: 'ativa',
      execucoesTotal: 142,
      taxaSucesso: '38% conversões recuperadas'
    },
    {
      id: 'AUT-302',
      nome: 'Parabéns no Aniversário + Cupom',
      gatilho: 'Data de aniversário do cliente CRM',
      acao: 'Envio de WhatsApp com mensagem carinhosa e cupom de R$ 50',
      status: 'ativa',
      execucoesTotal: 89,
      taxaSucesso: '52% compras realizadas'
    },
    {
      id: 'AUT-303',
      nome: 'Lembrete de Embarque Passeio de Trem',
      gatilho: '24 horas antes da data do passeio reservado',
      acao: 'Envio de voucher em PDF + mapa da Estação Rodoferroviária',
      status: 'ativa',
      execucoesTotal: 310,
      taxaSucesso: '99% satisfação'
    }
  ],
  copilotChatHistory: [
    {
      id: 'MSG-1',
      sender: 'ai',
      texto: 'Olá, Carolina! Sou seu Copiloto de Vendas 🤖. Analisei seus dados de hoje: você tem 2 oportunidades com alta chance de fechamento e R$ 2.200 faltantes para bater a meta de Julho. Como posso ajudar agora?',
      timestamp: '13:25'
    }
  ]
};
