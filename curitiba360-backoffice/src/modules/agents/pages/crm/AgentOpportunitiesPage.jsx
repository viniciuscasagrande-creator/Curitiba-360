import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { crmService } from '../../services/crmService';
import OpportunityFunnel from '../../components/crm/OpportunityFunnel';
import { ArrowLeft, Target, CheckCircle2, PlusCircle } from 'lucide-react';

export default function AgentOpportunitiesPage() {
  const navigate = useNavigate();
  const { agentId } = useParams();

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const loadOpportunities = async () => {
    setLoading(true);
    try {
      const res = await crmService.listOpportunities(agentId || 'AGT-2001');
      if (res.success) setOpportunities(res.data);
    } catch (err) {
      showToast('Erro ao carregar oportunidades do funil', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOpportunities();
  }, [agentId]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleMoveOpportunity = async (oppId, newStage) => {
    try {
      await crmService.updateOpportunityStage(oppId, newStage);
      showToast('Etapa da oportunidade atualizada com sucesso!');
      loadOpportunities();
    } catch (err) {
      showToast('Erro ao atualizar etapa', 'error');
    }
  };

  if (loading && opportunities.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando funil de vendas...</p>
      </div>
    );
  }

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

      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate(`/agentes/${agentId || 'AGT-2001'}/crm`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para CRM de Clientes
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-06 • ETAPA 02
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Funil Comercial de Oportunidades 🎯
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Acompanhamento de propostas corporativas, vendas para grupos e negociações ativas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Nova Oportunidade iniciada!')}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Nova Oportunidade
          </button>
        </div>
      </div>

      {/* QUADRO DE FUNIL DE VENDAS */}
      <OpportunityFunnel opportunities={opportunities} onMoveOpportunity={handleMoveOpportunity} />
    </div>
  );
}
