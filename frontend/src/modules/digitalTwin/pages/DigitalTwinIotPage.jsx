import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDigitalTwin } from "../hooks/useDigitalTwin";
import { Link } from "react-router-dom";
import { ArrowLeft, Cpu } from "lucide-react";

export default function DigitalTwinIotPage() {
  const { iotDevices, loading } = useDigitalTwin();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dispositivos IoT...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fila de Dispositivos & Sensores IoT</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a integridade física de câmeras inteligentes de contagem de público, estações meteorológicas e decibelímetros de Curitiba.
          </p>
        </div>

        {/* IoT list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Cpu size={18} className="text-purple-755 font-bold" /> Rede IoT de Sensores Ativa
          </h3>

          <div className="divide-y divide-slate-100">
            {iotDevices.map(d => (
              <div key={d.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{d.id} ({d.type})</strong>
                  <span className="text-[10px] text-slate-505 block">Lat: {d.latitude} | Lon: {d.longitude} | Batimento: {d.lastHeartbeat}</span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${d.status === "online" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-700 border-slate-100"}`}>
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
