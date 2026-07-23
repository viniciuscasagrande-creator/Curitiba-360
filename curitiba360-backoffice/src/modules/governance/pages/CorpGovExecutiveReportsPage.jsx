import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

export default function CorpGovExecutiveReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Relatórios do Conselho</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acesso a Board Packs consolidados, balanço patrimonial e relatórios anuais de sustentabilidade.
          </p>
        </div>

        {/* Board pack list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <FileText size={18} className="text-purple-755 font-bold" /> Pacotes de Relatórios (Board Packs)
          </h3>

          <div className="space-y-3 font-sans text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Board Pack Consolidado - Q2 2026</strong>
                <span className="text-[10px] text-slate-505 block">Tamanho: 14.5 MB | Gerado em: 2026-07-01</span>
              </div>
              <button className="h-7 px-3 text-[10px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg border-none cursor-pointer transition">
                Download PDF
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Relatório Anual Integrado ESG 2025</strong>
                <span className="text-[10px] text-slate-505 block">Tamanho: 22.1 MB | Publicado em: 2026-03-15</span>
              </div>
              <button className="h-7 px-3 text-[10px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg border-none cursor-pointer transition">
                Download PDF
              </button>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
