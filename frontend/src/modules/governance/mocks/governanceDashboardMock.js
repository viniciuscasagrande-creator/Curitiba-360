export const governanceDashboardMock = {
  summary: {
    criticalServices: 8,
    criticalRisks: 3,
    backupCompliance: 96.4,
    successfulBackups: 248,
    failedBackups: 4,
    openChanges: 7,
    overduePolicies: 2,
    openAudits: 3,
  },
  recovery: {
    averageRtoMinutes: 38,
    averageRpoMinutes: 12,
    lastRestoreTestAt: "2026-07-18T14:30:00.000Z",
    lastRestoreTestStatus: "succeeded",
  },
  criticalServices: [
    {
      id: "service-checkout",
      name: "Checkout",
      rtoMinutes: 30,
      rpoMinutes: 5,
      backupStatus: "compliant",
      continuityStatus: "ready",
    },
    {
      id: "service-checkin",
      name: "Check-in",
      rtoMinutes: 15,
      rpoMinutes: 5,
      backupStatus: "compliant",
      continuityStatus: "ready",
    },
  ],
  alerts: [
    {
      id: "alert-001",
      severity: "critical",
      title: "Backup com falha",
      message: "A última execução do backup financeiro não foi concluída.",
      description: "A última execução do backup financeiro não foi concluída.",
      createdAt: "2026-07-22T04:00:00Z"
    },
    {
      id: "alert-002",
      severity: "warning",
      title: "Política próxima da revisão",
      message: "A política de continuidade deverá ser revisada em 10 dias.",
      description: "A política de continuidade deverá ser revisada em 10 dias.",
      createdAt: "2026-07-22T08:00:00Z"
    },
  ],

  // Extra keys for detail subpages
  policies: [
    { id: "pol-01", code: "POL-SEC-01", title: "Segurança da Informação", version: "2.1", category: "security", status: "published", owner: "SecOps Lead", publishedAt: "2026-01-15T08:00:00Z" },
    { id: "pol-02", code: "POL-BAC-01", title: "Backup e Restauração", version: "1.4", category: "backup", status: "published", owner: "Database Admin", publishedAt: "2026-02-10T10:00:00Z" },
    { id: "pol-03", code: "POL-CON-01", title: "Continuidade de Negócios (BCP)", version: "3.0", category: "continuity", status: "review", owner: "DPO", publishedAt: null }
  ],
  assets: [
    { id: "ast-01", name: "Firestore Cluster Principal", type: "database", criticality: "critical", ownerUserId: "usr-db-01", containsPersonalData: true, containsFinancialData: true, backupRequired: true, rtoMinutes: 15, rpoMinutes: 5, status: "active" },
    { id: "ast-02", name: "API Gateway (Apigee)", type: "api", criticality: "high", ownerUserId: "usr-devops-01", containsPersonalData: false, containsFinancialData: false, backupRequired: true, rtoMinutes: 30, rpoMinutes: 15, status: "active" },
    { id: "ast-03", name: "Repositório Curitiba 365 Core", type: "repository", criticality: "high", ownerUserId: "usr-devops-02", containsPersonalData: false, containsFinancialData: false, backupRequired: true, rtoMinutes: 60, rpoMinutes: 30, status: "active" }
  ],
  risks: [
    { id: "rsk-01", title: "Vazamento de dados por chaves API expostas", category: "security", probability: 2, impact: 5, inherentScore: 10, residualScore: 2, treatment: "mitigate", ownerUserId: "usr-sec-01", mitigationPlan: "Secret Manager automatic rotation and IP restrictions.", status: "treating" },
    { id: "rsk-02", title: "Indisponibilidade de API de Pagamentos parceira", category: "supplier", probability: 3, impact: 4, inherentScore: 12, residualScore: 3, treatment: "mitigate", ownerUserId: "usr-fin-01", mitigationPlan: "Multi-acquirer integration failover setup.", status: "treating" }
  ],
  suppliers: [
    { id: "spl-01", name: "Adyen Pagamentos", criticality: "critical", status: "approved", lastAuditDate: "2026-05-10" },
    { id: "spl-02", name: "SendGrid E-mails", criticality: "medium", status: "approved", lastAuditDate: "2026-06-15" }
  ],
  backupPolicies: [
    { id: "bp-01", name: "Política Diária Banco de Dados", assetIds: ["ast-01"], frequency: "daily", backupType: "full", retentionDays: 30, encrypted: true, immutable: true, crossRegion: true, enabled: true },
    { id: "bp-02", name: "Política Horária Logs API", assetIds: ["ast-02"], frequency: "hourly", backupType: "incremental", retentionDays: 7, encrypted: true, immutable: false, crossRegion: false, enabled: true }
  ],
  backupExecutions: [
    { id: "be-01", policyId: "bp-01", startedAt: "2026-07-22T02:00:00Z", finishedAt: "2026-07-22T02:15:00Z", status: "succeeded", sizeBytes: 1548200400, checksum: "a1b2c3d4e5f6", storageLocation: "gs://curitiba360-backups-prod", encrypted: true, errorMessage: null },
    { id: "be-02", policyId: "bp-02", startedAt: "2026-07-22T15:00:00Z", finishedAt: "2026-07-22T15:02:00Z", status: "succeeded", sizeBytes: 4582010, checksum: "f6e5d4c3b2a1", storageLocation: "gs://curitiba360-backups-logs", encrypted: true, errorMessage: null }
  ],
  restoreTests: [
    { id: "rt-01", backupExecutionId: "be-01", assetId: "ast-01", environment: "isolated", finishedAt: "2026-07-21T09:12:00Z", expectedRtoMinutes: 15, actualRtoMinutes: 12, expectedRpoMinutes: 5, actualRpoMinutes: 4, integrityValidated: true, applicationValidated: true, status: "succeeded", notes: "Restauração de volume do Firestore realizada com sucesso no sandbox isolado." }
  ],
  changeRequests: [
    { id: "rfc-01", title: "Migração de cluster de cache Redis para multi-zona", description: "Configurar réplica em zona Secundária para tolerância a falhas físicas.", type: "normal", riskLevel: "high", affectedAssetIds: ["ast-02"], implementationPlan: "Script de provisionamento Terraform.", testPlan: "Ping teste e chaveamento manual no staging.", rollbackPlan: "Rollback dns para zona primária anterior.", requestedBy: "usr-devops-01", approvedBy: "usr-secops-leader", status: "approved" }
  ],
  slaPolicies: [
    { id: "sla-01", serviceName: "Serviço de Emissão de Ingressos", target: "99.99%", current: "99.99%", status: "compliant" },
    { id: "sla-02", serviceName: "Validação Offline Mobile Sync", target: "99.90%", current: "99.95%", status: "compliant" }
  ],
};

export const INITIAL_GOVERNANCE_DASHBOARD_MOCK = governanceDashboardMock;
