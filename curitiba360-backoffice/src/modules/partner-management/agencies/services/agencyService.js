import {
  agencyRepository,
} from '../repositories/agencyRepository';

function validateAgency(payload) {
  if (!payload.tradeName?.trim()) {
    throw new Error(
      'O nome fantasia é obrigatório.',
    );
  }

  if (!payload.corporateName?.trim()) {
    throw new Error(
      'A razão social é obrigatória.',
    );
  }

  if (!payload.cnpj?.trim()) {
    throw new Error(
      'O CNPJ é obrigatório.',
    );
  }

  if (!payload.responsibleName?.trim()) {
    throw new Error(
      'O responsável é obrigatório.',
    );
  }

  if (!payload.email?.trim()) {
    throw new Error(
      'O e-mail é obrigatório.',
    );
  }
}

export const agencyService = {
  async list() {
    return agencyRepository.list();
  },

  async findById(id) {
    return agencyRepository.findById(
      id,
    );
  },

  async create(payload) {
    validateAgency(payload);

    return agencyRepository.create(
      payload,
    );
  },

  async update(id, payload) {
    validateAgency(payload);

    return agencyRepository.update(
      id,
      payload,
    );
  },

  async approve(id) {
    return agencyRepository.updateStatus(
      id,
      'Ativa',
      {
        approvedAt:
          new Date().toISOString(),
      },
    );
  },

  async approveMany(ids) {
    return agencyRepository.updateMany(
      ids,
      {
        status: 'Ativa',
        approvedAt:
          new Date().toISOString(),
      },
    );
  },

  async reject(id, reason) {
    if (!reason?.trim()) {
      throw new Error(
        'Informe o motivo da rejeição.',
      );
    }

    return agencyRepository.updateStatus(
      id,
      'Rejeitada',
      {
        statusReason: reason,
      },
    );
  },

  async rejectMany(ids, reason) {
    if (!reason?.trim()) {
      throw new Error(
        'Informe o motivo da rejeição.',
      );
    }

    return agencyRepository.updateMany(
      ids,
      {
        status: 'Rejeitada',
        statusReason: reason,
      },
    );
  },

  async suspend(id, reason) {
    return agencyRepository.updateStatus(
      id,
      'Suspensa',
      {
        statusReason:
          reason || '',
      },
    );
  },

  async suspendMany(ids, reason) {
    return agencyRepository.updateMany(
      ids,
      {
        status: 'Suspensa',
        statusReason:
          reason || '',
      },
    );
  },

  async inactivate(id) {
    return agencyRepository.updateStatus(
      id,
      'Inativa',
    );
  },

  async inactivateMany(ids) {
    return agencyRepository.updateMany(
      ids,
      {
        status: 'Inativa',
      },
    );
  },

  async reactivate(id) {
    return agencyRepository.updateStatus(
      id,
      'Ativa',
      {
        statusReason: '',
      },
    );
  },

  async remove(id) {
    return agencyRepository.remove(id);
  },

  async removeMany(ids) {
    return agencyRepository.removeMany(
      ids,
    );
  },
};
