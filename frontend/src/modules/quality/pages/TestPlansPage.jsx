import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useQualityDashboard } from "../hooks/useQualityDashboard";
import { BarChart3, Plus, ShieldCheck, Play } from "lucide-react";

export default function TestPlansPage() {
  const { testPlans, testCases, loading } = useQualityDashboard();
  const [filterAutomated, setFilterAutomated] = useState("all");

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando planos e casos de testes...
        </div>
      </AdminLayout>
    );
  }

  const filteredCases = testCases.filter(tc => {
    if (filterAutomated === "automated") return tc.automated;
    if (filterAutomated === "manual") return !tc.automated;
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Planos & Casos de Teste</h1>
            <p className="mt-2 text-sm text-slate-600 my-0">
              Gerencie cenários de cobertura crítica de faturamento, login e fluxos de checkout Pix.
            </p>
          </div>
          <button className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1">
            <Plus size={14} /> Novo Caso
          </button>
        </div>

        {/* Test Plans */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Planos de Teste Ativos</h3>
          <div className="divide-y divide-slate-100">
            {testPlans.map(plan => (
              <div key={plan.id} className="py-4 first:pt-0 last:pb-0 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm">{plan.name}</strong>
                    <span className="ml-3 bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded font-bold text-[10px]">
                      {plan.environment.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Prazo: {plan.plannedStartAt} a {plan.plannedEndAt}
                  </span>
                </div>
                <p className="text-slate-600 my-0 leading-relaxed">{plan.objective}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {plan.scope.map((s, idx) => (
                    <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Test Cases List */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 my-0">Casos de Teste Detalhados</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterAutomated("all")}
                className={`h-7 px-3 text-[10px] font-bold rounded-lg transition border border-slate-200 cursor-pointer ${filterAutomated === "all" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 hover:bg-slate-50"}`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterAutomated("automated")}
                className={`h-7 px-3 text-[10px] font-bold rounded-lg transition border border-slate-200 cursor-pointer ${filterAutomated === "automated" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 hover:bg-slate-50"}`}
              >
                Automatizados
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredCases.map(tc => (
              <div key={tc.id} className="py-4 first:pt-0 last:pb-0 text-xs space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-purple-600 uppercase block mb-0.5">{tc.module}</span>
                    <strong className="text-slate-900 text-sm">{tc.title}</strong>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border capitalize ${tc.priority === "critical" ? "bg-red-50 text-red-700 border-red-200" : "bg-orange-50 text-orange-700 border-orange-200"}`}>
                    {tc.priority}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-500 my-0">
                    <strong>Pré-condições:</strong> {tc.preConditions.join(", ")}
                  </p>
                  <p className="text-slate-505 my-0">
                    <strong>Passos:</strong> {tc.steps.join(" → ")}
                  </p>
                  <p className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 mt-1 my-0 font-medium">
                    <strong>Resultado Esperado:</strong> {tc.expectedResult}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
