import { agentRepository } from '../repositories/agentRepository';

import { AGENT_STATUS } from '../../shared/constants/partnerStatus';

function validateRequiredFields(payload) {
  const requiredFields = [
    ['name', 'Nome'],
    ['cpf', 'CPF'],
    ['email', 'E-mail'],
    ['agencyId', 'Agência'],
    ['agencyName', 'Nome da agência'],
  ];

  const missingFields = requiredFields
    .filter(([field]) => {
      return !String(
        payload[field] ?? '',
      ).trim();
    })
    .map(([, label]) => label);

  if (missingFields.length) {
    throw new Error(
      `Preencha os campos obrigatórios: ${missingFields.join(
        ', ',
      )}.`,
    );
  }
}

function validateIds(ids) {
  if (!Array.isArray(ids) || !ids.length) {
    throw new Error(
      'Selecione pelo menos um agente.',
    );
  }
}

export const agentService = {
  list() {
    return agentRepository.list();
  },

  findById(id) {
    if (!id) {
      throw new Error(
        'Informe o identificador do agente.',
      );
    }

    return agentRepository.findById(id);
  },

  create(payload) {
    validateRequiredFields(payload);

    return agentRepository.create({
      ...payload,
      status:
        payload.status ??
        AGENT_STATUS.PENDING,
    });
  },

  update(id, payload) {
    validateRequiredFields(payload);

    return agentRepository.update(
      id,
      payload,
    );
  },

  approve(id) {
    return agentRepository.updateStatus(
      id,
      AGENT_STATUS.ACTIVE,
      '',
    );
  },

  approveMany(ids) {
    validateIds(ids);

    return agentRepository.updateMany(ids, {
      status: AGENT_STATUS.ACTIVE,
      statusReason: '',
    });
  },

  reject(id, reason) {
    if (!reason?.trim()) {
      throw new Error(
        'Informe o motivo da rejeição.',
      );
    }

    return agentRepository.updateStatus(
      id,
      AGENT_STATUS.REJECTED,
      reason.trim(),
    );
  },

  rejectMany(ids, reason) {
    validateIds(ids);

    if (!reason?.trim()) {
      throw new Error(
        'Informe o motivo da rejeição.',
      );
    }

    return agentRepository.updateMany(ids, {
      status: AGENT_STATUS.REJECTED,
      statusReason: reason.trim(),
    });
  },

  inactivate(id) {
    return agentRepository.updateStatus(
      id,
      AGENT_STATUS.INACTIVE,
      '',
    );
  },

  inactivateMany(ids) {
    validateIds(ids);

    return agentRepository.updateMany(ids, {
      status: AGENT_STATUS.INACTIVE,
    });
  },

  activateMany(ids) {
    validateIds(ids);

    return agentRepository.updateMany(ids, {
      status: AGENT_STATUS.ACTIVE,
      statusReason: '',
    });
  },

  transferMany(
    ids,
    agencyId,
    agencyName,
  ) {
    validateIds(ids);

    if (!agencyId || !agencyName) {
      throw new Error(
        'Selecione a nova agência.',
      );
    }

    return agentRepository.transferMany(
      ids,
      agencyId,
      agencyName,
    );
  },

  remove(id) {
    return agentRepository.remove(id);
  },

  removeMany(ids) {
    validateIds(ids);

    return agentRepository.removeMany(ids);
  },
};
