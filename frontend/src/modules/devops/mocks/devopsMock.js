export const initialPipelines = [
  {
    id: "pipe-001",
    name: "Web CI/CD Production",
    branch: "main",
    trigger: "push",
    status: "success",
    durationSeconds: 145,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "pipe-002",
    name: "Mobile Build Android",
    branch: "develop",
    trigger: "manual",
    status: "running",
    durationSeconds: 85,
    createdAt: new Date().toISOString()
  },
  {
    id: "pipe-003",
    name: "QA Pipeline Test Suite",
    branch: "release/v2.4.0",
    trigger: "pull_request",
    status: "failed",
    durationSeconds: 210,
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

export const initialFeatureFlags = [
  {
    id: "flag-001",
    name: "new_checkout_flow",
    description: "Habilita o novo fluxo de checkout mobile e PIX rápido.",
    enabled: true,
    percentage: 100,
    environment: "production",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "flag-002",
    name: "ai_smart_recommendations",
    description: "Recomendações baseadas em IA no aplicativo do cliente.",
    enabled: false,
    percentage: 10,
    environment: "production",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

export const initialBackups = [
  {
    id: "bak-001",
    name: "Firestore Auto-Backup Diário",
    sizeBytes: 15482930, // 14.7 MB
    status: "completed",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "bak-002",
    name: "Cloud Storage Backup Mensal",
    sizeBytes: 1420958204, // 1.32 GB
    status: "completed",
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString()
  }
];

export default { initialPipelines, initialFeatureFlags, initialBackups };
