import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useCustomers } from "../hooks/useCustomers";

export default function TicketDetailPage() {
  const { ticketId } = useParams();
  const { tickets } = useCustomers();
  const ticket = tickets.find((t) => t.id === ticketId) || tickets[0];

  if (!ticket) {
    return (
      <PartnerLayout>
        <p className="p-6 text-slate-500 font-semibold">Ticket não encontrado.</p>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/crm/tickets"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition text-decoration-none"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              CRM • Detalhes do Chamado
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              {ticket.subject}
            </h1>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <span className="rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 px-2.5 py-0.5 text-xs mr-2">
              Status: {ticket.status.toUpperCase()}
            </span>
            <span className="rounded-full bg-red-50 text-red-700 font-bold border border-red-100 px-2.5 py-0.5 text-xs">
              Prioridade: {ticket.priority.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-slate-707 leading-relaxed my-0">{ticket.description}</p>
        </section>
      </div>
    </PartnerLayout>
  );
}
