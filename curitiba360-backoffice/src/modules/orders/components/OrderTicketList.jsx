import React, { useState } from "react";
import { Ticket, QrCode } from "lucide-react";
import OrderQRCodeModal from "./OrderQRCodeModal";

export default function OrderTicketList({ order = {} }) {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = order?.items?.flatMap((item) =>
    (item.tickets || []).map((t) => ({ ...t, item }))
  ) || [];

  if (tickets.length === 0) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Ticket size={18} />
        </div>
        <h2 className="text-base font-bold text-slate-900 my-0">
          Ingressos Emitidos
        </h2>
      </div>

      <div className="mt-4 space-y-3">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition"
          >
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 my-0">
                {t.holderName}
              </h3>
              <p className="mt-0.5 text-xs text-slate-500 my-0 font-mono">
                {t.code} • {t.item.ticketType}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${t.status === "valid" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-slate-100 border-slate-200 text-slate-500"}`}>
                {t.status === "valid" ? "Válido" : "Utilizado"}
              </span>

              <button
                type="button"
                onClick={() => setSelectedTicket(t)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                title="Visualizar QR Code"
              >
                <QrCode size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedTicket && (
        <OrderQRCodeModal
          ticket={selectedTicket}
          item={selectedTicket.item}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </section>
  );
}
