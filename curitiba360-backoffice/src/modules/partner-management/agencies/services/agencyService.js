import { agencyRepository } from '../repositories/agencyRepository';

export const agencyService = {
  list() {
    return agencyRepository.list();
  },

  findById(id) {
    return agencyRepository.findById(id);
  },

  create(data) {
    if (!data.tradeName || !data.document) {
      throw new Error('Nome Fantasia e CNPJ são campos obrigatórios.');
    }
    return agencyRepository.create(data);
  },

  update(id, data) {
    return agencyRepository.update(id, data);
  },

  approve(id) {
    return agencyRepository.updateStatus(id, 'Ativa');
  },

  reject(id, reason = '') {
    if (!reason.trim()) {
      throw new Error('Informe o motivo da rejeição.');
    }
    return agencyRepository.updateStatus(id, 'Inativa', reason);
  },

  suspend(id, reason) {
    if (!reason?.trim()) {
      throw new Error('Informe o motivo da suspensão.');
    }
    return agencyRepository.updateStatus(id, 'Suspensa', reason);
  },

  approveMany(ids) {
    if (!ids || ids.length === 0) {
      throw new Error('Nenhuma agência selecionada para aprovação.');
    }
    return agencyRepository.updateManyStatus(ids, 'Ativa');
  },

  rejectMany(ids) {
    if (!ids || ids.length === 0) {
      throw new Error('Nenhuma agência selecionada para rejeição.');
    }
    return agencyRepository.updateManyStatus(ids, 'Inativa');
  },
};
