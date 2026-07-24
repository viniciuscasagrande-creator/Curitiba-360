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
  AgentActiveFilters,
  AgentFilters,
  AgentModuleHeader,
  AgentTable,
  AgentToolbar,
} from '../components';

import {
  useAgents,
} from '../hooks';

export function AgentsPage() {
  const navigate = useNavigate();

  const [selectedAgent, setSelectedAgent] = useState(null);

  const {
    agents,
    allAgents,
    loading,
    error,

    filters,
    draftFilters,
    sorting,

    page,
    pageSize,
    totalItems,
    totalPages,

    viewMode,
    isFilterDrawerOpen,

    activeFilterCount,
    hasActiveFilters,

    updateSearch,
    updateSorting,
    updateDraftFilters,
    removeFilter,
    clearAdvancedFilters,
    clearAllFilters,

    openFilterDrawer,
    closeFilterDrawer,
    applyDraftFilters,
    resetDraftFilters,

    goToPage,
    setPageSize,
    setViewMode,
    reload,
  } = useAgents();

  function handleAgentClick(agent) {
    setSelectedAgent(agent);
    console.info('Agente selecionado:', agent);
  }

  function handleOpenActions(agent, buttonElement) {
    setSelectedAgent(agent);
    console.info('Abrir menu de ações:', { agent, buttonElement });
  }

  return (
    <main className="space-y-6 text-left">
      <AgentModuleHeader
        title="Gestão de Agentes"
        description="Gerencie agentes, escalas, performance e disponibilidade operacional."
        onCreate={() => navigate(AGENT_ROUTES.CREATE)}
        onRefresh={reload}
        isRefreshing={loading}
        onExport={() => {
          console.info('Exportação será implementada posteriormente.');
        }}
      />

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <strong>Não foi possível carregar os agentes.</strong>
          <p className="mt-1">{error.message}</p>
          <button
            type="button"
            onClick={reload}
            className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
          >
            Tentar novamente
          </button>
        </div>
      )}

      <AgentToolbar
        search={filters.search}
        sorting={sorting}
        viewMode={viewMode}
        resultCount={totalItems}
        activeFiltersCount={activeFilterCount}
        isLoading={loading}
        onSearchChange={updateSearch}
        onSortingChange={updateSorting}
        onViewModeChange={setViewMode}
        onOpenFilters={openFilterDrawer}
        onClearFilters={clearAdvancedFilters}
      />

      <AgentActiveFilters
        filters={filters}
        onRemove={removeFilter}
        onClear={clearAdvancedFilters}
      />

      {viewMode === 'table' ? (
        <AgentTable
          agents={agents}
          sorting={sorting}
          isLoading={loading}
          hasActiveFilters={hasActiveFilters}
          onSort={updateSorting}
          onAgentClick={handleAgentClick}
          onOpenActions={handleOpenActions}
          onClearFilters={clearAllFilters}
          onCreate={() => navigate(AGENT_ROUTES.CREATE)}
        />
      ) : (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-base font-bold text-slate-900">
            Visualização em cartões
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Exibindo {agents.length} de {totalItems} agentes no modo grid.
          </p>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className="mt-5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Voltar para tabela
          </button>
        </section>
      )}

      {/* Drawer de Filtros Lateral (Slide-over) */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={closeFilterDrawer}
          />
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl">
              <AgentFilters
                filters={draftFilters}
                onChange={updateDraftFilters}
                onApply={() => applyDraftFilters()}
                onReset={resetDraftFilters}
                onClose={closeFilterDrawer}
              />
            </div>
          </div>
        </div>
      )}

      {selectedAgent && (
        <div className="sr-only">
          Agente selecionado: {selectedAgent.name}
        </div>
      )}
    </main>
  );
}

export default AgentsPage;
