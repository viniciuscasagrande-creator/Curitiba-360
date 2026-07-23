export const marketplaceMock = {
  summary: {
    publishedExtensions: 86,
    activeInstallations: 1248,
    monthlyRevenue: 184900,
    pendingPayouts: 42600,
    activeDevelopers: 37,
    averageRating: 4.6,
    availableUpdates: 12,
    suspendedExtensions: 2
  },

  featuredExtensions: [
    {
      id: "extension-001",
      name: "Integração ERP Pro",
      slug: "integracao-erp-pro",
      shortDescription: "Sincronize inventário, reservas e check-in com seu ERP corporativo.",
      description: "Conector robusto para sincronização bidirecional de dados fiscais, tarifas e ocupação diretamente com os principais ERPs hoteleiros do mercado.",
      category: "erp",
      type: "connector",
      rating: 4.8,
      installations: 328,
      pricingModel: "monthly",
      price: 149.90,
      verified: true,
      featured: true,
      currentVersion: "2.4.1",
      minimumPlatformVersion: ">=1.0.0",
      manifest: {
        name: "curitiba360-erp-pro",
        version: "2.4.1",
        platformVersion: ">=1.0.0",
        entry: "dist/index.js",
        permissions: ["orders.read", "products.write"],
        events: ["order.approved"]
      }
    },
    {
      id: "extension-002",
      name: "WhatsApp Automations",
      slug: "whatsapp-automations",
      shortDescription: "Envie mensagens automáticas pós-compra e alertas de check-in.",
      description: "Automação completa via WhatsApp API para notificar turistas sobre ingressos emitidos e lembrar horários de visitas aos atrativos.",
      category: "communication",
      type: "automation",
      rating: 4.7,
      installations: 496,
      pricingModel: "usage_based",
      price: 0.00,
      verified: true,
      featured: true,
      currentVersion: "1.5.0",
      minimumPlatformVersion: ">=1.0.0",
      manifest: {
        name: "curitiba360-whatsapp-automation",
        version: "1.5.0",
        platformVersion: ">=1.0.0",
        entry: "dist/index.js",
        permissions: ["notifications.send", "orders.read"],
        events: ["order.created"]
      }
    }
  ],

  installedExtensions: [
    {
      id: "installation-001",
      extensionId: "extension-001",
      name: "Integração ERP Pro",
      installedVersion: "2.4.1",
      status: "active",
      updateAvailable: true,
      config: { apiKey: "key_erp_99218", syncIntervalMinutes: 10 }
    }
  ],

  alerts: [
    {
      id: "alert-001",
      severity: "warning",
      title: "Atualização disponível",
      description: "A extensão Integração ERP Pro possui uma nova versão recomendada."
    }
  ],

  logs: [
    { id: "log-ext-01", extensionId: "extension-001", severity: "info", message: "Conector ERP Pro carregado no slot partner.dashboard.sidebar", timestamp: "2026-07-22T16:00:00Z" },
    { id: "log-ext-02", extensionId: "extension-001", severity: "warning", message: "Privilégio de segurança CSP detectado: acesso a host externo restrito.", timestamp: "2026-07-22T15:30:00Z" }
  ],

  payouts: [
    { id: "pay-01", developerId: "dev-01", amount: 42600.00, status: "pending", createdAt: "2026-07-20T10:00:00Z" }
  ]
};
