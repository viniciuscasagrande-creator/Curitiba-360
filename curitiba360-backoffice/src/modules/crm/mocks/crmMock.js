export const crmMock = {
  kpis: {
    totalCustomers: 12450,
    newCustomers: 320,
    recurringCustomers: 9130,
    activeCustomers: 8540,
    inactiveCustomers: 3910,
    nps: 76,
    averageRating: 4.85,
    openTickets: 14,
    resolvedTickets: 412,
    avgResponseTimeMin: 18,
    avgResolutionTimeHours: 4.2,
    openOpportunities: 45,
    ltv: 240.50
  },
  customers: [
    {
      id: "customer-001",
      name: "Vinicius Casagrande",
      email: "vinicius@curitiba360.com.br",
      phone: "(41) 99999-9999",
      document: "123.***.***-00",
      city: "Curitiba",
      state: "PR",
      status: "active",
      tags: ["VIP", "Morador", "Alta recorrência"],
      score: 95,
      level: "Ouro",
      createdAt: new Date().toISOString()
    },
    {
      id: "customer-002",
      name: "Mariana Souza",
      email: "mariana@gmail.com",
      phone: "(11) 98888-8888",
      document: "456.***.***-11",
      city: "São Paulo",
      state: "SP",
      status: "active",
      tags: ["Turista", "Comprador"],
      score: 60,
      level: "Prata",
      createdAt: new Date().toISOString()
    }
  ],
  tickets: [
    {
      id: "ticket-001",
      subject: "Dúvida sobre cancelamento de ingresso",
      description: "Cliente deseja saber o prazo para solicitar reembolso de show cancelado.",
      status: "open",
      priority: "high",
      assignedTo: "operador-curitiba-01",
      channel: "email",
      createdAt: new Date().toISOString()
    }
  ]
};
