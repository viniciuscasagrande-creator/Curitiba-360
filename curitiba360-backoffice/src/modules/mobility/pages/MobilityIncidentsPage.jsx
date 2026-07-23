import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobilityDashboard } from "../hooks/useMobilityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function MobilityIncidentsPage() {
  const { incidents, loading } = useMobilityDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando incidentes de transporte...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/mobility" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Incidentes & Ocorrências</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe e mitigue sinistros, panes mecânicas ou congestionamentos de vias que afetem os itinerários planejados.
          </p>
        </div>

        {/* Incidents list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <ShieldAlert size={18} className="text-purple-755" /> Ocorrências Ativas
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {incidents.map(inc => (
              <div key={inc.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 font-sans">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs">{inc.title}</strong>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px] font-mono">
                      Categoria: {inc.category}
                    </span>
                  </div>
                  <span className="text-slate-500 font-sans block text-[10px]">{inc.description}</span>
                  <span className="text-[8px] text-slate-400 block font-mono">Registrado às: {inc.createdAt}</span>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-sans font-bold">
                  <span className={`text-[8px] px-2 py-0.5 rounded border uppercase ${inc.priority === "high" || inc.priority === "critical" ? "bg-red-50 text-red-700 border-red-100" : "bg-amber-50 text-amber-700 border-amber-100"}`}>
                    Severidade: {inc.priority}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase font-sans">
                    {inc.status}
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
