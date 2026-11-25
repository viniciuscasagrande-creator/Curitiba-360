export const INITIAL_SUPPORT_DATA = {
  summary: {
    openTickets: 14,
    pendingTickets: 8,
    resolvedTickets: 120,
    slaCompliantPercent: 96.5,
    slaViolatedCount: 2,
    avgResponseMinutes: 12,
    avgResolutionHours: 4.8,
    csatPercent: 94,
    npsScore: 78,
    riskCustomersCount: 3,
    activeIncidentsCount: 0
  },

  tickets: [
    { id: "tick-01", customerId: "usr-cust-91", subject: "Cobrança duplicada no Pix", description: "O cliente gerou dois QRCodes Pix e pagou ambos por engano, necessita reembolso.", category: "Financeiro", priority: "high", status: "novo", assignedAgent: null, slaStatus: "compliant", createdAt: "2026-07-22T14:00:00Z" },
    { id: "tick-02", customerId: "usr-cust-12", subject: "QRCode de Ingresso inválido no validador", description: "O validador acusou código expirado ao tentar realizar check-in no Museu Oscar Niemeyer.", category: "Ingresso", priority: "critical", status: "em_atendimento", assignedAgent: "usr-agent-02", slaStatus: "compliant", createdAt: "2026-07-22T15:30:00Z" }
  ],

  slas: [
    { id: "sla-crit", name: "Crítico", firstResponseMinutes: 15, resolutionMinutes: 120, priority: "critical" },
    { id: "sla-high", name: "Alto", firstResponseMinutes: 30, resolutionMinutes: 240, priority: "high" },
    { id: "sla-norm", name: "Normal", firstResponseMinutes: 60, resolutionMinutes: 480, priority: "normal" }
  ],

  healthScores: [
    { customerId: "part-01", name: "Hotel Curitiba Premium", score: 48, risk: "high", lastInteraction: "2026-07-20T10:00:00Z", nextAction: "Oferecer treinamento operacional do novo Portal." },
    { customerId: "part-02", name: "Museu Oscar Niemeyer (MON)", score: 95, risk: "low", lastInteraction: "2026-07-22T15:35:00Z", nextAction: "Acompanhamento mensal padrão." }
  ],

  articles: [
    { id: "art-01", title: "Como solicitar reembolso de Pix duplicado", slug: "reembolso-pix", category: "Financeiro", content: "Para solicitar reembolso, o cliente deve enviar os dois comprovantes de Pix contendo o ID da transação da prefeitura...", author: "Suporte Técnico", published: true, updatedAt: "2026-07-20T10:00:00Z" },
    { id: "art-02", title: "Configuração de roteador offline para check-in de ingressos", slug: "checkin-offline", category: "Operação", content: "Nosso validador suporta sincronização offline caso o sinal da operadora seja instável. Basta ativar o cache local...", author: "Infraestrutura", published: true, updatedAt: "2026-07-21T12:00:00Z" }
  ],

  incidents: [
    { id: "inc-01", category: "Pagamento", title: "Instabilidade temporária no gateway Pix", impact: "Urgente", status: "resolvido", communicationSent: "E-mail & Push", createdAt: "2026-07-21T14:00:00Z" }
  ],

  surveys: [
    { id: "surv-01", type: "CSAT", score: 5, comment: "Atendimento rápido pelo chat inteligente.", customerId: "usr-cust-91", createdAt: "2026-07-22T14:15:00Z" },
    { id: "surv-02", type: "NPS", score: 9, comment: "Recomendo muito a plataforma.", customerId: "usr-cust-12", createdAt: "2026-07-22T16:00:00Z" }
  ]
};
