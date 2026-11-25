export const INITIAL_GOVERNANCE_DATA = {
  summary: {
    rtoMinutes: 15, // Recovery Time Objective
    rpoMinutes: 5,  // Recovery Point Objective
    overallSla: "99.98%",
    backupsCount: 14,
    assetsCount: 38,
    pendingChanges: 3
  },

  backups: [
    { id: "bak-001", database: "Firestore Production", size: "450 MB", status: "completed", type: "automated", encrypted: true, timestamp: "2026-07-22T04:00:00Z" },
    { id: "bak-002", database: "PostgreSQL Gateway", size: "1.2 GB", status: "completed", type: "automated", encrypted: true, timestamp: "2026-07-22T05:00:00Z" }
  ],

  raci: [
    { id: "raci-001", process: "Aprovação de Reembolsos", R: "Gerente Financeiro", A: "Diretor Comercial", C: "Auditor Interno", I: "Suporte Técnico" },
    { id: "raci-002", process: "Publicação de Nova Feature", R: "Líder DevOps", A: "DPO & Security Specialist", C: "QA Engineer", I: "Time de Marketing" }
  ],

  slaPolicies: [
    { id: "sla-001", serviceName: "Serviço de Emissão de Ingressos", target: "99.99%", current: "99.99%", status: "compliant" },
    { id: "sla-002", serviceName: "Validação Offline Mobile Sync", target: "99.90%", current: "99.95%", status: "compliant" }
  ],

  changes: [
    { id: "chg-001", description: "Migração de cluster de cache Redis para multi-zona", requestedBy: "DevOps Architect", type: "major", status: "pending_approval", requestedAt: "2026-07-22T12:00:00Z" },
    { id: "chg-002", description: "Atualização de segurança do Node/Vite framework", requestedBy: "Security Engineer", type: "minor", status: "approved", requestedAt: "2026-07-22T14:30:00Z" }
  ]
};
