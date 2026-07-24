import {
  useNavigate,
} from 'react-router-dom';

import {
  AGENT_ROUTES,
} from '../constants';

import {
  AgentEmptyState,
  AgentModuleHeader,
} from '../components';

import {
  useAgents,
} from '../hooks';

export function AgentsPage() {
  const navigate =
    useNavigate();

  const {
    agents,
    isLoading,
    error,
    hasActiveFilters,
    reload,
    resetFilters,
  } = useAgents();

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
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <strong>
            Não foi possível carregar os agentes.
          </strong>

          <p className="mt-1">
            {error.message}
          </p>
        </div>
      )}

      {isLoading && (
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
          {Array.from({
            length: 6,
          }).map(
            (_, index) => (
              <div
                key={index}
                className="h-14 animate-pulse rounded-xl bg-slate-100"
              />
            ),
          )}
        </div>
      )}

      {!isLoading &&
        agents.length === 0 && (
          <AgentEmptyState
            hasFilters={
              hasActiveFilters
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
        )}

      {!isLoading &&
        agents.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Agentes cadastrados
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {agents.length}{' '}
                  registros carregados
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
              A tabela completa será adicionada na Parte 4.1.2.
            </div>
          </section>
        )}
    </main>
  );
}

export default AgentsPage;
