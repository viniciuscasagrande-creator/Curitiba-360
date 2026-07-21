import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { agentService } from '../../services/agentService';
import { agencyService } from '../../services/agencyService';
import AgentTable from '../../components/agents/AgentTable';
import { 
  Users, 
  Plus, 
  ArrowLeft, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  DollarSign,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export default function AgentListPage() {
  const navigate = useNavigate();
  const { agencyId } = useParams();

  const [agency, setAgency] = useState(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [selectedIds, setSelectedIds] = useState([]);
  const [counts, setCounts] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      if (agencyId) {
        const agencyRes = await agencyService.getAgencyById(agencyId);
        if (agencyRes.success) setAgency(agencyRes.data);
      }

      const agentsRes = await agentService.getAgentsByAgency(agencyId, {
        search: searchQuery,
        status: statusFilter
      });
      if (agentsRes.success) {
        setAgents(agentsRes.data);
        setCounts(agentsRes.counts);
      }
    } catch (err) {
      showToast('Erro ao carregar lista de agentes', 'error');
    } fontinally: {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [agencyId, searchQuery, statusFilter]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSelectAll = (checked) => {
    if (checked) setSelectedIds(agents.map((a) => a.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteAgent = async (agentId) => {
    if (!window.confirm('Tem certeza que deseja remover este agente comercial?')) return;
    try {
      await agentService.deleteAgent(agentId);
      showToast('Agente removido com sucesso!');
      loadData();
    } catch (err) {
      showToast('Erro ao remover agente', 'error');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-3 text-xs font-semibold animate-bounce ${
          toastMessage.type === 'error' ? 'bg-red-900 text-white border-red-700' : 'bg-slate-900 text-white border-slate-700'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate(agencyId ? `/agencias/${agencyId}` : '/agencias')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para {agency ? agency.nomeFantasia : 'Agências'}
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-05 • ETAPA 04
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Gestão de Agentes Comerciais 👥
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Cadastro de agentes, matriz de permissões (bo-01), controle de comissões e vendas autorizadas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={agencyId ? `/agencias/${agencyId}/agentes/novo` : '/agencias'}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Cadastrar Novo Agente
          </Link>
        </div>
      </div>

      {/* KPI SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Agentes</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{counts.todos || 0}</div>
          <div className="text-[11px] text-slate-500">Cadastrados nesta agência</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Agentes Ativos</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{counts.ativo || 0}</div>
          <div className="text-[11px] text-emerald-600 font-semibold">Liberados para vendas PDV</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Vendas do Mês</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            R$ {agents.reduce((acc, a) => acc + (a.vendasMesAtual || 0), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-purple-600 font-semibold">Faturamento acumulado</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Comissões Geradas</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">
            R$ {agents.reduce((acc, a) => acc + (a.saldoDisponivel || 0), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-500">Disponíveis para repasse PIX</div>
        </div>
      </div>

      {/* PAINEL DE BUSCA E FILTROS */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por Nome, CPF, E-mail, Cargo ou Cidade..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 focus:outline-none"
          >
            <option value="todos">Todos os Status</option>
            <option value="ativo">Somente Ativos</option>
            <option value="inativo">Somente Inativos</option>
          </select>
        </div>
      </div>

      {/* TABELA DE AGENTES */}
      {loading ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando agentes comerciais...</p>
        </div>
      ) : (
        <AgentTable
          agents={agents}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onViewAgent={(agent) => navigate(`/agencias/${agencyId || agent.agencyId}/agentes/${agent.id}`)}
          onEditAgent={(agent) => navigate(`/agencias/${agencyId || agent.agencyId}/agentes/${agent.id}/editar`)}
          onManageCommission={(agent) => navigate(`/agencias/${agencyId || agent.agencyId}/agentes/${agent.id}/comissao`)}
          onDeleteAgent={handleDeleteAgent}
        />
      )}
    </div>
  );
}
