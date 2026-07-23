import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernmentDashboard } from "../hooks/useGovernmentDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

export default function GovIndicatorsPage() {
  const { data, loading } = useGovernmentDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando indicadores...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Indicadores Municipais</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Índices oficiais de desempenho de Curitiba organizados por categoria estratégica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.indicators.map(ind => (
            <div key={ind.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono text-purple-700 bg-purple-50">
                  {ind.category}
                </span>
                {ind.trend === "up" ? (
                  <TrendingUp size={16} className="text-emerald-500" />
                ) : (
                  <RefreshCw size={14} className="text-slate-400" />
                )}
              </div>

              <div>
                <strong className="text-sm font-bold text-slate-900 block leading-tight">{ind.name}</strong>
                <span className="text-[10px] text-slate-400 block font-mono mt-1">Ref: {ind.id}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-baseline gap-1.5">
                <strong className="text-2xl font-bold text-slate-900 font-mono">{ind.value}</strong>
                <span className="text-[10px] text-slate-400">pontos</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
