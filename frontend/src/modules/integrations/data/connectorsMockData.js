export const INITIAL_INTEGRATIONS_DATA = {
  crmConnectors: [
    {
      id: 'CONN-CRM-01',
      nome: 'RD Station Marketing',
      categoria: 'CRM & Marketing',
      status: 'conectado',
      apiKeyConfigured: true,
      leadsSincronizados: 14250,
      ultimaSincronizacao: '21/07/2026 14:15'
    },
    {
      id: 'CONN-CRM-02',
      nome: 'HubSpot CRM',
      categoria: 'CRM Sales',
      status: 'conectado',
      apiKeyConfigured: true,
      leadsSincronizados: 8900,
      ultimaSincronizacao: '21/07/2026 14:10'
    },
    {
      id: 'CONN-CRM-03',
      nome: 'ActiveCampaign',
      categoria: 'Email Marketing',
      status: 'desconectado',
      apiKeyConfigured: false,
      leadsSincronizados: 0,
      ultimaSincronizacao: 'Nunca'
    }
  ],

  erpConnectors: [
    {
      id: 'CONN-ERP-01',
      nome: 'Bling ERP & Emissão de NFS-e',
      categoria: 'ERP & Fiscal',
      status: 'ativo',
      notasEmitidas: 4120,
      ambiente: 'Produção',
      ultimaEmissao: '21/07/2026 14:18'
    },
    {
      id: 'CONN-ERP-02',
      nome: 'Omie ERP Contábil',
      categoria: 'ERP Financeiro',
      status: 'ativo',
      notasEmitidas: 1850,
      ambiente: 'Produção',
      ultimaEmissao: '21/07/2026 13:45'
    },
    {
      id: 'CONN-ERP-03',
      nome: 'Conta Azul',
      categoria: 'Gestão Financeira',
      status: 'pendente',
      notasEmitidas: 0,
      ambiente: 'Homologação',
      ultimaEmissao: 'Nunca'
    }
  ],

  syncLogs: [
    {
      id: 'SYNC-9901',
      conector: 'RD Station Marketing',
      evento: 'order.paid -> Lead Conversion',
      statusHttp: 200,
      registrosAfetados: 1,
      horario: '21/07/2026 14:15:32',
      mensagem: 'Lead Ana Beatriz (ana.beatriz@email.com) enriquecido com tag #vip-barao'
    },
    {
      id: 'SYNC-9902',
      conector: 'Bling ERP',
      evento: 'NFS-e Emissão Automática',
      statusHttp: 201,
      registrosAfetados: 1,
      horario: '21/07/2026 14:18:05',
      mensagem: 'Nota Fiscal Eletrônica #004912 emitida com sucesso na Prefeitura de Curitiba'
    }
  ]
};
