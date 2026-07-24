import { agentsMock } from '../mocks/agentsMock';

let database = structuredClone(agentsMock);

function wait(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const agentRepository = {
  async list() {
    await wait();
    return structuredClone(database);
  },

  async findById(id) {
    await wait(150);
    const agent = database.find((a) => a.id === id);
    if (!agent) throw new Error('Agente não encontrado.');
    return structuredClone(agent);
  },

  async create(data) {
    await wait();
    const newAgent = {
      ...data,
      id: `agent-${Date.now()}`,
      status: data.status || 'Pendente',
      createdAt: new Date().toISOString(),
      attractionsCount: data.attractionsCount || 3,
      permissions: data.permissions || ['Emitir Ingressos'],
    };
    database.unshift(newAgent);
    return structuredClone(newAgent);
  },

  async update(id, data) {
    await wait();
    const index = database.findIndex((a) => a.id === id);
    if (index < 0) throw new Error('Agente não encontrado.');
    database[index] = { ...database[index], ...data };
    return structuredClone(database[index]);
  },

  async updateStatus(id, status) {
    await wait();
    const index = database.findIndex((a) => a.id === id);
    if (index < 0) throw new Error('Agente não encontrado.');
    database[index].status = status;
    return structuredClone(database[index]);
  },

  async transferAgency(id, newAgencyId, newAgencyName, reason) {
    await wait();
    const index = database.findIndex((a) => a.id === id);
    if (index < 0) throw new Error('Agente não encontrado.');
    database[index] = {
      ...database[index],
      agencyId: newAgencyId,
      agencyName: newAgencyName,
      transferReason: reason,
    };
    return structuredClone(database[index]);
  },

  async delete(id) {
    await wait();
    database = database.filter((a) => a.id !== id);
    return true;
  },
};
