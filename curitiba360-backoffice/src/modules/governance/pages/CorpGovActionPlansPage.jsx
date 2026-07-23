import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckSquare } from "lucide-react";

export default function CorpGovActionPlansPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Planos de Ação</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o progresso das ações corretivas, comitivas e preventivas acordadas em atas oficiais.
          </p>
        </div>

        {/* Action plans */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <CheckSquare size={18} className="text-purple-755 font-bold" /> Plano de Ação Estratégico
          </h3>

          <div className="space-y-3 font-sans text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Ação 1: Mapear vulnerabilidades de dados LGPD</strong>
                <span className="text-[10px] text-slate-505 block">Dono: Renata Abreu | Prazo: 30 dias</span>
              </div>
              <span className="text-[10px] text-amber-655 font-bold">Em progresso</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Ação 2: Revisar contratos de fornecedores de turismo</strong>
                <span className="text-[10px] text-slate-505 block">Dono: Luciano Ramos | Prazo: Atrasado</span>
              </div>
              <span className="text-[10px] text-rose-655 font-bold">Atrasado</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
