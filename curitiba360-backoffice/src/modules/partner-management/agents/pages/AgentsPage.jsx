import {
  useMemo,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  AGENT_ROUTES,
} from '../constants';

import {
  AgentModuleHeader,
  AgentTable,
  AgentToolbar,
} from '../components';

import {
  useAgents,
} from '../hooks';

import {
  countActiveAgentFilters,
} from '../utils';

export function AgentsPage() {
  const navigate =
    useNavigate();

  const [
    selectedAgent,
    setSelectedAgent,
  ] = useState(null);

  const [
    viewMode,
    setViewMode,
  ] = useState('table');

  const [
    isFiltersOpen,
    setIsFiltersOpen,
  ] = useState(false);

  const {
    agents,
    filters,
    sorting,
    pagination,

    isLoading,
    isMutating,
    error,
    hasActiveFilters,

    reload,
    setFilters,
    resetFilters,
    setSorting,
  } = useAgents();

  const activeFiltersCount =
    useMemo(
      () =>
        countActiveAgentFilters(
          filters,
        ),
      [filters],
    );

  function handleSearchChange(
    search,
  ) {
    setFilters({
      search,
    });
  }

  function handleAgentClick(
    agent,
  ) {
    setSelectedAgent(agent);

    console.info(
      'Agente selecionado:',
      agent,
    );

    /*
     * O AgentDrawer será conectado
     * na Parte 4.1.2-D.
     */
  }

  function handleOpenActions(
    agent,
    buttonElement,
  ) {
    setSelectedAgent(agent);

    console.info(
      'Abrir menu de ações:',
      {
        agent,
        buttonElement,
      },
    );

    /*
     * O menu de ações será conectado
     * na Parte 4.1.2-C.
     */
  }

  function handleOpenFilters() {
    setIsFiltersOpen(true);

    console.info(
      'Abrir painel de filtros.',
    );

    /*
     * O AgentFilterDrawer será conectado
     * na Parte 4.1.2-B3.
     */
  }

  const totalResults =
    pagination.total ??
    agents.length;

  return (
    <main className="space-y-6 text-left">
      <AgentModuleHeader
        onCreate={() =>
          navigate(
            AGENT_ROUTES.CREATE,
          )
        }
        onRefresh={reload}
        isRefreshing={
          isLoading
        }
        onExport={() => {
          console.info(
            'Exportação será implementada posteriormente.',
          );
        }}
      />

      {error && (
        <div
          role="alert"
          className={[
            'rounded-xl',
            'border',
            'border-red-200',
            'bg-red-50',
            'px-4',
            'py-3',
            'text-sm',
            'text-red-700',
          ].join(' ')}
        >
          <strong>
            Não foi possível carregar os agentes.
          </strong>

          <p className="mt-1">
            {error.message}
          </p>

          <button
            type="button"
            onClick={reload}
            className={[
              'mt-3',
              'rounded-lg',
              'border',
              'border-red-200',
              'bg-white',
              'px-3',
              'py-1.5',
              'text-xs',
              'font-semibold',
              'text-red-700',
              'hover:bg-red-50',
            ].join(' ')}
          >
            Tentar novamente
          </button>
        </div>
      )}

      <AgentToolbar
        search={
          filters.search
        }
        sorting={sorting}
        viewMode={viewMode}
        resultCount={
          totalResults
        }
        activeFiltersCount={
          activeFiltersCount
        }
        isLoading={
          isLoading
        }
        disabled={
          isMutating
        }
        onSearchChange={
          handleSearchChange
        }
        onSortingChange={
          setSorting
        }
        onViewModeChange={
          setViewMode
        }
        onOpenFilters={
          handleOpenFilters
        }
        onClearFilters={
          resetFilters
        }
      />

      {viewMode ===
      'table' ? (
        <AgentTable
          agents={agents}
          sorting={sorting}
          isLoading={
            isLoading
          }
          hasActiveFilters={
            hasActiveFilters
          }
          onSort={
            setSorting
          }
          onAgentClick={
            handleAgentClick
          }
          onOpenActions={
            handleOpenActions
          }
          onClearFilters={
            resetFilters
          }
          onCreate={() =>
            navigate(
              AGENT_ROUTES.CREATE,
            )
          }
        />
      ) : (
        <section
          className={[
            'rounded-2xl text-left',
            'border',
            'border-dashed',
            'border-slate-300',
            'bg-white',
            'p-10',
            'text-center',
          ].join(' ')}
        >
          <h2 className="text-base font-bold text-slate-900">
            Visualização em cartões
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            O grid completo de agentes será implementado posteriormente.
          </p>

          <button
            type="button"
            onClick={() =>
              setViewMode(
                'table',
              )
            }
            className={[
              'mt-5',
              'rounded-xl',
              'bg-slate-950',
              'px-4',
              'py-2.5',
              'text-sm',
              'font-semibold',
              'text-white',
              'hover:bg-slate-800',
            ].join(' ')}
          >
            Voltar para lista
          </button>
        </section>
      )}

      {selectedAgent && (
        <div className="sr-only">
          Agente selecionado:{' '}
          {selectedAgent.name}
        </div>
      )}

      {isFiltersOpen && (
        <div className="sr-only">
          Painel de filtros aberto.
        </div>
      )}
    </main>
  );
}

export default AgentsPage;
