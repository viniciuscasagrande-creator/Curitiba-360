import React from "react";
import {
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

function formatCurrency(value) {
  return new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(value);
}

export default function DetailBookingCard({
  booking,
}) {
  if (!booking) {
    return null;
  }

  if (!booking.enabled) {
    return (
      <aside className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-left select-none">
        <CheckCircle2
          size={28}
          className="text-emerald-700"
        />

        <h2 className="mt-4 text-xl font-bold text-slate-950 my-0">
          {booking.label}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600 my-0">
          {booking.description}
        </p>
      </aside>
    );
  }

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg text-left select-none">
      <CalendarCheck
        size={28}
        className="text-emerald-700 animate-pulse"
      />

      <p className="mt-5 text-sm font-medium text-slate-500 my-0">
        A partir de
      </p>

      <p className="mt-1 text-3xl font-bold text-slate-950 my-0">
        {formatCurrency(
          booking.priceFrom
        )}
      </p>

      <h2 className="mt-5 text-lg font-bold text-slate-950 my-0">
        {booking.label}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600 my-0">
        {booking.description}
      </p>

      <Link
        to={booking.url}
        className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 text-decoration-none"
      >
        Comprar ou reservar
      </Link>

      <p className="mt-4 text-center text-xs text-slate-500 my-0">
        Consulte disponibilidade, datas e condições.
      </p>
    </aside>
  );
}
