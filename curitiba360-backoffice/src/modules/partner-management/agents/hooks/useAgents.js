import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  clearAgentFilter,
  countActiveAgentFilters,
  createEmptyAgentFilters,
  removeAgentFilterValue,
  resetAgentFilters,
  sanitizeAgentFilters,
} from '../utils/agentFilterUtils';

const DEFAULT_STORAGE_KEY =
  'curitiba360:partner-management:agents:list-state';

const DEFAULT_PAGE_SIZE = 10;

const DEFAULT_SORTING = {
  field: 'name',
  direction: 'asc',
};

const DEFAULT_FILTERS = createEmptyAgentFilters();

function safelyParseJSON(value, fallbackValue) {
  if (!value) {
    return fallbackValue;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallbackValue;
  }
}

function readPersistedState(storageKey) {
  if (
    typeof window === 'undefined' ||
    !storageKey
  ) {
    return null;
  }

  try {
    const storedValue =
      window.localStorage.getItem(storageKey);

    return safelyParseJSON(
      storedValue,
      null,
    );
  } catch {
    return null;
  }
}

function persistState(storageKey, value) {
  if (
    typeof window === 'undefined' ||
    !storageKey
  ) {
    return;
  }

  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify(value),
    );
  } catch {
    // Evita interromper a tela caso o navegador
    // bloqueie o localStorage.
  }
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(
      /[\u0300-\u036f]/g,
      '',
    )
    .trim()
    .toLowerCase();
}

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return [];
  }

  return [value];
}

function getAgentAgencyId(agent) {
  return (
    agent.agencyId ??
    agent.agency?.id ??
    agent.agency?.value ??
    ''
  );
}

function getAgentState(agent) {
  return (
    agent.state ??
    agent.address?.state ??
    agent.location?.state ??
    ''
  );
}

function getAgentCity(agent) {
  return (
    agent.city ??
    agent.address?.city ??
    agent.location?.city ??
    ''
  );
}

function getAgentRegion(agent) {
  return (
    agent.region ??
    agent.address?.region ??
    agent.location?.region ??
    ''
  );
}

function getAgentSpecialties(agent) {
  return normalizeArray(
    agent.specialties ??
      agent.specialty ??
      agent.skills,
  ).map((item) => {
    if (
      typeof item === 'object' &&
      item !== null
    ) {
      return (
        item.value ??
        item.id ??
        item.name ??
        item.label ??
        ''
      );
    }

    return item;
  });
}

function getAgentPerformance(agent) {
  const performanceValue =
    agent.performance ??
    agent.performanceScore ??
    agent.score ??
    agent.metrics?.performance ??
    0;

  const parsedValue =
    Number(performanceValue);

  return Number.isFinite(parsedValue)
    ? parsedValue
    : 0;
}

function matchesSearch(agent, search) {
  const normalizedSearch =
    normalizeText(search);

  if (!normalizedSearch) {
    return true;
  }

  const searchFields = [
    agent.name,
    agent.fullName,
    agent.email,
    agent.phone,
    agent.document,
    agent.code,
    agent.registration,
    agent.agencyName,
    agent.agency?.name,
    getAgentCity(agent),
    getAgentState(agent),
    getAgentRegion(agent),
  ];

  return searchFields.some((field) =>
    normalizeText(field).includes(
      normalizedSearch,
    ),
  );
}

function matchesStatus(agent, filters) {
  const statuses = [
    ...normalizeArray(filters.statuses),
  ];

  if (filters.status) {
    statuses.push(filters.status);
  }

  if (statuses.length === 0) {
    return true;
  }

  return statuses.includes(
    agent.status,
  );
}

function matchesAvailability(
  agent,
  availability,
) {
  if (!availability) {
    return true;
  }

  return (
    agent.availability === availability ||
    agent.availabilityStatus ===
      availability
  );
}

function matchesType(agent, type) {
  if (!type) {
    return true;
  }

  return (
    agent.type === type ||
    agent.agentType === type
  );
}

function matchesAgency(agent, agencyId) {
  if (!agencyId) {
    return true;
  }

  return (
    String(getAgentAgencyId(agent)) ===
    String(agencyId)
  );
}

function matchesSpecialties(
  agent,
  filters,
) {
  const selectedSpecialties = [
    ...normalizeArray(
      filters.specialties,
    ),
  ];

  if (filters.specialty) {
    selectedSpecialties.push(
      filters.specialty,
    );
  }

  if (
    selectedSpecialties.length === 0
  ) {
    return true;
  }

  const agentSpecialties =
    getAgentSpecialties(agent);

  return selectedSpecialties.every(
    (specialty) =>
      agentSpecialties.includes(
        specialty,
      ),
  );
}

function matchesLocation(agent, filters) {
  if (
    filters.state &&
    normalizeText(
      getAgentState(agent),
    ) !== normalizeText(filters.state)
  ) {
    return false;
  }

  if (
    filters.city &&
    !normalizeText(
      getAgentCity(agent),
    ).includes(
      normalizeText(filters.city),
    )
  ) {
    return false;
  }

  if (
    filters.region &&
    !normalizeText(
      getAgentRegion(agent),
    ).includes(
      normalizeText(filters.region),
    )
  ) {
    return false;
  }

  return true;
}

function matchesPerformance(
  agent,
  minimumPerformance,
) {
  if (
    minimumPerformance === '' ||
    minimumPerformance === null ||
    minimumPerformance === undefined
  ) {
    return true;
  }

  return (
    getAgentPerformance(agent) >=
    Number(minimumPerformance)
  );
}

function filterAgents(
  agents,
  filters,
) {
  return agents.filter((agent) => {
    return (
      matchesSearch(
        agent,
        filters.search,
      ) &&
      matchesStatus(
        agent,
        filters,
      ) &&
      matchesAvailability(
        agent,
        filters.availability,
      ) &&
      matchesType(
        agent,
        filters.type,
      ) &&
      matchesAgency(
        agent,
        filters.agencyId,
      ) &&
      matchesSpecialties(
        agent,
        filters,
      ) &&
      matchesLocation(
        agent,
        filters,
      ) &&
      matchesPerformance(
        agent,
        filters.minimumPerformance,
      )
    );
  });
}

function getSortableValue(
  agent,
  field,
) {
  switch (field) {
    case 'name':
      return normalizeText(
        agent.name ??
          agent.fullName,
      );

    case 'email':
      return normalizeText(
        agent.email,
      );

    case 'status':
      return normalizeText(
        agent.status,
      );

    case 'availability':
      return normalizeText(
        agent.availability ??
          agent.availabilityStatus,
      );

    case 'agency':
    case 'agencyName':
      return normalizeText(
        agent.agencyName ??
          agent.agency?.name,
      );

    case 'city':
      return normalizeText(
        getAgentCity(agent),
      );

    case 'performance':
    case 'performanceScore':
      return getAgentPerformance(
        agent,
      );

    case 'createdAt':
      return new Date(
        agent.createdAt?.toDate?.() ??
          agent.createdAt ??
          0,
      ).getTime();

    case 'updatedAt':
      return new Date(
        agent.updatedAt?.toDate?.() ??
          agent.updatedAt ??
          0,
      ).getTime();

    default:
      return (
        agent[field] ??
        ''
      );
  }
}

function sortAgents(
  agents,
  sorting,
) {
  const {
    field,
    direction,
  } = sorting;

  const directionMultiplier =
    direction === 'desc'
      ? -1
      : 1;

  return [...agents].sort(
    (firstAgent, secondAgent) => {
      const firstValue =
        getSortableValue(
          firstAgent,
          field,
        );

      const secondValue =
        getSortableValue(
          secondAgent,
          field,
        );

      if (
        typeof firstValue ===
          'number' &&
        typeof secondValue ===
          'number'
      ) {
        return (
          (firstValue -
            secondValue) *
          directionMultiplier
        );
      }

      return (
        String(firstValue).localeCompare(
          String(secondValue),
          'pt-BR',
          {
            numeric: true,
            sensitivity: 'base',
          },
        ) *
        directionMultiplier
      );
    },
  );
}

function paginateAgents(
  agents,
  page,
  pageSize,
) {
  const startIndex =
    (page - 1) * pageSize;

  return agents.slice(
    startIndex,
    startIndex + pageSize,
  );
}

/**
 * Hook principal da listagem de agentes.
 */
export function useAgents({
  agents = [],
  loading = false,
  error = null,

  initialFilters = {},
  initialSorting =
    DEFAULT_SORTING,
  initialPageSize =
    DEFAULT_PAGE_SIZE,
  initialViewMode = 'list',

  persist = true,
  storageKey =
    DEFAULT_STORAGE_KEY,

  onFiltersChange,
} = {}) {
  const persistedState =
    useMemo(
      () =>
        persist
          ? readPersistedState(
              storageKey,
            )
          : null,
      [persist, storageKey],
    );

  const [filters, setFilters] =
    useState(() =>
      createEmptyAgentFilters({
        ...DEFAULT_FILTERS,
        ...initialFilters,
        ...persistedState?.filters,
      }),
    );

  const [
    draftFilters,
    setDraftFilters,
  ] = useState(() =>
    createEmptyAgentFilters({
      ...DEFAULT_FILTERS,
      ...initialFilters,
      ...persistedState?.filters,
    }),
  );

  const [sorting, setSorting] =
    useState(() => ({
      ...DEFAULT_SORTING,
      ...initialSorting,
      ...persistedState?.sorting,
    }));

  const [page, setPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(
      persistedState?.pageSize ??
        initialPageSize,
    );

  const [viewMode, setViewMode] =
    useState(
      persistedState?.viewMode ??
        initialViewMode,
    );

  const [
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
  ] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [filters, sorting, pageSize]);

  useEffect(() => {
    onFiltersChange?.(
      sanitizeAgentFilters(
        filters,
      ),
    );
  }, [
    filters,
    onFiltersChange,
  ]);

  useEffect(() => {
    if (!persist) {
      return;
    }

    persistState(storageKey, {
      filters,
      sorting,
      pageSize,
      viewMode,
    });
  }, [
    filters,
    sorting,
    pageSize,
    viewMode,
    persist,
    storageKey,
  ]);

  const filteredAgents =
    useMemo(
      () =>
        filterAgents(
          agents,
          filters,
        ),
      [agents, filters],
    );

  const sortedAgents =
    useMemo(
      () =>
        sortAgents(
          filteredAgents,
          sorting,
        ),
      [
        filteredAgents,
        sorting,
      ],
    );

  const totalItems =
    sortedAgents.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalItems / pageSize,
    ),
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedAgents =
    useMemo(
      () =>
        paginateAgents(
          sortedAgents,
          page,
          pageSize,
        ),
      [
        sortedAgents,
        page,
        pageSize,
      ],
    );

  const activeFilterCount =
    useMemo(
      () =>
        countActiveAgentFilters(
          filters,
          {
            includeSearch: false,
          },
        ),
      [filters],
    );

  const hasActiveFilters =
    activeFilterCount > 0;

  const hasSearch =
    Boolean(filters.search?.trim());

  const firstItemIndex =
    totalItems === 0
      ? 0
      : (page - 1) *
          pageSize +
        1;

  const lastItemIndex =
    Math.min(
      page * pageSize,
      totalItems,
    );

  const updateFilters =
    useCallback(
      (nextFilters) => {
        setFilters(
          (currentFilters) => {
            const resolvedFilters =
              typeof nextFilters ===
              'function'
                ? nextFilters(
                    currentFilters,
                  )
                : nextFilters;

            return createEmptyAgentFilters({
              ...currentFilters,
              ...resolvedFilters,
            });
          },
        );
      },
      [],
    );

  const replaceFilters =
    useCallback(
      (nextFilters = {}) => {
        setFilters(
          createEmptyAgentFilters(
            nextFilters,
          ),
        );
      },
      [],
    );

  const updateDraftFilters =
    useCallback(
      (nextFilters) => {
        setDraftFilters(
          (currentFilters) => {
            const resolvedFilters =
              typeof nextFilters ===
              'function'
                ? nextFilters(
                    currentFilters,
                  )
                : nextFilters;

            return createEmptyAgentFilters({
              ...currentFilters,
              ...resolvedFilters,
            });
          },
        );
      },
      [],
    );

  const updateSearch =
    useCallback(
      (search) => {
        setFilters(
          (currentFilters) => ({
            ...currentFilters,
            search:
              search ?? '',
          }),
        );
      },
      [],
    );

  const updateSorting =
    useCallback(
      (
        fieldOrSorting,
        direction,
      ) => {
        setSorting(
          (currentSorting) => {
            if (
              typeof fieldOrSorting ===
              'object'
            ) {
              return {
                ...currentSorting,
                ...fieldOrSorting,
              };
            }

            if (
              fieldOrSorting ===
              currentSorting.field &&
              !direction
            ) {
              return {
                field:
                  fieldOrSorting,
                direction:
                  currentSorting.direction ===
                  'asc'
                    ? 'desc'
                    : 'asc',
              };
            }

            return {
              field:
                fieldOrSorting,
              direction:
                direction ??
                'asc',
            };
          },
        );
      },
      [],
    );

  const removeFilter =
    useCallback(
      (itemOrField, value) => {
        setFilters(
          (currentFilters) => {
            const field =
              typeof itemOrField ===
              'object'
                ? itemOrField.field
                : itemOrField;

            const itemValue =
              typeof itemOrField ===
              'object'
                ? itemOrField.value
                : value;

            const isMultiple =
              typeof itemOrField ===
                'object'
                ? itemOrField.isMultiple
                : Array.isArray(
                    currentFilters[
                      field
                    ],
                  );

            if (isMultiple) {
              return removeAgentFilterValue(
                currentFilters,
                field,
                itemValue,
              );
            }

            return clearAgentFilter(
              currentFilters,
              field,
            );
          },
        );
      },
      [],
    );

  const clearAdvancedFilters =
    useCallback(() => {
      setFilters(
        (currentFilters) =>
          resetAgentFilters({
            search:
              currentFilters.search,
          }),
      );
    }, []);

  const clearAllFilters =
    useCallback(() => {
      setFilters(
        resetAgentFilters(),
      );
    }, []);

  const resetDraftFilters =
    useCallback(() => {
      setDraftFilters(
        resetAgentFilters({
          search:
            filters.search,
        }),
      );
    }, [filters.search]);

  const openFilterDrawer =
    useCallback(() => {
      setDraftFilters(
        createEmptyAgentFilters(
          filters,
        ),
      );

      setIsFilterDrawerOpen(
        true,
      );
    }, [filters]);

  const closeFilterDrawer =
    useCallback(() => {
      setDraftFilters(
        createEmptyAgentFilters(
          filters,
        ),
      );

      setIsFilterDrawerOpen(
        false,
      );
    }, [filters]);

  const applyDraftFilters =
    useCallback(
      (nextFilters) => {
        const filtersToApply =
          nextFilters ??
          draftFilters;

        setFilters(
          createEmptyAgentFilters({
            ...filtersToApply,
            search:
              filters.search,
          }),
        );

        setIsFilterDrawerOpen(
          false,
        );
      },
      [
        draftFilters,
        filters.search,
      ],
    );

  const goToPage =
    useCallback(
      (nextPage) => {
        const normalizedPage =
          Math.min(
            Math.max(
              Number(nextPage) ||
                1,
              1,
            ),
            totalPages,
          );

        setPage(
          normalizedPage,
        );
      },
      [totalPages],
    );

  const nextPage =
    useCallback(() => {
      setPage(
        (currentPage) =>
          Math.min(
            currentPage + 1,
            totalPages,
          ),
      );
    }, [totalPages]);

  const previousPage =
    useCallback(() => {
      setPage(
        (currentPage) =>
          Math.max(
            currentPage - 1,
            1,
          ),
      );
    }, []);

  const changePageSize =
    useCallback(
      (nextPageSize) => {
        const normalizedPageSize =
          Math.max(
            Number(
              nextPageSize,
            ) ||
              DEFAULT_PAGE_SIZE,
            1,
          );

        setPageSize(
          normalizedPageSize,
        );

        setPage(1);
      },
      [],
    );

  const toggleViewMode =
    useCallback(() => {
      setViewMode(
        (currentViewMode) =>
          currentViewMode ===
          'list'
            ? 'grid'
            : 'list',
      );
    }, []);

  const resetListState =
    useCallback(() => {
      setFilters(
        createEmptyAgentFilters(
          initialFilters,
        ),
      );

      setDraftFilters(
        createEmptyAgentFilters(
          initialFilters,
        ),
      );

      setSorting({
        ...DEFAULT_SORTING,
        ...initialSorting,
      });

      setPage(1);
      setPageSize(
        initialPageSize,
      );
      setViewMode(
        initialViewMode,
      );
      setIsFilterDrawerOpen(
        false,
      );

      if (
        typeof window !==
          'undefined' &&
        storageKey
      ) {
        try {
          window.localStorage.removeItem(
            storageKey,
          );
        } catch {
          // O reset da interface continua funcionando
          // mesmo quando o storage está indisponível.
        }
      }
    }, [
      initialFilters,
      initialSorting,
      initialPageSize,
      initialViewMode,
      storageKey,
    ]);

  return {
    agents: paginatedAgents,
    allAgents: agents,
    filteredAgents,
    sortedAgents,

    loading,
    error,

    filters,
    draftFilters,
    sorting,

    page,
    pageSize,
    totalItems,
    totalPages,
    firstItemIndex,
    lastItemIndex,

    viewMode,
    isFilterDrawerOpen,

    activeFilterCount,
    hasActiveFilters,
    hasSearch,

    updateFilters,
    replaceFilters,
    updateDraftFilters,
    updateSearch,
    updateSorting,

    removeFilter,
    clearAdvancedFilters,
    clearAllFilters,

    resetDraftFilters,
    openFilterDrawer,
    closeFilterDrawer,
    applyDraftFilters,

    setPage: goToPage,
    goToPage,
    nextPage,
    previousPage,
    setPageSize:
      changePageSize,

    setViewMode,
    toggleViewMode,

    resetListState,

    // Métodos legados de compatibilidade se chamados
    setFilters: updateFilters,
    resetFilters: clearAllFilters,
    setSorting: updateSorting,
    reload: () => {},
  };
}

export default useAgents;
