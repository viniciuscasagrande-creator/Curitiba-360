import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Box, HelpCircle } from "lucide-react";

export default function DigitalTwin3dPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/smartcity" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gêmeo Digital 3D (Digital Twin)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Renderização interativa 3D de modelos da cidade, integrando dados IoT urbanos em tempo real e simulações.
          </p>
        </div>

        {/* 3D Canvas Placeholder */}
        <section className="bg-slate-950 border border-slate-900 rounded-3xl p-6 h-96 flex flex-col justify-between items-center relative overflow-hidden text-slate-400">
          <div className="flex justify-between items-center w-full z-10 font-mono text-[9px] text-slate-500">
            <span>Render Engine: Three.js WebGL</span>
            <span>FPS: 60.0 | Polígonos: 140k</span>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-transparent to-transparent opacity-60" />
          <div className="flex flex-col items-center justify-center gap-2">
            <Box size={48} className="text-purple-550 animate-bounce" />
            <strong className="text-white text-sm font-bold">Mapa 3D Interativo</strong>
            <span className="text-[10px] text-slate-455 text-center">Arraste para rotacionar | Use scroll para zoom | Clique nas atrações para ver dados IoT</span>
          </div>
          <span className="text-[9px] font-mono z-10 text-slate-500">Curitiba 360 Digital Twin v2.0</span>
        </section>
      </div>
    </AdminLayout>
  );
}
