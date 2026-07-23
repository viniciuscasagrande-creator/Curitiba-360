import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDeveloperDashboard } from "../hooks/useDeveloperDashboard";
import { Plus, Database, Check } from "lucide-react";

export default function DeveloperWebhooksPage() {
  const { webhooks, saveWebhook, loading } = useDeveloperDashboard();
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [url, setUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState(["order.approved"]);

  const availableEvents = [
    "order.created",
    "order.approved",
    "payment.created",
    "payment.approved",
    "ticket.issued",
    "ticket.checked_in",
    "customer.created",
    "partner.created",
    "refund.completed"
  ];

  const handleToggleEvent = (ev) => {
    if (selectedEvents.includes(ev)) {
      setSelectedEvents(selectedEvents.filter(x => x !== ev));
    } else {
      setSelectedEvents([...selectedEvents, ev]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    saveWebhook({
      url,
      events: selectedEvents,
      applicationId: "app-01"
    });
    setUrl("");
    setShowForm(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando webhooks...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Webhooks & Eventos</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Configure escutas HTTP/HTTPS para receber notificações em tempo real de eventos transacionais da plataforma.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1"
          >
            <Plus size={14} /> Adicionar Webhook
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 max-w-xl text-xs">
            <h3 className="text-sm font-bold text-slate-900 my-0">Registrar Novo Webhook</h3>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">URL de Endpoint</label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://sua-api.com/webhooks"
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Eventos para Assinar</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableEvents.map(ev => (
                    <label key={ev} className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(ev)}
                        onChange={() => handleToggleEvent(ev)}
                      />
                      {ev}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
                  Confirmar Endpoint
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="h-9 px-4 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer border-none transition">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Webhooks List */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100">
            {webhooks.map(wh => (
              <div key={wh.id} className="py-4 first:pt-0 last:pb-0 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900 text-sm font-mono">{wh.url}</strong>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200 uppercase">
                    ATIVO
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {wh.events.map((e, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px]">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
