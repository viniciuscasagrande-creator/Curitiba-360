import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useApiKeys } from "../hooks/useApiKeys";
import { Webhook, Plus } from "lucide-react";

export default function WebhooksPage() {
  const { webhooks } = useApiKeys();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 my-0">Assinaturas de Webhooks</h1>
          <p className="text-sm text-slate-600 my-0 mt-2">Configure URLs para receber notificações de eventos em tempo real (order.paid, checkin.completed, etc.) via POST assinado com HMAC SHA-256.</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 my-0">Webhooks Ativos</h3>
          <div className="mt-4 space-y-3">
            {webhooks.length === 0 ? (
              <p className="text-sm text-slate-500 font-semibold my-4">Nenhum webhook cadastrado.</p>
            ) : (
              webhooks.map((sub) => (
                <div key={sub.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 my-0">{sub.url}</h4>
                    <p className="text-xs text-slate-505 my-0 mt-1">Eventos: {sub.events.join(", ")} • Status: {sub.status.toUpperCase()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
