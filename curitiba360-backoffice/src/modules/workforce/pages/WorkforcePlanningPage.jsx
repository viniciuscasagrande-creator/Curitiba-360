import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function WorkforcePlanningPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">IA & Dimensionamento de Equipes</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Estime e otimize o efetivo necessário com base no público esperado, ingressos vendidos e histórico de eventos.
          </p>
        </div>

        {/* Demand planning summary */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Sparkles size={18} className="text-purple-755 font-bold" /> Projeções de Demanda Operacional
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Festival de Primavera Curitiba 360</strong>
                <span className="text-[10px] text-slate-505 block">Data: 2026-09-12 | Público Estimado: 12.000 paxs | Custo Dimensionado: R$ 42.000</span>
              </div>
              <div className="flex gap-4 font-mono text-[9px] text-slate-455 shrink-0">
                <span>Efetivo Indicado: 64 paxs</span>
                <span className="text-purple-700 font-bold">Gerado por IA</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
