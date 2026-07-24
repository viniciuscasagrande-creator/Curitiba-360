import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  AlertTriangle,
  Plus,
  RefreshCcw,
  UserRound,
} from 'lucide-react';

import {
  AgentActiveFilters,
  AgentFilterDrawer,
  AgentGrid,
  AgentPagination,
  AgentTable,
  AgentToolbar,
} from '../components';

import {
  useAgents,
} from '../hooks';

/*
 * Substitua este array pelos dados carregados
 * pelo seu service/repository Firebase.
 */
const DEMO_AGENTS = [
  {
    id: 'agent-1',
    name: 'Amanda Ferreira',
    code: 'AG-0001',
    email: 'amanda@curitiba360.com.br',
    phone: '(41) 99999-0101',
    status: 'active',
    availability: 'available',
    type: 'internal',
    agencyId: 'agency-1',
    agencyName: 'Agência Centro',
    specialties: [
      'events',
      'commercial',
    ],
    state: 'PR',
    city: 'Curitiba',
    region: 'Centro',
    performance: 94,
  },
  {
    id: 'agent-2',
    name: 'Bruno Martins',
    code: 'AG-0002',
    email: 'bruno@curitiba360.com.br',
    phone: '(41) 99999-0102',
    status: 'active',
    availability: 'busy',
    type: 'external',
    agencyId: 'agency-2',
    agencyName: 'Agência Curitiba Norte',
    specialties: [
      'tourism',
      'hospitality',
    ],
    state: 'PR',
    city: 'Curitiba',
    region: 'Boa Vista',
    performance: 87,
  },
  {
    id: 'agent-3',
    name: 'Carolina Souza',
    code: 'AG-0003',
    email: 'carolina@curitiba360.com.br',
    phone: '(41) 99999-0103',
    status: 'pending',
    availability: 'unavailable',
    type: 'partner',
    agencyId: 'agency-3',
    agencyName: 'Agência Metropolitana',
    specialties: [
      'support',
      'operations',
    ],
    state: 'PR',
    city: 'São José dos Pinhais',
    region: 'Região Metropolitana',
    performance: 72,
  },
];

const AGENCIES = [
  {
    value: 'agency-1',
    label: 'Agência Centro',
  },
  {
    value: 'agency-2',
    label: 'Agência Curitiba Norte',
  },
  {
    value: 'agency-3',
    label: 'Agência Metropolitana',
  },
];

const CITIES_BY_STATE = {
  PR: [
    {
      value: 'Curitiba',
      label: 'Curitiba',
    },
    {
      value: 'São José dos Pinhais',
      label: 'São José dos Pinhais',
    },
    {
      value: 'Colombo',
      label: 'Colombo',
    },
    {
      value: 'Pinhais',
      label: 'Pinhais',
    },
  ],
  SC: [
    {
      value: 'Florianópolis',
      label: 'Florianópolis',
    },
    {
      value: 'Joinville',
      label: 'Joinville',
    },
  ],
  SP: [
    {
      value: 'São Paulo',
      label: 'São Paulo',
    },
    {
      value: 'Campinas',
      label: 'Campinas',
    },
  ],
};

function AgentsPageHeader({
  onCreate,
  onRefresh,
  refreshing = false,
}) {
  return (
    <header
      className={[
        'flex flex-col gap-4 text-left',
        'lg:flex-row',
        'lg:items-center',
        'lg:justify-between',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            'flex h-12 w-12',
            'shrink-0',
            'items-center',
            'justify-center',
            'rounded-2xl',
            'bg-slate-950',
            'text-white',
            'shadow-lg',
          ].join(' ')}
        >
          <UserRound size={21} />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            Partner Management
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Gestão de Agentes
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Cadastre, organize e acompanhe os agentes da operação.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={refreshing}
          onClick={onRefresh}
          className={[
            'inline-flex h-11',
            'items-center',
            'justify-center',
            'gap-2',
            'rounded-xl',
            'border border-slate-200',
            'bg-white',
            'px-4',
            'text-sm font-semibold',
            'text-slate-600',
            'shadow-sm',
            'transition-colors',
            'hover:bg-slate-50',
            'hover:text-slate-900',
            'disabled:cursor-not-allowed',
            'disabled:opacity-50',
          ].join(' ')}
        >
          <RefreshCcw
            size={16}
            className={
              refreshing
                ? 'animate-spin'
                : ''
            }
          />

          Atualizar
        </button>

        <button
          type="button"
          onClick={onCreate}
          className={[
            'inline-flex h-11',
            'items-center',
            'justify-center',
            'gap-2',
            'rounded-xl',
            'bg-slate-950',
            'px-4',
            'text-sm font-semibold',
            'text-white',
            'shadow-lg',
            'transition-all',
            'hover:-translate-y-0.5',
            'hover:bg-slate-800',
          ].join(' ')}
        >
          <Plus size={17} />

          Novo agente
        </button>
      </div>
    </header>
  );
}

function AgentsErrorState({
  error,
  onRetry,
}) {
  return (
    <div
      className={[
        'flex min-h-72',
        'flex-col',
        'items-center',
        'justify-center',
        'rounded-2xl',
        'border border-red-100',
        'bg-red-50/70',
        'p-8',
        'text-center',
      ].join(' ')}
    >
      <div
        className={[
          'flex h-12 w-12',
          'items-center',
          'justify-center',
          'rounded-2xl',
          'bg-red-100',
          'text-red-600',
        ].join(' ')}
      >
        <AlertTriangle size={22} />
      </div>

      <h2 className="mt-4 text-base font-bold text-slate-900">
        Não foi possível carregar os agentes
      </h2>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        {error?.message ??
          'Ocorreu um erro ao consultar os dados. Tente novamente.'}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className={[
          'mt-5 inline-flex h-10',
          'items-center',
          'justify-center',
          'gap-2',
          'rounded-xl',
          'bg-slate-950',
          'px-4',
          'text-sm font-semibold',
          'text-white',
          'hover:bg-slate-800',
        ].join(' ')}
      >
        <RefreshCcw size={15} />
        Tentar novamente
      </button>
    </div>
  );
}

function AgentsEmptyState({
  hasFilters,
  onCreate,
  onClearFilters,
}) {
  return (
    <div
      className={[
        'flex min-h-80',
        'flex-col',
        'items-center',
        'justify-center',
        'p-8',
        'text-center',
      ].join(' ')}
    >
      <div
        className={[
          'flex h-14 w-14',
          'items-center',
          'justify-center',
          'rounded-2xl',
          'bg-slate-100',
          'text-slate-500',
        ].join(' ')}
      >
        <UserRound size={24} />
      </div>

      <h2 className="mt-4 text-base font-bold text-slate-900">
        {hasFilters
          ? 'Nenhum agente encontrado'
          : 'Nenhum agente cadastrado'}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {hasFilters
          ? 'Altere ou remova alguns filtros para ampliar os resultados da pesquisa.'
          : 'Cadastre o primeiro agente para começar a organizar sua operação.'}
      </p>

      <button
        type="button"
        onClick={
          hasFilters
            ? onClearFilters
            : onCreate
        }
        className={[
          'mt-5 inline-flex h-10',
          'items-center',
          'justify-center',
          'gap-2',
          'rounded-xl',
          'bg-slate-950',
          'px-4',
          'text-sm font-semibold',
          'text-white',
          'hover:bg-slate-800',
        ].join(' ')}
      >
        {hasFilters ? (
          <RefreshCcw size={15} />
        ) : (
          <Plus size={16} />
        )}

        {hasFilters
          ? 'Limpar filtros'
          : 'Cadastrar agente'}
      </button>
    </div>
  );
}

export function AgentsPage() {
  /*
   * Na integração Firebase, substitua estes estados
   * pelos dados e ações do seu service.
   */
  const [sourceAgents, setSourceAgents] =
    useState(DEMO_AGENTS);

  const [loading, setLoading] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState(null);

  const {
    agents,
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

    updateSearch,
    updateSorting,
    updateDraftFilters,

    removeFilter,
    clearAdvancedFilters,
    clearAllFilters,

    resetDraftFilters,
    openFilterDrawer,
    closeFilterDrawer,
    applyDraftFilters,

    setPage,
    setPageSize,
    setViewMode,
  } = useAgents({
    agents: sourceAgents,
    loading,
    error,
    persist: true,
  });

  const drawerCities =
    useMemo(() => {
      if (!draftFilters.state) {
        return [];
      }

      return (
        CITIES_BY_STATE[
          draftFilters.state
        ] ?? []
      );
    }, [draftFilters.state]);

  const handleCreateAgent =
    useCallback(() => {
      console.log(
        'Abrir cadastro de agente',
      );
    }, []);

  const handleViewAgent =
    useCallback((agent) => {
      console.log(
        'Visualizar agente:',
        agent,
      );
    }, []);

  const handleEditAgent =
    useCallback((agent) => {
      console.log(
        'Editar agente:',
        agent,
      );
    }, []);

  const handleDeleteAgent =
    useCallback((agent) => {
      const confirmed =
        window.confirm(
          `Deseja realmente excluir o agente "${agent.name}"?`,
        );

      if (!confirmed) {
        return;
      }

      setSourceAgents(
        (currentAgents) =>
          currentAgents.filter(
            (currentAgent) =>
              currentAgent.id !==
              agent.id,
          ),
      );
    }, []);

  const handleRefresh =
    useCallback(async () => {
      setRefreshing(true);
      setError(null);

      try {
        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              600,
            ),
        );
      } catch (
        refreshError
      ) {
        setError(
          refreshError,
        );
      } finally {
        setRefreshing(
          false,
        );
      }
    }, []);

  const handleApplyFilters =
    useCallback(
      (nextFilters) => {
        applyDraftFilters(
          nextFilters,
        );
      },
      [applyDraftFilters],
    );

  const handleClearDrawerFilters =
    useCallback(() => {
      resetDraftFilters();
    }, [resetDraftFilters]);

  const handleClearAll =
    useCallback(() => {
      clearAllFilters();
    }, [clearAllFilters]);

  const hasAnyFiltering =
    hasActiveFilters || hasSearch;

  return (
    <div className="min-h-full bg-slate-50 text-left">
      <div
        className={[
          'mx-auto w-full',
          'max-w-[1600px]',
          'space-y-6',
          'p-4',
          'sm:p-6',
          'xl:p-8',
        ].join(' ')}
      >
        <AgentsPageHeader
          refreshing={refreshing}
          onCreate={handleCreateAgent}
          onRefresh={handleRefresh}
        />

        <section
          className={[
            'overflow-hidden',
            'rounded-3xl',
            'border border-slate-200',
            'bg-white',
            'shadow-sm',
          ].join(' ')}
        >
          <div className="border-b border-slate-200 p-4">
            <AgentToolbar
              search={filters.search}
              sorting={sorting}
              viewMode={viewMode}
              resultCount={totalItems}
              activeFiltersCount={
                activeFilterCount
              }
              isLoading={
                loading ||
                refreshing
              }
              onSearchChange={
                updateSearch
              }
              onOpenFilters={
                openFilterDrawer
              }
              onClearFilters={
                clearAdvancedFilters
              }
              onSortingChange={
                updateSorting
              }
              onViewModeChange={
                setViewMode
              }
            />
          </div>

          {hasActiveFilters && (
            <div className="border-b border-slate-200 p-4">
              <AgentActiveFilters
                filters={filters}
                agencies={AGENCIES}
                disabled={
                  loading ||
                  refreshing
                }
                includeSearch={false}
                onRemove={
                  removeFilter
                }
                onClear={
                  clearAdvancedFilters
                }
              />
            </div>
          )}

          {error ? (
            <div className="p-4">
              <AgentsErrorState
                error={error}
                onRetry={
                  handleRefresh
                }
              />
            </div>
          ) : totalItems === 0 &&
            !loading ? (
            <AgentsEmptyState
              hasFilters={
                hasAnyFiltering
              }
              onCreate={
                handleCreateAgent
              }
              onClearFilters={
                handleClearAll
              }
            />
          ) : (
            <>
              {viewMode ===
              'grid' ? (
                <AgentGrid
                  agents={agents}
                  loading={loading}
                  onView={
                    handleViewAgent
                  }
                  onEdit={
                    handleEditAgent
                  }
                  onDelete={
                    handleDeleteAgent
                  }
                />
              ) : (
                <AgentTable
                  agents={agents}
                  loading={loading}
                  sorting={sorting}
                  onSort={
                    updateSorting
                  }
                  onAgentClick={
                    handleViewAgent
                  }
                  onOpenActions={(
                    agent,
                  ) =>
                    handleEditAgent(
                      agent,
                    )
                  }
                  onClearFilters={
                    handleClearAll
                  }
                  onCreate={
                    handleCreateAgent
                  }
                />
              )}

              <AgentPagination
                page={page}
                pageSize={pageSize}
                totalItems={
                  totalItems
                }
                totalPages={
                  totalPages
                }
                firstItemIndex={
                  firstItemIndex
                }
                lastItemIndex={
                  lastItemIndex
                }
                disabled={
                  loading ||
                  refreshing
                }
                onPageChange={
                  setPage
                }
                onPageSizeChange={
                  setPageSize
                }
              />
            </>
          )}
        </section>
      </div>

      <AgentFilterDrawer
        open={
          isFilterDrawerOpen
        }
        filters={draftFilters}
        agencies={AGENCIES}
        cities={drawerCities}
        loading={
          loading ||
          refreshing
        }
        onChange={
          updateDraftFilters
        }
        onApply={
          handleApplyFilters
        }
        onReset={
          handleClearDrawerFilters
        }
        onClose={
          closeFilterDrawer
        }
      />
    </div>
  );
}

export default AgentsPage;
