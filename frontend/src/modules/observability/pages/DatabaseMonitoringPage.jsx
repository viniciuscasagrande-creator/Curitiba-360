import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";

export default function DatabaseMonitoringPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Desempenho de Banco de Dados</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Monitore volume de operações de leitura/escrita por minuto no Firestore, transações lentas e conflitos de concorrência.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
