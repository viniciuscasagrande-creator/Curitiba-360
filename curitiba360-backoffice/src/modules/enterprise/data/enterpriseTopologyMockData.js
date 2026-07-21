export const INITIAL_ENTERPRISE_DATA = {
  slaTarget: {
    uptimeAtual: 99.98,
    latenciaApiMs: 18,
    latenciaCheckinMs: 42,
    latenciaPesquisaMs: 65,
    rtoMin: 8,
    rpoMin: 2,
    statusGeral: 'ENTERPRISE_HEALTHY'
  },

  microservices: [
    { id: 'ms-01', nome: 'Event Service', porta: 8001, status: 'online', instancias: 4, cpuUsage: '12%', memUsage: '210 MB' },
    { id: 'ms-02', nome: 'Order Service', porta: 8002, status: 'online', instancias: 6, cpuUsage: '18%', memUsage: '340 MB' },
    { id: 'ms-03', nome: 'Ticket Service', porta: 8003, status: 'online', instancias: 8, cpuUsage: '22%', memUsage: '290 MB' },
    { id: 'ms-04', nome: 'Checkin Service', porta: 8004, status: 'online', instancias: 12, cpuUsage: '35%', memUsage: '410 MB' },
    { id: 'ms-05', nome: 'Payment Service', porta: 8005, status: 'online', instancias: 6, cpuUsage: '14%', memUsage: '310 MB' },
    { id: 'ms-06', nome: 'AI Service (DeepMind)', porta: 8006, status: 'online', instancias: 4, cpuUsage: '45%', memUsage: '1.2 GB' },
    { id: 'ms-07', nome: 'Notification Service', porta: 8007, status: 'online', instancias: 4, cpuUsage: '8%', memUsage: '180 MB' },
    { id: 'ms-08', nome: 'Search Engine (Meili)', porta: 8008, status: 'online', instancias: 3, cpuUsage: '15%', memUsage: '520 MB' }
  ],

  cloudInfra: [
    { componente: 'Google Cloud Run', papel: 'Execução serverless de microsserviços', status: 'ativo', regiao: 'southamerica-east1 (SP)' },
    { componente: 'Pub/Sub Event Bus', papel: 'Barramento assíncrono orientado a eventos', status: 'ativo', msgsSeg: 2400 },
    { componente: 'Redis Enterprise Cache', papel: 'Cache de sessão, rate limit e bilhetagem', status: 'ativo', hitRate: '98.4%' },
    { componente: 'BigQuery Data Warehouse', papel: 'Data Lake e Analytics em tempo real', status: 'ativo', volumeGb: 450 },
    { componente: 'Cloud Armor & WAF', papel: 'Proteção contra DDoS e bots maliciosos', status: 'ativo', bloqueiosSeg: 12 }
  ],

  eventStream: [
    { id: 'EV-PUB-901', evento: 'order.paid', origem: 'Order Service', destino: 'Payment & Ticket Service', horario: '21/07/2026 14:25:01' },
    { id: 'EV-PUB-902', evento: 'ticket.issued', origem: 'Ticket Service', destino: 'Notification Service', horario: '21/07/2026 14:25:02' },
    { id: 'EV-PUB-903', evento: 'checkin.approved', origem: 'Checkin Service', destino: 'Analytics & BigQuery', horario: '21/07/2026 14:25:05' }
  ]
};
