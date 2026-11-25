import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useObservabilityDashboard } from "../hooks/useObservabilityDashboard";
import { AlertTriangle } from "lucide-react";

export default function AlertsPage() {
  const { alerts } = useObservabilityDashboard();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Regras de Alertas Operacionais</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-655 my-0">Gerencie e configure limites para o disparo de alertas críticos (Ex: Latência excessiva, taxa de erro acima de 5%).</p>
          {alerts.map(al => (
            <div key={al.id} className="p-4 border border-slate-200 rounded-2xl flex items-center gap-3">
              <AlertTriangle className="text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 my-0">{al.name}</h4>
                <p className="text-xs text-slate-505 my-0 mt-1">{al.description} • Canal: {al.channels.join(", ")}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
