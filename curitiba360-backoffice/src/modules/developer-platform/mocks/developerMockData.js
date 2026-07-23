export const INITIAL_DEVELOPER_DATA = {
  summary: {
    registeredApps: 12,
    apiCallsTotal: 145200,
    callsPerMinute: 120,
    errorRatePercent: 0.12,
    avgLatencyMs: 45,
    activeTokens: 34,
    rateLimitsReachedCount: 3,
    webhooksDispatched: 8400,
    homologatedIntegrations: 8
  },

  apps: [
    { id: "app-01", name: "Integração PMS Hotel Curitiba", description: "Sincronizador automático de check-ins e reservas de hotéis no marketplace.", clientId: "cli_curitiba_pms_923", clientSecret: "sec_••••••••••••••••••••3489", status: "approved", createdAt: "2026-07-20T10:00:00Z" },
    { id: "app-02", name: "Conector Totem Turístico Centro", description: "Widget para venda de ingressos presenciais em totens de atendimento.", clientId: "cli_totem_tur_029", clientSecret: "sec_••••••••••••••••••••9912", status: "pending", createdAt: "2026-07-22T08:00:00Z" }
  ],

  apiKeys: [
    { id: "key-01", applicationId: "app-01", environment: "sandbox", status: "active", lastUsedAt: "2026-07-22T12:00:00Z", expiresAt: "2027-07-20T10:00:00Z" },
    { id: "key-02", applicationId: "app-01", environment: "production", status: "active", lastUsedAt: "2026-07-22T11:45:00Z", expiresAt: "2027-07-20T10:00:00Z" }
  ],

  webhooks: [
    { id: "wh-01", applicationId: "app-01", url: "https://api.pms-hotel.com.br/v1/webhooks/c360", events: ["order.approved", "ticket.checked_in"], secret: "whsec_pms_secret_9988", enabled: true, createdAt: "2026-07-20T11:00:00Z" }
  ],

  plans: [
    { id: "plan-free", name: "Free", limitCalls: 10000, rateLimitMin: 100, enabled: true },
    { id: "plan-starter", name: "Starter", limitCalls: 100000, rateLimitMin: 500, enabled: true },
    { id: "plan-pro", name: "Professional", limitCalls: 1000000, rateLimitMin: 2000, enabled: true }
  ],

  logs: [
    { id: "log-01", status: 200, method: "POST", path: "/v1/tickets/checkin", latencyMs: 42, ip: "186.200.42.1", timestamp: "2026-07-22T16:00:00Z", errorMsg: null },
    { id: "log-02", status: 429, method: "GET", path: "/v1/products", latencyMs: 12, ip: "186.200.42.1", timestamp: "2026-07-22T15:58:00Z", errorMsg: "Rate limit exceeded" }
  ],

  marketplaceItems: [
    { id: "mp-01", title: "Conector Omnibees", type: "Integrações", description: "Canal de distribuição para atualizar tarifas de hotéis parceiros.", author: "Omnibees Team", installsCount: 42, verified: true },
    { id: "mp-02", title: "Widget Clima Curitiba", type: "Widgets", description: "Exibição do clima local nos totens do parceiro.", author: "Curitiba 360", installsCount: 128, verified: true }
  ]
};
