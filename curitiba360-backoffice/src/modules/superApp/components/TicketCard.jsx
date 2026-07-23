import React from "react";
import { QrCode, Calendar, ArrowRightLeft, RefreshCw } from "lucide-react";

export default function TicketCard({ ticket = {}, onTransfer = () => {}, onRotate = () => {} }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "transferred": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const statusLabel = {
    active: "Ativo",
    used: "Utilizado",
    cancelled: "Cancelado",
    transferred: "Transferido",
    expired: "Expirado"
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition duration-200 space-y-3 font-sans animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div>
          <h4 className="text-xs font-bold text-slate-900 m-0 leading-tight">
            {ticket.eventName}
          </h4>
          <span className="text-[9px] text-slate-500 font-mono mt-0.5 block">Participante: {ticket.participantName}</span>
        </div>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${getStatusColor(ticket.status)}`}>
          {statusLabel[ticket.status] || ticket.status}
        </span>
      </div>

      <div className="flex gap-4">
        {ticket.status === "active" && (
          <div className="flex flex-col items-center justify-center p-2 border border-slate-100 rounded-2xl bg-slate-50 shrink-0">
            <QrCode size={48} className="text-slate-800" />
            <button
              onClick={() => onRotate(ticket.id)}
              className="mt-1 flex items-center gap-0.5 text-[8px] text-emerald-700 bg-transparent border-none cursor-pointer hover:underline font-bold"
            >
              <RefreshCw size={8} /> Atualizar QR
            </button>
          </div>
        )}

        <div className="flex-1 space-y-1 text-[10px] text-slate-655 font-mono flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <Calendar size={11} className="text-emerald-600" />
            <span>{ticket.date} às {ticket.startTime}</span>
          </div>
          {ticket.sector && (
            <div>Setor: <b>{ticket.sector}</b></div>
          )}
          {ticket.seat && (
            <div>Assento: <b>{ticket.seat}</b></div>
          )}
        </div>
      </div>

      {ticket.status === "active" && (
        <button
          onClick={() => {
            const recipient = prompt("Nome completo do destinatário:");
            if (recipient) onTransfer(ticket.id, recipient);
          }}
          className="flex items-center justify-center gap-1 w-full py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 font-bold text-[10px] rounded-xl border border-emerald-100 transition cursor-pointer"
        >
          <ArrowRightLeft size={11} /> Transferir Ingresso
        </button>
      )}
    </div>
  );
}
