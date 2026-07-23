import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";

export default function SmartCityReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/smartcity" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Relatórios Smart City & Sustentabilidade</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o progresso de indicadores ambientais, emissões de CO2 evitadas e economia energética global.
          </p>
        </div>

        {/* Reports overview */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <TrendingUp size={18} className="text-purple-755 font-bold" /> Indicadores de Sustentabilidade
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Emissões de Carbono Evitadas</strong>
                <span className="text-[10px] text-slate-505 block">Toneladas métricas de CO2 equivalente que foram evitadas pelo uso de ônibus elétricos.</span>
              </div>
              <strong className="text-emerald-700 text-sm font-mono">1.240 tCO2e</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Economia Global de Energia Pública</strong>
                <span className="text-[10px] text-slate-505 block">Economia consolidada comparada com o modelo tradicional de postes sem dimerização.</span>
              </div>
              <strong className="text-purple-700 text-sm font-mono">34.2% de Economia</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
