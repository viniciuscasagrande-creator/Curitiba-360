import { agencyRepository } from '../repositories/agencyRepository';

import { AGENCY_STATUS } from '../../shared/constants/partnerStatus';

function validateRequiredFields(payload) {
  const requiredFields = [
    ['tradeName', 'Nome fantasia'],
    ['corporateName', 'Razão social'],
    ['cnpj', 'CNPJ'],
    ['email', 'E-mail'],
    [
      'responsibleName',
      'Nome do responsável',
    ],
    ['city', 'Cidade'],
    ['state', 'UF'],
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
      'Selecione pelo menos uma agência.',
    );
  }
}

export const agencyService = {
  list() {
    return agencyRepository.list();
  },

  findById(id) {
    if (!id) {
      throw new Error(
        'Informe o identificador da agência.',
      );
    }

    return agencyRepository.findById(id);
  },

  create(payload) {
    validateRequiredFields(payload);

    return agencyRepository.create({
      ...payload,
      status:
        payload.status ??
        AGENCY_STATUS.PENDING_APPROVAL,
    });
  },

  update(id, payload) {
    if (!id) {
      throw new Error(
        'Informe o identificador da agência.',
      );
    }

    validateRequiredFields(payload);

    return agencyRepository.update(
      id,
      payload,
    );
  },

  approve(id) {
    return agencyRepository.updateStatus(
      id,
      AGENCY_STATUS.ACTIVE,
      '',
    );
  },

  approveMany(ids) {
    validateIds(ids);

    return agencyRepository.updateMany(ids, {
      status: AGENCY_STATUS.ACTIVE,
      statusReason: '',
    });
  },

  reject(id, reason) {
    if (!reason?.trim()) {
      throw new Error(
        'Informe o motivo da rejeição.',
      );
    }

    return agencyRepository.updateStatus(
      id,
      AGENCY_STATUS.REJECTED,
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

    return agencyRepository.updateMany(ids, {
      status: AGENCY_STATUS.REJECTED,
      statusReason: reason.trim(),
    });
  },

  suspend(id, reason = '') {
    return agencyRepository.updateStatus(
      id,
      AGENCY_STATUS.SUSPENDED,
      reason.trim(),
    );
  },

  suspendMany(ids, reason = '') {
    validateIds(ids);

    return agencyRepository.updateMany(ids, {
      status: AGENCY_STATUS.SUSPENDED,
      statusReason: reason.trim(),
    });
  },

  inactivate(id) {
    return agencyRepository.updateStatus(
      id,
      AGENCY_STATUS.INACTIVE,
      '',
    );
  },

  inactivateMany(ids) {
    validateIds(ids);

    return agencyRepository.updateMany(ids, {
      status: AGENCY_STATUS.INACTIVE,
    });
  },

  reactivate(id) {
    return agencyRepository.updateStatus(
      id,
      AGENCY_STATUS.ACTIVE,
      '',
    );
  },

  remove(id) {
    return agencyRepository.remove(id);
  },

  removeMany(ids) {
    validateIds(ids);

    return agencyRepository.removeMany(ids);
  },
};
