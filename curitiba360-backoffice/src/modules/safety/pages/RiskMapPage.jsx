import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Map } from "lucide-react";

export default function RiskMapPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to="/admin/safety" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Painel
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/admin/safety/risks" className="text-purple-750 font-bold">Matriz de Riscos</Link>
            <Link to="/admin/safety/muster-points" className="text-purple-755 font-bold">Pontos de Encontro</Link>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Mapa Operacional de Segurança</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o posicionamento de brigadas, saídas de emergência, postos médicos e extintores ativos.
          </p>
        </div>

        {/* Map Placeholder */}
        <section className="bg-slate-100 border border-slate-200 rounded-3xl p-6 h-96 flex flex-col justify-between items-center relative overflow-hidden">
          <div className="flex justify-between items-center w-full z-10 font-mono text-[9px] text-slate-500">
            <span>Área: Parque Barigui / Arena Eventos</span>
            <span>Escala: 1:500</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-200 via-transparent to-transparent opacity-40" />
          <div className="flex flex-col items-center justify-center gap-2">
            <Map size={48} className="text-slate-400" />
            <strong className="text-slate-800 text-sm font-bold">Layout Operacional 2D / 3D</strong>
            <span className="text-[10px] text-slate-455">Pontos mapeados: 12 Extintores | 6 Saídas | 2 Ambulâncias</span>
          </div>
          <span className="text-[9px] font-mono z-10 text-slate-500">Curitiba 365 Digital Twin Integrated</span>
        </section>
      </div>
    </AdminLayout>
  );
}
