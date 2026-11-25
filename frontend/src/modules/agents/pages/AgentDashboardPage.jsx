import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { agentDashboardService } from '../services/agentDashboardService';
import AgentDashboardHeader from '../components/AgentDashboardHeader';
import PerformanceCard from '../components/PerformanceCard';
import CommissionCard from '../components/CommissionCard';
import RankingCard from '../components/RankingCard';
import SalesChart from '../components/SalesChart';
import AgendaWidget from '../components/AgendaWidget';
import TaskBoard from '../components/TaskBoard';
import CRMTable from '../components/CRMTable';
import AIInsights from '../components/AIInsights';
import PayoutRequestModal from '../components/PayoutRequestModal';
import { CheckCircle2, RefreshCw } from 'lucide-react';

export default function AgentDashboardPage() {
  const navigate = useNavigate();
  const { agentId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPixModal, setShowPixModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await agentDashboardService.getAgentDashboardData(agentId || 'AGT-2001');
      if (res.success) setData(res.data);
    } catch (err) {
      showToast('Erro ao carregar dashboard do agente', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [agentId]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleMoveTask = async (taskId, newStatus) => {
    try {
      await agentDashboardService.updateTaskStatus(agentId || 'AGT-2001', taskId, newStatus);
      showToast('Tarefa atualizada com sucesso!');
      loadData();
    } catch (err) {
      showToast('Erro ao atualizar tarefa', 'error');
    }
  };

  const handleAIAction = (insight) => {
    showToast(`🤖 Ação "${insight.acao}" executada para "${insight.titulo}"!`);
  };

  const handleRequestPix = (amount) => {
    showToast(`🎉 Resgate de R$ ${amount.toFixed(2)} efetuado com sucesso via PIX!`);
    loadData();
  };

  if (loading && !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando painel operacional do agente...</p>
      </div>
    );
  }

  const agentInfo = data?.agentInfo || {};
  const kpis = data?.kpis || {};
  const sales12m = data?.graficoVendas12Meses || [];
  const topProducts = data?.produtosMaisVendidos || [];
  const agenda = data?.agendaHoje || [];
  const tasks = data?.tarefasKanban || [];
  const customers = data?.clientesCrm || [];
  const aiInsights = data?.aiInsights || [];

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

      {/* HEADER DO AGENTE */}
      <AgentDashboardHeader
        agentInfo={agentInfo}
        onNewSale={() => showToast('Simulador PDV de Nova Venda ativado!')}
        onRequestPix={() => setShowPixModal(true)}
      />

      {/* PERFORMANCES & METAS */}
      <PerformanceCard kpis={kpis} />

      {/* COMISSÃO & RANKING */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CommissionCard kpis={kpis} onRequestPix={() => setShowPixModal(true)} />
        </div>
        <div>
          <RankingCard kpis={kpis} />
        </div>
      </div>

      {/* IA COMERCIAL */}
      <AIInsights insights={aiInsights} onAction={handleAIAction} />

      {/* GRÁFICOS DE RECEITA E ATRAÇÕES */}
      <SalesChart salesData={sales12m} topProducts={topProducts} />

      {/* AGENDA DO DIA & KANBAN DE TAREFAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <AgendaWidget agenda={agenda} />
        </div>
        <div className="lg:col-span-2">
          <TaskBoard tasks={tasks} onMoveTask={handleMoveTask} />
        </div>
      </div>

      {/* CARTEIRA DE CLIENTES (CRM) */}
      <CRMTable customers={customers} />

      {/* MODAL RESGATE PIX */}
      <PayoutRequestModal
        isOpen={showPixModal}
        onClose={() => setShowPixModal(false)}
        saldoDisponivel={kpis.comissaoDisponivel}
        chavePix={agentInfo.cpf}
        onRequestPayout={handleRequestPix}
      />
    </div>
  );
}
