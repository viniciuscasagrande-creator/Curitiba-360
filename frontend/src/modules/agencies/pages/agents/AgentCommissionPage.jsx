import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { agentService } from '../../services/agentService';
import { commissionService } from '../../services/commissionService';
import CommissionEditor from '../../components/agents/CommissionEditor';
import { Sliders, ArrowLeft, CheckCircle2, User } from 'lucide-react';

export default function AgentCommissionPage() {
  const navigate = useNavigate();
  const { agencyId, agentId } = useParams();

  const [agent, setAgent] = useState(null);
  const [rules, setRules] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const agentRes = await agentService.getAgentById(agentId);
      if (agentRes.success) setAgent(agentRes.data);

      const rulesRes = await commissionService.getCommissionRules(agentId);
      if (rulesRes.success) setRules(rulesRes.rules);
    } catch (err) {
      showToast('Erro ao carregar regras de comissão', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [agentId]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveRules = async (newRules) => {
    try {
      await commissionService.updateCommissionRules(agentId, newRules);
      showToast('Regras de comissionamento salvas com sucesso!');
      setTimeout(() => navigate(`/agencias/${agencyId}/agentes/${agentId}`), 1000);
    } catch (err) {
      showToast('Erro ao salvar comissão', 'error');
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando comissão...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fade-in text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-3 text-xs font-semibold animate-bounce ${
          toastMessage.type === 'error' ? 'bg-red-900 text-white border-red-700' : 'bg-slate-900 text-white border-slate-700'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <div>
          <button
            onClick={() => navigate(`/agencias/${agencyId}/agentes/${agentId}`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Perfil do Agente
          </button>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Sliders className="w-6 h-6 text-purple-600" />
            Configuração de Comissão — {agent?.nome}
          </h1>
        </div>
      </div>

      <CommissionEditor rules={rules} onSaveRules={handleSaveRules} />
    </div>
  );
}
