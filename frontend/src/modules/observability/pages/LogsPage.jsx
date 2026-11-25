import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";

export default function LogsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Central de Logs Estruturados</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Filtre logs de produção por Correlation ID, nível de severidade (Error, Critical) ou microsserviço, com dados mascarados (LGPD).</p>
        </section>
      </div>
    </AdminLayout>
  );
}
