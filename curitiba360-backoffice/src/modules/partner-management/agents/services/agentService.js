import {
  AGENT_STATUS,
} from '../constants';

import {
  agentRepository,
} from '../repositories';

function validateAgentId(agentId) {
  const normalizedId =
    String(agentId || '').trim();

  if (!normalizedId) {
    throw new Error(
      'O identificador do agente é obrigatório.',
    );
  }

  return normalizedId;
}

function validateAgentPayload(
  payload,
) {
  if (
    !payload ||
    typeof payload !== 'object'
  ) {
    throw new Error(
      'Os dados do agente são obrigatórios.',
    );
  }

  const name =
    String(payload.name || '').trim();

  if (!name) {
    throw new Error(
      'O nome do agente é obrigatório.',
    );
  }

  const email =
    String(
      payload.contact?.email ||
        payload.email ||
        '',
    ).trim();

  if (!email) {
    throw new Error(
      'O e-mail do agente é obrigatório.',
    );
  }

  return {
    ...payload,
    name,
    contact: {
      ...(payload.contact || {}),
      email,
    },
  };
}

export const agentService = {
  async list(options = {}) {
    return agentRepository.list(
      options,
    );
  },

  async paginate(options = {}) {
    return agentRepository.paginate(
      options,
    );
  },

  async findById(agentId) {
    const id =
      validateAgentId(agentId);

    return agentRepository.findById(
      id,
    );
  },

  async create(payload) {
    const normalizedPayload =
      validateAgentPayload(
        payload,
      );

    return agentRepository.create({
      ...normalizedPayload,

      status:
        normalizedPayload.status ||
        AGENT_STATUS.PENDING,
    });
  },

  async update(
    agentId,
    payload,
  ) {
    const id =
      validateAgentId(agentId);

    const normalizedPayload =
      validateAgentPayload(
        payload,
      );

    return agentRepository.update(
      id,
      normalizedPayload,
    );
  },

  async updatePartial(
    agentId,
    payload,
  ) {
    const id =
      validateAgentId(agentId);

    if (
      !payload ||
      typeof payload !== 'object'
    ) {
      throw new Error(
        'Os dados da atualização são obrigatórios.',
      );
    }

    return agentRepository.update(
      id,
      payload,
    );
  },

  async approve(
    agentId,
    metadata = {},
  ) {
    const id =
      validateAgentId(agentId);

    return agentRepository.updateStatus(
      id,
      AGENT_STATUS.ACTIVE,
      {
        approvedAt:
          new Date().toISOString(),
        ...metadata,
      },
    );
  },

  async suspend(
    agentId,
    {
      reason = '',
      ...metadata
    } = {},
  ) {
    const id =
      validateAgentId(agentId);

    if (!String(reason).trim()) {
      throw new Error(
        'Informe o motivo da suspensão.',
      );
    }

    return agentRepository.updateStatus(
      id,
      AGENT_STATUS.SUSPENDED,
      {
        suspensionReason:
          String(reason).trim(),

        suspendedAt:
          new Date().toISOString(),

        ...metadata,
      },
    );
  },

  async reactivate(
    agentId,
    metadata = {},
  ) {
    const id =
      validateAgentId(agentId);

    return agentRepository.updateStatus(
      id,
      AGENT_STATUS.ACTIVE,
      {
        suspensionReason: '',
        suspendedAt: null,
        suspendedBy: null,
        ...metadata,
      },
    );
  },

  async inactivate(
    agentId,
    metadata = {},
  ) {
    const id =
      validateAgentId(agentId);

    return agentRepository.updateStatus(
      id,
      AGENT_STATUS.INACTIVE,
      metadata,
    );
  },

  async remove(agentId) {
    const id =
      validateAgentId(agentId);

    return agentRepository.remove(
      id,
    );
  },

  async getDashboard() {
    return agentRepository
      .getDashboard();
  },
};

export default agentService;
