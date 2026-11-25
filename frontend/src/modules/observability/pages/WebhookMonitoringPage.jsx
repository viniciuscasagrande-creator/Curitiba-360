import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";

export default function WebhookMonitoringPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Monitoramento de Webhooks & Integrações</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Acompanhe taxas de sucesso e falha das entregas de webhooks financeiros e operacionais da plataforma.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
