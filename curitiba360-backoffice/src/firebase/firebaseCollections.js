export const FIREBASE_COLLECTIONS = {
  AGENCIES: 'agencies',

  AGENCY_DOCUMENTS:
    'agency_documents',

  AGENCY_BANK_ACCOUNTS:
    'agency_bank_accounts',

  AGENCY_USERS:
    'agency_users',

  AGENCY_HISTORY:
    'agency_history',

  AGENCY_LOGS:
    'agency_logs',

  AGENTS:
    'agents',

  USERS:
    'users',
};

export const FIREBASE_STORAGE_PATHS = {
  AGENCIES: 'agencies',

  agencyDocuments(agencyId) {
    return `agencies/${agencyId}/documents`;
  },

  agencyLogo(agencyId) {
    return `agencies/${agencyId}/logo`;
  },
};
