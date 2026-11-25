import React from "react";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Ticket,
} from "lucide-react";
import { Link } from "react-router-dom";

import OrderStatusBadge from "./OrderStatusBadge";

function formatCurrency(value) {
  return new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(value || 0);
}

function formatDate(value) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(
    new Date(`${value}T12:00:00`)
  );
}

export default function OrderCard({
  order,
}) {
  const primaryItem =
    order.items[0];

  const ticketsCount =
    order.tickets?.length || 0;

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md select-none text-left">
      <div className="flex flex-col md:flex-row">
        <div className="h-48 bg-slate-100 md:h-auto md:w-56 shrink-0">
          <img
            src={primaryItem.image}
            alt={primaryItem.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-505 my-0">
                Pedido {order.code}
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-950 my-0">
                {primaryItem.title}
              </h2>
            </div>

            <OrderStatusBadge
              status={order.status}
            />
          </div>

          <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} />
              {formatDate(
                primaryItem.date
              )}{" "}
              às {primaryItem.time}
            </span>

            <span className="flex items-center gap-2">
              <Ticket size={16} />
              {ticketsCount} ingresso
              {ticketsCount === 1
                ? ""
                : "s"}
            </span>

            <span className="flex items-center gap-2 sm:col-span-2">
              <MapPin size={16} />
              {primaryItem.location}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-4">
            <div>
              <p className="text-xs text-slate-500 my-0">
                Total da compra
              </p>

              <p className="mt-1 text-xl font-bold text-slate-950 my-0">
                {formatCurrency(
                  order.pricing.total
                )}
              </p>
            </div>

            <Link
              to={`/perfil/pedidos/${order.id}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white text-decoration-none hover:bg-slate-800 transition"
            >
              Ver pedido
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
