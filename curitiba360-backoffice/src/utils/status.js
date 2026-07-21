export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  DECLINED: 'declined',
  REFUNDED: 'refunded'
};

export const TICKET_STATUS = {
  ACTIVE: 'active',
  USED: 'used',
  CANCELLED: 'cancelled',
  TRANSFERRED: 'transferred'
};

export const CHECKIN_STATUS = {
  APPROVED: 'approved',
  INVALID: 'invalid',
  ALREADY_USED: 'already_used',
  CANCELLED: 'cancelled',
  WRONG_EVENT: 'wrong_event',
  UNAUTHORIZED: 'unauthorized'
};

export const REFUND_STATUS = {
  REQUESTED: 'requested',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed'
};

export const eventStatusMap = {
  rascunho: { label: 'Rascunho', color: 'gray' },
  publicado: { label: 'Publicado', color: 'green' },
  encerrado: { label: 'Encerrado', color: 'blue' },
  cancelado: { label: 'Cancelado', color: 'red' }
};

export const orderStatusMap = {
  pending: { label: 'Pendente', color: 'yellow' },
  pendente: { label: 'Pendente', color: 'yellow' },
  paid: { label: 'Pago', color: 'green' },
  aprovado: { label: 'Aprovado', color: 'green' },
  cancelled: { label: 'Cancelado', color: 'red' },
  cancelado: { label: 'Cancelado', color: 'red' },
  refunded: { label: 'Reembolsado', color: 'purple' },
  reembolsado: { label: 'Reembolsado', color: 'purple' }
};

export const paymentStatusMap = {
  pending: { label: 'Pendente', color: 'yellow' },
  approved: { label: 'Aprovado', color: 'green' },
  pago: { label: 'Pago', color: 'green' },
  declined: { label: 'Recusado', color: 'red' },
  refunded: { label: 'Estornado', color: 'purple' }
};

export const refundStatusMap = {
  requested: { label: 'Solicitado', color: 'yellow' },
  solicitado: { label: 'Solicitado', color: 'yellow' },
  em_analise: { label: 'Em Análise', color: 'blue' },
  approved: { label: 'Aprovado', color: 'green' },
  aprovado: { label: 'Aprovado', color: 'green' },
  rejected: { label: 'Rejeitado', color: 'red' },
  completed: { label: 'Concluído', color: 'green' }
};

export function getStatusBadge(statusKey, statusMap) {
  const normalizedKey = String(statusKey || '').toLowerCase();
  return statusMap[normalizedKey] || { label: statusKey || 'Desconhecido', color: 'gray' };
}
