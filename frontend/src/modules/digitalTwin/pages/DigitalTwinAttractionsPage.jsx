import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDigitalTwin } from "../hooks/useDigitalTwin";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

export default function DigitalTwinAttractionsPage() {
  const { entities, loading } = useDigitalTwin();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando atrações...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gêmeos Digitais de Atrações</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Modelos tridimensionais, taxa de ocupação, capacidade máxima disponível e telemetria ambiental das atrações integradas.
          </p>
        </div>

        {/* Attractions list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Compass size={18} className="text-purple-755 font-bold" /> Atrações Mapeadas (3D)
          </h3>

          <div className="divide-y divide-slate-100">
            {entities.map(e => (
              <div key={e.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{e.properties.name}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {e.id} | Tipo: {e.entityType} | Lotação Atual: {e.properties.loadPct}%</span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${e.status === "normal" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-750 border-red-100"}`}>
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
