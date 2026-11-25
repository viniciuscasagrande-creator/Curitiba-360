import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";

export default function PaymentMonitoringPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Saúde e Latência do Fluxo de Pagamentos</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-655 my-0">Acompanhe tempo médio de autorização de gateways de pagamento, taxas de sucesso/recusa de adquirentes e timeout de Pix.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
