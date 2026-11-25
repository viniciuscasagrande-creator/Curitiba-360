import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";

export default function SLOPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">SLAs, SLOs e Error Budgets</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Monitore compromissos comerciais de uptime (SLA), metas internas (SLO: 99.95% disponibilidade) e consumo de Error Budgets (orçamento de erro em minutos).</p>
        </section>
      </div>
    </AdminLayout>
  );
}
