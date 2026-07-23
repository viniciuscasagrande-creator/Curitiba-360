import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSmartCityDashboard } from "../hooks/useSmartCityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Route } from "lucide-react";

export default function UrbanMobilityPage() {
  const { traffic, loading } = useSmartCityDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dados de trânsito e mobilidade...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to="/admin/smartcity" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Painel
          </Link>
          <Link to="/admin/smartcity/parking" className="text-purple-755 font-bold">Estacionamento Rotativo (EstaR)</Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Mobilidade Urbana & Trânsito</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a velocidade média em avenidas críticas de Curitiba, a fluidez do tráfego e alertas de congestionamento.
          </p>
        </div>

        {/* Traffic list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Route size={18} className="text-purple-755 font-bold" /> Fluidez de Vias Críticas
          </h3>

          <div className="divide-y divide-slate-100">
            {traffic.map(t => (
              <div key={t.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{t.name}</strong>
                  <span className="text-[10px] text-slate-505 block">Velocidade Aferida: {t.speed} km/h | Status da Via: {t.status}</span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${t.status === "normal" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : t.status === "pedestrian" ? "bg-blue-50 text-blue-700 border-blue-105" : "bg-red-50 text-red-750 border-red-100"}`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
