import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOrganizations } from "../hooks/useOrganizations";

export default function CompaniesPage() {
  const { activeOrg, loading } = useOrganizations();

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse bg-slate-200 rounded-3xl" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Empresas e Razões Sociais</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-655 my-0 font-semibold text-slate-500">Razões sociais configuradas sob o Tenant ativo.</p>
          {activeOrg?.companies?.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhuma razão social cadastrada.</p>
          ) : (
            activeOrg?.companies?.map(c => (
              <div key={c.id} className="p-4 border border-slate-200 rounded-2xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-800 my-0">{c.tradeName}</h4>
                  <p className="text-xs text-slate-500 my-0 mt-1">Razão Social: {c.legalName} • CNPJ: {c.document}</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {c.status.toUpperCase()}
                </span>
              </div>
            ))
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
