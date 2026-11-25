import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Gift } from "lucide-react";

export default function BenefitsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Benefícios</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Cadastre, edite e acompanhe os benefícios vinculados a colaboradores CLT e temporários da empresa.
          </p>
        </div>

        {/* Benefits list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Gift size={18} className="text-purple-755 font-bold" /> Planos de Benefícios Ativos
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Vale-Refeição + Alimentação (VR/VA)</strong>
                <span className="text-[10px] text-slate-505 block">Operadora: Ticket | Custo Mensal: R$ 850,00 por colaborador | Elegibilidade: CLT</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Ativo
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Plano de Saúde Executivo Unimed</strong>
                <span className="text-[10px] text-slate-505 block">Operadora: Unimed | Coparticipação: 20% | Elegibilidade: Todos CLT</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Ativo
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
