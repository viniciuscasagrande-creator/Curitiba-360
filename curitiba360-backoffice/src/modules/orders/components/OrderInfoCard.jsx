import React from "react";
import { Info } from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(value) {
  if (!value) return "Data não informada";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function OrderInfoCard({ order }) {
  const mainItem = order?.items?.[0] || {};
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Info size={18} />
        </div>
        <h2 className="text-base font-bold text-slate-900 my-0">
          Resumo do Pedido
        </h2>
      </div>

      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span>Evento / Atração</span>
          <span className="font-bold text-slate-905">{mainItem.title}</span>
        </div>

        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span>Data e Horário</span>
          <span className="font-bold text-slate-905">
            {formatDate(order.eventDate)} às {mainItem.time}
          </span>
        </div>

        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span>Local</span>
          <span className="font-bold text-slate-905">{mainItem.location}</span>
        </div>

        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span>Quantidade</span>
          <span className="font-bold text-slate-905">
            {mainItem.quantity} unidade{mainItem.quantity !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span>Valor Unitário</span>
          <span className="font-bold text-slate-905">
            {formatCurrency(mainItem.unitPrice)}
          </span>
        </div>
      </div>
    </section>
  );
}
