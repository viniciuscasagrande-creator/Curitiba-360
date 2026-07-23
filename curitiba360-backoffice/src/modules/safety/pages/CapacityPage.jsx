import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";

export default function CapacityPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Monitoramento de Lotação</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a ocupação em tempo real de cada setor de atração, entradas/saídas por minuto e alertas automáticos.
          </p>
        </div>

        {/* Capacity statistics */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Users size={18} className="text-purple-755 font-bold" /> Capacidade de Setores
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Setor Norte (Arena Principal)</strong>
                <span className="text-[10px] text-slate-505 block">Capacidade Autorizada: 15.000 paxs | Ocupação Atual: 13.800 paxs | Entradas: 120/min</span>
              </div>
              <strong className="text-red-750 font-mono text-xs">92% de Ocupação</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Setor Sul (Praça Gastronômica)</strong>
                <span className="text-[10px] text-slate-505 block">Capacidade Autorizada: 8.000 paxs | Ocupação Atual: 4.200 paxs | Entradas: 45/min</span>
              </div>
              <strong className="text-emerald-700 font-mono text-xs">52% de Ocupação</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
