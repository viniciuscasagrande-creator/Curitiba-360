import {
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
} from '../components';

import {
  useAgents,
} from '../hooks';

export function AgentsPage() {
  const navigate =
    useNavigate();

  const [
    selectedAgent,
    setSelectedAgent,
  ] = useState(null);

  const {
    agents,
    sorting,
    pagination,

    isLoading,
    error,
    hasActiveFilters,

    reload,
    resetFilters,
    setSorting,
  } = useAgents();

  function handleAgentClick(
    agent,
  ) {
    setSelectedAgent(agent);

    console.info(
      'Agente selecionado:',
      agent,
    );

    /*
     * Na Parte 4.1.2-D:
     * este método abrirá o AgentDrawer.
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
     * Na Parte 4.1.2-C:
     * este método abrirá o menu
     * AgentActions.
     */
  }

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
            'rounded-xl border',
            'border-red-200',
            'bg-red-50',
            'px-4 py-3',
            'text-sm text-red-700',
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
            className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
          >
            Tentar novamente
          </button>
        </div>
      )}

      <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Agentes cadastrados
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {pagination.total ||
              agents.length}{' '}
            registro
            {(pagination.total ||
              agents.length) !== 1
              ? 's'
              : ''}{' '}
            encontrado
            {(pagination.total ||
              agents.length) !== 1
              ? 's'
              : ''}
          </p>
        </div>

        <div className="text-xs text-slate-400">
          Ordenação:{' '}
          <strong className="font-semibold text-slate-600">
            {sorting.field}
          </strong>{' '}
          —{' '}
          {sorting.direction ===
          'asc'
            ? 'crescente'
            : 'decrescente'}
        </div>
      </section>

      <AgentTable
        agents={agents}
        sorting={sorting}
        isLoading={
          isLoading
        }
        hasActiveFilters={
          hasActiveFilters
        }
        onSort={setSorting}
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

      {selectedAgent && (
        <div className="sr-only">
          Agente selecionado:{' '}
          {selectedAgent.name}
        </div>
      )}
    </main>
  );
}

export default AgentsPage;
