import {
  AGENT_AVAILABILITY,
  AGENT_STATUS,
  AGENT_TYPES,
} from '../constants';

export const EMPTY_AGENT_ADDRESS = {
  zipCode: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  cityNormalized: '',
  state: '',
  country: 'Brasil',
  latitude: null,
  longitude: null,
};

export const EMPTY_AGENT_CONTACT = {
  email: '',
  phone: '',
  mobilePhone: '',
  whatsapp: '',
};

export const EMPTY_AGENT_DOCUMENTS = {
  cpf: '',
  rg: '',
  rgIssuer: '',
  rgState: '',
  birthDate: '',
  pis: '',
  driverLicense: '',
};

export const EMPTY_AGENT_BANK_ACCOUNT = {
  bankCode: '',
  bankName: '',
  agency: '',
  agencyDigit: '',
  account: '',
  accountDigit: '',
  accountType: '',
  pixKey: '',
  pixKeyType: '',
};

export const EMPTY_AGENT_COMMISSION = {
  enabled: false,
  type: 'percentage',
  percentage: 0,
  fixedAmount: 0,
  calculationBase: 'event',
  paymentFrequency: 'monthly',
};

export const EMPTY_AGENT_PERFORMANCE = {
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
};

export const EMPTY_AGENT_LOCATION = {
  latitude: null,
  longitude: null,
  accuracy: null,
  updatedAt: null,
  isSharing: false,
};

export const EMPTY_AGENT = {
  id: null,

  name: '',
  socialName: '',
  avatarUrl: '',
  registrationNumber: '',

  agencyId: '',
  agencyName: '',

  status: AGENT_STATUS.PENDING,
  availability: AGENT_AVAILABILITY.AVAILABLE,
  type: AGENT_TYPES.INTERNAL,

  specialties: [],
  regions: [],
  tags: [],

  contact: {
    ...EMPTY_AGENT_CONTACT,
  },

  documents: {
    ...EMPTY_AGENT_DOCUMENTS,
  },

  address: {
    ...EMPTY_AGENT_ADDRESS,
  },

  bankAccount: {
    ...EMPTY_AGENT_BANK_ACCOUNT,
  },

  commission: {
    ...EMPTY_AGENT_COMMISSION,
  },

  performance: {
    ...EMPTY_AGENT_PERFORMANCE,
  },

  location: {
    ...EMPTY_AGENT_LOCATION,
  },

  notes: '',
  internalNotes: '',

  createdAt: null,
  createdBy: null,
  updatedAt: null,
  updatedBy: null,

  approvedAt: null,
  approvedBy: null,

  suspendedAt: null,
  suspendedBy: null,
  suspensionReason: '',

  deletedAt: null,
  deletedBy: null,

  version: 1,
};

export function createEmptyAgent(overrides = {}) {
  return {
    ...EMPTY_AGENT,

    ...overrides,

    contact: {
      ...EMPTY_AGENT_CONTACT,
      ...(overrides.contact || {}),
    },

    documents: {
      ...EMPTY_AGENT_DOCUMENTS,
      ...(overrides.documents || {}),
    },

    address: {
      ...EMPTY_AGENT_ADDRESS,
      ...(overrides.address || {}),
    },

    bankAccount: {
      ...EMPTY_AGENT_BANK_ACCOUNT,
      ...(overrides.bankAccount || {}),
    },

    commission: {
      ...EMPTY_AGENT_COMMISSION,
      ...(overrides.commission || {}),
    },

    performance: {
      ...EMPTY_AGENT_PERFORMANCE,
      ...(overrides.performance || {}),
    },

    location: {
      ...EMPTY_AGENT_LOCATION,
      ...(overrides.location || {}),
    },

    specialties: [
      ...(overrides.specialties || []),
    ],

    regions: [
      ...(overrides.regions || []),
    ],

    tags: [
      ...(overrides.tags || []),
    ],
  };
}

export function createAgentKpis({
  total = 0,
  active = 0,
  available = 0,
  onEvent = 0,
  pending = 0,
  suspended = 0,
  eventsThisMonth = 0,
  salesAmount = 0,
  averagePerformance = 0,
} = {}) {
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
}
