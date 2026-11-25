import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOperationsDashboard } from "../hooks/useOperationsDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Filter } from "lucide-react";

export default function OperationalMapPage() {
  const { locations, loading } = useOperationsDashboard();
  const [filterType, setFilterType] = useState("all");

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando mapa operacional...
        </div>
      </AdminLayout>
    );
  }

  const filtered = locations.filter(loc => filterType === "all" || loc.type === filterType);

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/operations" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Centro
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Mapa Operacional</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a geolocalização de bilheterias, portões de check-in e estacionamentos VIP integrados ao mapa da cidade.
          </p>
        </div>

        {/* Filters bar */}
        <section className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <Filter size={14} className="text-slate-400" />
          <span className="font-bold text-slate-700">Filtrar por:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`h-7 px-3 font-bold rounded-xl cursor-pointer transition border ${filterType === "all" ? "bg-purple-700 text-white border-purple-700" : "bg-slate-50 text-slate-700 border-slate-200"}`}
            >
              Todos
            </button>
            <option value="gate" onClick={() => setFilterType("gate")} className={`h-7 px-3 font-bold rounded-xl cursor-pointer transition border flex items-center ${filterType === "gate" ? "bg-purple-700 text-white border-purple-700" : "bg-slate-50 text-slate-700 border-slate-200"}`}>
              Portões
            </option>
            <option value="parking" onClick={() => setFilterType("parking")} className={`h-7 px-3 font-bold rounded-xl cursor-pointer transition border flex items-center ${filterType === "parking" ? "bg-purple-700 text-white border-purple-700" : "bg-slate-50 text-slate-700 border-slate-200"}`}>
              Estacionamentos
            </option>
          </div>
        </section>

        {/* Locations List / Map Simulator */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 p-1 border border-slate-200 rounded-3xl bg-slate-100 shadow-sm relative h-96 overflow-hidden flex items-center justify-center text-slate-400 font-bold select-none">
            {/* Visual simulation of a Curitiba map grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
            
            {filtered.map(loc => (
              <div
                key={loc.id}
                className="absolute flex items-center gap-1.5 p-2 bg-white rounded-xl shadow-lg border border-slate-200 text-[10px] text-slate-800 font-bold"
                style={{
                  top: loc.latitude === -25.4297 ? "30%" : "60%",
                  left: loc.longitude === -49.2719 ? "40%" : "70%"
                }}
              >
                <MapPin size={12} className="text-purple-755" />
                <span>{loc.name} ({loc.currentOccupancy}/{loc.maximumCapacity})</span>
              </div>
            ))}
            
            <span className="relative z-10 font-sans tracking-wide text-xs bg-slate-200 text-slate-600 px-3 py-1.5 rounded-2xl">
              Simulação de Mapa de Localização (Curitiba, PR)
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Portais & Dispositivos</h3>
            <div className="divide-y divide-slate-100">
              {filtered.map(loc => (
                <div key={loc.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 block">{loc.name}</strong>
                    <span className="text-[10px] text-slate-405">Capacidade: {loc.maximumCapacity} pessoas</span>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${loc.status === "open" ? "bg-emerald-50 text-emerald-700 border-emerald-150" : "bg-amber-50 text-amber-700 border-amber-150"}`}>
                    {loc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
