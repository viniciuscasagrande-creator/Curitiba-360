export const INITIAL_GOVERNMENT_DATA = {
  programs: [
    {
      id: "prog-001",
      name: "Bairro Novo da Inovação",
      description: "Infraestrutura de tecnologia e inclusão digital nas comunidades de Curitiba.",
      secretariatId: "sec-tecnologia",
      secretariatName: "Secretaria de Tecnologia e Inovação",
      budget: 15000000,
      status: "active",
      startDate: "2026-01-10",
      endDate: "2028-12-31"
    },
    {
      id: "prog-002",
      name: "Curitiba Carbono Zero",
      description: "Eletrificação do transporte público e ampliação de áreas verdes urbanas.",
      secretariatId: "sec-meio-ambiente",
      secretariatName: "Secretaria do Meio Ambiente",
      budget: 45000000,
      status: "active",
      startDate: "2025-05-01",
      endDate: "2030-12-31"
    },
    {
      id: "prog-003",
      name: "Turismo Conectado",
      description: "Implantação de totens de IA e conectividade total em pontos turísticos.",
      secretariatId: "sec-turismo",
      secretariatName: "Instituto Municipal de Turismo",
      budget: 8000000,
      status: "active",
      startDate: "2026-03-15",
      endDate: "2027-12-31"
    }
  ],
  projects: [
    {
      id: "proj-101",
      programId: "prog-001",
      name: "Faróis do Saber 360",
      scope: "Upgrade de 30 faróis do saber com impressoras 3D e óculos VR.",
      timeline: "Fase 2 de 4",
      teamSize: 12,
      lead: "Carlos Eduardo Ramos",
      budget: 3500000,
      status: "in_progress",
      progress: 60
    },
    {
      id: "proj-102",
      programId: "prog-002",
      name: "Eletrobus Linha Verde",
      scope: "Substituição de 20 ônibus biarticulados por modelos 100% elétricos.",
      timeline: "Fase de testes operacionais",
      teamSize: 18,
      lead: "Marcia Silveira",
      budget: 22000000,
      status: "in_progress",
      progress: 85
    }
  ],
  goals: [
    { id: "goal-1", title: "Reduzir 15% de CO2 no centro", targetValue: "15%", currentValue: "9%", status: "on_track" },
    { id: "goal-2", title: "Digitalizar 100% dos alvarás comerciais", targetValue: "100%", currentValue: "92%", status: "on_track" },
    { id: "goal-3", title: "Atender 500k munícipes no Super App", targetValue: "500k", currentValue: "310k", status: "on_track" }
  ],
  indicators: [
    { id: "ind-1", name: "Índice de Governo Digital (IGD)", value: 92.4, trend: "up", category: "Tecnologia" },
    { id: "ind-2", name: "Satisfação do Cidadão (NPS)", value: 81.2, trend: "up", category: "Qualidade" },
    { id: "ind-3", name: "Execução Orçamentária Geral", value: 76.5, trend: "stable", category: "Finanças" }
  ],
  budget: {
    year: 2026,
    planned: 125000000,
    executed: 95500000,
    committed: 15400000,
    available: 14100000,
    status: "approved"
  },
  contracts: [
    {
      id: "cnt-901",
      vendor: "Consórcio SmartCuritiba",
      object: "Instalação e manutenção de sensores urbanos IoT.",
      value: 12400000,
      duration: "36 meses",
      supervisor: "Jorge H. Prado",
      status: "active"
    },
    {
      id: "cnt-902",
      vendor: "Tecnologia e Cidadania Ltda",
      object: "Desenvolvimento do motor de IA para o portal de serviços.",
      value: 3800000,
      duration: "12 meses",
      supervisor: "Beatriz M. Santos",
      status: "active"
    }
  ],
  procurements: [
    { id: "lic-001", title: "Compra de sensores de ruído ambiental", modality: "Pregão Eletrônico", status: "published" },
    { id: "lic-002", title: "Contratação de link de redundância para CPD", modality: "Concorrência Pública", status: "under_review" }
  ],
  agreements: [
    { id: "conv-001", agency: "Ministério das Cidades", value: 8500000, counterPart: 850000, status: "approved" },
    { id: "conv-002", agency: "Banco Interamericano (BID)", value: 45000000, counterPart: 4500000, status: "in_execution" }
  ],
  ouvidoria: [
    { id: "ouv-101", category: "Reclamação", subject: "Sinalização na Av. Sete de Setembro", status: "pending", date: "2026-07-23" },
    { id: "ouv-102", category: "Sugestão", subject: "Integração de cartão-transporte e estacionamento", status: "responded", date: "2026-07-22" }
  ],
  hearings: [
    { id: "hr-01", title: "Plano de Mobilidade Centro-Norte", date: "2026-08-10", participants: 150, status: "scheduled" },
    { id: "hr-02", title: "Lei Orçamentária Anual (LOA) 2027", date: "2026-09-05", participants: 340, status: "scheduled" }
  ]
};
