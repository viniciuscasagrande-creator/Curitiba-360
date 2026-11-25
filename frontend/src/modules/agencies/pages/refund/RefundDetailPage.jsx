import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { refundService } from '../../services/refundService';
import RefundTimeline from '../../components/refund/RefundTimeline';
import GatewayStatusBadge from '../../components/refund/GatewayStatusBadge';
import RefundApprovalModal from '../../components/refund/RefundApprovalModal';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  User, 
  Building2, 
  History,
  AlertTriangle
} from 'lucide-react';

export default function RefundDetailPage() {
  const navigate = useNavigate();
  const { refundId } = useParams();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const loadRequest = async () => {
    setLoading(true);
    try {
      const res = await refundService.getRefundById(refundId);
      if (res.success) setRequest(res.data);
    } catch (err) {
      showToast('Erro ao carregar detalhes do reembolso', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequest();
  }, [refundId]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleApprove = async (id, data) => {
    try {
      await refundService.approveRefund(id, data);
      await refundService.processRefundGateway(id);
      showToast('Reembolso aprovado e enviado ao gateway!');
      loadRequest();
    } catch (err) {
      showToast('Erro ao aprovar reembolso', 'error');
    }
  };

  const handleReject = async (id, data) => {
    try {
      await refundService.rejectRefund(id, data);
      showToast('Solicitação negada com sucesso.');
      loadRequest();
    } catch (err) {
      showToast('Erro ao rejeitar solicitação', 'error');
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando detalhes da solicitação...</p>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-4 max-w-lg mx-auto">
        <FileText className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800">Solicitação não encontrada</h2>
        <button
          onClick={() => navigate('/financeiro/reembolsos')}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
        >
          Voltar para Lista
        </button>
      </div>
    );
  }

  const isPendente = request.status.startsWith('pendente') || request.status === 'analise_ia';

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
            onClick={() => navigate('/financeiro/reembolsos')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Fila de Reembolsos
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {request.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Solicitação de Reembolso #{request.id}
            </h1>
            <GatewayStatusBadge gateway={request.gateway} formaPagamento={request.formaPagamento} />
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Pedido: <span className="font-mono text-slate-800">{request.pedidoId}</span> | Bilhete: <span className="font-mono text-slate-800">{request.bilheteId}</span> | Cliente: <span className="font-semibold text-slate-800">{request.clienteNome}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isPendente && (
            <button
              onClick={() => setShowApprovalModal(true)}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Efetuar Análise & Aprovação
            </button>
          )}
        </div>
      </div>

      {/* TIMELINE DE 6 ETAPAS */}
      <RefundTimeline timeline={request.timeline} status={request.status} />

      {/* PAINEL DE INTELIGÊNCIA ARTIFICIAL & RISCO */}
      <div className="p-4 bg-purple-900 text-white rounded-xl border border-purple-800 shadow-md space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-300" />
            <span className="font-extrabold text-sm">Análise do Motor de Inteligência Artificial Curitiba360</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[11px] ${
            request.scoreRiscoIA > 50 ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
          }`}>
            Score Risco: {request.scoreRiscoIA}/100 ({request.scoreRiscoIA > 50 ? 'Alto Risco' : 'Baixo Risco'})
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-purple-800/80 text-[11px]">
          <div>
            <span className="text-purple-300 font-semibold block">Recomendação IA:</span>
            <span className="font-bold text-white">{request.recomendacaoIA}</span>
          </div>
          <div>
            <span className="text-purple-300 font-semibold block">Regra CDC (7 Dias):</span>
            <span className="font-bold text-white">Solicitado dentro do prazo legal de 7 dias</span>
          </div>
        </div>
      </div>

      {/* DETALHES EM CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Card 1: Dados do Pedido & Cliente */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" /> Dados do Pedido & Cliente
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-slate-400 font-medium">Nome do Cliente:</span>
              <p className="font-bold text-slate-900">{request.clienteNome}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">CPF / E-mail:</span>
              <p className="font-semibold text-slate-800">{request.clienteEmail}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Evento Contratado:</span>
              <p className="font-bold text-slate-900">{request.eventoNome}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Agência / Agente:</span>
              <p className="font-semibold text-slate-800">{request.agenciaNome} ({request.agenteNome})</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Data da Compra:</span>
              <p className="font-semibold text-slate-800">{request.dataCompra}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Data do Evento:</span>
              <p className="font-semibold text-slate-800">{request.dataEvento}</p>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 font-medium">Motivo do Reembolso:</span>
              <p className="font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-1">
                "{request.motivo}"
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Valores & Gateway */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-600" /> Valores & Transação Gateway
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-slate-400 font-medium">Valor Total da Compra:</span>
              <p className="font-extrabold text-slate-900 text-sm">R$ {request.valorTotal?.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Valor a Reembolsar:</span>
              <p className="font-extrabold text-emerald-600 text-sm">R$ {request.valorReembolsado?.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Taxa Retida Operational:</span>
              <p className="font-bold text-amber-700">R$ {request.taxaRetida?.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Gateway de Pagamento:</span>
              <p className="font-bold text-slate-800">{request.gateway}</p>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 font-medium">ID Transação Gateway:</span>
              <p className="font-mono font-bold text-slate-800">{request.gatewayTxId}</p>
            </div>
            {request.comprovanteEstornoId && (
              <div className="col-span-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="text-emerald-800 font-bold block">Comprovante de Estorno Emitido:</span>
                <span className="font-mono text-emerald-900 font-bold">{request.comprovanteEstornoId}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HISTÓRICO DE APROVAÇÕES & AUDITORIA */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-3 text-xs">
        <h3 className="font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
          <History className="w-4 h-4 text-blue-600" /> Trilha de Auditoria & Aprovações
        </h3>

        <div className="space-y-2">
          {(request.historicoAprovacoes || []).map((h, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="p-1.5 rounded bg-blue-100 text-blue-700 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-800">{h.acao}</div>
                <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                  <span>🕒 {h.data}</span>
                  <span>•</span>
                  <span className="font-bold text-slate-700">Papel: {h.papel}</span>
                  <span>•</span>
                  <span>Usuário: {h.usuario}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL APROVAÇÃO */}
      <RefundApprovalModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        request={request}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
