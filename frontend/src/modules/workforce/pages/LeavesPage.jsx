import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";

export default function LeavesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Férias, Licenças & Ausências</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe pedidos de férias anuais, atestados de saúde e licenças maternidade/paternidade.
          </p>
        </div>

        {/* Leaves list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Calendar size={18} className="text-purple-755 font-bold" /> Solicitações Pendentes
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Amanda Silva (Atestado Médico)</strong>
                <span className="text-[10px] text-slate-505 block">Período: 2026-07-20 a 2026-07-22 (3 dias) | CID: M54.5 | Anexo: atestado.pdf</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Aprovado
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
