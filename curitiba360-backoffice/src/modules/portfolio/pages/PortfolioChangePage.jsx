import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function PortfolioChangePage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/portfolio" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Mudanças do Portfólio (RFC)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe as solicitações de alteração de escopo, prazo ou orçamento (Request for Change) submetidas pelos gerentes.
          </p>
        </div>

        {/* Change requests list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <RefreshCw size={18} className="text-purple-755 font-bold" /> Solicitações Pendentes
          </h3>

          <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-sans font-sans">
            <div>
              <strong className="text-slate-900 text-xs block">Extensão de prazo: E-Bus Linha Turismo (30 dias)</strong>
              <span className="text-[10px] text-slate-505 block">Motivo: Atraso na entrega das baterias | Solicitante: Carlos Silva</span>
            </div>
            <strong className="text-amber-700 text-xs uppercase">Em Análise</strong>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
