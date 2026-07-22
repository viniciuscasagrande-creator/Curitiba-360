export const apiMock = {
  metrics: {
    totalCalls: 128450,
    averageLatencyMs: 142,
    errorRatePercentage: 0.12,
    rateLimitedCalls: 45,
    installedApps: 18,
    activeWebhooks: 6,
    webhookDeliveries: 18420,
    webhookFailures: 8,
    activeIntegrations: 12
  },
  apiKeys: [
    {
      id: "key-001",
      name: "Integração Tiny ERP",
      prefix: "c360_live_a1b2...",
      status: "active",
      permissions: ["products.read", "orders.read", "orders.write"],
      lastUsedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  ],
  webhooks: [
    {
      id: "web-001",
      url: "https://api.tiny.com.br/webhooks/c360",
      events: ["order.created", "order.paid"],
      status: "active",
      createdAt: new Date().toISOString()
    }
  ],
  marketplaceApps: [
    { id: "app-ga4", name: "Google Analytics 4", category: "Analytics", description: "Envie dados de conversão e eventos de compra.", status: "installed" },
    { id: "app-rd", name: "RD Station CRM", category: "CRM", description: "Sincronize contatos, compras e tickets automaticamente.", status: "installed" }
  ]
};
export default apiMock;
