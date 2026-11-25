import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";

export default function PortfolioSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/portfolio" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Configurações do PMO</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Ajuste os parâmetros globais da metodologia de priorização (pesos RICE, ICE, limites de orçamento e workflows).
          </p>
        </div>

        {/* Configurations form */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Settings size={18} className="text-purple-755 font-bold" /> Parâmetros de Priorização
          </h3>

          <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-sans font-sans">
            <div>
              <strong className="text-slate-900 text-xs block">Algoritmo de Priorização RICE Ativo</strong>
              <span className="text-[10px] text-slate-505 block">Pesos configurados: Reach (30%), Impact (30%), Confidence (20%), Effort (20%).</span>
            </div>
            <strong className="text-purple-700 text-xs font-mono">Padrão PMO</strong>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
