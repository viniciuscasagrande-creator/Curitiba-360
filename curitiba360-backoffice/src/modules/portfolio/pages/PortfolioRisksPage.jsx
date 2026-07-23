import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnerDashboard } from "../hooks/usePartnerDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function PortfolioRisksPage() {
  const { data, loading } = usePartnerDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando riscos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/portfolio" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Riscos do Portfólio</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Identifique, mitigue e acompanhe a matriz de probabilidade e impacto de ameaças nos projetos estratégicos.
          </p>
        </div>

        {/* Risks list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <AlertTriangle size={18} className="text-purple-755 font-bold" /> Matriz de Riscos Ativos
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {data.risks.map(risk => (
              <div key={risk.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{risk.title}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {risk.id} | Responsável: {risk.owner} | Plano: {risk.mitigation}</span>
                  <span className="text-[10px] text-slate-505 block">Probabilidade: <span className="font-bold text-slate-700">{risk.probability}</span> | Impacto: <span className="font-bold text-slate-700">{risk.impact}</span></span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${risk.status === "active" ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"}`}>
                  {risk.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
