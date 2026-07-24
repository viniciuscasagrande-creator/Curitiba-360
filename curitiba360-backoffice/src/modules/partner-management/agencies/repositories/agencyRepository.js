import { agenciesMock } from '../data/agenciesMock';

import {
  cloneData,
  generateCode,
} from '../../shared/utils/partnerFormatters';

let database = cloneData(agenciesMock);

function wait(milliseconds = 250) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function findAgencyIndex(id) {
  return database.findIndex(
    (agency) => agency.id === id,
  );
}

export const agencyRepository = {
  async list() {
    await wait();

    return cloneData(database);
  },

  async findById(id) {
    await wait(150);

    const agency = database.find(
      (item) => item.id === id,
    );

    if (!agency) {
      throw new Error(
        'Agência não encontrada.',
      );
    }

    return cloneData(agency);
  },

  async create(payload) {
    await wait();

    const now = new Date().toISOString();

    const agency = {
      ...payload,

      id: generateCode(database),
      agentsCount: 0,

      createdAt: now,
      updatedAt: now,

      status:
        payload.status ??
        'Pendente de Aprovação',

      statusReason:
        payload.statusReason ?? '',

      attractions:
        payload.attractions ?? [],

      managers:
        payload.managers ?? [],

      documents:
        payload.documents ?? [],

      bankAccount:
        payload.bankAccount ?? {},
    };

    database = [agency, ...database];

    return cloneData(agency);
  },

  async update(id, payload) {
    await wait();

    const index = findAgencyIndex(id);

    if (index < 0) {
      throw new Error(
        'Agência não encontrada.',
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

    database = database.map((agency) => {
      if (!ids.includes(agency.id)) {
        return agency;
      }

      return {
        ...agency,
        ...payload,
        updatedAt,
      };
    });

    return cloneData(
      database.filter((agency) =>
        ids.includes(agency.id),
      ),
    );
  },

  async remove(id) {
    await wait();

    const exists = database.some(
      (agency) => agency.id === id,
    );

    if (!exists) {
      throw new Error(
        'Agência não encontrada.',
      );
    }

    database = database.filter(
      (agency) => agency.id !== id,
    );
  },

  async removeMany(ids) {
    await wait();

    database = database.filter(
      (agency) => !ids.includes(agency.id),
    );
  },
};
