import {
  AGENT_AVAILABILITY,
  AGENT_STATUS,
  AGENT_TYPES,
} from '../constants';

import {
  createEmptyAgent,
} from '../types';

import {
  matchesAgentSearch,
} from '../utils';

const now =
  new Date().toISOString();

let agents = [
  createEmptyAgent({
    id: 'agent-001',
    name: 'Carlos Henrique Souza',
    socialName: 'Carlos Souza',
    registrationNumber: 'AG-0001',

    agencyId: 'agency-001',
    agencyName: 'Curitiba Turismo',

    status: AGENT_STATUS.ACTIVE,
    availability:
      AGENT_AVAILABILITY.AVAILABLE,
    type: AGENT_TYPES.INTERNAL,

    specialties: [
      'sales',
      'event_operation',
    ],

    regions: [
      'Curitiba',
      'Região Metropolitana',
    ],

    contact: {
      email:
        'carlos.souza@curitiba360.com.br',
      phone: '(41) 3333-1200',
      mobilePhone: '(41) 99999-1200',
      whatsapp: '(41) 99999-1200',
    },

    address: {
      city: 'Curitiba',
      cityNormalized: 'curitiba',
      state: 'PR',
      country: 'Brasil',
    },

    performance: {
      score: 92,
      target: 100,
      targetAchieved: 88,
      eventsCount: 46,
      completedEventsCount: 43,
      cancelledEventsCount: 3,
      salesCount: 172,
      salesAmount: 186500,
      conversionRate: 34.8,
      averageRating: 4.8,
      totalRatings: 128,
    },

    createdAt: now,
    updatedAt: now,
  }),

  createEmptyAgent({
    id: 'agent-002',
    name: 'Mariana Oliveira Lima',
    socialName: 'Mariana Lima',
    registrationNumber: 'AG-0002',

    agencyId: 'agency-002',
    agencyName: 'Paraná Experience',

    status: AGENT_STATUS.ON_EVENT,
    availability:
      AGENT_AVAILABILITY.BUSY,
    type: AGENT_TYPES.EXTERNAL,

    specialties: [
      'customer_service',
      'accreditation',
      'access_control',
    ],

    regions: [
      'Curitiba',
      'São José dos Pinhais',
    ],

    contact: {
      email:
        'mariana.lima@curitiba360.com.br',
      mobilePhone: '(41) 99999-2400',
      whatsapp: '(41) 99999-2400',
    },

    address: {
      city: 'São José dos Pinhais',
      cityNormalized:
        'sao jose dos pinhais',
      state: 'PR',
      country: 'Brasil',
    },

    performance: {
      score: 96,
      target: 100,
      targetAchieved: 94,
      eventsCount: 54,
      completedEventsCount: 53,
      cancelledEventsCount: 1,
      salesCount: 98,
      salesAmount: 98400,
      conversionRate: 29.6,
      averageRating: 4.9,
      totalRatings: 160,
    },

    createdAt: now,
    updatedAt: now,
  }),

  createEmptyAgent({
    id: 'agent-003',
    name: 'Rafael Mendes Costa',
    registrationNumber: 'AG-0003',

    agencyId: 'agency-001',
    agencyName: 'Curitiba Turismo',

    status: AGENT_STATUS.PENDING,
    availability:
      AGENT_AVAILABILITY.UNAVAILABLE,
    type: AGENT_TYPES.FREELANCER,

    specialties: [
      'technical_support',
    ],

    regions: [
      'Curitiba',
    ],

    contact: {
      email:
        'rafael.costa@example.com',
      mobilePhone: '(41) 98888-4200',
      whatsapp: '(41) 98888-4200',
    },

    address: {
      city: 'Curitiba',
      cityNormalized: 'curitiba',
      state: 'PR',
      country: 'Brasil',
    },

    performance: {
      score: 0,
      target: 0,
      targetAchieved: 0,
      eventsCount: 0,
      completedEventsCount: 0,
      cancelledEventsCount: 0,
      salesCount: 0,
      salesAmount: 0,
      conversionRate: 0,
      averageRating: 0,
      totalRatings: 0,
    },

    createdAt: now,
    updatedAt: now,
  }),
];

function wait(milliseconds = 250) {
  return new Promise((resolve) => {
    window.setTimeout(
      resolve,
      milliseconds,
    );
  });
}

function generateId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID ===
      'function'
  ) {
    return crypto.randomUUID();
  }

  return [
    'agent',
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2),
  ].join('-');
}

function clone(value) {
  return JSON.parse(
    JSON.stringify(value),
  );
}

function applyFilters(
  items,
  filters = {},
) {
  return items.filter((agent) => {
    if (
      filters.search &&
      !matchesAgentSearch(
        agent,
        filters.search,
      )
    ) {
      return false;
    }

    if (
      filters.status &&
      agent.status !== filters.status
    ) {
      return false;
    }

    if (
      filters.availability &&
      agent.availability !==
        filters.availability
    ) {
      return false;
    }

    if (
      filters.type &&
      agent.type !== filters.type
    ) {
      return false;
    }

    if (
      filters.agencyId &&
      agent.agencyId !==
        filters.agencyId
    ) {
      return false;
    }

    if (
      filters.specialty &&
      !agent.specialties?.includes(
        filters.specialty,
      )
    ) {
      return false;
    }

    if (
      filters.state &&
      agent.address?.state !==
        filters.state
    ) {
      return false;
    }

    if (
      filters.city &&
      agent.address?.city !==
        filters.city
    ) {
      return false;
    }

    return true;
  });
}

function applySorting(
  items,
  sorting = {},
) {
  const field =
    sorting.field || 'createdAt';

  const direction =
    sorting.direction === 'asc'
      ? 1
      : -1;

  return [...items].sort(
    (first, second) => {
      const firstValue =
        field === 'eventsCount'
          ? first.performance?.eventsCount
          : field === 'salesAmount'
            ? first.performance?.salesAmount
            : field ===
                'performanceScore'
              ? first.performance?.score
              : first[field];

      const secondValue =
        field === 'eventsCount'
          ? second.performance?.eventsCount
          : field === 'salesAmount'
            ? second.performance?.salesAmount
            : field ===
                'performanceScore'
              ? second.performance?.score
              : second[field];

      if (
        firstValue === secondValue
      ) {
        return 0;
      }

      if (
        firstValue === null ||
        firstValue === undefined
      ) {
        return 1;
      }

      if (
        secondValue === null ||
        secondValue === undefined
      ) {
        return -1;
      }

      return firstValue >
        secondValue
        ? direction
        : -direction;
    },
  );
}

export const agentRepositoryMemory = {
  async list({
    filters = {},
    sorting = {},
  } = {}) {
    await wait();

    const filteredItems =
      applyFilters(
        agents,
        filters,
      );

    const sortedItems =
      applySorting(
        filteredItems,
        sorting,
      );

    return clone(sortedItems);
  },

  async paginate({
    filters = {},
    sorting = {},
    page = 1,
    pageSize = 20,
  } = {}) {
    await wait();

    const filteredItems =
      applyFilters(
        agents,
        filters,
      );

    const sortedItems =
      applySorting(
        filteredItems,
        sorting,
      );

    const normalizedPage =
      Math.max(
        Number(page) || 1,
        1,
      );

    const normalizedPageSize =
      Math.max(
        Number(pageSize) || 20,
        1,
      );

    const start =
      (normalizedPage - 1) *
      normalizedPageSize;

    const data =
      sortedItems.slice(
        start,
        start +
          normalizedPageSize,
      );

    return {
      data: clone(data),

      pagination: {
        page: normalizedPage,
        pageSize:
          normalizedPageSize,
        total:
          sortedItems.length,
        totalPages:
          Math.max(
            Math.ceil(
              sortedItems.length /
                normalizedPageSize,
            ),
            1,
          ),
      },
    };
  },

  async findById(agentId) {
    await wait(150);

    const agent =
      agents.find(
        (item) =>
          item.id === agentId,
      );

    return agent
      ? clone(agent)
      : null;
  },

  async create(payload) {
    await wait();

    const createdAt =
      new Date().toISOString();

    const agent =
      createEmptyAgent({
        ...payload,

        id: generateId(),

        createdAt,
        updatedAt: createdAt,
        version: 1,
      });

    agents = [
      agent,
      ...agents,
    ];

    return clone(agent);
  },

  async update(
    agentId,
    payload,
  ) {
    await wait();

    const index =
      agents.findIndex(
        (item) =>
          item.id === agentId,
      );

    if (index === -1) {
      throw new Error(
        'Agente não encontrado.',
      );
    }

    const current =
      agents[index];

    const updated = {
      ...current,
      ...payload,

      contact: {
        ...current.contact,
        ...(payload.contact || {}),
      },

      documents: {
        ...current.documents,
        ...(payload.documents || {}),
      },

      address: {
        ...current.address,
        ...(payload.address || {}),
      },

      bankAccount: {
        ...current.bankAccount,
        ...(payload.bankAccount || {}),
      },

      commission: {
        ...current.commission,
        ...(payload.commission || {}),
      },

      performance: {
        ...current.performance,
        ...(payload.performance || {}),
      },

      location: {
        ...current.location,
        ...(payload.location || {}),
      },

      updatedAt:
        new Date().toISOString(),

      version:
        Number(
          current.version || 0,
        ) + 1,
    };

    agents[index] = updated;

    return clone(updated);
  },

  async updateStatus(
    agentId,
    status,
    metadata = {},
  ) {
    return this.update(
      agentId,
      {
        status,
        ...metadata,
      },
    );
  },

  async remove(agentId) {
    await wait();

    const exists =
      agents.some(
        (item) =>
          item.id === agentId,
      );

    if (!exists) {
      throw new Error(
        'Agente não encontrado.',
      );
    }

    agents =
      agents.filter(
        (item) =>
          item.id !== agentId,
      );

    return true;
  },

  async getDashboard() {
    await wait();

    const total =
      agents.length;

    const active =
      agents.filter(
        (agent) =>
          agent.status ===
          AGENT_STATUS.ACTIVE,
      ).length;

    const available =
      agents.filter(
        (agent) =>
          agent.availability ===
          AGENT_AVAILABILITY.AVAILABLE,
      ).length;

    const onEvent =
      agents.filter(
        (agent) =>
          agent.status ===
          AGENT_STATUS.ON_EVENT,
      ).length;

    const pending =
      agents.filter(
        (agent) =>
          agent.status ===
          AGENT_STATUS.PENDING,
      ).length;

    const suspended =
      agents.filter(
        (agent) =>
          agent.status ===
          AGENT_STATUS.SUSPENDED,
      ).length;

    const eventsThisMonth =
      agents.reduce(
        (totalEvents, agent) =>
          totalEvents +
          Number(
            agent.performance
              ?.eventsCount || 0,
          ),
        0,
      );

    const salesAmount =
      agents.reduce(
        (totalSales, agent) =>
          totalSales +
          Number(
            agent.performance
              ?.salesAmount || 0,
          ),
        0,
      );

    const scoredAgents =
      agents.filter(
        (agent) =>
          Number(
            agent.performance?.score,
          ) > 0,
      );

    const averagePerformance =
      scoredAgents.length
        ? scoredAgents.reduce(
            (totalScore, agent) =>
              totalScore +
              Number(
                agent.performance
                  ?.score || 0,
              ),
            0,
          ) /
          scoredAgents.length
        : 0;

    return {
      total,
      active,
      available,
      onEvent,
      pending,
      suspended,
      eventsThisMonth,
      salesAmount,
      averagePerformance,
    };
  },
};

export default agentRepositoryMemory;
