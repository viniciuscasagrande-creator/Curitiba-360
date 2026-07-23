import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Map } from "lucide-react";

export default function DigitalTwinMapPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/digital-twin" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Mapa Geoespacial & Camadas GIS</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Navegue pelas camadas urbanas de Curitiba: ar, trânsito, áreas verdes, polígonos de zoneamento e heatmaps.
          </p>
        </div>

        {/* GIS Canvas Placeholder */}
        <section className="bg-slate-950 border border-slate-900 rounded-3xl p-6 h-96 flex flex-col justify-between items-center relative overflow-hidden text-slate-400">
          <div className="flex justify-between items-center w-full z-10 font-mono text-[9px] text-slate-500">
            <span>GIS Provider: Mapbox GL / ArcGIS Server</span>
            <span>Zoom: 14.5 | Coordenadas: -25.4284, -49.2736</span>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-transparent to-transparent opacity-60" />
          <div className="flex flex-col items-center justify-center gap-2">
            <Map size={48} className="text-purple-550 animate-pulse" />
            <strong className="text-white text-sm font-bold">Visualizador de Mapas Inteligentes</strong>
            <span className="text-[10px] text-slate-455 text-center">Controles de Camadas: [X] Vagas [X] Sensores [ ] Água [ ] Elétrica</span>
          </div>
          <span className="text-[9px] font-mono z-10 text-slate-500">Curitiba 360 GIS System v1.4</span>
        </section>
      </div>
    </AdminLayout>
  );
}
