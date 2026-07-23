import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { INITIAL_GOVERNANCE_DASHBOARD_MOCK } from "../mocks/governanceDashboardMock";
import { Award, Check, Eye } from "lucide-react";

export default function GovernancePoliciesPage() {
  const [policies, setPolicies] = useState(INITIAL_GOVERNANCE_DASHBOARD_MOCK.policies);

  const approvePolicy = (id) => {
    setPolicies(policies.map(p => p.id === id ? { ...p, status: "published", publishedAt: new Date().toISOString() } : p));
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Políticas Corporativas</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Gerencie o ciclo de vida das diretrizes regulatórias e termos de conformidade institucional.</p>
        </div>

        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Políticas Ativas</h3>
          <div className="divide-y divide-slate-100">
            {policies.map(pol => (
              <div key={pol.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-3">
                    <strong className="text-slate-900 text-sm">{pol.title}</strong>
                    <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-mono">
                      {pol.code} (v{pol.version})
                    </span>
                  </div>
                  <p className="text-slate-500 my-0">Categoria: <span className="font-semibold capitalize text-slate-700">{pol.category}</span> | Responsável: <span className="font-medium text-slate-700">{pol.owner}</span></p>
                  {pol.publishedAt && (
                    <p className="text-[10px] text-slate-400 my-0">Publicado em: {new Date(pol.publishedAt).toLocaleDateString()}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {pol.status === "review" ? (
                    <button
                      onClick={() => approvePolicy(pol.id)}
                      className="h-8 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl cursor-pointer border-none transition flex items-center gap-1"
                    >
                      <Check size={12} /> Aprovar & Publicar
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 font-semibold bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg">
                      Publicada
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
