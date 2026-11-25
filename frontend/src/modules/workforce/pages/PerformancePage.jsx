import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";

export default function PerformancePage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Painel
          </Link>
          <Link to="/admin/workforce/goals" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            Visualizar Metas Individuais
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Avaliação de Desempenho</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe ciclos de avaliação (9box, autoavaliação e feedback de gestores) dos colaboradores.
          </p>
        </div>

        {/* Performance cycles */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <TrendingUp size={18} className="text-purple-755 font-bold" /> Ciclos Avaliativos Ativos
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Ciclo Anual de Competências (2026)</strong>
                <span className="text-[10px] text-slate-505 block">Tipo: Avaliação 360º | Progresso: 78% | Participantes: 842</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Em Andamento
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
