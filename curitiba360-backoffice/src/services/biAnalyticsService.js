export async function getFunnelMetrics() {
  return [
    { step: 'Visitantes', count: 1000000, conversion: '100%' },
    { step: 'Usuários Cadastrados', count: 350000, conversion: '35%' },
    { step: 'Interessados em Eventos', count: 180000, conversion: '51.4%' },
    { step: 'Início de Checkout', count: 60000, conversion: '33.3%' },
    { step: 'Compradores Efetivos', count: 42000, conversion: '70%' },
    { step: 'Check-in Realizado', count: 38000, conversion: '90.4%' }
  ];
}

export async function getCohortMetrics() {
  return [
    { cohort: 'Jan/2026', d1: '100%', d7: '65%', d30: '42%', d90: '28%' },
    { cohort: 'Fev/2026', d1: '100%', d7: '70%', d30: '48%', d90: '32%' },
    { cohort: 'Mar/2026', d1: '100%', d7: '72%', d30: '50%', d90: '35%' }
  ];
}

export async function getRiskAlerts() {
  return [
    { id: 'risk-1', title: 'Tentativas Anormais de Compra (Score 92/100)', level: 'critico', detail: '15 compras em 2min utilizando cartões distintos.', action: 'Bloqueio preventivo ativado' },
    { id: 'risk-2', title: 'Queda de Conversão no Checkout', level: 'atencao', detail: 'Taxa de checkout caiu para 12% nas últimas 2 horas.', action: 'Investigando latência do Gateway' }
  ];
}
