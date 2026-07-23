import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { INITIAL_GOVERNANCE_DASHBOARD_MOCK } from "../mocks/governanceDashboardMock";
import { Users, ShieldCheck } from "lucide-react";

export default function SuppliersPage() {
  const { suppliers } = INITIAL_GOVERNANCE_DASHBOARD_MOCK;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Riscos de Fornecedores</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Monitore auditorias de segurança de terceiros e subcontratados críticos de pagamentos e envios de e-mails.</p>
        </div>

        {/* Suppliers List */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Fornecedores Homologados</h3>
          <div className="divide-y divide-slate-100">
            {suppliers.map(sup => (
              <div key={sup.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                <div>
                  <strong className="text-slate-900 text-sm block">{sup.name}</strong>
                  <span className="text-[10px] text-slate-400">Última Auditoria Realizada: {sup.lastAuditDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${sup.criticality === 'critical' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-50 text-slate-700 border border-slate-200'}`}>
                    {sup.criticality}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold">
                    <ShieldCheck size={12} /> Aprovado
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
