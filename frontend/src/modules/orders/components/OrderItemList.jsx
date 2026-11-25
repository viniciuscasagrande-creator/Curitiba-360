import React from "react";
import { CalendarDays, MapPin, Package } from "lucide-react";

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

export default function OrderItemList({ items = [] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left">
      <h2 className="text-base font-bold text-slate-900 my-0">
        Itens do Pedido
      </h2>

      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/20"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-20 w-full sm:w-20 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-950 my-0">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs text-emerald-700 font-bold my-0">
                {item.ticketType}
              </p>

              <div className="mt-3 grid gap-1.5 text-xs text-slate-600 sm:grid-cols-3">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-slate-400" />
                  {formatDate(item.date)} às {item.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  {item.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Package size={14} className="text-slate-400" />
                  {item.quantity}x {formatCurrency(item.unitPrice)}
                </span>
              </div>
            </div>

            <div className="text-right flex flex-col justify-end">
              <p className="text-xs text-slate-400 my-0">Subtotal</p>
              <p className="mt-0.5 text-sm font-bold text-slate-950 my-0">
                {formatCurrency(item.totalPrice)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
