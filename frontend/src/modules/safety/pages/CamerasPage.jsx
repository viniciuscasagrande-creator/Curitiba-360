import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";

export default function CamerasPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety/live" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar à Operação ao Vivo
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fila de Dispositivos CFTV</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a integridade e heartbeat das câmeras de vídeo instaladas nos principais pontos turísticos.
          </p>
        </div>

        {/* Cameras list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Camera size={18} className="text-purple-755 font-bold" /> Status de Transmissões
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">CAM-01: Pórtico de Entrada</strong>
                <span className="text-[10px] text-slate-505 block">ID: dev-cam-001 | Heartbeat: 2026-07-23 09:25:00 | Vídeo: H.264 Stream</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Online
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">CAM-02: Praça de Eventos</strong>
                <span className="text-[10px] text-slate-505 block">ID: dev-cam-002 | Heartbeat: 2026-07-23 09:24:45 | Vídeo: H.264 Stream</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Online
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
