export const AGENCY_REALTIME_STATUS = {
  IDLE: 'idle',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  SYNCING: 'syncing',
  OFFLINE: 'offline',
  ERROR: 'error',
  STOPPED: 'stopped',
};

export const AGENCY_CHANGE_TYPES = {
  ADDED: 'added',
  MODIFIED: 'modified',
  REMOVED: 'removed',
};

export function createRealtimeState({
  status = AGENCY_REALTIME_STATUS.IDLE,
  isConnected = false,
  isFromCache = false,
  hasPendingWrites = false,
  lastSyncedAt = null,
  error = null,
} = {}) {
  return {
    status,
    isConnected,
    isFromCache,
    hasPendingWrites,
    lastSyncedAt,
    error,
  };
}

export function normalizeRealtimeLimit(value, fallback = 100) {
  const parsedValue = Number(value);

  if (
    !Number.isInteger(parsedValue) ||
    parsedValue <= 0
  ) {
    return fallback;
  }

  return Math.min(parsedValue, 500);
}

export function normalizeRealtimeFilters(filters = {}) {
  return {
    status:
      filters.status &&
      filters.status !== 'Todos'
        ? String(filters.status).trim()
        : '',

    state: String(filters.state || '')
      .trim()
      .toUpperCase(),

    cityNormalized: String(
      filters.cityNormalized ||
        filters.city ||
        '',
    )
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase(),

    companyType:
      filters.companyType &&
      filters.companyType !== 'Todos'
        ? String(filters.companyType).trim()
        : '',
  };
}

export function normalizeRealtimeSorting(
  sorting = {},
) {
  const allowedFields = new Set([
    'createdAt',
    'updatedAt',
    'tradeName',
    'corporateName',
    'status',
    'city',
    'state',
    'agentsCount',
    'attractionsCount',
  ]);

  const allowedDirections = new Set([
    'asc',
    'desc',
  ]);

  return {
    field: allowedFields.has(sorting.field)
      ? sorting.field
      : 'createdAt',

    direction: allowedDirections.has(
      sorting.direction,
    )
      ? sorting.direction
      : 'desc',
  };
}

export function createAgencyChange({
  type,
  agency,
  oldIndex,
  newIndex,
  hasPendingWrites = false,
} = {}) {
  return {
    type,
    agency,
    oldIndex,
    newIndex,
    hasPendingWrites,
    receivedAt: new Date().toISOString(),
  };
}
