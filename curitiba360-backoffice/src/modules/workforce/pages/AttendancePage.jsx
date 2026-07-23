import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

export default function AttendancePage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fila de Batidas de Ponto</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Confira registros de entrada, saída e intervalos em tempo real integrados com geofencing.
          </p>
        </div>

        {/* Ponto list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Clock size={18} className="text-purple-755 font-bold" /> Batidas Recentes
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Carlos Roberto (Entrada)</strong>
                <span className="text-[10px] text-slate-505 block">Horário: 2026-07-23 08:02:15 | Método: Aplicativo Mobile | Local: Sede Centro</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Válido
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Amanda Silva (Entrada)</strong>
                <span className="text-[10px] text-slate-505 block">Horário: 2026-07-23 08:05:40 | Método: Portal Web | Local: Home Office</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Válido
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
