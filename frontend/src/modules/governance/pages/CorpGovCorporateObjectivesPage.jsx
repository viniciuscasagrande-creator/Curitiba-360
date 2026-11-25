import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernanceDashboard } from "../hooks/useGovernanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Target } from "lucide-react";

export default function CorpGovCorporateObjectivesPage() {
  const { data, loading } = useGovernanceDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando objetivos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Objetivos Corporativos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o andamento dos objetivos prioritários da diretoria executiva para o ciclo atual.
          </p>
        </div>

        {/* Objectives list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Target size={18} className="text-purple-755 font-bold" /> Objetivos do Ciclo
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {data.objectives.map(obj => (
              <div key={obj.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{obj.title}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {obj.id} | Perspectiva: {obj.perspective}</span>
                </div>
                <div className="text-right">
                  <strong className="text-purple-700 font-mono text-xs block">{obj.progress}% Concluído</strong>
                  <span className="text-[9px] text-slate-400 capitalize">{obj.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
