import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckSquare } from "lucide-react";

export default function OnboardingPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fluxos de Onboarding</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o progresso e entrega de documentos admissionais, e-mails corporativos, acessos a sistemas e EPIs.
          </p>
        </div>

        {/* Onboarding list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <CheckSquare size={18} className="text-purple-755 font-bold" /> Checklists Admissionais
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-sm block">Mariana Souza (Guia Operacional)</strong>
                <span className="text-[10px] text-slate-505 block">Progresso: 85% | Início: 2026-07-20 | Prazo Final: 2026-07-30</span>
              </div>
              <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 uppercase">
                Em Andamento
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-sm block">Rodrigo Alves (Supervisor de Bilheterias)</strong>
                <span className="text-[10px] text-slate-505 block">Progresso: 100% | Início: 2026-07-15 | Concluído em: 2026-07-22</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Concluído
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
