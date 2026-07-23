import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Smile } from "lucide-react";

export default function ClimatePage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Clima Organizacional & eNPS</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Confira pesquisas de satisfação interna e o índice de satisfação dos colaboradores (eNPS).
          </p>
        </div>

        {/* Climate stats */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Smile size={18} className="text-purple-755 font-bold" /> Satisfação Interna (eNPS)
          </h3>

          <div className="grid gap-6 md:grid-cols-3 font-sans">
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Índice eNPS</span>
              <strong className="text-2xl text-purple-900 block font-mono">72.5</strong>
              <span className="text-[9px] text-purple-700 font-bold">Zona de Excelência</span>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Promotores</span>
              <strong className="text-2xl text-emerald-900 block font-mono">81.4%</strong>
              <span className="text-[9px] text-emerald-700 font-bold">Respostas 9 e 10</span>
            </div>

            <div className="p-4 bg-red-50 rounded-2xl border border-red-100 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Detratores</span>
              <strong className="text-2xl text-red-900 block font-mono">8.9%</strong>
              <span className="text-[9px] text-red-700 font-bold">Respostas 0 a 6</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
