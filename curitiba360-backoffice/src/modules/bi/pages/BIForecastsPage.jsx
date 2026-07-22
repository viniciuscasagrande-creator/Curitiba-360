import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { TrendingUp, Sparkles } from "lucide-react";

export default function BIForecastsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Previsões Preditoras & Forecaster</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Acompanhe tendências de faturamento, público e no-show gerados pelos modelos de machine learning.</p>
        </div>

        <section className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-purple-600">
            <Sparkles size={20} />
            <h3 className="text-lg font-bold my-0">Modelo AutoML Curitiba 360 v2</h3>
          </div>
          <p className="text-xs text-slate-500 my-0">Probabilidade de no-show para o próximo final de semana estimado em 3.1% com confiança de 96%.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
