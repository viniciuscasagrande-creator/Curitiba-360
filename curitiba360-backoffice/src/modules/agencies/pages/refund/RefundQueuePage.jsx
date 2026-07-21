import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { refundService } from '../../services/refundService';
import RefundPolicyEditor from '../../components/refund/RefundPolicyEditor';
import GatewayStatusBadge from '../../components/refund/GatewayStatusBadge';
import RefundApprovalModal from '../../components/refund/RefundApprovalModal';
import { 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldAlert, 
  RefreshCw, 
  Eye, 
  Clock,
  Filter,
  Sliders,
  DollarSign
} from 'lucide-react';

export default function RefundQueuePage() {
  const navigate = useNavigate();

  const [policies, setPolicies] = useState({});
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRefundToApprove, setSelectedRefundToApprove] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const polRes = await refundService.getPolicies();
      if (polRes.success) setPolicies(polRes.data);

      const listRes = await refundService.listRefundRequests({ status: 'pendentes' });
      if (listRes.success) setQueue(listRes.data);
    } catch (err) {
      showToast('Erro ao carregar fila de análise', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleSavePolicies = async (newPolicies) => {
    try {
      await refundService.updateRefundPolicies(newPolicies);
      showToast('Políticas do Motor IA atualizadas com sucesso!');
      loadData();
    } catch (err) {
      showToast('Erro ao atualizar políticas', 'error');
    }
  };

  const handleApprove = async (id, data) => {
    try {
      await refundService.approveRefund(id, data);
      await refundService.processRefundGateway(id);
      showToast(`Reembolso ${id} aprovado e enviado para estorno no Gateway!`);
      loadData();
    } catch (err) {
      showToast('Erro ao aprovar reembolso', 'error');
    }
  };

  const handleReject = async (id, data) => {
    try {
      await refundService.rejectRefund(id, data);
      showToast(`Solicitação ${id} negada com sucesso.`);
      loadData();
    } catch (err) {
      showToast('Erro ao rejeitar solicitação', 'error');
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

      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate('/financeiro/reembolsos')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Cancelamentos & Reembolsos
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-05 • ETAPA 07
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Fila Financeira & Análise por Inteligência Artificial 🤖
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Fila priorizada por Score de Risco IA, análise antifraude e aprovação com motor de regras automático.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            title="Atualizar Fila"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* EDITOR DE POLÍTICAS DE APROVAÇÃO AUTOMÁTICA */}
      <RefundPolicyEditor policies={policies} onSavePolicies={handleSavePolicies} />

      {/* FILA DE SOLICITAÇÕES PENDENTES */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" /> Fila Priorizada de Reembolsos Pendentes em Análise
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px]">
            {queue.length} em análise
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 uppercase tracking-wider font-semibold text-[11px]">
                <th className="p-4">ID Reembolso</th>
                <th className="p-4">Cliente / Pedido</th>
                <th className="p-4">Evento / Agência</th>
                <th className="p-4">Forma & Gateway</th>
                <th className="p-4 text-right">Valor Total</th>
                <th className="p-4 text-center">Score Risco IA</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    Carregando fila priorizada...
                  </td>
                </tr>
              ) : queue.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    🎉 Nenhuma solicitação pendente na fila financeira!
                  </td>
                </tr>
              ) : (
                queue.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900">{req.id}</td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900">{req.clienteNome}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Pedido: {req.pedidoId}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{req.eventoNome}</div>
                      <div className="text-[10px] text-slate-400">{req.agenciaNome} ({req.agenteNome})</div>
                    </td>

                    <td className="p-4">
                      <GatewayStatusBadge gateway={req.gateway} formaPagamento={req.formaPagamento} />
                    </td>

                    <td className="p-4 text-right font-extrabold text-slate-900">
                      R$ {req.valorTotal?.toFixed(2)}
                    </td>

                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-extrabold text-[11px] ${
                        req.scoreRiscoIA > 50 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        <Sparkles className="w-3.5 h-3.5" /> {req.scoreRiscoIA}/100
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedRefundToApprove(req)}
                          className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all"
                        >
                          Analisar & Aprovar
                        </button>
                        <Link
                          to={`/financeiro/reembolsos/${req.id}`}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL APROVAÇÃO */}
      <RefundApprovalModal
        isOpen={Boolean(selectedRefundToApprove)}
        onClose={() => setSelectedRefundToApprove(null)}
        request={selectedRefundToApprove}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
