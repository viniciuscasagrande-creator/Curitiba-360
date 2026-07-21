import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { aiCopilotService } from '../../services/aiCopilotService';
import AutomationWorkflowGrid from '../../components/ai/AutomationWorkflowGrid';
import { Zap, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AgentAutomationsPage() {
  const navigate = useNavigate();
  const { agentId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await aiCopilotService.getCopilotOverview(agentId || 'AGT-2001');
      if (res.success) setData(res.data);
    } catch (err) {
      showToast('Erro ao carregar automações', 'error');
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

  const handleToggleAutomation = async (automationId) => {
    try {
      const res = await aiCopilotService.toggleAutomation(automationId);
      if (res.success) {
        showToast(`Status da automação alterado para "${res.automation.status.toUpperCase()}"!`);
        loadData();
      }
    } catch (err) {
      showToast('Erro ao alterar status da automação', 'error');
    }
  };

  if (loading && !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando automações de vendas...</p>
      </div>
    );
  }

  const automations = data?.automations || [];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-3 font-semibold animate-bounce ${
          toastMessage.type === 'error' ? 'bg-red-900 text-white border-red-700' : 'bg-slate-900 text-white border-slate-700'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate('/agentes/dashboard')}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Dashboard do Agente
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-06 • ETAPA 05
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Central de Automações & Disparos ⚡
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Regras automáticas de follow-up, envio de vouchers e campanhas de reativação via WhatsApp e E-mail.
          </p>
        </div>

        <button
          onClick={loadData}
          title="Atualizar Automações"
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* GRID DE WORKFLOWS DE AUTOMAÇÃO */}
      <AutomationWorkflowGrid automations={automations} onToggle={handleToggleAutomation} />
    </div>
  );
}
