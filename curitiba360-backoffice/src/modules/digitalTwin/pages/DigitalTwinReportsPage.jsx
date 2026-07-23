import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

export default function DigitalTwinReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/digital-twin" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Relatórios & Indicadores Smart City</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o andamento dos principais índices de sustentabilidade, mobilidade e qualidade de vida urbana de Curitiba.
          </p>
        </div>

        {/* Reports detail */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <FileText size={18} className="text-purple-755 font-bold" /> Indicadores Recentes
          </h3>

          <div className="divide-y divide-slate-100 text-sans font-sans">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Relatório de Emissões de CO₂</strong>
                <span className="text-[10px] text-slate-505 block">Consolidação histórica mensal de pegada de carbono urbana.</span>
              </div>
              <strong className="text-purple-700 text-xs">Gerado (PDF)</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
