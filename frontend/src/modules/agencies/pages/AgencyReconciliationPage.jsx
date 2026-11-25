import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { agencyService } from '../services/agencyService';
import { reconciliationService } from '../services/reconciliationService';
import ReconciliationStatusBadge from '../components/reconciliation/ReconciliationStatusBadge';
import ReconciliationSummary from '../components/reconciliation/ReconciliationSummary';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  RefreshCw, 
  FileText,
  Calendar,
  X,
  ShieldAlert,
  DollarSign
} from 'lucide-react';

export default function AgencyReconciliationPage() {
  const navigate = useNavigate();
  const { agencyId } = useParams();

  const [agency, setAgency] = useState(null);
  const [closings, setClosings] = useState([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState('PER-2026-07');
  const [summaryData, setSummaryData] = useState(null);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [toastMessage, setToastMessage] = useState(null);

  // Modais de ação
  const [selectedSaleToReconcile, setSelectedSaleToReconcile] = useState(null);
  const [reconcileNotes, setReconcileNotes] = useState('Divergência tratada e confirmada via extrato bancário');
  const [processing, setProcessing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      if (agencyId) {
        const agencyRes = await agencyService.getAgencyById(agencyId).catch(() => null);
        if (agencyRes && agencyRes.success) setAgency(agencyRes.data);
      }

      const closingsRes = await reconciliationService.listFinancialClosings(agencyId || 'AG-1001');
      if (closingsRes.success) setClosings(closingsRes.data);

      const summaryRes = await reconciliationService.getReconciliationSummary(agencyId || 'AG-1001', selectedPeriodId);
      if (summaryRes.success) setSummaryData(summaryRes);

      const salesRes = await reconciliationService.listReconciliationSales(agencyId || 'AG-1001', selectedPeriodId, {
        search: searchQuery,
        status: statusFilter
      });
      if (salesRes.success) setSales(salesRes.data);
    } catch (err) {
      showToast('Erro ao carregar módulo de conciliação', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [agencyId, selectedPeriodId, searchQuery, statusFilter]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Tratar / Conciliar Venda Manualmente
  const handleReconcileSale = async (e) => {
    e.preventDefault();
    if (!selectedSaleToReconcile) return;

    setProcessing(true);
    try {
      await reconciliationService.reconcileSale(agencyId || 'AG-1001', selectedSaleToReconcile.id, reconcileNotes);
      showToast(`Venda ${selectedSaleToReconcile.id} conciliada com sucesso!`);
      setSelectedSaleToReconcile(null);
      loadData();
    } catch (err) {
      showToast('Erro ao conciliar venda', 'error');
    } finally {
      setProcessing(false);
    }
  };

  // Fechamento Financeiro do Período
  const handleClosePeriod = async () => {
    setProcessing(true);
    try {
      await reconciliationService.closeFinancialPeriod(agencyId || 'AG-1001', selectedPeriodId, 'Admin Financeiro');
      showToast(`🔒 Período ${selectedPeriodId} FECHADO com sucesso! Liberado para repasse financeiro.`);
      loadData();
    } catch (err) {
      showToast(err.message || 'Erro ao realizar fechamento financeiro', 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (loading && !summaryData) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando conciliação financeira...</p>
      </div>
    );
  }

  const summary = summaryData?.summary || {};
  const currentPeriod = summaryData?.period || {};

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
            onClick={() => navigate(agencyId ? `/agencias/${agencyId}/financeiro` : '/agencias')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Financeiro da Agência
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[11px]">
              MOD-05 • ETAPA 06
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Conciliação & Fechamento Financeiro 📊
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Comparação de faturamento bruto, taxas gateway, reembolsos e fechamento contábil mensal.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Seletor de Período */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              value={selectedPeriodId}
              onChange={(e) => setSelectedPeriodId(e.target.value)}
              className="font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              {closings.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.periodoLabel} ({c.status === 'fechado' ? 'Fechado 🔒' : 'Aberto 🟢'})
                </option>
              ))}
            </select>
          </div>

          {/* Botão de Fechamento */}
          {currentPeriod.status === 'aberto' ? (
            <button
              onClick={handleClosePeriod}
              disabled={!summary.podeFechar || processing}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-2 ${
                summary.podeFechar 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 cursor-pointer' 
                  : 'bg-slate-200 text-slate-500 border border-slate-300 cursor-not-allowed'
              }`}
            >
              <Lock className="w-4 h-4" /> Realizar Fechamento Mensal
            </button>
          ) : (
            <span className="px-3.5 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-200">
              <Lock className="w-3.5 h-3.5 text-emerald-600" /> Período Encerrado
            </span>
          )}

          <button
            onClick={loadData}
            title="Atualizar dados"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AVISO DE BLOQUEIO SE HOUVER PENDÊNCIAS */}
      {!summary.podeFechar && currentPeriod.status === 'aberto' && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3 text-xs text-amber-900 animate-fade-in">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-extrabold text-sm block">Trava de Fechamento Financeiro Ativa</span>
              <span>
                Existem <b>{summary.vendasPendentes}</b> venda(s) pendente(s) e <b>{summary.vendasDivergentes}</b> com divergência neste período.
                Trate todos os registros antes de liberar o fechamento contábil.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CARDS DE RESUMO KPI */}
      <ReconciliationSummary summary={summary} />

      {/* PAINEL DE PESQUISA & FILTROS */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs text-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por ID da Venda, Bilhete, Evento, Agente ou Canal..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 focus:outline-none"
          >
            <option value="todos">Todos os Status</option>
            <option value="conciliado">Somente Conciliados</option>
            <option value="pendente">Somente Pendentes</option>
            <option value="divergente">Somente Divergentes</option>
          </select>
        </div>
      </div>

      {/* TABELA DE VENDAS PARA CONCILIAÇÃO */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 uppercase tracking-wider font-semibold text-[11px]">
                <th className="p-4">ID Venda / Data</th>
                <th className="p-4">Agente / Canal</th>
                <th className="p-4">Evento / Bilhete</th>
                <th className="p-4 text-right">Valor Bruto</th>
                <th className="p-4 text-right">Taxa Gateway</th>
                <th className="p-4 text-right">Reembolso</th>
                <th className="p-4 text-right">Receita Líquida</th>
                <th className="p-4 text-center">Comissão %</th>
                <th className="p-4">Status Conciliação</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
              {sales.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-10 text-center text-slate-400">
                    Nenhuma venda encontrada para conciliação neste período.
                  </td>
                </tr>
              ) : (
                sales.map((sale) => (
                  <tr key={sale.id} className={`hover:bg-slate-50/80 transition-colors ${
                    sale.statusConciliacao === 'divergente' ? 'bg-red-50/30' : ''
                  }`}>
                    <td className="p-4 font-mono font-bold text-slate-900">
                      <div>{sale.id}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{sale.dataVenda}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900">{sale.agenteNome}</div>
                      <div className="text-[10px] text-slate-500">{sale.canalVenda}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{sale.eventoNome}</div>
                      <div className="text-[10px] text-slate-400 font-mono">ID Bilhete: {sale.bilheteId}</div>
                    </td>

                    <td className="p-4 text-right font-extrabold text-slate-900">
                      R$ {sale.valorBruto?.toFixed(2)}
                    </td>

                    <td className="p-4 text-right font-semibold text-purple-700">
                      R$ {sale.taxaGateway?.toFixed(2)}
                    </td>

                    <td className="p-4 text-right font-semibold text-red-600">
                      R$ {sale.reembolso?.toFixed(2)}
                    </td>

                    <td className="p-4 text-right font-extrabold text-emerald-700">
                      R$ {sale.receitaLiquida?.toFixed(2)}
                    </td>

                    <td className="p-4 text-center font-bold text-blue-600">
                      {sale.taxaComissaoPct}% (R$ {sale.valorComissao?.toFixed(2)})
                    </td>

                    <td className="p-4">
                      <ReconciliationStatusBadge status={sale.statusConciliacao} />
                      {sale.motivoDivergencia && (
                        <p className="text-[10px] text-red-600 mt-1 font-semibold leading-tight max-w-[180px]">
                          ⚠️ {sale.motivoDivergencia}
                        </p>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      {sale.statusConciliacao !== 'conciliado' && (
                        <button
                          onClick={() => {
                            setSelectedSaleToReconcile(sale);
                            setReconcileNotes(`Tratamento manual da venda ${sale.id} confirmado pelo operador`);
                          }}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
                        >
                          Conciliar
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE CONCILIAÇÃO MANUAL */}
      {selectedSaleToReconcile && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 text-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Conciliação Manual de Venda
              </h3>
              <button
                onClick={() => setSelectedSaleToReconcile(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReconcileSale} className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                <div className="font-bold text-slate-900">{selectedSaleToReconcile.id} - {selectedSaleToReconcile.eventoNome}</div>
                <div className="text-[11px] text-slate-500">Valor Bruto: R$ {selectedSaleToReconcile.valorBruto?.toFixed(2)}</div>
                {selectedSaleToReconcile.motivoDivergencia && (
                  <div className="text-[10px] text-red-600 font-semibold mt-1">
                    Motivo: {selectedSaleToReconcile.motivoDivergencia}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notas da Conciliação / Justificativa</label>
                <textarea
                  rows={3}
                  required
                  value={reconcileNotes}
                  onChange={(e) => setReconcileNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSaleToReconcile(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md"
                >
                  {processing ? 'Gravando...' : 'Confirmar Conciliação'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
