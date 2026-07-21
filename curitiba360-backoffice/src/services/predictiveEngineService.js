export async function getAIIntelligenceAlerts() {
  return [
    {
      id: 'ai-alert-101',
      title: 'Previsão de Alta Demanda — Festival Curitiba 360',
      category: 'Revenue Management',
      confidenceScore: '94%',
      insight: 'A procura por ingressos VIP aumentou 38% nas últimas 6h.',
      recommendedAction: 'Ajustar precificação dinâmica do 3º Lote VIP (+12% de margem).'
    },
    {
      id: 'ai-alert-102',
      title: 'Alerta de Prevenção de Churn — Clientes Inativos',
      category: 'CRM & Retention',
      confidenceScore: '86%',
      insight: '3.200 clientes não realizam pedidos há 45 dias.',
      recommendedAction: 'Liberar lote automático de Cashback de R$ 15,00 via WhatsApp.'
    }
  ];
}
