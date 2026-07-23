import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernanceDashboard } from "../hooks/useGovernanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, BarChart2 } from "lucide-react";

export default function CorpGovExecutiveCockpitPage() {
  const { data, loading } = useGovernanceDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando cockpit...
        </div>
      </AdminLayout>
    );
  }

  const { kpis } = data;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Cockpit Executivo da Liderança</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Performance integrada: finanças, governança, compliance e decisões pendentes em tempo real.
          </p>
        </div>

        {/* Dashboard grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 my-0">Saúde Financeira</h3>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Receita Realizada</span>
                <span className="font-bold text-slate-900">R$ {(kpis.revenueRealized / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Orçamento Consumido</span>
                <span className="font-bold text-slate-900">R$ {(kpis.consumedBudget / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Margem Operacional</span>
                <span className="font-bold text-slate-900">{kpis.operatingMargin}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 my-0">Decisões & Pautas</h3>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Resoluções Pendentes</span>
                <span className="font-bold text-slate-900">{kpis.pendingResolutions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Planos Atrasados</span>
                <span className="font-bold text-slate-900">{kpis.delayedActionPlans}</span>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="p-6 border border-purple-200 rounded-3xl bg-purple-50 space-y-3">
            <h3 className="text-sm font-bold text-purple-900 my-0 flex items-center gap-1">
              <Sparkles size={14} className="text-purple-700" /> Decision Intelligence
            </h3>
            <p className="text-[10px] text-purple-800 leading-relaxed my-0">
              "O desvio detectado no CAPEX do comitê de tecnologia sugere aceleração de auditorias no Q3."
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
