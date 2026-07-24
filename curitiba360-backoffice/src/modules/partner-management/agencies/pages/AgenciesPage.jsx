import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Ban,
  Building2,
  CheckCircle2,
  Eye,
  FileDown,
  Plus,
  ShieldCheck,
  UserCheck,
  XCircle,
} from 'lucide-react';

import ReportHeader from '../../../attractions/finance/reports/components/ReportHeader';
import ReportTable from '../../../attractions/finance/reports/components/ReportTable';
import AgencyStatusBadge from '../components/AgencyStatusBadge';
import AgencyFilters from '../components/AgencyFilters';
import AgencyDetailsDrawer from '../components/AgencyDetailsDrawer';
import AgencySuspendModal from '../components/AgencySuspendModal';
import { useAgencies } from '../hooks/useAgencies';
import { exportCsv } from '../../../attractions/finance/reports/utils/reportUtils';

export default function AgenciesPage() {
  const navigate = useNavigate();
  const {
    agencies,
    isLoading,
    isMutating,
    error,
    approveAgency,
    rejectAgency,
    suspendAgency,
    approveManyAgencies,
    rejectManyAgencies,
  } = useAgencies();

  const [activeTab, setActiveTab] = useState('Todas');
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);

  const [drawerAgency, setDrawerAgency] = useState(null);
  const [suspendModalAgency, setSuspendModalAgency] = useState(null);

  const cities = useMemo(() => {
    return [...new Set(agencies.map((a) => a.city))].sort();
  }, [agencies]);

  const filteredAgencies = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('pt-BR');

    return agencies.filter((a) => {
      const matchesTab =
        activeTab === 'Todas' || a.status === activeTab;

      const matchesCity = cityFilter === 'all' || a.city === cityFilter;

      const matchesSearch =
        !term ||
        [a.tradeName, a.companyName, a.document, a.responsibleName].some((val) =>
          String(val || '').toLocaleLowerCase('pt-BR').includes(term)
        );

      return matchesTab && matchesCity && matchesSearch;
    });
  }, [agencies, activeTab, search, cityFilter]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      Todas: agencies.length,
      Ativas: agencies.filter((a) => a.status === 'Ativa').length,
      'Aguardando Contrato': agencies.filter((a) => a.status === 'Aguardando Contrato').length,
      'Pendente Aprovação': agencies.filter((a) => a.status === 'Pendente Aprovação').length,
      Suspensas: agencies.filter((a) => a.status === 'Suspensa').length,
      Inativas: agencies.filter((a) => a.status === 'Inativa').length,
    };
  }, [agencies]);

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
    const confirmed = window.confirm(`Rejeitar ${selectedIds.length} agências selecionadas?`);
    if (!confirmed) return;
    await rejectManyAgencies(selectedIds);
    setSelectedIds([]);
  }

  function handleExportCsv() {
    exportCsv('agencias-b2b.csv', [
      ['ID', 'Nome Fantasia', 'Razão Social', 'CNPJ', 'Responsável', 'Cidade', 'UF', 'Status', 'Qtd Agentes'],
      ...filteredAgencies.map((a) => [
        a.id,
        a.tradeName,
        a.companyName,
        a.document,
        a.responsibleName,
        a.city,
        a.state,
        a.status,
        a.agentsCount,
      ]),
    ]);
  }

  const columns = [
    {
      key: 'select',
      label: (
        <input
          type="checkbox"
          checked={selectedIds.length > 0 && selectedIds.length === filteredAgencies.length}
          onChange={toggleSelectAll}
          className="h-4 w-4 rounded border-slate-300 text-emerald-600"
        />
      ),
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => toggleSelectItem(row.id)}
          className="h-4 w-4 rounded border-slate-300 text-emerald-600"
        />
      ),
    },
    {
      key: 'tradeName',
      label: 'Agência / Nome Fantasia',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.logo ? (
            <img src={row.logo} alt={row.tradeName} className="h-8 w-8 rounded-lg object-cover border border-slate-200" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 font-black text-slate-400 text-xs">
              {row.tradeName[0]}
            </div>
          )}
          <div>
            <strong className="block text-xs font-black text-slate-900">{row.tradeName}</strong>
            <span className="text-[10px] text-slate-400 font-medium">{row.companyName}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'document',
      label: 'CNPJ',
      render: (row) => <span className="font-mono text-xs font-bold text-slate-700">{row.document}</span>,
    },
    {
      key: 'responsibleName',
      label: 'Responsável',
      render: (row) => (
        <div>
          <strong className="block text-xs font-bold text-slate-800">{row.responsibleName}</strong>
          <span className="text-[10px] text-slate-400 font-medium">{row.responsibleEmail}</span>
        </div>
      ),
    },
    {
      key: 'city',
      label: 'Cidade / UF',
      render: (row) => (
        <span className="text-xs font-bold text-slate-700">
          {row.city} - {row.state}
        </span>
      ),
    },
    {
      key: 'agentsCount',
      label: 'Agentes',
      render: (row) => (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-black text-slate-700">
          {row.agentsCount} agentes
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <AgencyStatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            title="Ver Detalhes"
            onClick={() => setDrawerAgency(row)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
          >
            <Eye size={15} />
          </button>

          {row.status === 'Pendente Aprovação' && (
            <>
              <button
                type="button"
                title="Aprovar Agência"
                onClick={() => approveAgency(row.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition border border-emerald-200"
              >
                <ShieldCheck size={15} />
              </button>
              <button
                type="button"
                title="Rejeitar Agência"
                onClick={() => {
                  const reason = window.prompt('Motivo da rejeição:');
                  if (reason) rejectAgency(row.id, reason);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition border border-rose-200"
              >
                <XCircle size={15} />
              </button>
            </>
          )}

          {row.status === 'Ativa' && (
            <button
              type="button"
              title="Suspender Agência"
              onClick={() => setSuspendModalAgency(row)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition"
            >
              <Ban size={15} />
            </button>
          )}
        </div>
      ),
    },
  ];

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
              Cadastre, credencie e gerencie agências parceiras do ecossistema Curitiba 360.
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

        {/* Tabs de Filtro de Status */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 bg-white rounded-2xl p-2 shadow-xs">
          {Object.keys(tabCounts).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{tab}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {tabCounts[tab]}
              </span>
            </button>
          ))}
        </div>

        {/* Ações em Lote */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-5 py-3 text-white shadow-lg animate-in fade-in">
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
                Aprovar Selecionadas
              </button>
              <button
                type="button"
                onClick={handleBatchReject}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-rose-600 px-4 text-xs font-black hover:bg-rose-500 transition"
              >
                <XCircle size={15} />
                Rejeitar Selecionadas
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
        <ReportTable
          columns={columns}
          rows={filteredAgencies}
          footer={[`Total de Agências: ${filteredAgencies.length}`, '', '', '', '', '', '', '']}
        />
      </main>

      {/* Drawer e Modal */}
      <AgencyDetailsDrawer
        agency={drawerAgency}
        onClose={() => setDrawerAgency(null)}
        onApprove={(agency) => {
          setDrawerAgency(null);
          approveAgency(agency.id);
        }}
        onReject={(agency) => {
          setDrawerAgency(null);
          const reason = window.prompt('Motivo da rejeição:');
          if (reason) rejectAgency(agency.id, reason);
        }}
        onSuspend={(agency) => {
          setDrawerAgency(null);
          setSuspendModalAgency(agency);
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
    </div>
  );
}
