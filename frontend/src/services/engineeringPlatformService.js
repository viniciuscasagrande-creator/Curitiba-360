export async function getEngineeringMetrics() {
  return {
    activeServicesCount: 48,
    deploysToday: 26,
    buildSuccessRate: '99,8%',
    leadTimeForChanges: '12 min',
    mttr: '18 min',
    codeCoverage: '92%',
    doraMetrics: {
      deploymentFrequency: '26 deploys/dia (Elite)',
      leadTime: '12 minutos (Elite)',
      changeFailureRate: '0.02% (Elite)',
      timeToRestore: '18 minutos (Elite)'
    },
    services: [
      { name: 'event-service', domain: 'Eventos', owner: 'Team Alpha', language: 'Go / Node.js', status: 'saudavel' },
      { name: 'payment-service', domain: 'Financeiro', owner: 'FinTech Team', language: 'Node.js Express', status: 'saudavel' },
      { name: 'wallet-service', domain: 'Carteira', owner: 'Pass Team', language: 'TypeScript', status: 'saudavel' },
      { name: 'crm-service', domain: 'CRM Customer 360', owner: 'Growth Team', language: 'Python FastAPI', status: 'saudavel' }
    ]
  };
}
