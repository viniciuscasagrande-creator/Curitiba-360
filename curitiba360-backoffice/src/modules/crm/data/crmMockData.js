export const INITIAL_CRM_SALES_DATA = {
  pipelineLeads: [
    { id: 'LEAD-101', cliente: 'Arena Baixada Eventos', etapa: 'Qualificação', valorEstimado: 45000.00, probabilidade: '60%', responsavel: 'Carlos Comercial' },
    { id: 'LEAD-102', cliente: 'Teatro Positivo Produções', etapa: 'Proposta', valorEstimado: 89000.00, probabilidade: '80%', responsavel: 'Fernanda Vendas' },
    { id: 'LEAD-103', cliente: 'Festival de Inverno de Bonito', etapa: 'Contrato', valorEstimado: 120000.00, probabilidade: '95%', responsavel: 'Carlos Comercial' }
  ],

  clientes360: [
    {
      id: 'CLI-01',
      nome: 'Serra Verde Express & Turismo',
      tipo: 'Produtor / Parceiro',
      comprasTotais: 1420,
      valorGastoTotal: 348000.00,
      npsScore: 94,
      lgpdConsentimento: true,
      ultimoContato: '21/07/2026'
    }
  ]
};
