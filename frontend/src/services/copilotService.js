export async function getCopilotInsights() {
  return {
    crmCopilot: {
      customerName: 'João Silva',
      totalPurchases: 12,
      lastPurchaseDays: 45,
      returnProbability: '84%',
      recommendation: 'Enviar benefício VIP de R$ 20 de Cashback via WhatsApp.'
    },
    financeCopilot: {
      predictedRevenue: '↑ 18%',
      cashflowHealth: 'Excelente',
      recommendation: 'Antecipar repasses B2B dos fornecedores credenciados.'
    },
    operationsCopilot: {
      checkinFlow: 'Gargalo detectado na Catraca B (Ópera de Arame)',
      recommendation: 'Abrir Catraca C e redistribuir equipe de apoio.'
    },
    digitalTwin: {
      eventSimulated: 'Festival Curitiba 360 - Noite',
      simulatedAttendees: 15000,
      predictedQueueTime: '3.2 min',
      peakTime: '20:30'
    }
  };
}
