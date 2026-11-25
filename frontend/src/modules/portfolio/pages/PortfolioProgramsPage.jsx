import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnerDashboard } from "../hooks/usePartnerDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Layers } from "lucide-react";

export default function PortfolioProgramsPage() {
  const { data, loading } = usePartnerDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando programas...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Programas Estratégicos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o agrupamento de projetos vinculados a grandes macro-objetivos de governo.
          </p>
        </div>

        {/* Programs list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Layers size={18} className="text-purple-755 font-bold" /> Programas Ativos
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {data.programs.map(prog => (
              <div key={prog.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{prog.name}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {prog.id} | Orçamento Total: R$ {(prog.budget / 1000000).toFixed(1)}M | Projetos: {prog.projectsCount}</span>
                </div>
                <strong className="text-purple-700 font-mono text-xs">{prog.progress}% Progresso</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
