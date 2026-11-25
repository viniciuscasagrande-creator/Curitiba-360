export const aiPlatformMock = {
  summary: {
    executionsToday: 18420,
    activeAgents: 12,
    indexedDocuments: 28640,
    successRate: 97.4,
    averageLatencyMs: 1840,
    monthlyCost: 18450.7,
    monthlyBudget: 30000,
    blockedResponses: 42,
    fallbackRate: 2.1,
    averageEvaluationScore: 4.6
  },

  agents: [
    {
      id: "agent-001",
      name: "Assistente do Turista",
      type: "tourism",
      model: "Google Gemini 1.5 Pro",
      status: "active",
      executionsToday: 6840,
      successRate: 98.2,
      averageLatencyMs: 1540,
      description: "Planeja roteiros, localiza atrativos e consulta clima e ingressos.",
      temperature: 0.7,
      maxTokens: 2048,
      allowedTools: ["buscar_atrativos", "consultar_clima", "gerar_roteiro"],
      humanApproval: false
    },
    {
      id: "agent-002",
      name: "Agente de Suporte",
      type: "support",
      model: "Google Gemini 1.5 Flash",
      status: "active",
      executionsToday: 5260,
      successRate: 97.8,
      averageLatencyMs: 1280,
      description: "Responde dúvidas de pedidos, reembolsos e problemas de check-in.",
      temperature: 0.3,
      maxTokens: 1024,
      allowedTools: ["consultar_pedido", "gerar_ticket_suporte"],
      humanApproval: true
    },
    {
      id: "agent-003",
      name: "Agente de BI",
      type: "bi",
      model: "OpenAI GPT-4o",
      status: "testing",
      executionsToday: 740,
      successRate: 94.6,
      averageLatencyMs: 3420,
      description: "Análise analítica de vendas de ingressos por categoria de atrativo.",
      temperature: 0.0,
      maxTokens: 4096,
      allowedTools: ["executar_query_sql"],
      humanApproval: false
    }
  ],

  alerts: [
    {
      id: "alert-001",
      severity: "warning",
      title: "Consumo acima do esperado",
      description: "O Agente de Marketing consumiu 28% mais tokens nas últimas 24 horas."
    },
    {
      id: "alert-002",
      severity: "info",
      title: "Base desatualizada",
      description: "A Base de Políticas não é indexada há sete dias."
    }
  ],

  models: [
    { id: "mod-01", provider: "gemini", modelName: "Gemini 1.5 Pro", inputCost: 7.00, outputCost: 21.00, active: true, priority: 1 },
    { id: "mod-02", provider: "openai", modelName: "GPT-4o", inputCost: 5.00, outputCost: 15.00, active: true, priority: 2 }
  ],

  providers: [
    { id: "prov-01", name: "Google Gemini", status: "online", latencyMs: 120 },
    { id: "prov-02", name: "OpenAI Gateway", status: "online", latencyMs: 310 }
  ],

  prompts: [
    { id: "pr-01", name: "System Assistente do Turista", type: "system", version: 4, template: "Você é o guia local de Curitiba...", status: "active" },
    { id: "pr-02", name: "System Agente Suporte", type: "system", version: 2, template: "Você auxilia no pós-venda...", status: "active" }
  ],

  knowledgeBases: [
    { id: "kb-01", name: "Manual de Atrativos de Curitiba", sourceType: "documents", documentCount: 145, chunkCount: 3200, status: "ready" },
    { id: "kb-02", name: "Regras de Cancelamento e Reembolso", sourceType: "support", documentCount: 12, chunkCount: 180, status: "ready" }
  ],

  executions: [
    { id: "exec-01", agentName: "Assistente do Turista", status: "completed", inputTokens: 420, outputTokens: 890, estimatedCost: 0.015, latencyMs: 1540, guardrailResult: "approved" },
    { id: "exec-02", agentName: "Agente de Suporte", status: "blocked", inputTokens: 120, outputTokens: 0, estimatedCost: 0.001, latencyMs: 250, guardrailResult: "blocked" }
  ],

  evaluations: [
    { id: "eval-01", metric: "Aderência ao contexto", score: 4.8, status: "aprovada" },
    { id: "eval-02", metric: "Taxa de alucinação", score: 0.02, status: "aprovada" }
  ],

  budgets: [
    { id: "bud-01", scope: "Marketing Agent", maximumAmount: 5000, currentAmount: 1845, status: "green" },
    { id: "bud-02", scope: "BI Analytics", maximumAmount: 2000, currentAmount: 1980, status: "warning" }
  ],

  guardrails: [
    { id: "gr-01", name: "Filtro PII", type: "input", status: "active", blockedAttempts: 12 },
    { id: "gr-02", name: "Detector Prompt Injection", type: "input", status: "active", blockedAttempts: 8 }
  ]
};
