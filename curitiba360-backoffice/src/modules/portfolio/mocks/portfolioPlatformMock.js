export const portfolioPlatformMock = {
  kpis: {
    activeProjects: 42,
    completedProjects: 128,
    delayedProjects: 3,
    criticalProjects: 2,
    activeRoadmaps: 8,
    totalInvestment: 18450000,
    consumedBudget: 11200000,
    forecastBenefit: 28900000,
    realizedBenefit: 8400000,
    okrsAchievedPct: 76,
    activeInitiatives: 15,
    openDemands: 24,
    teamCapacityPct: 88,
    averageVelocity: 34,
    innovationIndex: 8.4,
    strategicScore: 92
  },

  ideas: [
    { id: "idea-101", title: "Integração NFC nos Ônibus de Turismo", description: "Permitir embarque direto com cartões de crédito e celulares via aproximação nos ônibus Linha Turismo.", category: "Mobilidade", votes: 142, status: "screening", author: "Eduardo Souza" },
    { id: "idea-102", title: "Totens Digitais com IA em Praças", description: "Disponibilizar totens interativos com agente de recomendação inteligente nas principais praças da cidade.", category: "Turismo", votes: 98, status: "evaluation", author: "Ana Rocha" }
  ],

  businessCases: [
    { id: "bc-201", title: "Eletrificação de 100% da Linha Turismo", investment: 4500000, benefit: 12000000, roi: 2.6, payback: 36, risk: "medium", priority: "high", status: "approved" },
    { id: "bc-202", title: "Plataforma Unified Commerce Curitiba", investment: 1200000, benefit: 3500000, roi: 2.9, payback: 18, risk: "low", priority: "medium", status: "draft" }
  ],

  programs: [
    { id: "prog-01", name: "Curitiba Carbono Zero 2030", budget: 8500000, projectsCount: 5, progress: 62 },
    { id: "prog-02", name: "Smart Mobility & Autonomous Trafic", budget: 6000000, projectsCount: 3, progress: 45 }
  ],

  projects: [
    { id: "proj-001", name: "Estação Tubo Inteligente Central", programId: "prog-02", budget: 1500000, forecast: 1480000, status: "execution", priority: "high", progress: 75, risk: "low" },
    { id: "proj-002", name: "Eletrificação do Eixo Sul", programId: "prog-01", budget: 3000000, forecast: 3200000, status: "planning", priority: "critical", progress: 20, risk: "high" }
  ],

  risks: [
    { id: "risk-01", title: "Atraso no fornecimento de baterias elétricas", probability: "high", impact: "high", mitigation: "Parcerias locais de montagem", owner: "Carlos Silva", status: "active" },
    { id: "risk-02", title: "Instabilidade na cobertura 5G urbana", probability: "medium", impact: "medium", mitigation: "Instalar repetidores dedicados", owner: "Renata Abreu", status: "mitigated" }
  ],

  benefits: [
    { id: "ben-01", description: "Redução de 12% na emissão de CO2 centrais", type: "environmental", targetValue: "12% CO2", achievedValue: "8%", status: "on_track" },
    { id: "ben-02", description: "Aumento de 20% no ticket médio turístico", type: "financial", targetValue: "R$ 450", achievedValue: "R$ 380", status: "achieved" }
  ],

  resources: [
    { id: "res-01", name: "Squad Alpha (Mobilidade)", membersCount: 8, allocationPct: 100, competency: "IoT & Telecom" },
    { id: "res-02", name: "Squad Beta (Devs Core)", membersCount: 6, allocationPct: 80, competency: "Cloud & Frontend" }
  ]
};
