import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";

export default function JobsMonitoringPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Monitoramento de Cron Jobs Agendados</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Acompanhe o histórico de execuções de tarefas agendadas (Ex: Conciliação financeira diária, liberação de cashback).</p>
        </section>
      </div>
    </AdminLayout>
  );
}
