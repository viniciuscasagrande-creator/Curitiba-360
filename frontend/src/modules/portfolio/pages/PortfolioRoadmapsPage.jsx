import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Map } from "lucide-react";

export default function PortfolioRoadmapsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/portfolio" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Roadmaps Executivos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Visualize os cronogramas integrados de lançamentos e releases urbanas programadas por Quarter.
          </p>
        </div>

        {/* Roadmap timeline */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Map size={18} className="text-purple-755 font-bold" /> Cronograma Integrado
          </h3>

          <div className="space-y-4 font-mono text-[10px]">
            <div className="flex gap-4 items-center">
              <span className="w-16 font-bold text-purple-700 text-xs">Q3 2026</span>
              <div className="flex-1 p-3 bg-slate-50 rounded-2xl font-sans">
                <strong className="text-slate-900 block text-xs">Lançamento E-Bus Linha Turismo</strong>
                <span className="text-[10px] text-slate-505">Status: Em dia | Dependência: Instalação de baterias elétricas</span>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <span className="w-16 font-bold text-purple-700 text-xs">Q4 2026</span>
              <div className="flex-1 p-3 bg-slate-50 rounded-2xl font-sans">
                <strong className="text-slate-900 block text-xs">Estações Tubo Inteligentes com 5G</strong>
                <span className="text-[10px] text-slate-555">Foco: Integração de totens de recomendação por Inteligência Artificial</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
