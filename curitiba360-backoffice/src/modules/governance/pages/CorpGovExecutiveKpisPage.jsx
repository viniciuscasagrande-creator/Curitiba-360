import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernanceDashboard } from "../hooks/useGovernanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";

export default function CorpGovExecutiveKpisPage() {
  const { data, loading } = useGovernanceDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando KPIs...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">KPIs Executivos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Principais indicadores de performance executiva sob supervisão contínua do conselho administrativo.
          </p>
        </div>

        {/* KPIs display */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <TrendingUp size={18} className="text-purple-755 font-bold" /> Indicadores Ativos
          </h3>

          <div className="grid gap-6 md:grid-cols-3 font-sans text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-505 uppercase block">KPIs dentro da meta</span>
              <strong className="text-slate-900 text-lg block font-mono">{kpis.kpisOnTarget}</strong>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-505 uppercase block">KPIs em nível crítico</span>
              <strong className="text-rose-700 text-lg block font-mono">{kpis.kpisCritical}</strong>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-505 uppercase block">Índice de Governança Integrado</span>
              <strong className="text-purple-700 text-lg block font-mono">{kpis.governanceIndex}%</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
