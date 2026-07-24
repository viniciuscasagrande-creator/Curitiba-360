import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Ban,
  Building2,
  CheckCircle2,
  Clock,
  FileDown,
  Plus,
  ShieldCheck,
  Users,
  XCircle,
} from 'lucide-react';

import ReportHeader from '../../../attractions/finance/reports/components/ReportHeader';
import AgencyFilters from '../components/AgencyFilters';
import AgencyTable from '../components/AgencyTable';
import AgencyDetailsDrawer from '../components/AgencyDetailsDrawer';
import AgencySuspendModal from '../components/AgencySuspendModal';
import AgencyRejectModal from '../components/AgencyRejectModal';

import { useAgencies } from '../hooks/useAgencies';
import { AGENCY_STATUS } from '../../shared/constants/partnerStatus';
import { exportCsv, normalizeSearch } from '../../shared/utils/partnerFormatters';

export default function AgenciesPage() {
  const navigate = useNavigate();
  const {
    agencies,
    isLoading,
    error,
    approveAgency,
    approveManyAgencies,
    rejectAgency,
    rejectManyAgencies,
    suspendAgency,
    inactivateAgency,
    reactivateAgency,
    removeAgency,
    removeManyAgencies,
  } = useAgencies();

  const [activeTab, setActiveTab] = useState('Todas');
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);

  const [drawerAgency, setDrawerAgency] = useState(null);
  const [suspendModalAgency, setSuspendModalAgency] = useState(null);
  const [rejectModalAgency, setRejectModalAgency] = useState(null);

  const cities = useMemo(() => {
    return [...new Set(agencies.map((a) => a.city))].filter(Boolean).sort();
  }, [agencies]);

  // Tab counts & KPIs
  const kpis = useMemo(() => {
    return {
      active: agencies.filter((a) => a.status === AGENCY_STATUS.ACTIVE).length,
      waitingContract: agencies.filter((a) => a.status === AGENCY_STATUS.WAITING_CONTRACT).length,
      pending: agencies.filter((a) => a.status === AGENCY_STATUS.PENDING_APPROVAL).length,
      suspended: agencies.filter((a) => a.status === AGENCY_STATUS.SUSPENDED).length,
      inactive: agencies.filter((a) => a.status === AGENCY_STATUS.INACTIVE).length,
      total: agencies.length,
    };
  }, [agencies]);

  const filteredAgencies = useMemo(() => {
    const term = normalizeSearch(search);

    return agencies.filter((a) => {
      const matchesTab =
        activeTab === 'Todas' ||
        (activeTab === 'Ativas' && a.status === AGENCY_STATUS.ACTIVE) ||
        (activeTab === 'Aguardando Contrato' && a.status === AGENCY_STATUS.WAITING_CONTRACT) ||
        (activeTab === 'Pendente Aprovação' && a.status === AGENCY_STATUS.PENDING_APPROVAL) ||
        (activeTab === 'Suspensas' && a.status === AGENCY_STATUS.SUSPENDED) ||
        (activeTab === 'Inativas' && a.status === AGENCY_STATUS.INACTIVE);

      const matchesCity = cityFilter === 'all' || a.city === cityFilter;

      const matchesSearch =
        !term ||
        [a.tradeName, a.corporateName, a.companyName, a.cnpj, a.document, a.responsibleName].some(
          (val) => normalizeSearch(val).includes(term)
        );

      return matchesTab && matchesCity && matchesSearch;
    });
  }, [agencies, activeTab, search, cityFilter]);

  function toggleSelectAll() {
    if (selectedIds.length === filteredAgencies.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAgencies.map((a) => a.id));
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
    await approveManyAgencies(selectedIds);
    setSelectedIds([]);
  }

  async function handleBatchReject() {
    if (!selectedIds.length) return;
    const reason = window.prompt('Motivo da rejeição em lote:');
    if (!reason?.trim()) return;
    await rejectManyAgencies(selectedIds, reason.trim());
    setSelectedIds([]);
  }

  async function handleBatchRemove() {
    if (!selectedIds.length) return;
    const confirmed = window.confirm(`Excluir permanentemente ${selectedIds.length} agências selecionadas?`);
    if (!confirmed) return;
    await removeManyAgencies(selectedIds);
    setSelectedIds([]);
  }

  function handleExportCsv() {
    exportCsv('agencias-parceiras-b2b.csv', [
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
      <main className="mx-auto max-w-[1700px] px-4 py-7 sm:px-6 lg:px-8 space-y-6">
        {/* Header Principal */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Gestão de Agências (B2B)
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Painel de credenciamento, contratos e habilitação das agências parceiras do Curitiba 360.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 hover:bg-slate-50 shadow-xs"
            >
              <FileDown size={16} />
              Exportar CSV
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/parceiros/agencias/novo')}
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-5 text-xs font-black text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition"
            >
              <Plus size={16} />
              Nova Agência
            </button>
          </div>
        </div>

        {/* Dashboard Cards / KPIs */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KpiCard icon={CheckCircle2} label="Ativas" value={kpis.active} tone="emerald" />
          <KpiCard icon={AlertTriangle} label="Aguardando Contrato" value={kpis.waitingContract} tone="blue" />
          <KpiCard icon={Clock} label="Pendente Aprovação" value={kpis.pending} tone="amber" />
          <KpiCard icon={Ban} label="Suspensas" value={kpis.suspended} tone="rose" />
          <KpiCard icon={XCircle} label="Inativas" value={kpis.inactive} tone="slate" />
          <KpiCard icon={Building2} label="Total Cadastradas" value={kpis.total} tone="indigo" />
        </section>

        {/* Tabs de Filtro de Status */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 bg-white rounded-2xl p-2 shadow-xs">
          {[
            { label: 'Todas', count: kpis.total },
            { label: 'Ativas', count: kpis.active },
            { label: 'Aguardando Contrato', count: kpis.waitingContract },
            { label: 'Pendente Aprovação', count: kpis.pending },
            { label: 'Suspensas', count: kpis.suspended },
            { label: 'Inativas', count: kpis.inactive },
          ].map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition whitespace-nowrap ${
                activeTab === tab.label
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.label ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Barra de Ações em Lote */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-5 py-3.5 text-white shadow-lg animate-in fade-in">
            <span className="text-xs font-black">
              {selectedIds.length} agências selecionadas
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBatchApprove}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 text-xs font-black hover:bg-emerald-500 transition"
              >
                <ShieldCheck size={15} />
                Aprovar em Lote
              </button>

              <button
                type="button"
                onClick={handleBatchReject}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-rose-600 px-4 text-xs font-black hover:bg-rose-500 transition"
              >
                <XCircle size={15} />
                Rejeitar em Lote
              </button>

              <button
                type="button"
                onClick={handleBatchRemove}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-slate-800 border border-slate-700 px-4 text-xs font-black hover:bg-slate-700 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        )}

        {/* Filtros */}
        <AgencyFilters
          search={search}
          city={cityFilter}
          cities={cities}
          onSearchChange={setSearch}
          onCityChange={setCityFilter}
          onReset={() => {
            setSearch('');
            setCityFilter('all');
          }}
        />

        {/* Tabela Principal */}
        <AgencyTable
          agencies={filteredAgencies}
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
      </main>

      {/* Drawer e Modais */}
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

const TONES = {
  emerald: 'bg-emerald-50 text-emerald-600',
  blue: 'bg-blue-50 text-blue-600',
  amber: 'bg-amber-50 text-amber-600',
  rose: 'bg-rose-50 text-rose-600',
  slate: 'bg-slate-100 text-slate-600',
  indigo: 'bg-indigo-50 text-indigo-600',
};

function KpiCard({ icon: Icon, label, value, tone }) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-slate-500">{label}</span>
          <strong className="mt-2 block text-xl font-black tracking-tight text-slate-950">
            {value}
          </strong>
        </div>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${TONES[tone]}`}>
          <Icon size={17} />
        </span>
      </div>
    </article>
  );
}
