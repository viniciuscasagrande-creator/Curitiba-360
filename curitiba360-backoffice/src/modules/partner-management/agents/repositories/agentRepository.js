import { agentsMock } from '../data/agentsMock';

import {
  cloneData,
  generateCode,
} from '../../shared/utils/partnerFormatters';

let database = cloneData(agentsMock);

function wait(milliseconds = 250) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function findAgentIndex(id) {
  return database.findIndex(
    (agent) => agent.id === id,
  );
}

export const agentRepository = {
  async list() {
    await wait();

    return cloneData(database);
  },

  async findById(id) {
    await wait(150);

    const agent = database.find(
      (item) => item.id === id,
    );

    if (!agent) {
      throw new Error(
        'Agente não encontrado.',
      );
    }

    return cloneData(agent);
  },

  async create(payload) {
    await wait();

    const now = new Date().toISOString();

    const agent = {
      ...payload,

      id: generateCode(database),

      attractionsCount:
        payload.attractionsCount ?? 0,

      attractionIds:
        payload.attractionIds ?? [],

      status: payload.status ?? 'Pendente',
      statusReason:
        payload.statusReason ?? '',

      createdAt: now,
      updatedAt: now,
    };

    database = [agent, ...database];

    return cloneData(agent);
  },

  async update(id, payload) {
    await wait();

    const index = findAgentIndex(id);

    if (index < 0) {
      throw new Error(
        'Agente não encontrado.',
      );
    }

    database[index] = {
      ...database[index],
      ...payload,
      updatedAt: new Date().toISOString(),
    };

    return cloneData(database[index]);
  },

  async updateStatus(
    id,
    status,
    reason = '',
  ) {
    return this.update(id, {
      status,
      statusReason: reason,
    });
  },

  async updateMany(ids, payload) {
    await wait();

    const updatedAt =
      new Date().toISOString();

    database = database.map((agent) => {
      if (!ids.includes(agent.id)) {
        return agent;
      }

      return {
        ...agent,
        ...payload,
        updatedAt,
      };
    });

    return cloneData(
      database.filter((agent) =>
        ids.includes(agent.id),
      ),
    );
  },

  async transferMany(
    ids,
    agencyId,
    agencyName,
  ) {
    return this.updateMany(ids, {
      agencyId,
      agencyName,
    });
  },

  async remove(id) {
    await wait();

    database = database.filter(
      (agent) => agent.id !== id,
    );
  },

  async removeMany(ids) {
    await wait();

    database = database.filter(
      (agent) => !ids.includes(agent.id),
    );
  },
};
