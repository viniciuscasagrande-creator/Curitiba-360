import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useExperienceDashboard } from "../hooks/useExperienceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";

export default function SurveysPage() {
  const { summary, loading } = useExperienceDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando pesquisas de satisfação...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Pesquisas & NPS</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o Net Promoter Score (NPS) e o CSAT médio coletado nas pesquisas pós-evento e atendimentos.
          </p>
        </div>

        {/* Survey score metrics */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Heart size={18} className="text-purple-755" /> Desempenho de Satisfação
          </h3>

          <div className="grid gap-6 md:grid-cols-3 font-mono text-[10px]">
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <span className="text-slate-400 font-bold uppercase font-sans">NPS Geral (0-100)</span>
              <span className="text-2xl font-bold block text-slate-900">{summary.nps}</span>
              <span className="text-[9px] text-emerald-650 font-bold font-sans">Zona de Excelência</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <span className="text-slate-400 font-bold uppercase font-sans">CSAT Médio</span>
              <span className="text-2xl font-bold block text-slate-900">{summary.csat}%</span>
              <span className="text-[9px] text-slate-505 font-sans">Pesquisas transacionais respondidas</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <span className="text-slate-400 font-bold uppercase font-sans">Tempo de Resolução</span>
              <span className="text-2xl font-bold block text-slate-900">{summary.resolutionRate}%</span>
              <span className="text-[9px] text-slate-505 font-sans">Resolvido no primeiro contato</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
