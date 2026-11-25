import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";

export default function CorpGovLgpdGovernancePage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Governança LGPD & Privacidade</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Inventário de dados e controle de consentimentos de munícipes e turistas.
          </p>
        </div>

        {/* LGPD logs */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Lock size={18} className="text-purple-755 font-bold" /> Inventário de Tratamento de Dados
          </h3>

          <div className="space-y-3 font-sans text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Tratamento 1: Cadastro no Clube Curitiba 360</strong>
                <span className="text-[10px] text-slate-505 block">Base Legal: Consentimento do titular | Retenção: 5 anos</span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded border uppercase bg-emerald-50 text-emerald-700 border-emerald-100">
                Ativo
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Tratamento 2: Telemetria e Monitoramento de Fluxo Turístico</strong>
                <span className="text-[10px] text-slate-505 block">Base Legal: Legítimo Interesse | Retenção: Anônimo</span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded border uppercase bg-emerald-50 text-emerald-700 border-emerald-100">
                Ativo
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
