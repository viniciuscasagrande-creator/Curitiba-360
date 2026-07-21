export async function getFinopsMetrics() {
  return {
    monthlyCloudSpend: 'R$ 4.250,00',
    costPerTransaction: 'R$ 0,12',
    budgetVariance: '-8.5% (Abaixo do Orçamento)',
    savingsOpportunity: 'R$ 680,00/mês (Instâncias Reservadas)',
    unitEconomics: 'R$ 1,85 de margem por participante',
    infrastructureBreakdown: [
      { service: 'Firebase Cloud Functions & Firestore', spend: 'R$ 1.850,00', percentage: '43.5%' },
      { service: 'Google Cloud Storage (Media & Snapshots)', spend: 'R$ 920,00', percentage: '21.6%' },
      { service: 'Mercado Pago & Gateway Infra', spend: 'R$ 880,00', percentage: '20.7%' },
      { service: 'CDN Cloudflare & DNS', spend: 'R$ 600,00', percentage: '14.2%' }
    ]
  };
}

export async function getOperationalContracts() {
  return [
    { id: 'contract-101', vendor: 'Google Cloud Platform (GCP)', slaCommitment: '99.99%', status: 'vigente', renewalDate: '2027-01-15' },
    { id: 'contract-102', vendor: 'Mercado Pago Gateway', slaCommitment: '99.95%', status: 'vigente', renewalDate: '2026-12-01' },
    { id: 'contract-103', vendor: 'Cloudflare Enterprise CDN', slaCommitment: '100.00%', status: 'vigente', renewalDate: '2026-10-20' }
  ];
}
