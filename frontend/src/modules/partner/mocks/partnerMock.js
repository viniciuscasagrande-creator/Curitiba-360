export const partnerMock = {
  id: "partner-curitiba-001",
  ownerUserId: "user-demo",

  type: "event_producer",
  status: "approved",

  legal: {
    personType: "company",
    legalName: "Experiências Curitiba Ltda.",
    tradeName: "Experiências Curitiba",
    document: "12.345.678/0001-90",
    stateRegistration: null,
    municipalRegistration: "1234567",
  },

  contact: {
    responsibleName: "Responsável Curitiba",
    email: "parceiro@curitiba360.com.br",
    phone: "(41) 3333-3333",
    whatsapp: "(41) 99999-9999",
  },

  address: {
    zipCode: "80000-000",
    street: "Rua das Experiências",
    number: "360",
    complement: "",
    neighborhood: "Centro",
    city: "Curitiba",
    state: "PR",
    country: "Brasil",
  },

  profile: {
    slug: "experiencias-curitiba",
    description:
      "Experiências, eventos e atrações em Curitiba.",
    logo: "/images/partners/experiencias-curitiba-logo.png",
    coverImage: "/images/partners/experiencias-curitiba-cover.jpg",
    website: "https://exemplo.com.br",
    instagram: "@experienciascuritiba",
    facebook: null,
  },

  bankAccount: {
    holderName: "Experiências Curitiba Ltda.",
    holderDocument: "12.345.678/0001-90",
    bankCode: "001",
    bankName: "Banco do Brasil",
    agency: "1234",
    agencyDigit: "5",
    account: "123456",
    accountDigit: "7",
    accountType: "checking",
    pixKeyType: "cnpj",
    pixKey: "12.345.678/0001-90",
    status: "verified",
    rejectionReason: null,
  },

  verification: {
    emailVerified: true,
    documentsVerified: true,
    bankAccountVerified: true,
    identityVerified: true,
  },

  onboarding: {
    currentStep: 8,
    completedSteps: [
      "type",
      "business",
      "responsible",
      "address",
      "profile",
      "documents",
      "bank",
      "review",
    ],
    percentage: 100,
  },

  settings: {
    notifications: true,
    automaticReports: true,
    marketingEmails: false,
  },

  metrics: {
    activeProducts: 12,
    pendingOrders: 8,
    monthlySales: 28450.9,
    availableBalance: 9170.3,
  },

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  approvedAt: new Date().toISOString(),
};
