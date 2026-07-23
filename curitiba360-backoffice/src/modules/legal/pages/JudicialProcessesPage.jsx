import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useLegalDashboard } from "../hooks/useLegalDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale, DollarSign } from "lucide-react";

export default function JudicialProcessesPage() {
  const { processes, loading } = useLegalDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando processos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/legal" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Processos Judiciais</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a tramitação cível ou trabalhista e o provisionamento de recursos de contingência de processos ativos do Curitiba 360.
          </p>
        </div>

        {/* Processes list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1">
            <Scale size={18} className="text-purple-750" /> Ações em Andamento
          </h3>

          <div className="divide-y divide-slate-100">
            {processes.map(prc => (
              <div key={prc.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs font-sans">Nº Processo: {prc.number}</strong>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                      {prc.type}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-455">
                    <span>Tribunal: {prc.court}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><DollarSign size={10} /> Provisionado: R$ {prc.cost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[9px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 font-bold uppercase">
                    {prc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
