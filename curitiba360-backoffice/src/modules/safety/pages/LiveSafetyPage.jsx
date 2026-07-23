import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, ShieldAlert } from "lucide-react";

export default function LiveSafetyPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to="/admin/safety" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Painel
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/admin/safety/cameras" className="text-purple-750 font-bold">Câmeras</Link>
            <Link to="/admin/safety/sensors" className="text-purple-755 font-bold">Sensores IoT</Link>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Operação ao Vivo (CFTV & IoT)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe em tempo real os feeds de vídeo de segurança urbana e alertas automáticos de sensores de movimento.
          </p>
        </div>

        {/* Cameras Grid */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 aspect-video flex flex-col justify-between text-slate-400 relative overflow-hidden">
            <div className="flex justify-between items-center z-10">
              <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[9px] uppercase animate-pulse">AO VIVO</span>
              <span className="font-mono text-[9px]">CAM-01: Pórtico de Entrada</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            <div className="flex items-center justify-center h-full">
              <Camera size={48} className="text-slate-700" />
            </div>
            <span className="text-[9px] font-mono z-10 text-slate-500">Localização: Entrada Norte | Status: Online</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 aspect-video flex flex-col justify-between text-slate-400 relative overflow-hidden">
            <div className="flex justify-between items-center z-10">
              <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[9px] uppercase animate-pulse">AO VIVO</span>
              <span className="font-mono text-[9px]">CAM-02: Praça de Eventos</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            <div className="flex items-center justify-center h-full">
              <Camera size={48} className="text-slate-700" />
            </div>
            <span className="text-[9px] font-mono z-10 text-slate-500">Localização: Praça Central | Status: Online</span>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
