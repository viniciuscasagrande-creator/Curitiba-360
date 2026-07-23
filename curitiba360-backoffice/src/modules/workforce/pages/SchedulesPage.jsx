import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";

export default function SchedulesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Painel
          </Link>
          <Link to="/admin/workforce/shifts" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            Visualizar Turnos Individuais
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Painel de Planejamento de Escalas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monte cronogramas, valide disponibilidade de colaboradores e publique escalas operacionais.
          </p>
        </div>

        {/* Calendar overview */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <Calendar size={18} className="text-purple-755 font-bold" /> Escalas Semanais Recentes
          </h3>

          <div className="grid gap-4 grid-cols-7 font-mono text-[9px] text-center">
            <div className="p-2 border border-slate-100 rounded bg-slate-50">
              <span className="font-bold block uppercase text-slate-400">Seg</span>
              <span className="font-bold text-slate-800 text-[10px]">20/07</span>
              <span className="text-emerald-700 block mt-1">94%</span>
            </div>
            <div className="p-2 border border-slate-100 rounded bg-slate-50">
              <span className="font-bold block uppercase text-slate-400">Ter</span>
              <span className="font-bold text-slate-800 text-[10px]">21/07</span>
              <span className="text-emerald-700 block mt-1">94%</span>
            </div>
            <div className="p-2 border border-slate-100 rounded bg-slate-50">
              <span className="font-bold block uppercase text-slate-400">Qua</span>
              <span className="font-bold text-slate-800 text-[10px]">22/07</span>
              <span className="text-emerald-700 block mt-1">98%</span>
            </div>
            <div className="p-2 border border-slate-100 rounded bg-slate-50">
              <span className="font-bold block uppercase text-slate-400">Qui</span>
              <span className="font-bold text-slate-800 text-[10px]">23/07</span>
              <span className="text-emerald-700 block mt-1">96%</span>
            </div>
            <div className="p-2 border border-slate-100 rounded bg-slate-50">
              <span className="font-bold block uppercase text-slate-400">Sex</span>
              <span className="font-bold text-slate-800 text-[10px]">24/07</span>
              <span className="text-emerald-700 block mt-1">98%</span>
            </div>
            <div className="p-2 border border-slate-200 rounded bg-purple-50 border-purple-200">
              <span className="font-bold block uppercase text-purple-700">Sáb</span>
              <span className="font-bold text-purple-900 text-[10px]">25/07</span>
              <span className="text-red-750 font-bold block mt-1">92%</span>
            </div>
            <div className="p-2 border border-slate-200 rounded bg-purple-50 border-purple-200">
              <span className="font-bold block uppercase text-purple-700">Dom</span>
              <span className="font-bold text-purple-900 text-[10px]">26/07</span>
              <span className="text-red-750 font-bold block mt-1">90%</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
