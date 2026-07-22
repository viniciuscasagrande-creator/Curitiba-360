export const observabilityMock = {
  summary: {
    platform: {
      status: "healthy",
      availability: 99.98,
      apdex: 0.94,
    },

    services: {
      total: 14,
      operational: 12,
      degraded: 2,
      unavailable: 0,
    },

    performance: {
      requests: 1842500,
      errorRate: 0.42,
      latencyP50: 184,
      latencyP95: 760,
      latencyP99: 1420,
    },

    operations: {
      failedWebhooks: 14,
      delayedJobs: 2,
      failedJobs: 1,
      queueBacklog: 184,
    },

    incidents: {
      active: 1,
      critical: 0,
      resolvedToday: 2,
    },

    generatedAt:
      new Date().toISOString(),
  },

  services: [
    {
      id: "service-api",
      name: "API principal",
      slug: "main-api",
      category: "backend",
      status: "operational",
      environment: "production",
      endpoint: "/api/health",

      metrics: {
        availability: 99.99,
        latencyP50: 132,
        latencyP95: 540,
        latencyP99: 980,
        errorRate: 0.21,
        requestRate: 842,
      },

      lastCheckAt:
        new Date().toISOString(),

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    },

    {
      id: "service-notifications",
      name: "Notificações",
      slug: "notifications",
      category: "notification",
      status: "degraded",
      environment: "production",
      endpoint: null,

      metrics: {
        availability: 98.72,
        latencyP50: 480,
        latencyP95: 2400,
        latencyP99: 4800,
        errorRate: 3.8,
        requestRate: 124,
      },

      lastCheckAt:
        new Date().toISOString(),

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    },
  ],

  incidents: [
    {
      id: "incident-notifications-001",

      title:
        "Atraso no envio de notificações push",

      description:
        "Parte das notificações está sendo processada com atraso.",

      severity: "sev3",
      status: "monitoring",

      affectedServices: [
        "service-notifications",
      ],

      affectedPartners: [],
      affectedRegions: [
        "south-america-east1",
      ],

      impact: {
        usersAffected: 842,
        ordersAffected: 0,
        revenueAffected: 0,
      },

      commanderId: "admin-operations",
      assignedTeam: "platform",

      startedAt:
        new Date().toISOString(),

      detectedAt:
        new Date().toISOString(),

      resolvedAt: null,
      closedAt: null,

      rootCause:
        "Aumento no tempo de processamento da fila.",

      resolution: null,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    },
  ],

  alerts: [
    {
      id: "alert-notification-latency",

      name:
        "Latência elevada em notificações",

      description:
        "Alerta quando a latência P95 ultrapassa 2 segundos.",

      metric:
        "notifications.latency.p95",

      operator: "greater_than",
      threshold: 2000,
      durationMinutes: 5,

      severity: "warning",

      channels: [
        "dashboard",
        "email",
      ],

      enabled: true,
      cooldownMinutes: 30,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    },
  ],
};
export default observabilityMock;
