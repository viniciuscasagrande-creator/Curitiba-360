export const ROUTES = {
  public: {
    landing: '/',
    login: '/login',
    register: '/cadastro',
    forgotPassword: '/recuperar-senha',
    explore: '/explorar',
    events: '/eventos',
    eventDetails: (eventId) => `/eventos/${eventId}`,
    ticketSelection: (eventId) => `/eventos/${eventId}/ingressos`,
    places: '/atrativos',
    placeDetails: (placeId) => `/atrativos/${placeId}`,
    tourism: '/turismo',
    tourismMap: '/turismo/mapa',
    attraction: (attractionId) => `/turismo/${attractionId}`,
    reservation: (attractionId) =>
      `/turismo/${attractionId}/reserva`
  },

  app: {
    home: '/home',
    cart: '/carrinho',
    checkout: '/checkout',
    order: (orderId) => `/pedidos/${orderId}`,
    tickets: '/ingressos',
    ticket: (ticketId) => `/ingressos/${ticketId}`,
    reservations: '/reservas',
    wallet: '/carteira',
    favorites: '/favoritos',
    notifications: '/notificacoes',
    profile: '/perfil'
  },

  admin: {
    root: '/admin',
    dashboard: '/admin/dashboard',

    users: '/admin/usuarios',
    userCreate: '/admin/usuarios/novo',
    userDetails: (userId) => `/admin/usuarios/${userId}`,

    contracts: '/admin/contratos',
    contractCreate: '/admin/contratos/novo',
    contractDetails: (contractId) =>
      `/admin/contratos/${contractId}`,

    commercialConditions: '/admin/condicoes-comerciais',
    commercialConditionCreate:
      '/admin/condicoes-comerciais/nova',
    commercialConditionDetails: (conditionId) =>
      `/admin/condicoes-comerciais/${conditionId}`,

    attractions: '/admin/atracoes',
    attractionCreate: '/admin/atracoes/nova',
    attractionDetails: (attractionId) =>
      `/admin/atracoes/${attractionId}`,

    attractionOverview: (attractionId) =>
      `/admin/atracoes/${attractionId}/visao-geral`,

    attractionTotals: (attractionId) =>
      `/admin/atracoes/${attractionId}/totais`,

    attractionCategories: (attractionId) =>
      `/admin/atracoes/${attractionId}/categorias`,

    attractionTickets: (attractionId) =>
      `/admin/atracoes/${attractionId}/ingressos`,

    attractionCoupons: (attractionId) =>
      `/admin/atracoes/${attractionId}/cupons`,

    attractionAnalytics: (attractionId) =>
      `/admin/atracoes/${attractionId}/analytics`,

    attractionEdit: (attractionId) =>
      `/admin/atracoes/${attractionId}/editar`,

    attractionAgencies: (attractionId) =>
      `/admin/atracoes/${attractionId}/agencias`,

    attractionUsers: (attractionId) =>
      `/admin/atracoes/${attractionId}/usuarios`,

    attractionFinancial: (attractionId) =>
      `/admin/atracoes/${attractionId}/financeiro`,

    attractionCheckIn: (attractionId) =>
      `/admin/atracoes/${attractionId}/check-in`,

    financialReports: '/admin/relatorios-financeiros',
    settings: '/admin/configuracoes',

    myProfile: '/admin/minha-conta/perfil',
    preferences: '/admin/minha-conta/preferencias',
    security: '/admin/minha-conta/seguranca',
    integrations: '/admin/minha-conta/integracoes'
  }
};
