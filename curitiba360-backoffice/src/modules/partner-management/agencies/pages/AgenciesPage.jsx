import {
  useEffect,
  useState,
} from 'react';

import AgencyBulkActions from '../components/AgencyBulkActions';
import AgencyFilters from '../components/AgencyFilters';
import AgencyHeader from '../components/AgencyHeader';
import AgencyStatusTabs from '../components/AgencyStatusTabs';
import AgencySummaryCards from '../components/AgencySummaryCards';
import AgencyTable from '../components/AgencyTable';

import { useAgencies } from '../hooks/useAgencies';
import { useAgencyFilters } from '../hooks/useAgencyFilters';
import { useAgencyPagination } from '../hooks/useAgencyPagination';
import { useAgencySelection } from '../hooks/useAgencySelection';
import { useAgencySorting } from '../hooks/useAgencySorting';

export default function AgenciesPage() {
  const {
    agencies,
    isLoading,
    isMutating,
    error,
    reload,

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

  const {
    sorting,
    sortedAgencies,
    toggleSorting,
  } = useAgencySorting(
    filteredAgencies,
  );

  const pagination =
    useAgencyPagination(
      sortedAgencies,
      10,
    );

  const selection =
    useAgencySelection(
      pagination.paginatedAgencies,
    );

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [
    selectedAgency,
    setSelectedAgency,
  ] = useState(null);

  const [
    pendingAction,
    setPendingAction,
  ] = useState(null);

  useEffect(() => {
    pagination.setCurrentPage(1);
    selection.clearSelection();
  }, [
    filters.status,
    filters.search,
    filters.city,
    filters.state,
    filters.companyType,
  ]);

  function exportAgencies() {
    const headers = [
      'ID',
      'Nome Fantasia',
      'Razão Social',
      'CNPJ',
      'Responsável',
      'E-mail',
      'Status',
      'Agentes',
      'Cidade',
      'UF',
    ];

    const rows = sortedAgencies.map(
      (agency) => [
        agency.id,
        agency.tradeName,
        agency.corporateName,
        agency.cnpj,
        agency.responsibleName,
        agency.email,
        agency.status,
        agency.agentsCount,
        agency.city,
        agency.state,
      ],
    );

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((cell) => {
            const value = String(
              cell ?? '',
            ).replaceAll('"', '""');

            return `"${value}"`;
          })
          .join(';'),
      )
      .join('\n');

    const blob = new Blob(
      [`\uFEFF${csvContent}`],
      {
        type: 'text/csv;charset=utf-8;',
      },
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement('a');

    link.href = url;
    link.download =
      'gestao-de-agencias.csv';

    document.body.appendChild(link);

    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  async function handleApproveMany() {
    await approveMany(
      selection.selectedIds,
    );

    selection.clearSelection();
  }

  async function handleInactivateMany() {
    await inactivateMany(
      selection.selectedIds,
    );

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
    setPendingAction({
      type,
      agency,
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1800px] px-4 py-7 sm:px-6 lg:px-8">
        <AgencyHeader
          isRefreshing={
            isLoading || isMutating
          }
          onRefresh={reload}
          onExport={exportAgencies}
          onAdd={() => {
            setSelectedAgency(null);
            setIsFormOpen(true);
          }}
        />

        <section className="mt-6">
          <AgencySummaryCards
            agencies={agencies}
          />
        </section>

        <section className="mt-6 rounded-[24px] border border-slate-200 bg-white px-5 shadow-sm">
          <AgencyStatusTabs
            activeStatus={filters.status}
            agencies={agencies}
            onChange={(status) =>
              updateFilter(
                'status',
                status,
              )
            }
          />
        </section>

        <section className="mt-4">
          <AgencyFilters
            filters={filters}
            cities={cities}
            states={states}
            companyTypes={
              companyTypes
            }
            onChange={updateFilter}
            onReset={resetFilters}
          />
        </section>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <section className="mt-4">
          <AgencyBulkActions
            selectedCount={
              selection.selectedCount
            }
            activeStatus={
              filters.status
            }
            disabled={isMutating}
            onApprove={
              handleApproveMany
            }
            onReject={() =>
              requestAction(
                'reject-many',
                null,
              )
            }
            onSuspend={() =>
              requestAction(
                'suspend-many',
                null,
              )
            }
            onInactivate={
              handleInactivateMany
            }
            onDelete={() =>
              requestAction(
                'delete-many',
                null,
              )
            }
            onClear={
              selection.clearSelection
            }
          />
        </section>

        <section className="mt-4">
          <AgencyTable
            agencies={
              pagination.paginatedAgencies
            }
            isLoading={isLoading}
            sorting={sorting}
            onSort={toggleSorting}
            selectedIds={
              selection.selectedIds
            }
            allVisibleSelected={
              selection.allVisibleSelected
            }
            someVisibleSelected={
              selection.someVisibleSelected
            }
            onToggleSelection={
              selection.toggle
            }
            onToggleAll={
              selection.toggleAllVisible
            }
            pagination={pagination}
            onView={handleRowView}
            onEdit={handleRowEdit}
            onApprove={(agency) =>
              approveAgency(agency.id)
            }
            onReject={(agency) =>
              requestAction(
                'reject-one',
                agency,
              )
            }
            onSuspend={(agency) =>
              requestAction(
                'suspend-one',
                agency,
              )
            }
            onInactivate={(agency) =>
              inactivateAgency(
                agency.id,
              )
            }
            onReactivate={(agency) =>
              approveAgency(agency.id)
            }
            onDelete={(agency) =>
              requestAction(
                'delete-one',
                agency,
              )
            }
          />
        </section>
      </main>

      {isFormOpen && (
        <TemporaryModal
          title={
            selectedAgency
              ? 'Editar Agência'
              : 'Cadastrar Agência'
          }
          description={
            selectedAgency
              ? `Edição de ${selectedAgency.tradeName}.`
              : 'O formulário completo será implementado na Parte 3.'
          }
          onClose={() => {
            setIsFormOpen(false);
            setSelectedAgency(null);
          }}
        />
      )}

      {selectedAgency &&
        !isFormOpen && (
          <TemporaryModal
            title={
              selectedAgency.tradeName
            }
            description={`${selectedAgency.cnpj} • ${selectedAgency.city}/${selectedAgency.state}`}
            onClose={() =>
              setSelectedAgency(null)
            }
          />
        )}

      {pendingAction && (
        <ActionConfirmationModal
          action={pendingAction}
          selectedCount={
            selection.selectedCount
          }
          onClose={() =>
            setPendingAction(null)
          }
          onConfirm={async (reason) => {
            const {
              type,
              agency,
            } = pendingAction;

            if (
              type === 'reject-one'
            ) {
              await rejectAgency(
                agency.id,
                reason,
              );
            }

            if (
              type === 'reject-many'
            ) {
              await rejectMany(
                selection.selectedIds,
                reason,
              );
            }

            if (
              type === 'suspend-one'
            ) {
              await suspendAgency(
                agency.id,
                reason,
              );
            }

            if (
              type === 'suspend-many'
            ) {
              await suspendMany(
                selection.selectedIds,
                reason,
              );
            }

            if (
              type === 'delete-one'
            ) {
              await removeAgency(
                agency.id,
              );
            }

            if (
              type === 'delete-many'
            ) {
              await removeMany(
                selection.selectedIds,
              );
            }

            selection.clearSelection();
            setPendingAction(null);
          }}
        />
      )}
    </div>
  );
}

function TemporaryModal({
  title,
  description,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-955/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-black text-slate-900">
          {title}
        </h2>

        <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
          {description}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 h-11 w-full rounded-xl bg-slate-900 text-xs font-black text-white"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

function ActionConfirmationModal({
  action,
  selectedCount,
  onClose,
  onConfirm,
}) {
  const [reason, setReason] =
    useState('');

  const configuration = {
    'reject-one': {
      title: 'Rejeitar agência',
      description: `Informe o motivo da rejeição de ${action.agency?.tradeName}.`,
      confirmLabel: 'Rejeitar',
      reasonRequired: true,
    },

    'reject-many': {
      title:
        'Rejeitar agências selecionadas',
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
      title:
        'Suspender agências selecionadas',
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
      title:
        'Excluir agências selecionadas',
      description: `Esta ação excluirá ${selectedCount} agência(s).`,
      confirmLabel: 'Excluir',
      reasonRequired: false,
    },
  }[action.type];

  const invalid =
    configuration.reasonRequired &&
    !reason.trim();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-black text-slate-900">
          {configuration.title}
        </h2>

        <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
          {configuration.description}
        </p>

        <label className="mt-5 block">
          <span className="mb-2 block text-xs font-black text-slate-600">
            Motivo{' '}
            {!configuration.reasonRequired &&
              '(opcional)'}
          </span>

          <textarea
            rows={4}
            value={reason}
            onChange={(event) =>
              setReason(
                event.target.value,
              )
            }
            placeholder="Descreva o motivo"
            className="w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-medium text-slate-700 outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10"
          />
        </label>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl bg-slate-100 text-xs font-black text-slate-600"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={invalid}
            onClick={() =>
              onConfirm(reason.trim())
            }
            className="h-11 rounded-xl bg-slate-900 text-xs font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {configuration.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
