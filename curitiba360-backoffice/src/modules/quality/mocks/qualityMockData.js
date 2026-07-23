export const INITIAL_QUALITY_DATA = {
  summary: {
    coveragePercent: 84.6,
    approvedBuilds: 42,
    criticalBugsCount: 2,
    openBugsCount: 8,
    avgFixTimeHours: 14.5,
    regressionRate: "1.2%",
    approvedReleases: 14,
    testsExecuted: 1240,
    testsAutomatedPercent: 92,
    e2eFailuresCount: 0,
    defectEscapeRate: "0.8%"
  },

  releases: [
    { id: "rel-1.2.0", version: "1.2.0", title: "Release Julho - B2B & ESG Integration", status: "review", buildStatus: "passed", qualityGatesPassed: true, approvedBy: null, createdAt: "2026-07-20T10:00:00Z" },
    { id: "rel-1.1.9", version: "1.1.9", title: "Release Junho - Performance Boost", status: "approved", buildStatus: "passed", qualityGatesPassed: true, approvedBy: "usr-pm-01", createdAt: "2026-06-15T08:00:00Z" }
  ],

  testPlans: [
    { id: "tp-01", name: "Plano de Testes - Ciclo de Release B2B", environment: "stage", objective: "Validar integração de novos webhooks de repasse financeiro e faturamento ESG.", scope: ["Checkout PIX", "Cálculo de Pegada Carbono"], ownerUserId: "usr-qa-01", status: "active", plannedStartAt: "2026-07-21", plannedEndAt: "2026-07-24" }
  ],

  testCases: [
    { id: "tc-01", module: "checkout", title: "Simulação de compra via Pix com QRCode dinâmico", preConditions: ["Usuário autenticado", "Carrinho com 1 produto"], steps: ["Clicar em Finalizar", "Selecionar Pix", "Obter QRCode"], expectedResult: "QRCode gerado com expiração de 15 minutos.", priority: "critical", automated: true },
    { id: "tc-02", module: "security", title: "Validação de token JWT expirado", preConditions: ["Token expirado localmente"], steps: ["Tentar acessar rota protegida"], expectedResult: "Redirect para login com limpeza de session storage.", priority: "high", automated: true }
  ],

  bugs: [
    { id: "bug-01", title: "Falha de renderização do mapa em modo offline no Android", severity: "high", priority: "critical", environment: "Android 13", steps: ["Desativar internet", "Abrir mapa de atrações"], expected: "Mapa exibir marcadores offline cacheados.", actual: "Erro de exceção de rede e tela em branco.", screenshots: [], assignedTo: "usr-dev-01", status: "triagem", createdAt: "2026-07-22T10:00:00Z" },
    { id: "bug-02", title: "Duplicidade de Pix pendente no histórico de transações", severity: "medium", priority: "high", environment: "Web Chrome", steps: ["Gerar Pix", "Atualizar página repetidamente"], expected: "Exibir apenas 1 entrada como pendente.", actual: "Exibe múltiplos registros duplicados.", screenshots: [], assignedTo: "usr-dev-02", status: "em_desenvolvimento", createdAt: "2026-07-22T11:30:00Z" }
  ],

  performanceMetrics: {
    lcpSeconds: 1.8,
    cls: 0.04,
    ttfbMs: 120,
    inpMs: 80,
    fps: 60,
    bundleSizeBytes: 1850400,
    memoryUsageMB: 48.5
  },

  accessibilityScan: {
    wcagCompliant: true,
    contrastRatioPassed: true,
    ariaLabelsMissingCount: 0,
    keyboardNavigability: "100%",
    screenReaderScore: "96/100"
  },

  securityScan: {
    sastVulnerabilities: 0,
    scaOutdatedPackages: 2,
    jwtValidationStatus: "secure",
    xssProtectionsEnabled: true,
    rateLimitBlockedIps: 0
  }
};
