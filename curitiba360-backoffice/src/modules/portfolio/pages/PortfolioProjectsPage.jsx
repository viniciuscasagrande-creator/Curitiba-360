import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnerDashboard } from "../hooks/usePartnerDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, ListTodo } from "lucide-react";

export default function PortfolioProjectsPage() {
  const { data, updateProject, loading } = usePartnerDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando projetos...
        </div>
      </AdminLayout>
    );
  }

  const handleProgressChange = (projectId, progress) => {
    updateProject(projectId, progress);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/portfolio" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Portfólio de Projetos Estratégicos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore o escopo, cronograma, progresso e status dos projetos urbanos.
          </p>
        </div>

        {/* Projects list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <ListTodo size={18} className="text-purple-755 font-bold" /> Projetos em Andamento
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {data.projects.map(proj => (
              <div key={proj.id} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-2 text-sans font-sans">
                <div className="flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-xs block">{proj.name}</strong>
                    <span className="text-[10px] text-slate-505 block">ID: {proj.id} | Orçamento: R$ {(proj.budget / 1000).toFixed(0)}k | Risco: {proj.risk}</span>
                  </div>
                  <span className="text-[9px] bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded border border-purple-100 uppercase">
                    {proj.status}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-700 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700">{proj.progress}%</span>
                  <div className="flex gap-1">
                    <button onClick={() => handleProgressChange(proj.id, Math.min(proj.progress + 10, 100))} className="h-6 px-2 font-bold text-[9px] text-slate-700 border border-slate-200 rounded hover:bg-slate-50 transition cursor-pointer">
                      +10%
                    </button>
                    <button onClick={() => handleProgressChange(proj.id, Math.max(proj.progress - 10, 0))} className="h-6 px-2 font-bold text-[9px] text-slate-700 border border-slate-200 rounded hover:bg-slate-50 transition cursor-pointer">
                      -10%
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
