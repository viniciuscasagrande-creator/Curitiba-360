import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function EmergencyPlansPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Planos de Contingência & Emergência</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Cadastre planos de ação para incêndios, alagamentos, tumultos de multidão ou desastres naturais.
          </p>
        </div>

        {/* Plans list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <BookOpen size={18} className="text-purple-755 font-bold" /> Protocolos Ativos
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Plano de Evacuação Rápida (Setor Norte)</strong>
                <span className="text-[10px] text-slate-505 block">Versão: 2.1 | Tipo: Evacuação de Multidão | Pontos de Encontro: P-01 e P-02</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Aprovado
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Contingência de Pane Elétrica Geral</strong>
                <span className="text-[10px] text-slate-505 block">Versão: 1.0 | Tipo: Falha de Energia | Ação: Ativação automática de Geradores</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Aprovado
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
