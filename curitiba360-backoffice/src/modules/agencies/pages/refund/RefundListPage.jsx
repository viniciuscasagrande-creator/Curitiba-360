import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { refundService } from '../../services/refundService';
import RefundDashboard from '../../components/refund/RefundDashboard';
import GatewayStatusBadge from '../../components/refund/GatewayStatusBadge';
import RefundApprovalModal from '../../components/refund/RefundApprovalModal';
import { 
  RefreshCw, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft,
  DollarSign
} from 'lucide-react';

export default function RefundListPage() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState({});
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [gatewayFilter, setGatewayFilter] = useState('todos');
  const [selectedRefundToApprove, setSelectedRefundToApprove] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const summaryRes = await refundService.getRefundSummary();
      if (summaryRes.success) setSummary(summaryRes.summary);

      const listRes = await refundService.listRefundRequests({
        search: searchQuery,
        status: statusFilter,
        gateway: gatewayFilter
      });
      if (listRes.success) setRequests(listRes.data);
    } catch (err) {
      showToast('Erro ao carregar solicitações de reembolso', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchQuery, statusFilter, gatewayFilter]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleApprove = async (id, data) => {
    try {
      const res = await refundService.approveRefund(id, data);
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
            onClick={() => navigate('/agencias')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Gestão Central
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-05 • ETAPA 07
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Cancelamentos, Reembolsos & Fila Financeira 💸
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Fluxo auditável de cancelamento com motor de regras IA, esteira de aprovação e estorno via Gateway (Diagramas BO-06 e BO-08).
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to="/financeiro/fila-financeira"
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Fila de Análise com IA
          </Link>
          <button
            onClick={loadData}
            title="Atualizar lista"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DASHBOARD DE KPIS */}
      <RefundDashboard summary={summary} />

      {/* PAINEL DE BUSCA E FILTROS */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs text-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por ID Reembolso, Pedido, Bilhete, Cliente, Evento ou Agência..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700"
          >
            <option value="todos">Todos os Status</option>
            <option value="pendentes">Somente Pendentes em Análise</option>
            <option value="concluido">Somente Concluídos</option>
            <option value="negado">Somente Negados</option>
          </select>

          <select
            value={gatewayFilter}
            onChange={(e) => setGatewayFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700"
          >
            <option value="todos">Todos os Gateways</option>
            <option value="Mercado Pago">Mercado Pago</option>
            <option value="Pagar.me">Pagar.me</option>
            <option value="Stripe">Stripe</option>
          </select>
        </div>
      </div>

      {/* TABELA DE REEMBOLSOS */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 uppercase tracking-wider font-semibold text-[11px]">
                <th className="p-4">ID Reembolso / Pedido</th>
                <th className="p-4">Cliente / E-mail</th>
                <th className="p-4">Evento / Agência</th>
                <th className="p-4">Pagamento & Gateway</th>
                <th className="p-4 text-right">Valor Total</th>
                <th className="p-4 text-center">Score Risco IA</th>
                <th className="p-4">Status Esteira</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    Carregando solicitações...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    Nenhuma solicitação de reembolso encontrada.
                  </td>
                </tr>
              ) : (
                requests.map((req) => {
                  const isPendente = req.status.startsWith('pendente') || req.status === 'analise_ia';
                  const isConcluido = req.status === 'concluido';
                  const isNegado = req.status === 'negado';

                  return (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-mono">
                        <div className="font-bold text-slate-900">{req.id}</div>
                        <div className="text-[10px] text-slate-400">Pedido: {req.pedidoId}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-slate-900">{req.clienteNome}</div>
                        <div className="text-[10px] text-slate-500">{req.clienteEmail}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-slate-800">{req.eventoNome}</div>
                        <div className="text-[10px] text-slate-400">Agência: {req.agenciaNome} ({req.agenteNome})</div>
                      </td>

                      <td className="p-4">
                        <GatewayStatusBadge gateway={req.gateway} formaPagamento={req.formaPagamento} />
                      </td>

                      <td className="p-4 text-right font-extrabold text-slate-900">
                        R$ {req.valorTotal?.toFixed(2)}
                        {req.tipoReembolso === 'parcial' && (
                          <div className="text-[9px] text-amber-600 font-bold">Parcial (R$ {req.valorReembolsado?.toFixed(2)})</div>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          req.scoreRiscoIA > 50 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          <Sparkles className="w-3 h-3" /> {req.scoreRiscoIA}/100
                        </span>
                      </td>

                      <td className="p-4">
                        {isConcluido ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Concluído PIX/CC
                          </span>
                        ) : isNegado ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                            <XCircle className="w-3.5 h-3.5" /> Rejeitado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <Clock className="w-3.5 h-3.5" /> Em Análise
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {isPendente && (
                            <button
                              onClick={() => setSelectedRefundToApprove(req)}
                              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all"
                            >
                              Analisar
                            </button>
                          )}
                          <Link
                            to={`/financeiro/reembolsos/${req.id}`}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE APROVAÇÃO MANUAL */}
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
