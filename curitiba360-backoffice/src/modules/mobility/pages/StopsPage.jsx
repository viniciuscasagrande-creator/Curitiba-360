import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobilityDashboard } from "../hooks/useMobilityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

export default function StopsPage() {
  const { stops, loading } = useMobilityDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando pontos de embarque...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Pontos de Embarque & Paradas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie pontos de parada física de passageiros para transfers turísticos e shuttles integrados.
          </p>
        </div>

        {/* Stops list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <MapPin size={18} className="text-purple-755" /> Terminais e Paradas
          </h3>

          <div className="divide-y divide-slate-100">
            {stops.map(stp => (
              <div key={stp.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sans">
                <div className="space-y-1 font-sans">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs">{stp.name}</strong>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px] font-mono">
                      {stp.type}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-455 text-[9px] font-mono">
                    <span>Endereço: {stp.address}</span>
                    <span>•</span>
                    <span>Lat/Lng: {stp.latitude}, {stp.longitude}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${stp.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"}`}>
                    {stp.status}
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
