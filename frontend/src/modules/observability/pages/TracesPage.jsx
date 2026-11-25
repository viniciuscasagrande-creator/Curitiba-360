import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";

export default function TracesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Rastreamento Distribuído (Distributed Traces)</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Acompanhe a árvore de execução de requisições, visualizando spans, latência por etapa de checkout/pagamento e falhas distribuídas.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
