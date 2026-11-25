import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Layers } from "lucide-react";

export default function CorpGovBalancedScorecardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Balanced Scorecard (BSC)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Painel balanceado contendo os objetivos estratégicos organizados nas quatro dimensões fundamentais da estratégia.
          </p>
        </div>

        {/* BSC Dimension list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <Layers size={18} className="text-purple-755 font-bold" /> Dimensões Estratégicas
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 border border-slate-100 rounded-2xl space-y-2">
              <strong className="text-slate-900 block text-xs">1. Financeira (CAPEX/OPEX/EBITDA)</strong>
              <span className="text-[10px] text-slate-505 block">Foco: Rentabilidade do ecossistema, split tributário e eficiência em custos.</span>
            </div>

            <div className="p-4 border border-slate-100 rounded-2xl space-y-2">
              <strong className="text-slate-900 block text-xs">2. Clientes & Turismo (NPS/Visitantes)</strong>
              <span className="text-[10px] text-slate-505 block">Foco: Satisfação dos cidadãos e fidelização através do Clube de Vantagens.</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
