import { agenciesMock } from '../mocks/agenciesMock';

let database = structuredClone(agenciesMock);

function wait(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const agencyRepository = {
  async list() {
    await wait();
    return structuredClone(database);
  },

  async findById(id) {
    await wait(150);
    const agency = database.find((a) => a.id === id);
    if (!agency) throw new Error('Agência não encontrada.');
    return structuredClone(agency);
  },

  async create(data) {
    await wait();
    const newAgency = {
      ...data,
      id: `agency-${Date.now()}`,
      status: data.status || 'Pendente Aprovação',
      createdAt: new Date().toISOString(),
      agentsCount: 0,
      attractionsCount: data.attractionsCount || 0,
      documents: data.documents || [],
    };
    database.unshift(newAgency);
    return structuredClone(newAgency);
  },

  async update(id, data) {
    await wait();
    const index = database.findIndex((a) => a.id === id);
    if (index < 0) throw new Error('Agência não encontrada.');

    database[index] = {
      ...database[index],
      ...data,
    };
    return structuredClone(database[index]);
  },

  async updateStatus(id, status, reason = '') {
    await wait();
    const index = database.findIndex((a) => a.id === id);
    if (index < 0) throw new Error('Agência não encontrada.');

    database[index] = {
      ...database[index],
      status,
      suspensionReason: status === 'Suspensa' ? reason : undefined,
    };
    return structuredClone(database[index]);
  },

  async updateManyStatus(ids, status) {
    await wait();
    database = database.map((a) =>
      ids.includes(a.id) ? { ...a, status } : a
    );
    return structuredClone(database);
  },
};
