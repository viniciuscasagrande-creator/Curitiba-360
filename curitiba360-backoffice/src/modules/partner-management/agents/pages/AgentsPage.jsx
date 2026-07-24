import { useMemo, useState } from 'react';
import {
  ArrowRightLeft,
  Eye,
  FileDown,
  Plus,
  ShieldCheck,
  Trash2,
  UserCheck,
  XCircle,
} from 'lucide-react';

import ReportTable from '../../../attractions/finance/reports/components/ReportTable';
import AgentStatusBadge from '../components/AgentStatusBadge';
import AgentFilters from '../components/AgentFilters';
import TransferAgencyModal from '../components/TransferAgencyModal';
import AgentFormModal from '../components/AgentFormModal';
import AgentDetailsDrawer from '../components/AgentDetailsDrawer';
import { useAgents } from '../hooks/useAgents';
import { useAgencies } from '../../agencies/hooks/useAgencies';
import { exportCsv } from '../../../attractions/finance/reports/utils/reportUtils';

export default function AgentsPage() {
  const { agents, isLoading, approveAgent, rejectAgent, transferAgentAgency, deleteAgent, createAgent } =
    useAgents();
  const { agencies } = useAgencies();

  const [activeTab, setActiveTab] = useState('Todos');
  const [search, setSearch] = useState('');
  const [agencyFilter, setAgencyFilter] = useState('all');

  const [drawerAgent, setDrawerAgent] = useState(null);
  const [transferModalAgent, setTransferModalAgent] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const filteredAgents = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('pt-BR');

    return agents.filter((a) => {
      const matchesTab =
        activeTab === 'Todos' ||
        (activeTab === 'Ativos' && a.status === 'Ativo') ||
        (activeTab === 'Pendentes' && a.status === 'Pendente') ||
        (activeTab === 'Inativos' && a.status === 'Inativo');

      const matchesAgency = agencyFilter === 'all' || a.agencyId === agencyFilter;

      const matchesSearch =
        !term ||
        [a.name, a.cpf, a.email, a.agencyName].some((val) =>
          String(val || '').toLocaleLowerCase('pt-BR').includes(term)
        );

      return matchesTab && matchesAgency && matchesSearch;
    });
  }, [agents, activeTab, search, agencyFilter]);

  const tabCounts = useMemo(() => {
    return {
      Todos: agents.length,
      Ativos: agents.filter((a) => a.status === 'Ativo').length,
      Pendentes: agents.filter((a) => a.status === 'Pendente').length,
      Inativos: agents.filter((a) => a.status === 'Inativo').length,
    };
  }, [agents]);

  function handleExportCsv() {
    exportCsv('agentes-b2b.csv', [
      ['ID', 'Nome', 'CPF', 'E-mail', 'Agência', 'Qtd Atrações', 'Status', 'Data Cadastro'],
      ...filteredAgents.map((a) => [
        a.id,
        a.name,
        a.cpf,
        a.email,
        a.agencyName,
        a.attractionsCount,
        a.status,
        a.createdAt,
      ]),
    ]);
  }

  const columns = [
    {
      key: 'name',
      label: 'Agente',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.avatar ? (
            <img src={row.avatar} alt={row.name} className="h-8 w-8 rounded-full object-cover border border-slate-200" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 font-black text-slate-600 text-xs">
              {row.name[0]}
            </div>
          )}
          <div>
            <strong className="block text-xs font-black text-slate-900">{row.name}</strong>
            <span className="text-[10px] text-slate-400 font-medium">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'cpf',
      label: 'CPF',
      render: (row) => <span className="font-mono text-xs font-bold text-slate-700">{row.cpf}</span>,
    },
    {
      key: 'agencyName',
      label: 'Agência Vinculada',
      render: (row) => <strong className="text-xs font-bold text-slate-800">{row.agencyName}</strong>,
    },
    {
      key: 'attractionsCount',
      label: 'Atrações Liberadas',
      render: (row) => (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-black text-slate-700">
          {row.attractionsCount} atrações
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <AgentStatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            title="Ver Detalhes"
            onClick={() => setDrawerAgent(row)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
          >
            <Eye size={15} />
          </button>

          <button
            type="button"
            title="Transferir Agência"
            onClick={() => setTransferModalAgent(row)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition"
          >
            <ArrowRightLeft size={15} />
          </button>

          {row.status === 'Pendente' && (
            <>
              <button
                type="button"
                title="Aprovar Agente"
                onClick={() => approveAgent(row.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition border border-emerald-200"
              >
                <ShieldCheck size={15} />
              </button>
              <button
                type="button"
                title="Rejeitar Agente"
                onClick={() => rejectAgent(row.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition border border-rose-200"
              >
                <XCircle size={15} />
              </button>
            </>
          )}

          <button
            type="button"
            title="Excluir Agente"
            onClick={() => {
              if (window.confirm(`Excluir o agente ${row.name}?`)) deleteAgent(row.id);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
          >
            <Trash2 size={15} />
          </button>
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
              Gestão de Agentes (B2B)
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Gerencie emissores, operadores e vendedores cadastrados nas agências parceiras.
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
              onClick={() => setIsFormModalOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-5 text-xs font-black text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition"
            >
              <Plus size={16} />
              Novo Agente
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

        {/* Filtros */}
        <AgentFilters
          search={search}
          agencyFilter={agencyFilter}
          agencies={agencies}
          onSearchChange={setSearch}
          onAgencyChange={setAgencyFilter}
          onReset={() => {
            setSearch('');
            setAgencyFilter('all');
          }}
        />

        {/* Tabela Principal */}
        <ReportTable
          columns={columns}
          rows={filteredAgents}
          footer={[`Total de Agentes: ${filteredAgents.length}`, '', '', '', '', '']}
        />
      </main>

      {/* Drawer e Modais */}
      <AgentDetailsDrawer
        agent={drawerAgent}
        onClose={() => setDrawerAgent(null)}
        onApprove={(id) => {
          setDrawerAgent(null);
          approveAgent(id);
        }}
        onReject={(id) => {
          setDrawerAgent(null);
          rejectAgent(id);
        }}
      />

      <TransferAgencyModal
        agent={transferModalAgent}
        agencies={agencies}
        onClose={() => setTransferModalAgent(null)}
        onConfirm={(id, newAgencyId, newAgencyName, reason) => {
          setTransferModalAgent(null);
          transferAgentAgency(id, newAgencyId, newAgencyName, reason);
        }}
      />

      {isFormModalOpen && (
        <AgentFormModal
          agencies={agencies}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={async (data) => {
            await createAgent(data);
            setIsFormModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
