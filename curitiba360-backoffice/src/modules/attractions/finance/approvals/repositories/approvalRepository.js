import { approvalsMock } from '../data/approvalsMock';

let database = structuredClone(approvalsMock);

function wait(milliseconds = 300) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function createTimelineItem(status, description) {
  return {
    id: crypto.randomUUID(),
    status,
    date: new Date().toISOString(),
    user: 'Financeiro Curitiba 360',
    description,
  };
}

function createAuditItem(action, observation = '') {
  return {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    user: 'Financeiro Curitiba 360',
    action,
    ip: '127.0.0.1',
    observation,
  };
}

export const approvalRepository = {
  async list() {
    await wait();
    return structuredClone(database);
  },

  async findById(id) {
    await wait(150);

    const approval = database.find(
      (item) => item.id === id,
    );

    if (!approval) {
      throw new Error('Solicitação não encontrada.');
    }

    return structuredClone(approval);
  },

  async updateStatus(id, payload) {
    await wait();

    const index = database.findIndex(
      (item) => item.id === id,
    );

    if (index < 0) {
      throw new Error('Solicitação não encontrada.');
    }

    const current = database[index];

    const updated = {
      ...current,
      status: payload.status,
      internalObservation:
        payload.observation ??
        current.internalObservation,
      paymentDate:
        payload.status === 'Pago'
          ? new Date().toISOString()
          : current.paymentDate,
      receiptUrl:
        payload.receiptUrl ??
        current.receiptUrl,
      timeline: [
        ...current.timeline,
        createTimelineItem(
          payload.status,
          payload.description ??
            `Status alterado para ${payload.status}.`,
        ),
      ],
      audit: [
        ...(current.audit ?? []),
        createAuditItem(
          `Status alterado para ${payload.status}`,
          payload.observation,
        ),
      ],
    };

    database[index] = updated;

    return structuredClone(updated);
  },

  async updateMany(ids, payload) {
    const results = [];

    for (const id of ids) {
      const result = await this.updateStatus(
        id,
        payload,
      );

      results.push(result);
    }

    return results;
  },
};
