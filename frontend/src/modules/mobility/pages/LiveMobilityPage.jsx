import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobilityDashboard } from "../hooks/useMobilityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Navigation, Activity } from "lucide-react";

export default function LiveMobilityPage() {
  const { trips, loading } = useMobilityDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando telemetria ao vivo...
        </div>
      </AdminLayout>
    );
  }

  const activeTrips = trips.filter(t => t.status === "in_progress" || t.status === "boarding");

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/mobility" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Telemetria & Mapa ao Vivo</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o posicionamento georreferenciado e o tempo estimado de chegada (ETA) dos veículos ativos.
          </p>
        </div>

        {/* Telemetry panel */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Navigation size={18} className="text-purple-750 animate-pulse" /> Veículos em Rastreamento
          </h3>

          <div className="divide-y divide-slate-100">
            {activeTrips.map(tr => (
              <div key={tr.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs font-sans">{tr.routeName}</strong>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                      {tr.vehicle}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-455 text-[9px] font-sans">
                    <span>Motorista: {tr.driver}</span>
                    <span>•</span>
                    <span>Saída: {tr.scheduledDepartureAt}</span>
                    <span>•</span>
                    <span>Ocupação: {tr.passengers} pax</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${tr.delayMinutes > 0 ? "bg-amber-50 text-amber-700 border-amber-100 animate-pulse" : "bg-emerald-50 text-emerald-700 border-emerald-100"}`}>
                    {tr.delayMinutes > 0 ? `Atraso: ${tr.delayMinutes} min` : "No horário"}
                  </span>
                  <span className="text-[10px] text-purple-700 font-bold uppercase font-sans">
                    {tr.status}
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
