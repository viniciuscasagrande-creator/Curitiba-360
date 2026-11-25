import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Ban, ShieldCheck, Clock } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { getOperationsRepository, updateTicketRepository } from "../repositories/partnerOperationsRepository";

export default function PartnerTicketDetailPage() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getOperationsRepository();
      const matched = (data.tickets || []).find((t) => t.id === ticketId);
      setTicket(matched);
    }
    load();
  }, [ticketId]);

  const handleToggleBlock = async () => {
    if (!ticket) return;
    const nextStatus = ticket.status === "blocked" ? "active" : "blocked";
    await updateTicketRepository(ticketId, { status: nextStatus });
    window.alert(`Ingresso ${nextStatus === "blocked" ? "bloqueado" : "desbloqueado"} com sucesso!`);
    // Refresh local state
    const data = await getOperationsRepository();
    setTicket((data.tickets || []).find((t) => t.id === ticketId));
  };

  if (!ticket) {
    return (
      <PartnerLayout>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          Ingresso não encontrado.
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/ingressos"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Operações
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Gerenciar Ingresso
            </h1>
            <p className="mt-1 text-sm text-slate-505 my-0">
              Código: {ticket.code}
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-955 my-0 flex items-center gap-2">
            <ShieldCheck size={20} className="text-slate-400" />
            Assinatura e Segurança
          </h3>
          <div className="text-sm text-slate-750 space-y-2">
            <p className="my-0">
              <strong>Payload Seguro:</strong> <code className="bg-slate-50 px-2 py-0.5 rounded text-xs truncate block max-w-lg mt-1">{ticket.securePayload}</code>
            </p>
            <p className="my-0">
              <strong>Tipo de ingresso:</strong> {ticket.type}
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-955 my-0">Ações de Segurança</h3>
          <div className="flex gap-3">
            <button
              onClick={handleToggleBlock}
              className={[
                "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold border-none text-white cursor-pointer transition",
                ticket.status === "blocked" ? "bg-emerald-700 hover:bg-emerald-800" : "bg-red-700 hover:bg-red-800"
              ].join(" ")}
            >
              <Ban size={16} />
              {ticket.status === "blocked" ? "Desbloquear Ingresso" : "Bloquear Ingresso"}
            </button>
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
