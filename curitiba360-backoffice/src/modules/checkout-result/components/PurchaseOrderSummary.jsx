import React from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Ticket,
} from "lucide-react";

import {
  formatCurrency,
  formatDate,
} from "../utils/resultFormatters";

export default function PurchaseOrderSummary({
  result,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 select-none text-left">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 my-0">
            Pedido
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-950 my-0">
            {result.orderCode}
          </h2>
        </div>

        <p className="text-sm text-slate-500 my-0">
          {formatDate(
            result.createdAt
          )}
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {result.items.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-4 border-t border-slate-105 pt-5 first:border-t-0 first:pt-0 sm:flex-row"
          >
            <div className="h-36 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-32 sm:w-40">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-slate-955 my-0">
                {item.title}
              </h3>

              <div className="mt-3 grid gap-2 text-sm text-slate-650 sm:grid-cols-2">
                <span className="flex items-center gap-2">
                  <CalendarDays
                    size={16}
                  />
                  {formatDate(
                    item.date
                  )}
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {item.time}
                </span>

                <span className="flex items-center gap-2 sm:col-span-2">
                  <MapPin size={16} />
                  {item.location}
                </span>

                <span className="flex items-center gap-2">
                  <Ticket size={16} />
                  {item.quantity}{" "}
                  ingresso
                  {item.quantity > 1
                    ? "s"
                    : ""}
                </span>

                <span className="text-sm font-semibold text-slate-700">
                  {item.ticketType}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold">
            {formatCurrency(
              result.pricing.subtotal
            )}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Taxas</span>
          <span className="font-semibold">
            {formatCurrency(
              result.pricing.serviceFee
            )}
          </span>
        </div>

        {result.pricing.discount >
          0 && (
          <div className="flex justify-between font-semibold text-emerald-700">
            <span>Desconto</span>
            <span>
              -{" "}
              {formatCurrency(
                result.pricing.discount
              )}
            </span>
          </div>
        )}

        <div className="flex items-end justify-between border-t border-slate-100 pt-4">
          <span className="font-bold text-slate-955">
            Total
          </span>

          <span className="text-2xl font-bold text-slate-955">
            {formatCurrency(
              result.pricing.total
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
