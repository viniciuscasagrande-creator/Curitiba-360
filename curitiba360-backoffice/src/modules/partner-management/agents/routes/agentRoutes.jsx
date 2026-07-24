import {
  Navigate,
} from 'react-router-dom';

import {
  AgentsDashboardPage,
  AgentsPage,
} from '../pages';

function AgentPlaceholderPage({
  title,
  description,
}) {
  return (
    <main className="space-y-4 text-left">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        Esta tela será implementada nas próximas etapas.
      </div>
    </main>
  );
}

export const agentRoutes = [
  {
    index: true,

    element: (
      <Navigate
        to="dashboard"
        replace
      />
    ),
  },
  {
    path: 'dashboard',

    element: (
      <AgentsDashboardPage />
    ),
  },
  {
    path: 'list',

    element: (
      <AgentsPage />
    ),
  },
  {
    path: 'new',

    element: (
      <AgentPlaceholderPage
        title="Novo agente"
        description="Cadastro completo de agente em formato wizard."
      />
    ),
  },
  {
    path: ':agentId',

    element: (
      <AgentPlaceholderPage
        title="Detalhes do agente"
        description="Visão completa do cadastro e histórico do agente."
      />
    ),
  },
  {
    path: ':agentId/edit',

    element: (
      <AgentPlaceholderPage
        title="Editar agente"
        description="Atualização dos dados cadastrais do agente."
      />
    ),
  },
  {
    path: ':agentId/schedule',

    element: (
      <AgentPlaceholderPage
        title="Agenda do agente"
        description="Disponibilidade, escalas, eventos, folgas e bloqueios."
      />
    ),
  },
  {
    path: ':agentId/commissions',

    element: (
      <AgentPlaceholderPage
        title="Comissões do agente"
        description="Regras, lançamentos e histórico de pagamentos."
      />
    ),
  },
  {
    path: ':agentId/performance',

    element: (
      <AgentPlaceholderPage
        title="Performance do agente"
        description="Metas, indicadores, avaliações e produtividade."
      />
    ),
  },
];
