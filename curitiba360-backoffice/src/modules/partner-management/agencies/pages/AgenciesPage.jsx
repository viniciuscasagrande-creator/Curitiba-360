import { useEffect, useState } from 'react';

import AgencyBulkActions from '../components/AgencyBulkActions';
import AgencyDetailsDrawer from '../components/AgencyDetailsDrawer';
import AgencyFilters from '../components/AgencyFilters';
import AgencyFormDrawer from '../components/AgencyFormDrawer';
import AgencyHeader from '../components/AgencyHeader';
import AgencyStatusTabs from '../components/AgencyStatusTabs';
import AgencySummaryCards from '../components/AgencySummaryCards';
import AgencyTable from '../components/AgencyTable';

import { useAgencies } from '../hooks/useAgencies';
import { useAgencyFilters } from '../hooks/useAgencyFilters';
import { useAgencyPagination } from '../hooks/useAgencyPagination';
import { useAgencySelection } from '../hooks/useAgencySelection';
import { useAgencySorting } from '../hooks/useAgencySorting';
import { exportCsv } from '../../shared/utils/partnerFormatters';

export default function AgenciesPage() {
  const {
    agencies,
    isLoading,
    isMutating,
    error,
    reload,

    createAgency,
    updateAgency,

    approveAgency,
    approveMany,

    rejectAgency,
    rejectMany,

    suspendAgency,
    suspendMany,

    inactivateAgency,
    inactivateMany,

    removeAgency,
    removeMany,
  } = useAgencies();

  const {
    filters,
    filteredAgencies,
    cities,
    states,
    companyTypes,
    updateFilter,
    resetFilters,
  } = useAgencyFilters(agencies);

  const { sorting, sortedAgencies, toggleSorting } = useAgencySorting(filteredAgencies);

  const pagination = useAgencyPagination(sortedAgencies, 10);
  const selection = useAgencySelection(pagination.paginatedAgencies);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    pagination.setCurrentPage(1);
    selection.clearSelection();
  }, [filters.status, filters.search, filters.city, filters.state, filters.companyType]);

  useEffect(() => {
    if (!selectedAgency) return;
    const updated = agencies.find((a) => a.id === selectedAgency.id);
    if (updated) setSelectedAgency(updated);
  }, [agencies]);

  function exportAgencies() {
    exportCsv('gestao-de-agencias-b2b.csv', [
      ['ID', 'Nome Fantasia', 'Razão Social', 'CNPJ', 'Responsável', 'E-mail', 'Status', 'Agentes', 'Cidade', 'UF'],
      ...sortedAgencies.map((a) => [
        a.id,
        a.tradeName,
        a.corporateName,
        a.cnpj,
        a.responsibleName,
        a.email,
        a.status,
        a.agentsCount || 0,
        a.city,
        a.state,
      ]),
    ]);
  }

  async function handleApproveMany() {
    await approveMany(selection.selectedIds);
    selection.clearSelection();
  }

  async function handleInactivateMany() {
    await inactivateMany(selection.selectedIds);
    selection.clearSelection();
  }

  function handleRowView(agency) {
    setSelectedAgency(agency);
  }

  function handleRowEdit(agency) {
    setSelectedAgency(agency);
    setIsFormOpen(true);
  }

  function requestAction(type, agency) {
    setPendingAction({ type, agency });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1800px] px-4 py-7 sm:px-6 lg:px-8 space-y-6">
        <AgencyHeader
          isRefreshing={isLoading || isMutating}
          onRefresh={reload}
          onExport={exportAgencies}
          onAdd={() => {
            setSelectedAgency(null);
            setIsFormOpen(true);
          }}
        />

        <section>
          <AgencySummaryCards agencies={agencies} />
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white px-5 shadow-sm">
          <AgencyStatusTabs
            activeStatus={filters.status}
            agencies={agencies}
            onChange={(status) => updateFilter('status', status)}
          />
        </section>

        <section>
          <AgencyFilters
            filters={filters}
            cities={cities}
            states={states}
            companyTypes={companyTypes}
            onChange={updateFilter}
            onReset={resetFilters}
          />
        </section>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <section>
          <AgencyBulkActions
            selectedCount={selection.selectedCount}
            activeStatus={filters.status}
            disabled={isMutating}
            onApprove={handleApproveMany}
            onReject={() => requestAction('reject-many', null)}
            onSuspend={() => requestAction('suspend-many', null)}
            onInactivate={handleInactivateMany}
            onDelete={() => requestAction('delete-many', null)}
            onClear={selection.clearSelection}
          />
        </section>

        <section>
          <AgencyTable
            agencies={pagination.paginatedAgencies}
            isLoading={isLoading}
            sorting={sorting}
            onSort={toggleSorting}
            selectedIds={selection.selectedIds}
            allVisibleSelected={selection.allVisibleSelected}
            someVisibleSelected={selection.someVisibleSelected}
            onToggleSelection={selection.toggle}
            onToggleAll={selection.toggleAllVisible}
            pagination={pagination}
            onView={handleRowView}
            onEdit={handleRowEdit}
            onApprove={(agency) => approveAgency(agency.id)}
            onReject={(agency) => requestAction('reject-one', agency)}
            onSuspend={(agency) => requestAction('suspend-one', agency)}
            onInactivate={(agency) => inactivateAgency(agency.id)}
            onReactivate={(agency) => approveAgency(agency.id)}
            onDelete={(agency) => requestAction('delete-one', agency)}
          />
        </section>
      </main>

      {/* Wizard Form Drawer */}
      <AgencyFormDrawer
        open={isFormOpen}
        agency={selectedAgency}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedAgency(null);
        }}
        onCreate={createAgency}
        onUpdate={updateAgency}
        onSuccess={(savedAgency) => {
          setIsFormOpen(false);
          setSelectedAgency(savedAgency ?? null);
        }}
      />

      {/* Details Drawer */}
      <AgencyDetailsDrawer
        open={Boolean(selectedAgency) && !isFormOpen}
        agency={selectedAgency}
        isMutating={isMutating}
        onClose={() => setSelectedAgency(null)}
        onEdit={(agency) => {
          setSelectedAgency(agency);
          setIsFormOpen(true);
        }}
        onApprove={async (agency) => {
          await approveAgency(agency.id);
          setSelectedAgency(null);
        }}
        onReject={(agency) => requestAction('reject-one', agency)}
        onSuspend={(agency) => requestAction('suspend-one', agency)}
        onInactivate={async (agency) => {
          await inactivateAgency(agency.id);
          setSelectedAgency(null);
        }}
        onReactivate={async (agency) => {
          await approveAgency(agency.id);
          setSelectedAgency(null);
        }}
        onDelete={(agency) => requestAction('delete-one', agency)}
      />

      {/* Modais de Confirmação */}
      {pendingAction && (
        <ActionConfirmationModal
          action={pendingAction}
          selectedCount={selection.selectedCount}
          onClose={() => setPendingAction(null)}
          onConfirm={async (reason) => {
            const { type, agency } = pendingAction;
            if (type === 'reject-one') await rejectAgency(agency.id, reason);
            if (type === 'reject-many') await rejectMany(selection.selectedIds, reason);
            if (type === 'suspend-one') await suspendAgency(agency.id, reason);
            if (type === 'suspend-many') await suspendMany(selection.selectedIds, reason);
            if (type === 'delete-one') await removeAgency(agency.id);
            if (type === 'delete-many') await removeMany(selection.selectedIds);

            selection.clearSelection();
            setSelectedAgency(null);
            setPendingAction(null);
          }}
        />
      )}
    </div>
  );
}

function ActionConfirmationModal({ action, selectedCount, onClose, onConfirm }) {
  const [reason, setReason] = useState('');

  const configuration = {
    'reject-one': {
      title: 'Rejeitar agência',
      description: `Informe o motivo da rejeição de ${action.agency?.tradeName}.`,
      confirmLabel: 'Rejeitar',
      reasonRequired: true,
    },
    'reject-many': {
      title: 'Rejeitar agências selecionadas',
      description: `Informe o motivo da rejeição de ${selectedCount} agência(s).`,
      confirmLabel: 'Rejeitar',
      reasonRequired: true,
    },
    'suspend-one': {
      title: 'Suspender agência',
      description: `Confirme a suspensão de ${action.agency?.tradeName}.`,
      confirmLabel: 'Suspender',
      reasonRequired: false,
    },
    'suspend-many': {
      title: 'Suspender agências selecionadas',
      description: `Confirme a suspensão de ${selectedCount} agência(s).`,
      confirmLabel: 'Suspender',
      reasonRequired: false,
    },
    'delete-one': {
      title: 'Excluir agência',
      description: `Esta ação excluirá ${action.agency?.tradeName}.`,
      confirmLabel: 'Excluir',
      reasonRequired: false,
    },
    'delete-many': {
      title: 'Excluir agências selecionadas',
      description: `Esta ação excluirá ${selectedCount} agência(s).`,
      confirmLabel: 'Excluir',
      reasonRequired: false,
    },
  }[action.type];

  const invalid = configuration.reasonRequired && !reason.trim();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-black text-slate-900">{configuration.title}</h2>
        <p className="mt-3 text-sm font-medium leading-6 text-slate-500">{configuration.description}</p>
        <label className="mt-5 block">
          <span className="mb-2 block text-xs font-black text-slate-600">
            Motivo {!configuration.reasonRequired && '(opcional)'}
          </span>
          <textarea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Descreva o motivo"
            className="w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-medium text-slate-700 outline-none focus:border-slate-500"
          />
        </label>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" onClick={onClose} className="h-11 rounded-xl bg-slate-100 text-xs font-black text-slate-600">
            Cancelar
          </button>
          <button
            type="button"
            disabled={invalid}
            onClick={() => onConfirm(reason.trim())}
            className="h-11 rounded-xl bg-slate-900 text-xs font-black text-white disabled:opacity-40"
          >
            {configuration.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
