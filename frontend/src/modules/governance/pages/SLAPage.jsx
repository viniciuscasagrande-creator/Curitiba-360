import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { INITIAL_GOVERNANCE_DASHBOARD_MOCK } from "../mocks/governanceDashboardMock";
import { CheckCircle2, Shield } from "lucide-react";

export default function SLAPage() {
  const { slaPolicies } = INITIAL_GOVERNANCE_DASHBOARD_MOCK;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Metas de SLA & SLO</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Acompanhe a disponibilidade e tempo de resposta contratado de nossos serviços críticos de backoffice.</p>
        </div>

        {/* SLA list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Serviços Críticos Ativos</h3>
          <div className="divide-y divide-slate-100">
            {slaPolicies.map(sla => (
              <div key={sla.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                <div className="space-y-1">
                  <strong className="text-slate-900 text-sm block">{sla.serviceName}</strong>
                  <p className="text-slate-400 text-[10px] my-0">Meta de SLA: <span className="font-semibold text-slate-700">{sla.target}</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-medium">Uptime Atual: <strong className="text-slate-800">{sla.current}</strong></span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold">
                    <CheckCircle2 size={12} /> Dentro do Acordo
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
