import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, UserRound, Landmark, CalendarDays } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { getOperationsRepository } from "../repositories/partnerOperationsRepository";

export default function ParticipantDetailPage() {
  const { participantId } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getOperationsRepository();
      const matched = (data.tickets || []).find((t) => t.id === participantId);
      setTicket(matched);
    }
    load();
  }, [participantId]);

  if (!ticket) {
    return (
      <PartnerLayout>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          Participante não encontrado.
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/participantes"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Operações
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Detalhes do Participante
            </h1>
            <p className="mt-1 text-sm text-slate-505 my-0">
              Ingresso: {ticket.code}
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-955 my-0 flex items-center gap-2">
            <UserRound size={20} className="text-slate-400" />
            Informações do Titular
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 text-sm text-slate-750">
            <div>
              <span className="text-xs font-bold text-slate-400 block">Nome Completo</span>
              <strong className="text-slate-950 font-bold block mt-0.5">{ticket.holder.name}</strong>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block">E-mail</span>
              <strong className="text-slate-955 font-bold block mt-0.5">{ticket.holder.email}</strong>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block">CPF / Documento</span>
              <strong className="text-slate-955 font-bold block mt-0.5">{ticket.holder.document}</strong>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-955 my-0 flex items-center gap-2">
            <Landmark size={20} className="text-slate-400" />
            Check-In status
          </h3>
          <div className="text-sm text-slate-750 space-y-2">
            <p className="my-0">
              <strong>Entrada efetuada:</strong>{" "}
              {ticket.checkIn.checkedIn ? "Sim" : "Pendente"}
            </p>
            {ticket.checkIn.checkedIn && (
              <>
                <p className="my-0">
                  <strong>Data de Entrada:</strong>{" "}
                  {new Date(ticket.checkIn.checkedInAt).toLocaleString("pt-BR")}
                </p>
                <p className="my-0">
                  <strong>Portão:</strong> {ticket.checkIn.gate || "Principal"}
                </p>
              </>
            )}
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
