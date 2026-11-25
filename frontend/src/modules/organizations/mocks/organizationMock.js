export const initialOrganizations = [
  {
    id: "org-curitiba-turismo",
    name: "Curitiba Turismo S/A",
    slug: "curitiba-turismo",
    document: "12.345.678/0001-90",
    status: "active",
    plan: "white_label",
    timezone: "America/Sao_Paulo",
    currency: "BRL",
    locale: "pt-BR",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    branding: {
      primaryColor: "#059669",
      secondaryColor: "#10b981",
      backgroundColor: "#f9fafb",
      font: "Inter",
      borderRadius: "16px",
      theme: "light",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aba9?w=100&h=100&fit=crop"
    },
    companies: [
      {
        id: "comp-passeios-ctba",
        legalName: "Passeios Curitiba LTDA",
        tradeName: "Passeios Curitiba",
        document: "98.765.432/0001-10",
        email: "financeiro@passeiosctba.com",
        phone: "(41) 3333-4444",
        status: "active"
      }
    ],
    branches: [
      {
        id: "branch-centro",
        companyId: "comp-passeios-ctba",
        name: "Filial Centro Histórico",
        city: "Curitiba",
        state: "PR",
        country: "Brasil",
        address: "Rua XV de Novembro, 1500",
        status: "active"
      }
    ],
    domains: [
      { id: "dom-1", hostname: "ingressos.curitibaturismo.com.br", verified: true, ssl: true }
    ],
    billing: {
      planName: "White Label",
      nextBilling: "2026-08-22",
      usage: {
        users: 18,
        usersLimit: 50,
        events: 12,
        eventsLimit: 30,
        apiRequests: 85000,
        apiLimit: 200000
      }
    }
  },
  {
    id: "org-eventos-parques",
    name: "Eventos Parques Paraná",
    slug: "eventos-parques",
    document: "22.333.444/0001-55",
    status: "active",
    plan: "professional",
    timezone: "America/Sao_Paulo",
    currency: "BRL",
    locale: "pt-BR",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    branding: {
      primaryColor: "#2563eb",
      secondaryColor: "#3b82f6",
      backgroundColor: "#f8fafc",
      font: "Inter",
      borderRadius: "12px",
      theme: "light",
      logo: ""
    },
    companies: [
      {
        id: "comp-parques-pr",
        legalName: "Parques e Atrações PR S.A.",
        tradeName: "Parques Paraná",
        document: "33.222.111/0001-22",
        email: "contato@parquespr.com",
        phone: "(41) 3222-1111",
        status: "active"
      }
    ],
    branches: [
      {
        id: "branch-barigui",
        companyId: "comp-parques-pr",
        name: "Bilheteria Parque Barigui",
        city: "Curitiba",
        state: "PR",
        country: "Brasil",
        address: "Av. Cândido Hartmann, S/N",
        status: "active"
      }
    ],
    domains: [
      { id: "dom-2", hostname: "ingressos.parquespr.com", verified: false, ssl: false }
    ],
    billing: {
      planName: "Professional",
      nextBilling: "2026-08-15",
      usage: {
        users: 4,
        usersLimit: 10,
        events: 3,
        eventsLimit: 5,
        apiRequests: 12000,
        apiLimit: 50000
      }
    }
  }
];
export default initialOrganizations;
