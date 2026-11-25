import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";

export default function SafetyReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Relatórios de Ocorrências & SLA</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Confira relatórios analíticos de incidentes registrados por dia, tempo médio de resposta e cumprimento de metas de segurança.
          </p>
        </div>

        {/* Reports overview */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <TrendingUp size={18} className="text-purple-755 font-bold" /> Indicadores Históricos
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Tempo Médio de Resposta (SLA)</strong>
                <span className="text-[10px] text-slate-505 block">Tempo decorrido entre o registro do incidente e a chegada da equipe de apoio.</span>
              </div>
              <strong className="text-emerald-700 text-sm font-mono">3.8 minutos</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Taxa de Resolução dentro da Meta</strong>
                <span className="text-[10px] text-slate-505 block">Percentual de incidentes encerrados ou controlados dentro da janela prevista de SLA.</span>
              </div>
              <strong className="text-purple-700 text-sm font-mono">98.2%</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
