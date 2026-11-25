import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { INITIAL_GOVERNANCE_DASHBOARD_MOCK } from "../mocks/governanceDashboardMock";
import { ShieldAlert, Check } from "lucide-react";

export default function RisksPage() {
  const { risks } = INITIAL_GOVERNANCE_DASHBOARD_MOCK;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Matriz de Gestão de Riscos</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Identifique vulnerabilidades de processos, avalie impactos potenciais e monitore planos de mitigação ativa.</p>
        </div>

        {/* Risks list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Registro de Riscos Operacionais</h3>
          <div className="divide-y divide-slate-100">
            {risks.map(risk => (
              <div key={risk.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 text-xs">
                  <strong className="text-slate-900 text-sm block">{risk.description}</strong>
                  <p className="text-slate-500 my-0">Probabilidade: <span className="font-semibold text-slate-700 capitalize">{risk.likelihood}</span> | Impacto: <span className="font-semibold text-slate-705 capitalize">{risk.impact}</span></p>
                  <p className="text-[10px] text-slate-400 my-0">Ação de Mitigação: <strong className="text-purple-600">{risk.mitigation}</strong></p>
                </div>

                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${risk.score >= 15 ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                  Risco: {risk.score}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
