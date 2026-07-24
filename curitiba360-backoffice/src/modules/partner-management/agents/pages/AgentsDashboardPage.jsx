import {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  AGENT_ROUTES,
} from '../constants';

import {
  AgentKpiGrid,
  AgentModuleHeader,
} from '../components';

import {
  agentService,
} from '../services';

export function AgentsDashboardPage() {
  const navigate =
    useNavigate();

  const [kpis, setKpis] =
    useState({});

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  async function loadDashboard() {
    setIsLoading(true);
    setError(null);

    try {
      const result =
        await agentService
          .getDashboard();

      setKpis(result);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <main className="space-y-6 text-left">
      <AgentModuleHeader
        title="Dashboard de Agentes"
        description="Acompanhe disponibilidade, operação, desempenho e resultados da equipe."
        onCreate={() =>
          navigate(
            AGENT_ROUTES.CREATE,
          )
        }
        onRefresh={
          loadDashboard
        }
        isRefreshing={
          isLoading
        }
      />

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <strong>
            Não foi possível carregar o dashboard.
          </strong>

          <p className="mt-1">
            {error.message}
          </p>
        </div>
      )}

      <AgentKpiGrid
        kpis={kpis}
        isLoading={
          isLoading
        }
      />

      <section className="grid gap-4 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="text-base font-bold text-slate-900">
            Performance da equipe
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            O gráfico de performance será implementado na Parte 4.5.
          </p>

          <div className="mt-5 flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
            Área reservada para gráfico de performance
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">
            Disponibilidade
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Distribuição dos agentes por disponibilidade.
          </p>

          <div className="mt-5 flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
            Área reservada para gráfico de disponibilidade
          </div>
        </article>
      </section>
    </main>
  );
}

export default AgentsDashboardPage;
