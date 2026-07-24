import {
  endAt,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';

import {
  normalizeAgencyFilters,
  normalizeSearchText,
} from '../utils/agencySearchUtils';

const ALLOWED_SORT_FIELDS =
  new Set([
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

const ALLOWED_SORT_DIRECTIONS =
  new Set(['asc', 'desc']);

function getSafeSortField(
  value,
) {
  return ALLOWED_SORT_FIELDS.has(
    value,
  )
    ? value
    : 'createdAt';
}

function getSafeSortDirection(
  value,
) {
  return ALLOWED_SORT_DIRECTIONS.has(
    value,
  )
    ? value
    : 'desc';
}

function toDateValue(value) {
  if (!value) {
    return null;
  }

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
}

export function buildAgencyQuery({
  collectionReference,
  filters = {},
  sorting = {},
  pageSize = 20,
  cursor = null,
} = {}) {
  if (!collectionReference) {
    throw new Error(
      'A referência da coleção é obrigatória.',
    );
  }

  const normalizedFilters =
    normalizeAgencyFilters(filters);

  const constraints = [];

  if (normalizedFilters.status) {
    constraints.push(
      where(
        'status',
        '==',
        normalizedFilters.status,
      ),
    );
  }

  if (normalizedFilters.state) {
    constraints.push(
      where(
        'state',
        '==',
        normalizedFilters.state,
      ),
    );
  }

  if (
    normalizedFilters.companyType
  ) {
    constraints.push(
      where(
        'companyType',
        '==',
        normalizedFilters.companyType,
      ),
    );
  }

  if (normalizedFilters.city) {
    constraints.push(
      where(
        'cityNormalized',
        '==',
        normalizedFilters.city,
      ),
    );
  }

  if (
    normalizedFilters.hasDocuments ===
    true
  ) {
    constraints.push(
      where(
        'documentsCount',
        '>',
        0,
      ),
    );
  }

  if (
    normalizedFilters.hasDocuments ===
    false
  ) {
    constraints.push(
      where(
        'documentsCount',
        '==',
        0,
      ),
    );
  }

  const createdFrom =
    toDateValue(
      normalizedFilters.createdFrom,
    );

  const createdTo =
    toDateValue(
      normalizedFilters.createdTo,
    );

  if (createdFrom) {
    constraints.push(
      where(
        'createdAt',
        '>=',
        createdFrom,
      ),
    );
  }

  if (createdTo) {
    const endOfDay =
      new Date(createdTo);

    endOfDay.setHours(
      23,
      59,
      59,
      999,
    );

    constraints.push(
      where(
        'createdAt',
        '<=',
        endOfDay,
      ),
    );
  }

  const search =
    normalizeSearchText(
      normalizedFilters.search,
    );

  let sortField =
    getSafeSortField(
      sorting.field,
    );

  let sortDirection =
    getSafeSortDirection(
      sorting.direction,
    );

  if (search) {
    sortField = 'searchTradeName';
    sortDirection = 'asc';

    constraints.push(
      orderBy(
        sortField,
        sortDirection,
      ),
      startAt(search),
      endAt(`${search}\uf8ff`),
    );
  } else {
    constraints.push(
      orderBy(
        sortField,
        sortDirection,
      ),
    );
  }

  if (cursor) {
    constraints.push(
      startAfter(cursor),
    );
  }

  constraints.push(
    limit(pageSize + 1),
  );

  return {
    firestoreQuery: query(
      collectionReference,
      ...constraints,
    ),

    metadata: {
      filters: normalizedFilters,
      sorting: {
        field: sortField,
        direction: sortDirection,
      },
      pageSize,
      hasSearch: Boolean(search),
    },
  };
}
