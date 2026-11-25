import React from "react";
import { CalendarDays, Clock3, MapPin, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import CartItemQuantity from "./CartItemQuantity";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(`${value}T12:00:00`));
  } catch {
    return value;
  }
}

export default function CartItemCard({
  item,
  saving,
  onQuantityChange,
  onRemove,
}) {
  const subtotal = item.unitPrice * item.quantity;

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm select-none text-left">
      <div className="flex flex-col sm:flex-row">
        <Link
          to={`/${item.type === "event" ? "evento" : "experiencia"}/${item.slug}`}
          className="h-48 shrink-0 bg-slate-100 sm:h-auto sm:w-52 block text-decoration-none"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700 my-0">
                {item.ticketType}
              </p>

              <h2 className="mt-2 text-lg font-bold text-slate-950 my-0">
                {item.title}
              </h2>

              {item.lotName && (
                <p className="mt-1 text-xs font-medium text-slate-500 my-0">
                  {item.lotName}
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={saving}
              onClick={() => onRemove(item)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-red-650 hover:bg-red-50 transition disabled:opacity-50 border-none bg-transparent cursor-pointer"
              aria-label="Remover item"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} />
              {formatDate(item.date)}
            </span>

            <span className="flex items-center gap-2">
              <Clock3 size={16} />
              {item.time}
            </span>

            <span className="flex items-center gap-2 md:col-span-2">
              <MapPin size={16} />
              {item.location}
            </span>
          </div>

          {item.stock <= 5 && (
            <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 my-0">
              Restam apenas {item.stock} unidades.
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-4">
            <CartItemQuantity
              value={item.quantity}
              minimum={item.minimumQuantity}
              maximum={Math.min(item.maximumQuantity, item.stock)}
              disabled={saving}
              onChange={(quantity) => onQuantityChange(item.id, quantity)}
            />

            <div className="text-right">
              <p className="text-xs text-slate-500 my-0">
                {formatCurrency(item.unitPrice)} por unidade
              </p>

              <p className="mt-1 text-xl font-bold text-slate-955 my-0">
                {formatCurrency(subtotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
