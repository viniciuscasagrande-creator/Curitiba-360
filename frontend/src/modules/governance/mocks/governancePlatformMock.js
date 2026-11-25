export const governancePlatformMock = {
  kpis: {
    strategicScore: 89,
    objectivesOnTrack: 14,
    objectivesAtRisk: 2,
    objectivesDelayed: 1,
    okrsAchievedPct: 78,
    kpisOnTarget: 24,
    kpisCritical: 3,
    revenueRealized: 45200000,
    operatingMargin: 22.4,
    consumedBudget: 28400000,
    realizedBenefit: 14800000,
    criticalRisks: 2,
    ineffectiveControls: 1,
    pendingObligations: 4,
    openAudits: 2,
    pendingResolutions: 3,
    delayedActionPlans: 2,
    governanceIndex: 94,
    complianceIndex: 92,
    esgIndex: 88
  },

  objectives: [
    { id: "obj-01", perspective: "finance", title: "Garantir autossuficiência financeira operacional", progress: 85, status: "on_track" },
    { id: "obj-02", perspective: "customer", title: "Atingir NPS de 75 no turismo receptivo", progress: 92, status: "on_track" },
    { id: "obj-03", perspective: "process", title: "Digitalizar 100% dos serviços urbanos", progress: 68, status: "attention" }
  ],

  okrs: [
    { id: "okr-01", title: "Expandir o modelo de governança integrada ESG", progress: 75, owner: "Sofia Santos", keyResults: [
      { id: "kr-01", description: "Reduzir consumo de papel corporativo em 90%", target: 90, current: 80, progress: 88 },
      { id: "kr-02", description: "Capacitar 100% da diretoria em governança corporativa", target: 100, current: 70, progress: 70 }
    ]}
  ],

  councils: [
    { id: "council-01", name: "Conselho de Administração (CONAD)", type: "administration", membersCount: 9, status: "active" },
    { id: "council-02", name: "Conselho Fiscal", type: "fiscal", membersCount: 5, status: "active" }
  ],

  committees: [
    { id: "committee-01", name: "Comitê de Riscos e Compliance", membersCount: 6, status: "active" },
    { id: "committee-02", name: "Comitê de Tecnologia e IA", membersCount: 4, status: "active" }
  ],

  meetings: [
    { id: "meet-01", title: "Assembleia Geral Extraordinária CONAD", date: "2026-08-15", time: "14:00", status: "scheduled", location: "Sala Executiva A" },
    { id: "meet-02", title: "Alinhamento Mensal ESG", date: "2026-07-28", time: "10:00", status: "completed", location: "Videoconferência Teams" }
  ],

  resolutions: [
    { id: "res-01", title: "Aprovação do Plano Diretor de TI 2027", status: "approved", votesFor: 8, votesAgainst: 1, abstentions: 0 },
    { id: "res-02", title: "Redirecionamento do Orçamento E-Bus", status: "proposed", votesFor: 0, votesAgainst: 0, abstentions: 0 }
  ],

  risks: [
    { id: "risk-01", title: "Inadequação a regulamentos da ANTT", level: "high", status: "monitored", owner: "Luciano Ramos" },
    { id: "risk-02", title: "Vazamento de dados cadastrais de munícipes", level: "critical", status: "mitigating", owner: "Renata Abreu" }
  ],

  controls: [
    { id: "ctrl-01", title: "Revisão mensal de acessos a dados sensíveis", status: "effective", lastTested: "2026-07-10" },
    { id: "ctrl-02", title: "Verificação de conformidade fiscal de fornecedores", status: "ineffective", lastTested: "2026-06-25" }
  ],

  obligations: [
    { id: "ob-01", title: "Envio de balanço consolidado anual à Receita", dueDate: "2026-09-30", status: "pending" },
    { id: "ob-02", title: "Renovação do certificado digital corporativo", dueDate: "2026-07-25", status: "in_progress" }
  ],

  policies: [
    { id: "pol-01", title: "Código de Conduta Ética e Integridade", version: 3, status: "published" },
    { id: "pol-02", title: "Política de Privacidade e Proteção de Dados", version: 2, status: "under_review" }
  ],

  audits: [
    { id: "aud-01", title: "Auditoria de Controles Financeiros e CAPEX", lead: "Marcos Lima", status: "in_progress", progress: 65 },
    { id: "aud-02", title: "Auditoria de Segurança da Informação", lead: "Juliana Santos", status: "planned", progress: 0 }
  ],

  approvals: [
    { id: "app-01", title: "Contratação de Consultoria de Segurança", requester: "Eduardo Souza", status: "pending" }
  ]
};
