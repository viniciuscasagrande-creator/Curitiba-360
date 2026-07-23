import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";

export default function WorkforceSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Configurações de Workforce</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Configure limites de horas extras, tolerâncias de ponto e critérios de dimensionamento automatizado por IA.
          </p>
        </div>

        {/* Settings options */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Settings size={18} className="text-purple-755 font-bold" /> Parâmetros de Jornada
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Tolerância de Ponto Geral</strong>
                <span className="text-[10px] text-slate-505 block">Tolerância para atrasos ou entradas antecipadas sem gerar horas extras/débitos.</span>
              </div>
              <strong className="text-slate-800 text-[10px]">10 minutos</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Limite Diário de Horas Extras</strong>
                <span className="text-[10px] text-slate-505 block">Quantidade máxima de horas adicionais autorizadas por dia de trabalho.</span>
              </div>
              <strong className="text-slate-805 text-[10px]">2 horas / dia</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
