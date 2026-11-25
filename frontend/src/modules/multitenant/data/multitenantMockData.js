export const INITIAL_MULTITENANT_DATA = {
  activeTenant: {
    id: 'TNT-001',
    nome: 'Serra Verde Express & Turismo',
    dominio: 'serraverde.curitiba360.com.br',
    plano: 'Enterprise',
    status: 'ativo',
    limiteEventos: 'Ilimitado',
    limiteUsuarios: 'Ilimitado',
    logoUrl: 'https://curitiba360.com.br/logos/serraverde.png',
    temaAtivo: 'Dark Premium'
  },

  organizacoes: [
    {
      id: 'TNT-001',
      nome: 'Serra Verde Express & Turismo',
      cnpj: '78.901.234/0001-99',
      plano: 'Enterprise',
      produtorasVinculadas: 3,
      faturamentoMensal: 4250.00,
      status: 'ativo'
    },
    {
      id: 'TNT-002',
      nome: 'Curitiba Cultural & Eventos LTDA',
      cnpj: '12.345.678/0001-11',
      plano: 'Professional',
      produtorasVinculadas: 1,
      faturamentoMensal: 890.00,
      status: 'ativo'
    },
    {
      id: 'TNT-003',
      nome: 'Pedreira Paulo Leminski Shows',
      cnpj: '99.888.777/0001-22',
      plano: 'Enterprise',
      produtorasVinculadas: 5,
      faturamentoMensal: 7500.00,
      status: 'ativo'
    }
  ],

  planosSaas: [
    {
      id: 'plan-starter',
      nome: 'Starter',
      precoMensal: 290.00,
      eventosMax: 5,
      recursos: ['Check-in Básico (App)', 'Relatórios Essenciais', 'Suporte Padrão (E-mail)'],
      recomendado: false
    },
    {
      id: 'plan-pro',
      nome: 'Professional',
      precoMensal: 890.00,
      eventosMax: 'Ilimitado',
      recursos: ['Eventos Ilimitados', 'CRM + Automação Mkt', 'Notas Fiscais NFS-e', 'Check-in Offline (SQLite)'],
      recomendado: true
    },
    {
      id: 'plan-enterprise',
      nome: 'Enterprise',
      precoMensal: 2450.00,
      eventosMax: 'Ilimitado',
      recursos: ['Multi-tenant & Filiais', 'API Pública & SDKs', 'IA Copiloto DeepMind', 'SLA 99.95% & Gerente Dedicado'],
      recomendado: false
    }
  ],

  marketplacePlugins: [
    { id: 'plug-01', nome: 'Meta Ads Conversions API', categoria: 'Marketing', instalado: true, autor: 'Curitiba 360' },
    { id: 'plug-02', nome: 'RD Station Marketing Sync', categoria: 'CRM & Leads', instalado: true, autor: 'RD Station' },
    { id: 'plug-03', nome: 'Bling ERP & Emissão NFS-e', categoria: 'ERP & Fiscal', instalado: true, autor: 'Bling' },
    { id: 'plug-04', nome: 'WhatsApp Direct Notification', categoria: 'Comunicação', instalado: true, autor: 'Meta' },
    { id: 'plug-05', nome: 'Google Analytics 4 & GTM', categoria: 'Analytics', instalado: false, autor: 'Google' },
    { id: 'plug-06', nome: 'HubSpot CRM Connector', categoria: 'CRM', instalado: false, autor: 'HubSpot' }
  ]
};
