export const AGENCY_STATUS = {
  ACTIVE: 'Ativa',
  WAITING_CONTRACT: 'Aguardando Contrato',
  PENDING_APPROVAL: 'Pendente de Aprovação',
  SUSPENDED: 'Suspensa',
  INACTIVE: 'Inativa',
  REJECTED: 'Rejeitada',
};

export const AGENT_STATUS = {
  ACTIVE: 'Ativo',
  PENDING: 'Pendente',
  INACTIVE: 'Inativo',
  REJECTED: 'Rejeitado',
};

export const agencyStatusOptions = [
  AGENCY_STATUS.ACTIVE,
  AGENCY_STATUS.WAITING_CONTRACT,
  AGENCY_STATUS.PENDING_APPROVAL,
  AGENCY_STATUS.SUSPENDED,
  AGENCY_STATUS.INACTIVE,
];

export const agentStatusOptions = [
  AGENT_STATUS.ACTIVE,
  AGENT_STATUS.PENDING,
  AGENT_STATUS.INACTIVE,
];
