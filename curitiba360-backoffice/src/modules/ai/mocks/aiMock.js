export const aiMock = {
  kpis: {
    totalConversations: 1420,
    averageResponseTimeMs: 820,
    estimatedCostUsd: 14.80,
    tokensConsumed: 1842000,
    forecastAccuracyPercentage: 94.2,
    insightsGenerated: 420,
    fraudesDetected: 4,
    anomaliesFound: 1,
    reportsCreated: 24
  },
  insights: [
    { id: "ins-001", type: "success", title: "Faturamento em Alta", content: "Seu faturamento cresceu 18% em comparação à semana anterior, impulsionado pelo evento 'Festival de Inverno'." },
    { id: "ins-002", type: "warning", title: "Queda na Conversão", content: "A taxa de conversão do produto 'Linha Turismo' caiu 4% nos últimos 3 dias. Sugerimos revisar o preço ou aplicar cupom promocional." }
  ],
  forecasts: [
    { metric: "Faturamento", period: "Agosto 2026", predictedValue: 420000, confidence: 95 },
    { metric: "Check-ins", period: "Fim de Semana", predictedValue: 12500, confidence: 92 }
  ],
  recommendations: {
    prices: [
      { id: "rec-p1", product: "Parque Tanguá Sunset", currentPrice: 50, suggestedPrice: 58, impact: "+12% Receita", reason: "Demanda alta prevista devido ao clima limpo no fim de semana." }
    ],
    campaigns: [
      { id: "rec-c1", name: "Recuperar Turistas VIP", channel: "WhatsApp", audience: "Turistas inativos há 15 dias", discount: "Cashback 10%", reason: "Alta probabilidade de conversão identificada no perfil." }
    ]
  },
  anomalies: [
    { id: "an-001", title: "Pico de Reembolsos", severity: "high", reason: "Aumento incomum de 12% em reembolsos solicitados na última hora." }
  ],
  frauds: [
    { id: "fr-001", risk: "high", score: 88, reason: "Múltiplas compras com cartões diferentes sob a mesma geolocalização e IP.", status: "under_review" }
  ]
};
export default aiMock;
