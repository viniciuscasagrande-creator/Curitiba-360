import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { aiCopilotService } from '../../services/aiCopilotService';
import CopilotChat from '../../components/ai/CopilotChat';
import LeadScoringCard from '../../components/ai/LeadScoringCard';
import ChurnAlertTable from '../../components/ai/ChurnAlertTable';
import WhatsappGeneratorModal from '../../components/ai/WhatsappGeneratorModal';
import { Bot, ArrowLeft, RefreshCw, CheckCircle2, Sparkles, Zap } from 'lucide-react';

export default function AgentCopilotPage() {
  const navigate = useNavigate();
  const { agentId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLeadForCopy, setSelectedLeadForCopy] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await aiCopilotService.getCopilotOverview(agentId || 'AGT-2001');
      if (res.success) setData(res.data);
    } catch (err) {
      showToast('Erro ao carregar Copiloto de Vendas', 'error');
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

  const handleSendMessage = async (promptText) => {
    try {
      const res = await aiCopilotService.sendCopilotMessage(promptText);
      if (res.success && data) {
        setData({ ...data, copilotChatHistory: res.chatHistory });
      }
    } catch (err) {
      showToast('Erro ao interagir com o Copiloto', 'error');
    }
  };

  const handleSendCopy = (copyText) => {
    showToast('📱 Mensagem WhatsApp gerada e disparada via API de Comunicação!');
  };

  const handleReactivateChurn = (alertItem) => {
    showToast(`🎁 Cupom de Reativação "${alertItem.cupomSugerido}" disparado no WhatsApp de "${alertItem.clienteNome}"!`);
  };

  if (loading && !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando IA Comercial & Copiloto...</p>
      </div>
    );
  }

  const scoredLeads = data?.scoredLeads || [];
  const churnAlerts = data?.churnAlerts || [];
  const chatHistory = data?.copilotChatHistory || [];

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
              Copiloto IA & Inteligência Comercial 🤖
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Previsão preditiva de conversão, copys automáticas de WhatsApp, detecção de churn e assistente 24/7.
          </p>
        </div>

        <button
          onClick={loadData}
          title="Atualizar Copiloto"
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* CHAT COM COPILOTO & LEAD SCORING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CopilotChat chatHistory={chatHistory} onSendMessage={handleSendMessage} />
        <LeadScoringCard scoredLeads={scoredLeads} onGenerateCopy={(lead) => setSelectedLeadForCopy(lead)} />
      </div>

      {/* ALERTAS PREDITIVOS DE CHURN */}
      <ChurnAlertTable churnAlerts={churnAlerts} onReactivate={handleReactivateChurn} />

      {/* MODAL GERADOR DE COPY WHATSAPP */}
      <WhatsappGeneratorModal
        isOpen={Boolean(selectedLeadForCopy)}
        onClose={() => setSelectedLeadForCopy(null)}
        lead={selectedLeadForCopy}
        onSendCopy={handleSendCopy}
      />
    </div>
  );
}
