import React, { useState } from "react";
import { User, Tag, CalendarDays, MapPin, Minimize2, Maximize2 } from "lucide-react";
import OrderQRCode from "./OrderQRCode";

function formatDate(value) {
  if (!value) return "Data não informada";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function OrderTicketCard({ ticket, item }) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md text-left select-none">
      <div className="flex flex-col md:flex-row md:items-stretch">
        {/* Main Info */}
        <div className="flex-1 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-bold text-slate-950 my-0">
              {item.title}
            </h3>
            <span
              className={[
                "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border",
                ticket.status === "valid"
                  ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                  : ticket.status === "used"
                  ? "bg-slate-100 border-slate-200 text-slate-700"
                  : "bg-red-50 border-red-100 text-red-700",
              ].join(" ")}
            >
              {ticket.status === "valid" ? "Válido" : ticket.status === "used" ? "Utilizado" : "Cancelado"}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <User size={16} className="text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider my-0">Portador</p>
                <p className="font-bold text-slate-800 my-0 mt-0.5">{ticket.holderName}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Tag size={16} className="text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider my-0">Ingresso / Setor</p>
                <p className="font-bold text-slate-800 my-0 mt-0.5">{item.ticketType} {item.sector ? `• ${item.sector}` : ""}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider my-0">Data e Horário</p>
                <p className="font-semibold text-slate-800 my-0 mt-0.5">{formatDate(item.date)} às {item.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-slate-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider my-0">Local</p>
                <p className="font-semibold text-slate-800 my-0 mt-0.5">{item.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code section */}
        <div className="shrink-0 p-5 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col items-center justify-center gap-3">
          <OrderQRCode value={ticket.qrCodeValue} />
          
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-slate-600 hover:text-slate-900 transition border border-slate-200 rounded-lg bg-white cursor-pointer"
          >
            {fullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            {fullscreen ? "Fechar tela cheia" : "Exibir em tela cheia"}
          </button>
        </div>
      </div>

      {/* Fullscreen QR Code Overlay */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 p-6 select-none animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center space-y-4 relative">
            <button
              onClick={() => setFullscreen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer border-none bg-transparent"
              aria-label="Fechar"
            >
              <Minimize2 size={20} />
            </button>

            <h3 className="text-lg font-bold text-slate-950 my-0 mt-2">
              Apresente o QR Code na Entrada
            </h3>
            <p className="text-xs text-slate-500 my-0">
              {item.title} - {ticket.holderName}
            </p>

            <div className="flex justify-center p-2">
              <OrderQRCode value={ticket.qrCodeValue} />
            </div>

            <button
              onClick={() => setFullscreen(false)}
              className="w-full h-11 rounded-xl bg-slate-900 text-white font-bold text-sm cursor-pointer hover:bg-slate-850 border-none"
            >
              Voltar ao Ingresso
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
