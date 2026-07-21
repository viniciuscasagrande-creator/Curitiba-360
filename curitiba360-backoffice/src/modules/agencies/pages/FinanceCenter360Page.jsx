import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { financeCenterService } from '../services/financeCenterService';
import FinanceKpiCard from '../components/center/FinanceKpiCard';
import CashFlowChart from '../components/center/CashFlowChart';
import FinanceAlerts from '../components/center/FinanceAlerts';
import OperationsTable from '../components/center/OperationsTable';
import AuditLogTable from '../components/financial/AuditLogTable';
import { 
  DollarSign, 
  Wallet, 
  RefreshCw, 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  FileText, 
  TrendingUp,
  Download,
  Calendar,
  PieChart,
  Zap,
  CreditCard,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function FinanceCenter360Page() {
  const navigate = useNavigate();

  const [periodFilter, setPeriodFilter] = useState('30d');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await financeCenterService.getFinancialCenterOverview(periodFilter);
      if (res.success) setData(res.data);
    } catch (err) {
      showToast('Erro ao carregar Centro Financeiro', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [periodFilter]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  if (loading && !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando Centro Financeiro 360...</p>
      </div>
    );
  }

  const resumo = data?.resumo || {};
  const evolucao = data?.evolucao6Meses || [];
  const meios = data?.distribuicaoMeiosPagamento || [];
  const alertas = data?.alertas || [];
  const operacoes = data?.operacoesRecentes || [];

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
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px]">
              MOD-05 • ETAPA 08
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-600" /> Centro Financeiro 360
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Painel Financeiro Executivo Curitiba 360 💰
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Consolidação de vendas, comissões, repasses PIX, conciliação, fechamentos, reembolsos e inteligência preditiva.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Seletor de Período */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="6m">Últimos 6 meses</option>
              <option value="1y">Último ano</option>
            </select>
          </div>

          <button
            onClick={() => financeCenterService.exportOperationsCSV(operacoes)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Exportar CSV
          </button>

          <button
            onClick={loadData}
            title="Atualizar Dados"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPIS CONSOLIDADOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FinanceKpiCard
          title="Receita Líquida Consolidada"
          value={resumo.receitaLiquida}
          subtitle={`Bruto: R$ ${resumo.receitaBruta?.toLocaleString('pt-BR')}`}
          trend="+12.4%"
          icon={TrendingUp}
          colorTheme="emerald"
        />

        <FinanceKpiCard
          title="Saldo Disponível em Carteira"
          value={resumo.saldoDisponivel}
          subtitle={`Retido: R$ ${resumo.saldoRetido?.toLocaleString('pt-BR')}`}
          trend="+8.1%"
          icon={Wallet}
          colorTheme="blue"
        />

        <FinanceKpiCard
          title="Total Comissões Agências"
          value={resumo.totalComissoes}
          subtitle={`Taxas Plataforma: R$ ${resumo.taxasTotais?.toLocaleString('pt-BR')}`}
          trend="+15.0%"
          icon={DollarSign}
          colorTheme="purple"
        />

        <FinanceKpiCard
          title="Total Repassado Acumulado"
          value={resumo.totalRepassado}
          subtitle={`Reembolsos: R$ ${resumo.totalReembolsos?.toLocaleString('pt-BR')}`}
          trend="+9.5%"
          icon={ArrowUpRight}
          colorTheme="amber"
        />
      </div>

      {/* ALERTAS OPERACIONAIS */}
      <FinanceAlerts alerts={alertas} />

      {/* GRÁFICO DE EVOLUÇÃO DE CAIXA E MEIOS DE PAGAMENTO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CashFlowChart data={evolucao} />
        </div>

        {/* Distribuição Meios de Pagamento */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-600" /> Meios de Pagamento
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold">Volume 30d</span>
          </div>

          <div className="space-y-3">
            {meios.map((m, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    {m.meio.includes('PIX') ? <Zap className="w-3.5 h-3.5 text-emerald-600" /> : <CreditCard className="w-3.5 h-3.5 text-blue-600" />}
                    {m.meio}
                  </span>
                  <span>R$ {m.valor.toLocaleString('pt-BR')} ({m.percentual}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${m.percentual}%`, backgroundColor: m.cor }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-[10px] text-purple-900 space-y-1">
            <span className="font-bold block flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-600" /> Previsão Fluxo de Caixa IA (30d):
            </span>
            <span className="font-extrabold text-purple-950 text-sm">
              R$ {(resumo.previsao30Dias || 124500).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* TABELA DE OPERAÇÕES COM EXPORTAÇÃO CSV */}
      <OperationsTable operations={operacoes} />

      {/* CENTRAL DE AUDITORIA */}
      <AuditLogTable />
    </div>
  );
}
