export const CONDITION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

export const CONDITION_TYPES = {
  PERCENTAGE: 'percentage',
  FIXED_VALUE: 'fixed_value'
};

export const conditionStatusLabels = {
  active: 'Ativo',
  inactive: 'Inativo'
};

export const conditionTypeLabels = {
  percentage: 'Porcentagem',
  fixed_value: 'Valor'
};

export const commercialConditionsMock = [
  {
    id: 'condition-001',
    nickname: 'Padrão 10%',
    status: 'active',
    type: 'percentage',
    value: 10,

    fees: {
      creditCash: 1.5,
      creditInstallment: 1.5,
      pix: 1.5,
      anticipation: 1.5,
      international: 1.5
    },

    paymentTermDays: 15,
    contractsCount: 12,

    createdAt: '2026-01-02T10:00:00',
    updatedAt: '2026-07-20T15:00:00'
  },

  {
    id: 'condition-002',
    nickname: 'Valor fixo Agência',
    status: 'inactive',
    type: 'fixed_value',
    value: 5.5,

    fees: {
      creditCash: 1.5,
      creditInstallment: 1.35,
      pix: 0.95,
      anticipation: 0.25,
      international: 0.25
    },

    paymentTermDays: 20,
    contractsCount: 0,

    createdAt: '2026-03-10T10:00:00',
    updatedAt: '2026-06-10T10:00:00'
  }
];

export const financialInformationMock = [
  {
    id: 'financial-001',
    nickname: 'Padrão de saque',
    status: 'active',

    withdrawal: {
      enabled: true,
      percentageLimit: 10,
      amountLimit: 10000,
      minimumDays: 15
    },

    discounts: {
      pix: {
        enabled: true,
        value: 0.15
      },

      ted: {
        enabled: true,
        value: 0.15
      }
    },

    partnersCount: 8,
    createdAt: '2026-01-05T10:00:00',
    updatedAt: '2026-07-20T15:00:00'
  },

  {
    id: 'financial-002',
    nickname: 'Saque mensal',
    status: 'inactive',

    withdrawal: {
      enabled: true,
      percentageLimit: 50,
      amountLimit: 50000,
      minimumDays: 30
    },

    discounts: {
      pix: {
        enabled: false,
        value: 0
      },

      ted: {
        enabled: true,
        value: 2.5
      }
    },

    partnersCount: 0,
    createdAt: '2026-03-12T10:00:00',
    updatedAt: '2026-06-10T10:00:00'
  }
];
