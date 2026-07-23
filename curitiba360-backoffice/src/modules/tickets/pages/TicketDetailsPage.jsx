import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Ticket, ShieldCheck } from "lucide-react";
import { ROUTES } from "../../../routes/routePaths";

export function TicketDetailsPage() {
  const { ticketId } = useParams();

  // Simple Mock info based on TKT id
  const ticket = {
    id: ticketId || "TKT-2026-001",
    title: ticketId?.includes("002") ? "Jardim Botânico - Estufa da Biodiversidade" : "Festival de Teatro de Curitiba",
    category: ticketId?.includes("002") ? "Turismo" : "Teatro",
    date: ticketId?.includes("002") ? "2026-08-18" : "2026-08-15",
    time: ticketId?.includes("002") ? "10:30" : "20:00",
    location: ticketId?.includes("002") ? "Jardim Botânico de Curitiba" : "Teatro Guaíra (Guairão)",
    type: ticketId?.includes("002") ? "Ingresso Geral" : "VIP / Setor A",
    qrValue: `curitiba360://ticket/${ticketId || "TKT-2026-001"}`,
  };

  return (
    <div className="mx-auto max-w-md space-y-6 text-left">
      <Link
        to={ROUTES.app.tickets}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
      >
        <ArrowLeft size={16} />
        Voltar para Meus Ingressos
      </Link>

      <div className="overflow-hidden rounded-3xl border border-gray-800 bg-[#131720] shadow-2xl">
        {/* Ticket Header card */}
        <div className="bg-gradient-to-r from-red-900/40 to-red-600/30 p-6 border-b border-gray-800 text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-600 font-bold text-white mb-2 shadow-md">
            360
          </div>
          <h2 className="text-xl font-extrabold text-white leading-tight">{ticket.title}</h2>
          <span className="mt-2 inline-block rounded-full bg-red-600/20 border border-red-500/30 px-3 py-0.5 text-xs text-red-400 uppercase font-semibold">
            {ticket.category}
          </span>
        </div>

        {/* QR Code section */}
        <div className="flex flex-col items-center justify-center bg-white p-8 border-b border-dashed border-gray-300">
          <div className="rounded-2xl border-4 border-gray-100 bg-gray-50 p-4 shadow-inner">
            {/* Displaying simple Mock QR Code representation */}
            <div className="flex h-44 w-44 flex-col items-center justify-center bg-white border border-gray-200 p-2">
              <svg className="w-full h-full text-gray-900" viewBox="0 0 100 100" fill="currentColor">
                {/* Visual representation of QR blocks */}
                <rect x="10" y="10" width="20" height="20" />
                <rect x="15" y="15" width="10" height="10" fill="white" />
                <rect x="70" y="10" width="20" height="20" />
                <rect x="75" y="15" width="10" height="10" fill="white" />
                <rect x="10" y="70" width="20" height="20" />
                <rect x="15" y="75" width="10" height="10" fill="white" />
                <rect x="40" y="40" width="20" height="20" />
                <rect x="45" y="45" width="10" height="10" fill="white" />
                {/* Random blocks */}
                <rect x="35" y="10" width="10" height="5" />
                <rect x="50" y="20" width="5" height="15" />
                <rect x="10" y="40" width="15" height="10" />
                <rect x="75" y="40" width="15" height="25" />
                <rect x="40" y="70" width="20" height="15" />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-[11px] font-mono text-gray-400 tracking-wider uppercase">Cód: {ticket.id}</p>
        </div>

        {/* Info detail section */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider block">Portador</span>
              <span className="text-sm font-semibold text-white">Cidadão Curitibano</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider block">Lote</span>
              <span className="text-sm font-semibold text-white">{ticket.type}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-gray-800 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-red-500" />
              <span>{ticket.date} às {ticket.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-red-500" />
              <span>{ticket.location}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-950/20 border border-emerald-900/30 p-3 text-xs text-emerald-400">
            <ShieldCheck size={16} className="shrink-0" />
            <span>Ingresso oficial e verificado pelo ecossistema municipal Curitiba 360.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
