import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobilityDashboard } from "../hooks/useMobilityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Bus } from "lucide-react";

export default function FleetPage() {
  const { fleet, loading } = useMobilityDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando frota...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Controle de Frota (Veículos)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o estado de conservação, placa municipal, odômetro acumulado e capacidades dos micro-ônibus e vans da prefeitura.
          </p>
        </div>

        {/* Fleet list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Bus size={18} className="text-purple-755" /> Inventário de Veículos
          </h3>

          <div className="divide-y divide-slate-100">
            {fleet.map(veh => (
              <div key={veh.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 font-sans">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs">{veh.manufacturer} {veh.model} ({veh.year})</strong>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px] font-mono">
                      PLACA: {veh.plate}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-455 text-[9px] font-mono">
                    <span>Código: {veh.fleetCode}</span>
                    <span>•</span>
                    <span>Capacidade: {veh.passengerCapacity} assentos</span>
                    <span>•</span>
                    <span>Odômetro: {veh.currentOdometerKm.toLocaleString()} km</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 font-sans">
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${veh.status === "in_operation" ? "bg-purple-50 text-purple-700 border-purple-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"}`}>
                    {veh.status}
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
