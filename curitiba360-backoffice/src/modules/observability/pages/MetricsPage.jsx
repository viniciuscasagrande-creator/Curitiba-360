import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";

export default function MetricsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Métricas de Performance da Infraestrutura</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Visualize consumo de CPU/Memória das Cloud Functions, volumetria de leituras/escritas no Firestore e custos de infraestrutura.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
