export const INITIAL_GLOBAL_DATA = {
  globalKpis: {
    receitaConsolidadaUsd: 485000.00,
    receitaConsolidadaEur: 420000.00,
    paisesAtivos: 6,
    eventosGlobais: 142,
    moedasSuportadas: ['BRL', 'USD', 'EUR', 'GBP', 'ARS', 'CLP', 'MXN']
  },

  taxasCambio: [
    { par: 'USD/BRL', taxa: 5.42, dataAtualizacao: '21/07/2026 14:35' },
    { par: 'EUR/BRL', taxa: 5.90, dataAtualizacao: '21/07/2026 14:35' },
    { par: 'GBP/BRL', taxa: 7.02, dataAtualizacao: '21/07/2026 14:35' }
  ],

  regrasTributarias: [
    { pais: 'Estados Unidos', imposto: 'Sales Tax (Média)', aliquota: '7.5%', tipo: 'Consumo local' },
    { pais: 'Alemanha', imposto: 'VAT (MwSt)', aliquota: '19.0%', tipo: 'Imposto sobre valor agregado' },
    { pais: 'Argentina', imposto: 'IVA Argentina', aliquota: '21.0%', tipo: 'Imposto sobre valor agregado' },
    { pais: 'Brasil', imposto: 'ISSQN Curitiba', aliquota: '5.0%', tipo: 'Imposto sobre serviços' }
  ],

  latenciasRegionais: [
    { regiao: 'South America (São Paulo)', dataCenter: 'Google Cloud sa-east-1', latenciaMs: 14, status: 'excelente' },
    { regiao: 'US East (N. Virginia)', dataCenter: 'Google Cloud us-east-4', latenciaMs: 65, status: 'excelente' },
    { regiao: 'Europe (Frankfurt)', dataCenter: 'Google Cloud europe-west-3', latenciaMs: 118, status: 'bom' },
    { regiao: 'Asia Pacific (Tokyo)', dataCenter: 'Google Cloud asia-northeast-1', latenciaMs: 240, status: 'estável' }
  ]
};
