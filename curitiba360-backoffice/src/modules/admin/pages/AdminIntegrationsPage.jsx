import React from "react";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminIntegrationsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Painel de Integrações e Webhooks</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Monitore o status e saúde de APIs de terceiros (Firebase, adquirentes, bancos, e-mails) e retentativas de webhooks falhos.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
