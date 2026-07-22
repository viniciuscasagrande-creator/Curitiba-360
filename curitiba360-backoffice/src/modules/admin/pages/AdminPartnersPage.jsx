import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useAdminDashboard } from "../hooks/useAdminDashboard";

export default function AdminPartnersPage() {
  const { pendingPartners } = useAdminDashboard();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Gestão de Parceiros Comerciais</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-655 my-0">Acompanhe parceiros cadastrados, gerencie contratos, valide documentos e aprove novos cadastros.</p>
          {pendingPartners.map(p => (
            <div key={p.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 my-0">{p.legalName}</h4>
                <p className="text-xs text-slate-505 my-0 mt-1">{p.document} • Status: {p.status.toUpperCase()}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
