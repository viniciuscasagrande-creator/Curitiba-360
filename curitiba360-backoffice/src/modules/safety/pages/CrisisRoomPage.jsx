import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, PhoneCall } from "lucide-react";

export default function CrisisRoomPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to="/admin/safety" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Painel
          </Link>
          <Link to="/admin/safety/authorities" className="text-purple-755 font-bold">Autoridades Externas</Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Sala de Situação & Gestão de Crise</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            War Room digital para registro de decisões críticas com impacto operacional e acionamento de autoridades locais.
          </p>
        </div>

        {/* War room logs */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <PhoneCall size={18} className="text-purple-755 font-bold" /> Log de Decisões de Crise
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Acionamento da Defesa Civil Municipal</strong>
                <span className="text-[10px] text-slate-505 block">Decidido em: 2026-07-23 09:20:00 | Decisor: Comandante do Incidente (Carlos) | Contexto: Alerta de rajadas de ventos acima de 80km/h</span>
              </div>
              <span className="text-[9px] bg-red-50 text-red-750 font-bold px-2 py-0.5 rounded border border-red-100 uppercase">
                Executado
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
