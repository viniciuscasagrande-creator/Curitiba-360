export const roadmapMock = {
  summary: {
    activeInitiatives: 24,
    completedInitiatives: 18,
    initiativesAtRisk: 4,
    plannedInvestment: 4800000,
    actualInvestment: 3120000,
    projectedRevenue: 12400000,
    activeCities: 1,
    plannedCities: 4,
  },

  objectives: [
    {
      id: "objective-001",
      title: "Consolidar o Curitiba 360 em Curitiba",
      progress: 72,
      status: "active",
      description: "Foco no produto principal, mobile, BI corporativo e qualidade.",
      period: "year",
      keyResults: [
        { id: "kr-01", title: "Lançar em 3 novas cidades", targetValue: 3, currentValue: 1, unit: "cidades", progress: 33 },
        { id: "kr-02", title: "Cadastrar 300 parceiros", targetValue: 300, currentValue: 216, unit: "parceiros", progress: 72 }
      ]
    },
    {
      id: "objective-002",
      title: "Expandir para a Região Metropolitana",
      progress: 28,
      status: "at_risk",
      description: "Lançamento de pilotos em Pinhais, Araucária e São José dos Pinhais.",
      period: "semester",
      keyResults: [
        { id: "kr-03", title: "Cadastrar 50 parceiros metropolitanos", targetValue: 50, currentValue: 14, unit: "parceiros", progress: 28 }
      ]
    },
  ],

  initiatives: [
    {
      id: "initiative-001",
      title: "Aplicativo Curitiba 360",
      description: "Desenvolvimento do App nativo em React Native com recursos offline.",
      strategicPillar: "Experiência do cliente",
      type: "product",
      horizon: "h1",
      status: "in_progress",
      progress: 68,
      impactScore: 9,
      effortScore: 8,
      estimatedInvestment: 250000,
      actualInvestment: 180000,
      expectedRevenue: 1200000,
      actualRevenue: 0,
      dependencies: ["BI Platform"]
    },
    {
      id: "initiative-002",
      title: "Curitiba 360 Pass",
      description: "Passe turístico digital integrado para múltiplos atrativos.",
      strategicPillar: "Receita recorrente",
      type: "product",
      horizon: "h2",
      status: "discovery",
      progress: 18,
      impactScore: 8,
      effortScore: 7,
      estimatedInvestment: 150000,
      actualInvestment: 20000,
      expectedRevenue: 3000000,
      actualRevenue: 0,
      dependencies: ["Checkout Multi-Cloud"]
    },
  ],

  alerts: [
    {
      id: "alert-001",
      severity: "warning",
      title: "Dependência estratégica",
      description: "A iniciativa de recomendação por IA depende da conclusão do Data Warehouse.",
    },
  ],

  scenarios: [
    { id: "scen-01", name: "Cenário Base (Expansão Regional)", description: "Lançamento gradual em 4 cidades com orçamento controlado.", projectedRevenue: 12400000, projectedInvestment: 4800000, projectedUsers: 150000, projectedPartners: 450, projectedCities: 4, riskLevel: "medium", assumptions: ["Estabilidade do Firebase", "Parcerias locais ativas"], initiatives: ["initiative-001", "initiative-002"] }
  ],

  innovationPipeline: [
    { id: "idea-01", title: "Guias Turísticos em Realidade Aumentada (AR)", stage: "prototipo", description: "Visualização de monumentos históricos via câmera do app." },
    { id: "idea-02", title: "Gêmeo Digital (Digital Twin) do Parque Barigui", stage: "triagem", description: "Otimização de rotas de segurança do parque baseado em IoT." }
  ],

  expansionCities: [
    { id: "city-01", name: "Gramado", state: "RS", country: "Brasil", tourismPotential: 9.5, partnerPotential: 8.8, revenuePotential: 9.0, competitionScore: 6.5, operationalComplexity: 7.0, investmentRequired: 350000, overallScore: 8.8, status: "prospecting" },
    { id: "city-02", name: "Pinhais", state: "PR", country: "Brasil", tourismPotential: 7.2, partnerPotential: 7.5, revenuePotential: 6.8, competitionScore: 4.5, operationalComplexity: 3.5, investmentRequired: 80000, overallScore: 7.1, status: "launching" }
  ]
};
