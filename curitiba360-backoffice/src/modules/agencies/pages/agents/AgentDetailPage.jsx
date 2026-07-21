import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { agentService } from '../../services/agentService';
import PermissionMatrix from '../../components/agents/PermissionMatrix';
import GoalProgress from '../../components/agents/GoalProgress';
import WalletCard from '../../components/agents/WalletCard';
import SalesChart from '../../components/agents/SalesChart';
import { 
  User, 
  ArrowLeft, 
  Edit3, 
  Sliders, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Users, 
  History, 
  CheckCircle2, 
  XCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BarChart3,
  Wallet
} from 'lucide-react';

export default function AgentDetailPage() {
  const navigate = useNavigate();
  const { agencyId, agentId } = useParams();

  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('desempenho');
  const [toastMessage, setToastMessage] = useState(null);

  const loadAgent = async () => {
    setLoading(true);
    try {
      const res = await agentService.getAgentById(agentId);
      if (res.success) setAgent(res.data);
    } catch (err) {
      showToast('Erro ao carregar dados do agente', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgent();
  }, [agentId]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando perfil do agente...</p>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-4 max-w-lg mx-auto">
        <User className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800">Agente não encontrado</h2>
        <button
          onClick={() => navigate(`/agencias/${agencyId}/agentes`)}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
        >
          Voltar para Lista de Agentes
        </button>
      </div>
    );
  }

  const activePermsCount = Object.values(agent.permissoes || {}).filter(Boolean).length;

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
            onClick={() => navigate(`/agencias/${agencyId}/agentes`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Lista de Agentes
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <img
              src={agent.fotoUrl}
              alt={agent.nome}
              className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {agent.id}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {agent.nome}
                </h1>
                {agent.status === 'ativo' ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Ativo
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-700">
                    Inativo
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                CPF: <span className="font-mono text-slate-700">{agent.cpf}</span> | Cargo: <span className="font-semibold text-slate-700">{agent.cargo}</span> | Supervisor: <span className="font-semibold text-slate-700">{agent.supervisor}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to={`/agencias/${agencyId}/agentes/${agent.id}/comissao`}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
          >
            <Sliders className="w-4 h-4" /> Configurar Comissão
          </Link>
          <Link
            to={`/agencias/${agencyId}/agentes/${agent.id}/editar`}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" /> Editar Perfil
          </Link>
        </div>
      </div>

      {/* TOP KPIS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-slate-500 font-semibold block">Total Vendido (Mês)</span>
          <div className="text-xl font-extrabold text-slate-900">
            R$ {(agent.vendasMesAtual || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">{agent.qtdVendasMes || 0} bilhetes emitidos</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-slate-500 font-semibold block">Comissão Acumulada</span>
          <div className="text-xl font-extrabold text-emerald-600">
            R$ {((agent.vendasMesAtual || 0) * ((agent.taxaComissao || 5) / 100)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-blue-600 font-bold">{agent.taxaComissao || 5}% de comissão</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-slate-500 font-semibold block">Clientes CRM</span>
          <div className="text-xl font-extrabold text-slate-900">
            {agent.clientesCRM?.length || 0} Atendidos
          </div>
          <span className="text-[10px] text-purple-600 font-semibold">Carteira vinculada</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-slate-500 font-semibold block">Permissões (bo-01)</span>
          <div className="text-xl font-extrabold text-slate-900">
            {activePermsCount} / 8 Liberadas
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Perfil ativo</span>
        </div>
      </div>

      {/* TABS NAVEGAÇÃO */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-1 overflow-x-auto">
        {[
          { id: 'desempenho', label: 'Desempenho & Metas', icon: BarChart3 },
          { id: 'carteira', label: 'Carteira Digital & PIX', icon: Wallet },
          { id: 'permissoes', label: 'Permissões bo-01', icon: ShieldCheck },
          { id: 'crm', label: 'CRM de Clientes', icon: Users },
          { id: 'auditoria', label: 'Histórico & Logs', icon: History }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all whitespace-nowrap border-b-2
                ${isActive 
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50 font-bold' 
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}
              `}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTEÚDO DAS TABS */}
      {activeTab === 'desempenho' && (
        <div className="space-y-6">
          <GoalProgress vendas={agent.vendasMesAtual} meta={agent.metaMensal} />
          <SalesChart agent={agent} />
        </div>
      )}

      {activeTab === 'carteira' && (
        <WalletCard
          agentId={agent.id}
          wallet={{
            saldoDisponivel: agent.saldoDisponivel,
            saldoAguardando: agent.saldoAguardando,
            totalSacado: agent.totalSacado,
            pix: agent.pix
          }}
          onRequestSuccess={loadAgent}
        />
      )}

      {activeTab === 'permissoes' && (
        <PermissionMatrix permissions={agent.permissoes} readOnly={true} />
      )}

      {activeTab === 'crm' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" /> Carteira de Clientes Atendidos pelo Agente (CRM)
            </h3>
            <span className="text-[11px] text-slate-500">{agent.clientesCRM?.length || 0} clientes cadastrados</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-bold">
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Contato</th>
                  <th className="p-3">Cidade</th>
                  <th className="p-3 text-center">Compras</th>
                  <th className="p-3 text-right">Total Gasto</th>
                  <th className="p-3 text-right">LTV Acumulado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(agent.clientesCRM || []).length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400">
                      Nenhum cliente vinculado ainda.
                    </td>
                  </tr>
                ) : (
                  agent.clientesCRM.map((cli) => (
                    <tr key={cli.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{cli.nome}</td>
                      <td className="p-3">
                        <div>{cli.email}</div>
                        <div className="text-[10px] text-slate-400">{cli.telefone}</div>
                      </td>
                      <td className="p-3">{cli.cidade}</td>
                      <td className="p-3 text-center font-bold">{cli.eventosComprados} vendas</td>
                      <td className="p-3 text-right font-bold text-slate-900">
                        R$ {cli.totalGasto?.toFixed(2)}
                      </td>
                      <td className="p-3 text-right font-extrabold text-emerald-600">
                        R$ {cli.ltv?.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'auditoria' && (
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
            <History className="w-4 h-4 text-blue-600" /> Linha do Tempo & Histórico Auditado do Agente
          </h3>

          <div className="space-y-2">
            {(agent.historicoAuditoria || []).map((log, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="p-1.5 rounded bg-blue-100 text-blue-700 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-800">{log.acao}</div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>🕒 {log.data}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-600">Categoria: {log.categoria}</span>
                    {log.ip && <span>• IP: {log.ip}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
