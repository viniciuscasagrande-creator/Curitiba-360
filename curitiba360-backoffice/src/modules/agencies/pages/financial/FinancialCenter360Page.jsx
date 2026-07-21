import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FinancialCenterSummary from '../../components/financial/FinancialCenterSummary';
import FinancialForecastChart from '../../components/financial/FinancialForecastChart';
import AuditLogTable from '../../components/financial/AuditLogTable';
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
  LayoutDashboard,
  Send,
  Building2
} from 'lucide-react';

export default function FinancialCenter360Page() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('visao_geral'); // visao_geral, carteira, conciliacao, reembolsos, auditoria

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800">
      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px]">
              MOD-05 • ETAPA 08 (CONCLUSÃO)
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-600" /> Powered by AI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Centro Financeiro 360 Curitiba 🚀
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Painel executivo unificado reunindo carteiras, repasses PIX, conciliação, fechamentos, reembolsos com IA e trilha de auditoria.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to="/agencias/AG-1001/financeiro"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Repasse Instantâneo PIX
          </Link>
          <Link
            to="/agencias/AG-1001/financeiro/conciliacao"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> Conciliação de Vendas
          </Link>
        </div>
      </div>

      {/* DASHBOARD KPIS CONSOLIDADOS */}
      <FinancialCenterSummary />

      {/* PROJEÇÃO FLUXO DE CAIXA IA */}
      <FinancialForecastChart />

      {/* NAVEGAÇÃO POR ABAS INTERATIVAS */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-1.5 flex items-center gap-1 overflow-x-auto text-xs shadow-2xs">
        <button
          onClick={() => setActiveTab('visao_geral')}
          className={`px-4 py-2.5 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'visao_geral'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> Visão Geral Executiva 360
        </button>

        <button
          onClick={() => navigate('/agencias/AG-1001/financeiro')}
          className="px-4 py-2.5 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <Wallet className="w-4 h-4 text-emerald-600" /> Carteiras & Repasses PIX
        </button>

        <button
          onClick={() => navigate('/agencias/AG-1001/financeiro/conciliacao')}
          className="px-4 py-2.5 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <FileText className="w-4 h-4 text-blue-600" /> Conciliação & Fechamentos
        </button>

        <button
          onClick={() => navigate('/financeiro/reembolsos')}
          className="px-4 py-2.5 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <RefreshCw className="w-4 h-4 text-purple-600" /> Cancelamentos & Fila IA
        </button>

        <button
          onClick={() => setActiveTab('auditoria')}
          className={`px-4 py-2.5 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'auditoria'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-purple-600" /> Central de Auditoria
        </button>
      </div>

      {/* CONTEÚDO DA ABA SELECIONADA */}
      {activeTab === 'visao_geral' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* Card 1: Resumo dos Fechamentos Mensais */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-slate-900 border-b pb-2 border-slate-100 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" /> Status dos Fechamentos Contábeis
              </span>
              <Link to="/agencias/AG-1001/financeiro/conciliacao" className="text-blue-600 text-[11px]">
                Gerenciar Fechamentos
              </Link>
            </h3>

            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Julho / 2026 (Atual)</span>
                  <span className="text-[10px] text-amber-700 font-semibold">Status: Aberto 🟢 (3 divergências ativas)</span>
                </div>
                <span className="font-extrabold text-slate-900 text-sm">R$ 98.400,00</span>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-950 block">Junho / 2026</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Status: Fechado 🔒 (Auditado em 01/07)</span>
                </div>
                <span className="font-extrabold text-emerald-900 text-sm">R$ 145.000,00</span>
              </div>
            </div>
          </div>

          {/* Card 2: Fila de Reembolsos Inteligente */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-slate-900 border-b pb-2 border-slate-100 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" /> Fila de Reembolsos Pendente (Motor IA)
              </span>
              <Link to="/financeiro/fila-financeira" className="text-purple-600 text-[11px]">
                Ver Fila IA
              </Link>
            </h3>

            <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200/60 space-y-2">
              <div className="flex items-center justify-between font-bold text-purple-950">
                <span>REF-7001 — Passeio de Trem Morretes</span>
                <span>R$ 450,00</span>
              </div>
              <p className="text-[10px] text-purple-800">
                Cliente: Carlos Alberto Spínola | CDC 7 dias | Score Risco IA: <b className="text-emerald-700">12/100 (Baixo)</b>
              </p>
              <div className="pt-1 flex items-center justify-end">
                <Link
                  to="/financeiro/reembolsos/REF-7001"
                  className="px-3 py-1 bg-purple-600 text-white font-bold rounded-lg text-[10px]"
                >
                  Analisar Reembolso
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'auditoria' && <AuditLogTable />}
    </div>
  );
}
