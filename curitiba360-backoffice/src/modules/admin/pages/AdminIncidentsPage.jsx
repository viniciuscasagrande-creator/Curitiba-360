import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useAdminDashboard } from "../hooks/useAdminDashboard";

export default function AdminIncidentsPage() {
  const { incidents } = useAdminDashboard();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Incidentes e Saúde do Sistema</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-655 my-0">Monitore logs de falha, latência de servidores e incidentes operacionais ativos.</p>
          {incidents.map((incident) => (
            <div key={incident.id} className="p-4 border border-red-200 bg-red-50 rounded-2xl">
              <h4 className="font-bold text-red-700 my-0">{incident.title}</h4>
              <p className="text-xs text-slate-707 my-0 mt-1">{incident.description}</p>
            </div>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
