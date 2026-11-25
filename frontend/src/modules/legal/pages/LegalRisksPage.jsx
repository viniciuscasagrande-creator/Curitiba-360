import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useLegalDashboard } from "../hooks/useLegalDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function LegalRisksPage() {
  const { risks, loading } = useLegalDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando matriz de riscos...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Matriz de Riscos Jurídicos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore riscos regulatórios e contratuais mapeados no ecossistema e acompanhe os respectivos planos de mitigação e contramedidas.
          </p>
        </div>

        {/* Risks table */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1">
            <ShieldAlert size={18} className="text-purple-750" /> Riscos Identificados
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {risks.map(rsk => (
              <div key={rsk.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs font-sans">{rsk.title}</strong>
                    <span className="bg-slate-100 text-slate-650 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                      {rsk.category}
                    </span>
                  </div>
                  <span className="text-slate-400 font-sans block text-[10px]">Mitigação ativa e monitoramento do compliance.</span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${rsk.severity === "high" ? "bg-red-50 text-red-750 border-red-150" : "bg-amber-50 text-amber-750 border-amber-150"}`}>
                    Severidade: {rsk.severity}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase font-sans">
                    {rsk.status}
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
