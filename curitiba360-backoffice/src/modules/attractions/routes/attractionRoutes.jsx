export const attractionRoutes = {
  list: '/admin/atracoes',

  create: '/admin/atracoes/nova',

  edit: (attractionId) =>
    `/admin/atracoes/${attractionId}/editar`,

  categories: (attractionId) =>
    `/admin/atracoes/${attractionId}/categorias`,

  tickets: (attractionId) =>
    `/admin/atracoes/${attractionId}/ingressos`,

  coupons: (attractionId) =>
    `/admin/atracoes/${attractionId}/cupons`,

  analytics: (attractionId) =>
    `/admin/atracoes/${attractionId}/analytics`,

  users: (attractionId) =>
    `/admin/atracoes/${attractionId}/usuarios`,

  commercialConditions: (attractionId) =>
    `/admin/atracoes/${attractionId}/financeiro/condicoes-comerciais`,

  financialInfo: (attractionId) =>
    `/admin/atracoes/${attractionId}/financeiro/informacoes`,

  expenses: (attractionId) =>
    `/admin/atracoes/${attractionId}/financeiro/despesas`,

  // Relatórios da Atração
  salesReport: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/vendas`,
  salesReportPrint: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/vendas/print`,

  cartAbandonmentReport: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/abandono-carrinho`,
  cartAbandonmentReportPrint: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/abandono-carrinho/print`,

  detailedTicketReport: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/ingresso-detalhado`,
  detailedTicketReportPrint: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/ingresso-detalhado/print`,

  categoriesReport: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/categorias`,
  categoriesReportPrint: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/categorias/print`,

  courtesyReport: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/cortesias`,
  courtesyReportPrint: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/cortesias/print`,

  validationReport: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/validacoes`,
  validationReportPrint: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/validacoes/print`,

  commissionReport: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/comissoes`,
  commissionReportPrint: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/comissoes/print`,

  borderoReport: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/bordero`,
  borderoReportPrint: (attractionId) =>
    `/admin/atracoes/${attractionId}/relatorios/bordero/print`,

  // Operação
  validateTickets: (attractionId) =>
    `/admin/atracoes/${attractionId}/validar-ingressos`
};

export default attractionRoutes;
