import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDigitalTwin } from "../hooks/useDigitalTwin";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";

export default function DigitalTwinEventsPage() {
  const { summary, loading } = useDigitalTwin();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando eventos em tempo real...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/digital-twin" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Monitoramento de Eventos em Tempo Real</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o público estimado, mapas de calor e fluidez de trânsito ao redor de grandes shows e eventos ativos.
          </p>
        </div>

        {/* Events stats */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Calendar size={18} className="text-purple-755 font-bold" /> Eventos Públicos Ativos
          </h3>

          <div className="p-4 bg-purple-50 rounded-2xl flex justify-between items-center text-sans font-sans border border-purple-100">
            <div>
              <strong className="text-slate-900 text-xs block">Eventos Monitorados Hoje</strong>
              <span className="text-[10px] text-slate-505 block">Grandes aglomerações e festivais em andamento na cidade.</span>
            </div>
            <strong className="text-purple-700 text-sm font-mono">{summary.activeEvents} Ativos</strong>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
