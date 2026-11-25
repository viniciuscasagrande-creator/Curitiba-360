export const PARTNER_ROLES = {
  owner: {
    label: "Proprietário",
    permissions: ["*"],
  },

  admin: {
    label: "Administrador",
    permissions: [
      "dashboard.view",
      "profile.manage",
      "team.manage",
      "products.manage",
      "orders.manage",
      "financial.view",
      "reports.view",
    ],
  },

  manager: {
    label: "Gestor",
    permissions: [
      "dashboard.view",
      "products.manage",
      "orders.manage",
      "reports.view",
    ],
  },

  operational: {
    label: "Operacional",
    permissions: [
      "dashboard.view",
      "orders.view",
      "tickets.validate",
    ],
  },

  financial: {
    label: "Financeiro",
    permissions: [
      "dashboard.view",
      "financial.view",
      "financial.manage",
      "reports.view",
    ],
  },

  marketing: {
    label: "Marketing",
    permissions: [
      "dashboard.view",
      "marketing.manage",
      "reports.view",
    ],
  },

  support: {
    label: "Atendimento",
    permissions: [
      "orders.view",
      "customers.view",
      "support.manage",
    ],
  },

  viewer: {
    label: "Somente leitura",
    permissions: [
      "dashboard.view",
      "orders.view",
      "reports.view",
    ],
  },
};
