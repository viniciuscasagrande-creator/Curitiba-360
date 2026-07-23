import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useRoadmap } from "../hooks/useRoadmap";
import { Target, CheckCircle2 } from "lucide-react";

export default function ObjectivesPage() {
  const { objectives, loading } = useRoadmap();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando objetivos estratégicos (OKRs)...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Objetivos & Resultados-Chave (OKRs)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o alinhamento estratégico das equipes com metas trimestrais de GMV, NPS e lançamento de praças.
          </p>
        </div>

        {/* OKRs Tracker */}
        <section className="space-y-6">
          {objectives.map(obj => (
            <div key={obj.id} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{obj.period.toUpperCase()}</span>
                  <h3 className="text-lg font-bold text-slate-900 my-0">{obj.title}</h3>
                  <p className="text-xs text-slate-500 my-0">{obj.description}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${obj.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                  {obj.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-700">
                  <span>Progresso Geral do Objetivo</span>
                  <span>{obj.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-700 rounded-full" style={{ width: `${obj.progress}%` }} />
                </div>
              </div>

              {/* Key Results list */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-900 my-0">Resultados-Chave (Key Results)</h4>
                <div className="divide-y divide-slate-100">
                  {obj.keyResults.map(kr => (
                    <div key={kr.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-800 block">{kr.title}</span>
                        <span className="text-[10px] text-slate-400">Progresso: {kr.currentValue} de {kr.targetValue} {kr.unit}</span>
                      </div>
                      <span className="font-bold text-purple-700">{kr.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
