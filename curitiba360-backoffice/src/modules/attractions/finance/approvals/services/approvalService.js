import { approvalRepository } from '../repositories/approvalRepository';

const ALLOWED_TRANSITIONS = {
  Pendente: [
    'Em análise',
    'Aprovado',
    'Ajuste solicitado',
    'Rejeitado',
  ],
  'Em análise': [
    'Aprovado',
    'Ajuste solicitado',
    'Rejeitado',
  ],
  Aprovado: ['Pago', 'Cancelado'],
  'Ajuste solicitado': [
    'Em análise',
    'Rejeitado',
  ],
  Pago: [],
  Rejeitado: [],
  Cancelado: [],
};

function ensureTransitionAllowed(
  currentStatus,
  nextStatus,
) {
  const allowed =
    ALLOWED_TRANSITIONS[currentStatus] ?? [];

  if (!allowed.includes(nextStatus)) {
    throw new Error(
      `Não é permitido alterar de "${currentStatus}" para "${nextStatus}".`,
    );
  }
}

export const approvalService = {
  list() {
    return approvalRepository.list();
  },

  findById(id) {
    return approvalRepository.findById(id);
  },

  async changeStatus(id, payload) {
    const approval =
      await approvalRepository.findById(id);

    ensureTransitionAllowed(
      approval.status,
      payload.status,
    );

    if (
      payload.status === 'Rejeitado' &&
      !payload.observation?.trim()
    ) {
      throw new Error(
        'Informe o motivo da rejeição.',
      );
    }

    if (
      payload.status === 'Pago' &&
      !payload.receiptUrl
    ) {
      throw new Error(
        'Informe ou anexe o comprovante de pagamento.',
      );
    }

    return approvalRepository.updateStatus(
      id,
      payload,
    );
  },

  async approveMany(ids, observation = '') {
    const validIds = [];

    for (const id of ids) {
      const approval =
        await approvalRepository.findById(id);

      ensureTransitionAllowed(
        approval.status,
        'Aprovado',
      );

      validIds.push(id);
    }

    return approvalRepository.updateMany(
      validIds,
      {
        status: 'Aprovado',
        observation,
        description:
          'Solicitação aprovada em processamento em lote.',
      },
    );
  },
};
