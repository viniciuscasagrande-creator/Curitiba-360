import React from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  QrCode,
  Send,
} from "lucide-react";
import {
  QRCodeSVG,
} from "qrcode.react";

import {
  TICKET_STATUS_CONFIG,
} from "../constants/ticketStatus";

export default function TicketCard({
  ticket,
  onOpen,
  onTransfer,
}) {
  const status =
    TICKET_STATUS_CONFIG[
      ticket.status
    ] ||
    TICKET_STATUS_CONFIG.active;

  const canTransfer =
    ticket.status === "active" &&
    ticket.transfer.allowed;

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm select-none text-left flex flex-col justify-between">
      <div>
        <div className="relative h-44 bg-slate-100">
          <img
            src={ticket.event.image}
            alt={ticket.event.title}
            className="h-full w-full object-cover"
          />

          <span
            className={[
              "absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold",
              status.className,
            ].join(" ")}
          >
            {status.label}
          </span>
        </div>

        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700 my-0">
            {ticket.ticketType}
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-950 my-0">
            {ticket.event.title}
          </h2>

          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2 my-0">
              <CalendarDays size={16} />
              {ticket.event.date}
            </p>

            <p className="flex items-center gap-2 my-0">
              <Clock3 size={16} />
              {ticket.event.time}
            </p>

            <p className="flex items-center gap-2 my-0">
              <MapPin size={16} />
              {ticket.event.location}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
            <div className="rounded-xl bg-white p-2">
              <QRCodeSVG
                value={ticket.secureValue}
                size={72}
                level="H"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-505 my-0">
                Titular
              </p>

              <p className="mt-1 truncate font-bold text-slate-955 my-0">
                {ticket.holder.name}
              </p>

              <p className="mt-1 truncate text-xs text-slate-500 my-0">
                {ticket.code}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() =>
            onOpen(ticket)
          }
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 transition px-4 text-sm font-semibold text-white cursor-pointer border-none"
        >
          <QrCode size={17} />
          Abrir ingresso
        </button>

        <button
          type="button"
          disabled={!canTransfer}
          onClick={() =>
            onTransfer(ticket)
          }
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50 cursor-pointer transition"
        >
          <Send size={17} />
          Transferir
        </button>
      </div>
    </article>
  );
}
