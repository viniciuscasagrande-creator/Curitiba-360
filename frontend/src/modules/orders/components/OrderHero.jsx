import React from "react";
import OrderStatusBadge from "./OrderStatusBadge";

function formatDate(value) {
  if (!value) return "Data não informada";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function OrderHero({ order }) {
  const mainItem = order?.items?.[0] || {};
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white select-none text-left">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-40">
        <img
          src={mainItem.image}
          alt={mainItem.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
      </div>

      <div className="relative p-6 sm:p-8 flex flex-col justify-end min-h-64 sm:min-h-72">
        <div className="flex items-center gap-3">
          <OrderStatusBadge status={order.status} />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
            {order.code}
          </span>
        </div>

        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-white leading-tight my-0">
          {mainItem.title}
        </h2>

        <p className="mt-2 text-sm text-slate-200 my-0 font-medium">
          {mainItem.location} • {formatDate(order.eventDate)}
        </p>
      </div>
    </section>
  );
}
