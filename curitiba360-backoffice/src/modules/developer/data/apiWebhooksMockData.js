export const INITIAL_DEVELOPER_DATA = {
  apiKeys: [
    {
      id: 'KEY-001',
      nome: 'Integração Agência Turística Exemplo',
      key: 'curitiba360_demo_key',
      parceiro: 'Serra Verde Express LTDA',
      status: 'ativo',
      criadoEm: '2026-07-01',
      escopos: ['events:read', 'orders:read', 'orders:write', 'webhooks:read', 'webhooks:write'],
      taxaLimiteReqMin: 100
    },
    {
      id: 'KEY-002',
      nome: 'Integração E-Commerce Parceiro',
      key: 'curitiba360_live_sec_8849',
      parceiro: 'Guia Curitiba Cultural',
      status: 'ativo',
      criadoEm: '2026-07-10',
      escopos: ['events:read', 'checkins:read'],
      taxaLimiteReqMin: 60
    }
  ],

  webhooks: [
    {
      id: 'WH-01',
      targetUrl: 'https://api.agenciaparter.com.br/webhooks/curitiba360',
      secretHmac: 'whsec_778491029384710293847',
      eventosInscritos: ['order.paid', 'ticket.issued', 'checkin.approved'],
      status: 'ativo',
      criadoEm: '2026-07-15'
    }
  ],

  deliveryLogs: [
    {
      id: 'LOG-WH-101',
      webhookId: 'WH-01',
      evento: 'ticket.issued',
      statusHttp: 200,
      tentativas: 1,
      horario: '21/07/2026 14:05:12',
      hmacSignature: 'sha256=a8f9c4d2e1b3f5a7e9c0b1d3f5a7e9c0',
      payloadSnippet: '{"event":"ticket.issued","code":"CTB-OFF-001","buyer":"Ana Beatriz"}'
    },
    {
      id: 'LOG-WH-102',
      webhookId: 'WH-01',
      evento: 'checkin.approved',
      statusHttp: 200,
      tentativas: 1,
      horario: '21/07/2026 14:08:45',
      hmacSignature: 'sha256=b9e0f5a6b7c8d9e0f5a6b7c8d9e0f5a6',
      payloadSnippet: '{"event":"checkin.approved","turnstile":"GATE-01"}'
    }
  ],

  openApiSpec: {
    openapi: '3.1.0',
    info: {
      title: 'Curitiba 360 Public API v1',
      version: '1.0.0',
      description: 'API REST para integração de vendas, eventos, bilhetes, check-ins e webhooks.'
    },
    servers: [{ url: 'http://localhost:3333/v1' }],
    endpoints: [
      { method: 'GET', path: '/v1/health', summary: 'Healthcheck da API', scope: 'Nenhum' },
      { method: 'GET', path: '/v1/events', summary: 'Listar eventos públicos e ativos', scope: 'events:read' },
      { method: 'GET', path: '/v1/events/:eventId', summary: 'Obter detalhes de um evento', scope: 'events:read' },
      { method: 'GET', path: '/v1/webhooks', summary: 'Listar webhooks cadastrados', scope: 'webhooks:read' },
      { method: 'POST', path: '/v1/webhooks', summary: 'Cadastrar novo webhook', scope: 'webhooks:write' }
    ]
  }
};
