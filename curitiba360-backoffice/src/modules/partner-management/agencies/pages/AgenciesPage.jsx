import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AgencyHeader from '../components/AgencyHeader';
import AgencySummaryCards from '../components/AgencySummaryCards';
import AgencyStatusTabs from '../components/AgencyStatusTabs';
import AgencyFilters from '../components/AgencyFilters';
import AgencyTable from '../components/AgencyTable';
import AgencyDetailsDrawer from '../components/AgencyDetailsDrawer';
import AgencySuspendModal from '../components/AgencySuspendModal';
import AgencyRejectModal from '../components/AgencyRejectModal';

import BulkActionBar from '../../shared/BulkActionBar';
import TablePagination from '../../shared/TablePagination';

import { useAgencies } from '../hooks/useAgencies';
import { useAgencyFilters } from '../hooks/useAgencyFilters';
import { exportCsv } from '../../shared/utils/partnerFormatters';

export default function AgenciesPage() {
  const navigate = useNavigate();
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
    inactivateAgency,
    reactivateAgency,
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

  // Seleção e Paginação
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Drawers e Modais
  const [drawerAgency, setDrawerAgency] = useState(null);
  const [suspendModalAgency, setSuspendModalAgency] = useState(null);
  const [rejectModalAgency, setRejectModalAgency] = useState(null);

  // Paginação dos dados filtrados
  const totalPages = Math.ceil(filteredAgencies.length / pageSize) || 1;
  const paginatedAgencies = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAgencies.slice(start, start + pageSize);
  }, [filteredAgencies, currentPage, pageSize]);

  function toggleSelectAll() {
    if (selectedIds.length === paginatedAgencies.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedAgencies.map((a) => a.id));
    }
  }

  function toggleSelectItem(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  async function handleBatchApprove() {
    if (!selectedIds.length) return;
    const confirmed = window.confirm(`Aprovar ${selectedIds.length} agências selecionadas?`);
    if (!confirmed) return;
    await approveMany(selectedIds);
    setSelectedIds([]);
  }

  async function handleBatchReject() {
    if (!selectedIds.length) return;
    const reason = window.prompt('Motivo da rejeição em lote:');
    if (!reason?.trim()) return;
    await rejectMany(selectedIds, reason.trim());
    setSelectedIds([]);
  }

  function handleExportCsv() {
    exportCsv('gestao-de-agencias-b2b.csv', [
      ['ID', 'Nome Fantasia', 'Razão Social', 'CNPJ', 'Responsável', 'E-mail', 'Cidade', 'UF', 'Status', 'Qtd Agentes'],
      ...filteredAgencies.map((a) => [
        a.id,
        a.tradeName,
        a.corporateName || a.companyName,
        a.cnpj || a.document,
        a.responsibleName,
        a.email || a.responsibleEmail,
        a.city,
        a.state,
        a.status,
        a.agentsCount || 0,
      ]),
    ]);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1800px] px-4 py-7 sm:px-6 lg:px-8 space-y-6">
        <AgencyHeader
          isRefreshing={isLoading || isMutating}
          onRefresh={reload}
          onExport={handleExportCsv}
          onAdd={() => navigate('/admin/parceiros/agencias/novo')}
        />

        <section>
          <AgencySummaryCards agencies={agencies} />
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white px-5 shadow-sm">
          <AgencyStatusTabs
            activeStatus={filters.status}
            agencies={agencies}
            onChange={(status) => {
              updateFilter('status', status);
              setCurrentPage(1);
            }}
          />
        </section>

        <section>
          <AgencyFilters
            filters={filters}
            cities={cities}
            states={states}
            companyTypes={companyTypes}
            onChange={(field, val) => {
              updateFilter(field, val);
              setCurrentPage(1);
            }}
            onReset={() => {
              resetFilters();
              setCurrentPage(1);
            }}
          />
        </section>

        <BulkActionBar
          selectedCount={selectedIds.length}
          onApprove={handleBatchApprove}
          onReject={handleBatchReject}
          onClear={() => setSelectedIds([])}
        />

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <section className="space-y-0">
          <AgencyTable
            agencies={paginatedAgencies}
            selectedIds={selectedIds}
            onToggleSelectAll={toggleSelectAll}
            onToggleSelectItem={toggleSelectItem}
            onViewDrawer={(agency) => setDrawerAgency(agency)}
            onApprove={(id) => approveAgency(id)}
            onRejectModal={(agency) => setRejectModalAgency(agency)}
            onSuspendModal={(agency) => setSuspendModalAgency(agency)}
            onInactivate={(id) => inactivateAgency(id)}
            onRemove={(id) => {
              if (window.confirm('Excluir esta agência permanentemente?')) removeAgency(id);
            }}
          />

          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredAgencies.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        </section>
      </main>

      {/* Drawer & Modais */}
      <AgencyDetailsDrawer
        agency={drawerAgency}
        onClose={() => setDrawerAgency(null)}
        onApprove={(agency) => {
          setDrawerAgency(null);
          approveAgency(agency.id);
        }}
        onReject={(agency) => {
          setDrawerAgency(null);
          setRejectModalAgency(agency);
        }}
        onSuspend={(agency) => {
          setDrawerAgency(null);
          setSuspendModalAgency(agency);
        }}
        onInactivate={(agency) => {
          setDrawerAgency(null);
          inactivateAgency(agency.id);
        }}
        onReactivate={(agency) => {
          setDrawerAgency(null);
          reactivateAgency(agency.id);
        }}
      />

      <AgencySuspendModal
        agency={suspendModalAgency}
        onClose={() => setSuspendModalAgency(null)}
        onConfirm={(id, reason) => {
          setSuspendModalAgency(null);
          suspendAgency(id, reason);
        }}
      />

      <AgencyRejectModal
        agency={rejectModalAgency}
        onClose={() => setRejectModalAgency(null)}
        onConfirm={(id, reason) => {
          setRejectModalAgency(null);
          rejectAgency(id, reason);
        }}
      />
    </div>
  );
}
