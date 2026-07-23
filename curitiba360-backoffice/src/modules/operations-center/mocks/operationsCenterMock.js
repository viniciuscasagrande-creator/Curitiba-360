export const operationsCenterMock = {
  summary: {
    activeEvents: 8,
    openAttractions: 24,
    salesLast15Minutes: 486,
    checkinsLast15Minutes: 1724,
    currentOccupancy: 28460,
    maximumCapacity: 38500,
    activeIncidents: 7,
    criticalIncidents: 1,
    onlineDevices: 184,
    offlineDevices: 6,
    activeTeams: 32,
    operationalSla: 96.8,
    operationalRiskScore: 42
  },

  events: [
    {
      id: "live-event-001",
      name: "Festival Curitiba 360",
      status: "in_progress",
      soldTickets: 18400,
      checkedInTickets: 14280,
      maximumCapacity: 22000,
      currentOccupancy: 13740,
      averageQueueMinutes: 12,
      activeIncidents: 1,
      operationalRiskScore: 38
    },
    {
      id: "live-event-002",
      name: "Circuito Gastronômico",
      status: "gates_open",
      soldTickets: 6800,
      checkedInTickets: 2180,
      maximumCapacity: 8000,
      currentOccupancy: 2060,
      averageQueueMinutes: 7,
      activeIncidents: 0,
      operationalRiskScore: 18
    }
  ],

  incidents: [
    {
      id: "incident-001",
      title: "Instabilidade no portão norte",
      priority: "p2",
      status: "investigating",
      category: "device",
      elapsedMinutes: 18,
      slaRemainingMinutes: 12,
      description: "Leitor de QR Code do portão 3 não está validando ingressos localmente.",
      commanderUserId: "user-01"
    }
  ],

  alerts: [
    {
      id: "alert-001",
      severity: "critical",
      title: "Fila acima do limite",
      description: "O tempo estimado da fila no Portão Norte atingiu 28 minutos.",
      sourceType: "queue",
      status: "active"
    },
    {
      id: "alert-002",
      severity: "warning",
      title: "Dispositivos offline",
      description: "Seis leitores de QR Code estão sem heartbeat.",
      sourceType: "device",
      status: "active"
    }
  ],

  locations: [
    { id: "loc-01", name: "Portão Principal", type: "gate", latitude: -25.4297, longitude: -49.2719, currentOccupancy: 450, maximumCapacity: 1000, status: "open" },
    { id: "loc-02", name: "Estacionamento VIP", type: "parking", latitude: -25.4302, longitude: -49.2725, currentOccupancy: 180, maximumCapacity: 200, status: "busy" }
  ],

  queues: [
    { id: "q-01", name: "Fila Geral Portão A", type: "entrance", estimatedPeople: 120, estimatedWaitMinutes: 14, status: "normal" },
    { id: "q-02", name: "Fila Bilheteria Central", type: "ticket_office", estimatedPeople: 85, estimatedWaitMinutes: 22, status: "high" }
  ],

  devices: [
    { id: "dev-01", name: "Catraca Sul 01", type: "turnstile", status: "online", batteryLevel: 92, signalStrength: 85 },
    { id: "dev-02", name: "Totem Central 02", type: "kiosk", status: "offline", batteryLevel: 0, signalStrength: 0 }
  ],

  teams: [
    { id: "team-01", name: "Brigada de Segurança Sul", department: "Segurança", plannedMembers: 12, activeMembers: 12, status: "active" },
    { id: "team-02", name: "Suporte Tecnológico", department: "Suporte Técnico", plannedMembers: 4, activeMembers: 3, status: "reduced" }
  ],

  contingencyPlans: [
    { id: "plan-01", name: "Fallback de Validação Offline", description: "Procedimento para quando a internet de fibra local falhar.", status: "approved" }
  ],

  services: [
    { id: "srv-01", name: "API de Validação de Acesso", availability: 99.98, latencyMs: 42, errorRate: 0.01, status: "operational" },
    { id: "srv-02", name: "Gateway de Processamento", availability: 94.50, latencyMs: 480, errorRate: 5.20, status: "degraded" }
  ],

  reports: [
    { id: "rep-01", eventName: "Festival Curitiba 360", date: "2026-07-20", sales: 18400, revenue: 920000, checkins: 14280, slaCompliance: 96.8 }
  ]
};
