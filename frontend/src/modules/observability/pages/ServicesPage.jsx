import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useObservabilityDashboard } from "../hooks/useObservabilityDashboard";

export default function ServicesPage() {
  const { services } = useObservabilityDashboard();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Saúde de Serviços e APdex</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-655 my-0">Acompanhe disponibilidade, latência p95/p99 e cold starts de microsserviços integrados.</p>
          {services.map(s => (
            <div key={s.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 my-0">{s.name} ({s.slug})</h4>
                <p className="text-xs text-slate-505 my-0 mt-1">Latência P50: {s.metrics.latencyP50}ms • P95: {s.metrics.latencyP95}ms</p>
              </div>
              <span className="text-sm font-semibold">{s.metrics.availability}% Uptime</span>
            </div>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
