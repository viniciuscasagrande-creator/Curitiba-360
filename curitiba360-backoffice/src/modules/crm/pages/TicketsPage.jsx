import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useCustomers } from "../hooks/useCustomers";

export default function TicketsPage() {
  const { tickets } = useCustomers();

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-5xl space-y-6 select-none text-left">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/parceiro/crm"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition text-decoration-none"
            >
              <ArrowLeft size={19} />
            </Link>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
                Atendimento
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
                Tickets de Suporte
              </h1>
            </div>
          </div>

          <Link
            to="/parceiro/crm/tickets/novo"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800 transition text-decoration-none border-none cursor-pointer"
          >
            <Plus size={17} />
            Novo Ticket
          </Link>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          {tickets.map((t) => (
            <Link
              key={t.id}
              to={`/parceiro/crm/tickets/${t.id}`}
              className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between hover:bg-slate-50 text-decoration-none block"
            >
              <div>
                <h4 className="font-bold text-slate-955 my-0">{t.subject}</h4>
                <p className="text-xs text-slate-505 my-0 mt-0.5">{t.description}</p>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-red-50 text-red-700 font-bold border border-red-100 px-2.5 py-0.5 text-xs">
                  {t.priority.toUpperCase()}
                </span>
                <span className="rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 px-2.5 py-0.5 text-xs">
                  {t.status.toUpperCase()}
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </PartnerLayout>
  );
}
