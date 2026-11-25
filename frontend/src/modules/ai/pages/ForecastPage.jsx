import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAIChat } from "../hooks/useAIChat";
import { TrendingUp } from "lucide-react";

export default function ForecastPage() {
  const { forecasts } = useAIChat();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 my-0">Previsões de Performance (Forecast)</h1>
          <p className="text-sm text-slate-600 my-0 mt-2">Acompanhe previsões de receita bruta, fluxo de repasses e check-ins geradas por modelos de regressão.</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <TrendingUp size={18} className="text-emerald-600" />
            Métricas Preditivas
          </h3>
          <div className="mt-4 space-y-4">
            {forecasts.map((f, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 my-0">{f.metric} ({f.period})</h4>
                  <p className="text-xs text-slate-505 my-0 mt-1">Nível de Confiança: {f.confidence}%</p>
                </div>
                <span className="text-lg font-bold text-slate-950">
                  {typeof f.predictedValue === 'number' && f.metric === 'Faturamento'
                    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(f.predictedValue)
                    : f.predictedValue}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
