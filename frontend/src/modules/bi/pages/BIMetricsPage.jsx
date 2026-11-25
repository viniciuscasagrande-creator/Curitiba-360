import React, { useState, useEffect } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { biService } from "../services/biService";
import { BarChart, Compass, Link2, Code, BadgeAlert } from "lucide-react";

export default function BIMetricsPage() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    biService.getBusinessMetrics().then(res => {
      if (res.success) setMetrics(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Camada Semântica & Catálogo de Métricas</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Defina métricas corporativas centralizadas (Single Source of Truth) para garantir cálculos consistentes em todos os dashboards.</p>
        </div>

        {/* Dynamic Metrics list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Métricas Definidas</h3>
          {loading ? (
            <div className="text-center py-6 text-xs text-slate-400">Carregando métricas...</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {metrics.map(metric => (
                <div key={metric.id} className="p-5 border border-slate-200 rounded-3xl bg-slate-50 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 my-0 text-sm">{metric.name}</h4>
                        <span className="text-[9px] font-mono text-slate-400 block mt-0.5">slug: {metric.slug}</span>
                      </div>
                      <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-full">
                        {metric.domain.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 my-0">{metric.description}</p>

                    {/* Formula viewer */}
                    <div className="p-3 bg-slate-900 rounded-2xl font-mono text-[10px] text-purple-300 border border-slate-800 space-y-1">
                      <span className="text-[8px] text-slate-500 font-bold block uppercase">Fórmula Semântica</span>
                      <code>{metric.formula}</code>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-200 text-[10px] text-slate-500">
                    <div className="flex justify-between">
                      <span>Agregação</span>
                      <strong className="text-slate-700">{metric.aggregation.toUpperCase()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipe Owner</span>
                      <strong className="text-slate-700">{metric.ownerTeam}</strong>
                    </div>
                    <div>
                      <span className="block font-semibold mb-1 text-slate-400">Dimensões Vinculadas:</span>
                      <div className="flex flex-wrap gap-1">
                        {metric.dimensions.map((dim, dIdx) => (
                          <span key={dIdx} className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[8px] font-mono">
                            {dim}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
