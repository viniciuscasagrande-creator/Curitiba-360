import { agentRepository } from '../repositories/agentRepository';

export const agentService = {
  list() {
    return agentRepository.list();
  },

  findById(id) {
    return agentRepository.findById(id);
  },

  create(data) {
    if (!data.name || !data.cpf || !data.email || !data.agencyId) {
      throw new Error('Nome, CPF, E-mail e Agência são obrigatórios.');
    }
    return agentRepository.create(data);
  },

  update(id, data) {
    return agentRepository.update(id, data);
  },

  approve(id) {
    return agentRepository.updateStatus(id, 'Ativo');
  },

  reject(id) {
    return agentRepository.updateStatus(id, 'Inativo');
  },

  inactivate(id) {
    return agentRepository.updateStatus(id, 'Inativo');
  },

  transferAgency(id, newAgencyId, newAgencyName, reason) {
    if (!newAgencyId || !reason?.trim()) {
      throw new Error('Selecione a nova agência e informe o motivo.');
    }
    return agentRepository.transferAgency(id, newAgencyId, newAgencyName, reason);
  },

  delete(id) {
    return agentRepository.delete(id);
  },
};
