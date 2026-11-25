import React from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import TicketCard from "../components/TicketCard";
import { useTickets } from "../hooks/useTickets";
import { Link } from "react-router-dom";
import { ArrowLeft, Ticket } from "lucide-react";

export default function TicketsPage() {
  const { tickets, loading, transferTicket, rotateQrToken } = useTickets();

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Meus Ingressos</h2>
          <p className="text-[10px] text-slate-500 m-0">Acesse seus QR Codes dinâmicos off-line para validação rápida nos portões.</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400">Carregando ingressos...</div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <Ticket size={32} className="mx-auto text-slate-300" />
            <p className="text-xs">Nenhum ingresso emitido.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((t) => (
              <TicketCard
                key={t.id}
                ticket={t}
                onTransfer={transferTicket}
                onRotate={rotateQrToken}
              />
            ))}
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
