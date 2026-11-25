import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, FileSpreadsheet } from "lucide-react";

export default function TimesheetsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Espelhos de Ponto & Jornada</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o fechamento mensal da folha de horas e assine espelhos de ponto validados.
          </p>
        </div>

        {/* Timesheets list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <FileSpreadsheet size={18} className="text-purple-755 font-bold" /> Fechamento de Horas
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Carlos Roberto (Competência: Julho/2026)</strong>
                <span className="text-[10px] text-slate-505 block">Horas Normais: 140h | Horas Extras: +12h | Atrasos: 0h | Status: Pendente Assinatura</span>
              </div>
              <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-2 py-1 rounded border-none cursor-pointer text-[9px]">
                Assinar Espelho
              </button>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
