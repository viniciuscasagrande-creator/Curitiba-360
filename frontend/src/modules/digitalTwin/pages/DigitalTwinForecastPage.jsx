import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";

export default function DigitalTwinForecastPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/digital-twin" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Previsões por Inteligência Artificial (Forecast)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe predições preditivas de fluxo de visitantes, congestionamentos de tráfego e demanda de consumo de utilidades.
          </p>
        </div>

        {/* AI Predictions overview */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <TrendingUp size={18} className="text-purple-755 font-bold" /> Predições Operacionais
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Previsão de Ocupação Turística (Próximas 24h)</strong>
                <span className="text-[10px] text-slate-505 block">Estimativa de fluxo com base no clima e calendário de eventos.</span>
              </div>
              <strong className="text-purple-750 text-sm font-mono">+12% de Aumento</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Volume Estimado de Tráfego</strong>
                <span className="text-[10px] text-slate-505 block">Congestionamento projetado em cruzamentos do Centro.</span>
              </div>
              <strong className="text-emerald-700 text-sm font-mono">Sem Anomalias Detectadas</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
