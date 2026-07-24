import {
  agencyRepository,
} from '../repositories/agencyRepository';

import {
  agencyBroadcastService,
} from './agencyBroadcastService';

function validateRequiredFields(
  payload,
) {
  if (!payload) {
    throw new Error(
      'Os dados da agência são obrigatórios.',
    );
  }

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

  if (
    !payload.responsibleName?.trim()
  ) {
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

function validateAgencyId(id) {
  if (!id) {
    throw new Error(
      'O identificador da agência é obrigatório.',
    );
  }
}

function validateAgencyIds(ids) {
  if (
    !Array.isArray(ids) ||
    ids.length === 0
  ) {
    throw new Error(
      'Selecione pelo menos uma agência.',
    );
  }

  return [
    ...new Set(
      ids
        .map((id) =>
          String(id || '').trim(),
        )
        .filter(Boolean),
    ),
  ];
}

export const agencyService = {
  async list(options) {
    return agencyRepository.list(
      options,
    );
  },

  async paginate(options) {
    return agencyRepository.paginate(
      options,
    );
  },

  subscribeToList(options = {}) {
    return agencyRepository.subscribeToList(options);
  },

  subscribeToAgency(agencyId, options = {}) {
    validateAgencyId(agencyId);
    return agencyRepository.subscribeToAgency({ agencyId, ...options });
  },

  async findByCnpj(cnpj) {
    if (!cnpj) return null;
    return agencyRepository.findByCnpj(cnpj);
  },

  async findByEmail(email) {
    if (!email) return null;
    return agencyRepository.findByEmail(email);
  },

  async findById(id) {
    validateAgencyId(id);
    const agency = await agencyRepository.findById(id);
    if (!agency) throw new Error('Agência não encontrada.');
    return agency;
  },

  async create(payload) {
    validateRequiredFields(payload);

    const existingByCnpj = await agencyRepository.findByCnpj(payload.cnpj);
    if (existingByCnpj) {
      throw new Error('Já existe uma agência cadastrada com este CNPJ.');
    }

    const existingByEmail = await agencyRepository.findByEmail(payload.email);
    if (existingByEmail) {
      throw new Error('Já existe uma agência cadastrada com este e-mail.');
    }

    const agency = await agencyRepository.create({
      ...payload,
      version: 1,
      status: payload.status || 'Pendente de Aprovação',
    });

    agencyBroadcastService.publishCreated(agency);
    return agency;
  },

  async update(id, payload) {
    validateAgencyId(id);
    validateRequiredFields(payload);

    const agency = await agencyRepository.update(id, payload);
    agencyBroadcastService.publishUpdated(agency);
    return agency;
  },

  async patch(id, changes) {
    validateAgencyId(id);
    if (!changes || Object.keys(changes).length === 0) {
      throw new Error('Nenhuma alteração foi informada.');
    }

    const agency = await agencyRepository.patch(id, changes);
    agencyBroadcastService.publishUpdated(agency);
    return agency;
  },

  async approve(id, metadata = {}) {
    validateAgencyId(id);
    const agency = await agencyRepository.updateStatus(id, 'Ativa', {
      approvedAt: new Date().toISOString(),
      statusReason: '',
      ...metadata,
    });
    agencyBroadcastService.publishStatusChanged(id, 'Ativa');
    return agency;
  },

  async reject(id, reason, metadata = {}) {
    validateAgencyId(id);
    if (!reason?.trim()) throw new Error('Informe o motivo da rejeição.');

    const agency = await agencyRepository.updateStatus(id, 'Rejeitada', {
      rejectedAt: new Date().toISOString(),
      statusReason: reason.trim(),
      ...metadata,
    });
    agencyBroadcastService.publishStatusChanged(id, 'Rejeitada');
    return agency;
  },

  async suspend(id, reason = '', metadata = {}) {
    validateAgencyId(id);
    const agency = await agencyRepository.updateStatus(id, 'Suspensa', {
      suspendedAt: new Date().toISOString(),
      statusReason: reason.trim(),
      ...metadata,
    });
    agencyBroadcastService.publishStatusChanged(id, 'Suspensa');
    return agency;
  },

  async inactivate(id, metadata = {}) {
    validateAgencyId(id);
    const agency = await agencyRepository.updateStatus(id, 'Inativa', {
      inactivatedAt: new Date().toISOString(),
      ...metadata,
    });
    agencyBroadcastService.publishStatusChanged(id, 'Inativa');
    return agency;
  },

  async reactivate(id, metadata = {}) {
    validateAgencyId(id);
    const agency = await agencyRepository.updateStatus(id, 'Ativa', {
      reactivatedAt: new Date().toISOString(),
      statusReason: '',
      ...metadata,
    });
    agencyBroadcastService.publishStatusChanged(id, 'Ativa');
    return agency;
  },

  async remove(id) {
    validateAgencyId(id);
    await agencyRepository.remove(id);
    agencyBroadcastService.publishRemoved(id);
    return true;
  },

  async updateMany(ids, changes, metadata = {}) {
    const normalizedIds = validateAgencyIds(ids);
    if (!changes || Object.keys(changes).length === 0) {
      throw new Error('Nenhuma alteração foi informada.');
    }
    const result = await agencyRepository.updateMany(normalizedIds, changes, metadata);
    agencyBroadcastService.publishInvalidate('batch-update');
    return result;
  },

  async approveMany(ids, metadata = {}) {
    const normalizedIds = validateAgencyIds(ids);
    const result = await agencyRepository.approveMany(normalizedIds, metadata);
    agencyBroadcastService.publishInvalidate('batch-approve');
    return result;
  },

  async rejectMany(ids, reason, metadata = {}) {
    const normalizedIds = validateAgencyIds(ids);
    if (!reason?.trim()) throw new Error('Informe o motivo da rejeição.');
    const result = await agencyRepository.rejectMany(normalizedIds, reason.trim(), metadata);
    agencyBroadcastService.publishInvalidate('batch-reject');
    return result;
  },

  async suspendMany(ids, reason = '', metadata = {}) {
    const normalizedIds = validateAgencyIds(ids);
    const result = await agencyRepository.suspendMany(normalizedIds, reason.trim(), metadata);
    agencyBroadcastService.publishInvalidate('batch-suspend');
    return result;
  },

  async inactivateMany(ids, metadata = {}) {
    const normalizedIds = validateAgencyIds(ids);
    const result = await agencyRepository.inactivateMany(normalizedIds, metadata);
    agencyBroadcastService.publishInvalidate('batch-inactivate');
    return result;
  },

  async reactivateMany(ids, metadata = {}) {
    const normalizedIds = validateAgencyIds(ids);
    const result = await agencyRepository.reactivateMany(normalizedIds, metadata);
    agencyBroadcastService.publishInvalidate('batch-reactivate');
    return result;
  },

  async removeMany(ids, metadata = {}) {
    const normalizedIds = validateAgencyIds(ids);
    const result = await agencyRepository.removeMany(normalizedIds, metadata);
    agencyBroadcastService.publishInvalidate('batch-remove');
    return result;
  },
};

export default agencyService;
