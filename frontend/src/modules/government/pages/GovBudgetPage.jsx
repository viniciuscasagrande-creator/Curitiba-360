import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernmentDashboard } from "../hooks/useGovernmentDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Landmark, DollarSign, PieChart } from "lucide-react";

export default function GovBudgetPage() {
  const { data, loading } = useGovernmentDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando orçamento...
        </div>
      </AdminLayout>
    );
  }

  const { planned, executed, committed, available } = data.budget;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Orçamento Público</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Detalhamento da LOA {data.budget.year} - Dotação, empenhos, liquidações e saldos disponíveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Planejado (LOA)</span>
            <strong className="text-xl font-bold text-slate-900 font-mono block">R$ {planned.toLocaleString("pt-BR")}</strong>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Liquidado / Executado</span>
            <strong className="text-xl font-bold text-slate-900 font-mono block">R$ {executed.toLocaleString("pt-BR")}</strong>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Empenhado / Reservado</span>
            <strong className="text-xl font-bold text-slate-900 font-mono block">R$ {committed.toLocaleString("pt-BR")}</strong>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Saldo Disponível</span>
            <strong className="text-xl font-bold text-purple-700 font-mono block">R$ {available.toLocaleString("pt-BR")}</strong>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 my-0">Instrumentos de Planejamento</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <strong className="text-xs font-bold text-slate-900 block">PPA (Plano Plurianual)</strong>
              <span className="text-[10px] text-slate-500 block mt-1">Diretrizes e metas para o período de 4 anos.</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <strong className="text-xs font-bold text-slate-900 block">LDO (Lei de Diretrizes Orçamentárias)</strong>
              <span className="text-[10px] text-slate-500 block mt-1">Conexão anual entre o PPA e a LOA.</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <strong className="text-xs font-bold text-slate-900 block">LOA (Lei Orçamentária Anual)</strong>
              <span className="text-[10px] text-slate-500 block mt-1">Fixa as despesas e estima as receitas municipais.</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
