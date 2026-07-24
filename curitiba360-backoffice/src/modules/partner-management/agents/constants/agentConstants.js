export const AGENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  ON_EVENT: 'on_event',
  ON_LEAVE: 'on_leave',
};

export const AGENT_STATUS_LABELS = {
  [AGENT_STATUS.ACTIVE]: 'Ativo',
  [AGENT_STATUS.INACTIVE]: 'Inativo',
  [AGENT_STATUS.PENDING]: 'Pendente',
  [AGENT_STATUS.SUSPENDED]: 'Suspenso',
  [AGENT_STATUS.ON_EVENT]: 'Em evento',
  [AGENT_STATUS.ON_LEAVE]: 'Afastado',
};

export const AGENT_AVAILABILITY = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  BUSY: 'busy',
  VACATION: 'vacation',
};

export const AGENT_AVAILABILITY_LABELS = {
  [AGENT_AVAILABILITY.AVAILABLE]: 'Disponível',
  [AGENT_AVAILABILITY.UNAVAILABLE]: 'Indisponível',
  [AGENT_AVAILABILITY.BUSY]: 'Ocupado',
  [AGENT_AVAILABILITY.VACATION]: 'Férias',
};

export const AGENT_TYPES = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  FREELANCER: 'freelancer',
  PARTNER: 'partner',
};

export const AGENT_TYPE_LABELS = {
  [AGENT_TYPES.INTERNAL]: 'Agente interno',
  [AGENT_TYPES.EXTERNAL]: 'Agente externo',
  [AGENT_TYPES.FREELANCER]: 'Freelancer',
  [AGENT_TYPES.PARTNER]: 'Parceiro',
};

export const AGENT_SPECIALTIES = [
  {
    value: 'sales',
    label: 'Vendas',
  },
  {
    value: 'commercial',
    label: 'Comercial',
  },
  {
    value: 'customer_service',
    label: 'Atendimento',
  },
  {
    value: 'event_operation',
    label: 'Operação de eventos',
  },
  {
    value: 'accreditation',
    label: 'Credenciamento',
  },
  {
    value: 'access_control',
    label: 'Controle de acesso',
  },
  {
    value: 'producer_support',
    label: 'Suporte ao produtor',
  },
  {
    value: 'technical_support',
    label: 'Suporte técnico',
  },
  {
    value: 'finance',
    label: 'Financeiro',
  },
  {
    value: 'marketing',
    label: 'Marketing',
  },
];

export const AGENT_SORT_FIELDS = [
  'name',
  'status',
  'availability',
  'createdAt',
  'updatedAt',
  'eventsCount',
  'salesAmount',
  'performanceScore',
];

export const AGENT_DEFAULT_SORTING = {
  field: 'createdAt',
  direction: 'desc',
};

export const AGENT_DEFAULT_FILTERS = {
  search: '',
  status: '',
  availability: '',
  type: '',
  agencyId: '',
  specialty: '',
  state: '',
  city: '',
};

export const AGENT_DEFAULT_PAGINATION = {
  page: 1,
  pageSize: 20,
};

export const AGENT_PAGE_SIZE_OPTIONS = [
  10,
  20,
  50,
  100,
];

export const AGENT_ROUTES = {
  ROOT: '/partner-management/agents',
  DASHBOARD: '/partner-management/agents/dashboard',
  LIST: '/partner-management/agents/list',
  CREATE: '/partner-management/agents/new',
  DETAILS: '/partner-management/agents/:agentId',
  EDIT: '/partner-management/agents/:agentId/edit',
  SCHEDULE: '/partner-management/agents/:agentId/schedule',
  COMMISSIONS: '/partner-management/agents/:agentId/commissions',
  PERFORMANCE: '/partner-management/agents/:agentId/performance',
};

export const AGENT_QUERY_KEYS = {
  ROOT: ['agents'],
  LISTS: ['agents', 'lists'],
  DETAILS: ['agents', 'details'],
  DASHBOARD: ['agents', 'dashboard'],
};
