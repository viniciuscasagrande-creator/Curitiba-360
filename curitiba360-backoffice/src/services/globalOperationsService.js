export async function getGlobalOperationsHealth() {
  return {
    globalHealthStatus: '100% Operacional 🌐',
    peakThroughput: '1.250 rps (requisições/seg)',
    activeCapacityRatio: '38% de utilização',
    geoRegions: [
      { region: 'southamerica-east1 (São Paulo)', status: 'primaria', load: '42%', latency: '12ms' },
      { region: 'us-east1 (South Carolina)', status: 'dr_standby', load: '0%', latency: '110ms' }
    ]
  };
}
