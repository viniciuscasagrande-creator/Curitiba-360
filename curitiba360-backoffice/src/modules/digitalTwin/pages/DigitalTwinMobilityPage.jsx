import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDigitalTwin } from "../hooks/useDigitalTwin";
import { Link } from "react-router-dom";
import { ArrowLeft, Route } from "lucide-react";

export default function DigitalTwinMobilityPage() {
  const { summary, loading } = useDigitalTwin();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando mobilidade inteligente...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to="/admin/digital-twin" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Painel
          </Link>
          <Link to="/admin/digital-twin/parking" className="text-purple-755 font-bold">Smart Parking</Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Mobilidade Urbana Inteligente</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Telemetria de trânsito em tempo real, monitoramento de frotas de ônibus biarticulados elétricos, vans de transfer e fluxo de pedestres.
          </p>
        </div>

        {/* Mobility stats */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Route size={18} className="text-purple-755 font-bold" /> Indicadores de Fluxo de Tráfego
          </h3>

          <div className="divide-y divide-slate-100 font-sans">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Tempo Médio de Deslocamento Urbano</strong>
                <span className="text-[10px] text-slate-505 block">Tempo de viagem estimado para rotas centrais críticas.</span>
              </div>
              <strong className="text-purple-700 text-sm font-mono">{summary.avgTransitTimeMinutes} Minutos</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Volume de Trânsito Geral</strong>
                <span className="text-[10px] text-slate-505 block">Índice de saturação de vias públicas centrais monitoradas.</span>
              </div>
              <strong className="text-emerald-700 text-sm font-mono">Fluido e Sem Alertas</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
