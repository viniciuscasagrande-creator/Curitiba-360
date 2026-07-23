import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, FileSpreadsheet } from "lucide-react";

export default function PortfolioReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/portfolio" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Relatórios & Auditorias do PMO</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acesse relatórios gerenciais consolidados do portfólio de inovação e logs de auditoria imutáveis.
          </p>
        </div>

        {/* Reports overview */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <FileSpreadsheet size={18} className="text-purple-755 font-bold" /> Relatórios Disponíveis
          </h3>

          <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-sans font-sans">
            <div>
              <strong className="text-slate-900 text-xs block">Relatório de Saúde Financeira - Q3 2026</strong>
              <span className="text-[10px] text-slate-505 block">Inclui CAPEX, OPEX e desvios de orçamento por programa estratégico.</span>
            </div>
            <button className="h-7 px-3 font-bold text-[10px] text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg cursor-pointer border-none transition">
              Visualizar PDF
            </button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
