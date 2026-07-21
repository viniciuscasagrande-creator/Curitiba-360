import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { omnichannelService } from '../../services/omnichannelService';
import ConversationList from '../../components/omnichannel/ConversationList';
import ChatWindow from '../../components/omnichannel/ChatWindow';
import TemplateSelectorModal from '../../components/omnichannel/TemplateSelectorModal';
import { MessageSquare, ArrowLeft, RefreshCw, CheckCircle2, FileText } from 'lucide-react';

export default function AgentOmnichannelPage() {
  const navigate = useNavigate();
  const { agentId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedConvId, setSelectedConvId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await omnichannelService.getOmnichannelOverview(agentId || 'AGT-2001');
      if (res.success) {
        setData(res.data);
        if (res.data.conversations && res.data.conversations.length > 0 && !selectedConvId) {
          setSelectedConvId(res.data.conversations[0].id);
        }
      }
    } catch (err) {
      showToast('Erro ao carregar Central Omnichannel', 'error');
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

  const handleSendMessage = async (convId, text, channel) => {
    try {
      await omnichannelService.sendMessage(convId, text, channel);
      showToast(`📱 Mensagem enviada com sucesso via ${channel.toUpperCase()}!`);
      loadData();
    } catch (err) {
      showToast('Erro ao enviar mensagem', 'error');
    }
  };

  const handleSelectTemplate = (tpl) => {
    if (selectedConvId) {
      handleSendMessage(selectedConvId, tpl.conteudo, tpl.canal);
    }
  };

  if (loading && !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando Central Omnichannel...</p>
      </div>
    );
  }

  const conversations = (data?.conversations || []).filter((c) =>
    c.clienteNome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.clienteTelefone.includes(searchQuery)
  );

  const selectedConv = (data?.conversations || []).find((c) => c.id === selectedConvId);
  const templates = data?.templates || [];

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
              MOD-06 • ETAPA 06
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Central de Comunicação Omnichannel 💬
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Atendimento unificado via WhatsApp, E-mail e Notificações em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/agentes/omnichannel/templates')}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> Gestão de Templates
          </button>
          <button
            onClick={loadData}
            title="Atualizar Atendimentos"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TELA DE CHAT OMNICHANNEL: LISTA À ESQUERDA | CHAT À DIREITA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <ConversationList
            conversations={conversations}
            selectedId={selectedConvId}
            onSelectConversation={(id) => setSelectedConvId(id)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="lg:col-span-2">
          <ChatWindow
            conversation={selectedConv}
            onSendMessage={handleSendMessage}
            onOpenTemplates={() => setShowTemplatesModal(true)}
          />
        </div>
      </div>

      {/* MODAL SELETOR DE TEMPLATES */}
      <TemplateSelectorModal
        isOpen={showTemplatesModal}
        onClose={() => setShowTemplatesModal(false)}
        templates={templates}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
}
