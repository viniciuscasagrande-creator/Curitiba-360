export const safetyPlatformMock = {
  summary: {
    activeIncidents: 8,
    criticalIncidents: 1,
    highRisks: 12,
    currentOccupancy: 28460,
    occupancyPercentage: 78.4,
    criticalSectors: 2,
    deniedAccessesToday: 84,
    onlineCameras: 184,
    totalCameras: 192,
    onlineSensors: 268,
    totalSensors: 276,
    activeResponders: 96,
    medicalOccurrencesToday: 18,
    availableAmbulances: 4,
    activeEvacuations: 0,
    missingPersonCases: 1,
    averageResponseMinutes: 3.8,
    operationalRiskScore: 42
  },

  incidents: [
    { id: "incident-001", title: "Lotação elevada no setor Norte", category: "crowd", priority: "high", sector: "Setor Norte", status: "in_progress", affectedPeople: 0, createdAt: "2026-07-25T19:14:00" },
    { id: "incident-002", title: "Pessoa com mal-estar", category: "health", priority: "medium", sector: "Praça Central", status: "controlled", affectedPeople: 1, createdAt: "2026-07-25T19:22:00" }
  ],

  devices: {
    cameras: { online: 184, offline: 6, degraded: 2 },
    sensors: { online: 268, offline: 5, alert: 3 }
  },

  alerts: [
    { id: "alert-001", severity: "high", title: "Setor próximo da capacidade", description: "O Setor Norte atingiu 92% da capacidade autorizada." },
    { id: "alert-002", severity: "warning", title: "Câmeras indisponíveis", description: "Seis câmeras estão sem heartbeat há mais de cinco minutos." }
  ],

  risks: [
    { id: "risk-001", title: "Superlotação no Pórtico de Entrada", category: "crowd", probability: 4, impact: 5, riskScore: 20, level: "critical", status: "identified" },
    { id: "risk-002", title: "Risco de Curto Operacional na Iluminação", category: "electrical", probability: 2, impact: 4, riskScore: 8, level: "moderate", status: "mitigated" }
  ]
};
