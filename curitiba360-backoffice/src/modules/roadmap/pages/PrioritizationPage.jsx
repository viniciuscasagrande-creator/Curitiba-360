import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useRoadmap } from "../hooks/useRoadmap";
import { BarChart3, HelpCircle } from "lucide-react";

export default function PrioritizationPage() {
  const { initiatives, loading } = useRoadmap();

  // Calculator inputs
  const [reach, setReach] = useState(1000);
  const [impact, setImpact] = useState(2); // High
  const [confidence, setConfidence] = useState(80); // 80%
  const [effort, setEffort] = useState(3);

  const calculateRice = (r, i, c, e) => {
    return Math.round((r * i * (c / 100)) / e);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando matriz de priorização...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Priorização (Score RICE)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Compare iniciativas utilizando a metodologia RICE para priorizar projetos de maior retorno com esforço equilibrado.
          </p>
        </div>

        {/* Interactive Calculator */}
        <section className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              Simulador RICE
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Reach (Alcance - usuários/mês)</label>
                <input
                  type="number"
                  value={reach}
                  onChange={(e) => setReach(Number(e.target.value))}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Impact (Impacto 1-3)</label>
                <select value={impact} onChange={(e) => setImpact(Number(e.target.value))} className="h-9 px-2 border border-slate-200 rounded-xl">
                  <option value={3}>3 - Massivo</option>
                  <option value={2}>2 - Alto</option>
                  <option value={1}>1 - Médio</option>
                  <option value={0.25}>0.25 - Baixo</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Confidence (Confiança %)</label>
                <select value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} className="h-9 px-2 border border-slate-200 rounded-xl">
                  <option value={100}>100% - Total</option>
                  <option value={80}>80% - Alta</option>
                  <option value={50}>50% - Média</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Effort (Esforço 1-10)</label>
                <input
                  type="number"
                  value={effort}
                  onChange={(e) => setEffort(Number(e.target.value))}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                  min={1}
                  max={10}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col justify-center items-center text-center space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Score RICE Calculado</span>
            <span className="text-4xl font-extrabold text-slate-900">{calculateRice(reach, impact, confidence, effort)}</span>
            <span className="text-[10px] text-slate-505 block max-w-xs leading-relaxed">
              Fórmula: (Reach × Impact × Confidence) / Effort. Maiores scores indicam maior prioridade imediata.
            </span>
          </div>
        </section>

        {/* Prioritized list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Fila de Priorização de Projetos</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {initiatives.map(ini => (
              <div key={ini.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                <div>
                  <strong className="text-slate-900 text-sm block">{ini.title}</strong>
                  <span className="text-[10px] text-slate-400 mt-0.5">Impacto: {ini.impactScore} | Esforço: {ini.effortScore}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-semibold">Priority Index</span>
                  <span className="text-base font-bold text-purple-700 mt-0.5 block">
                    {Math.round((ini.impactScore * 100) / ini.effortScore)} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
