import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, UserRound, Coins, CalendarDays } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { getOperationsRepository } from "../repositories/partnerOperationsRepository";

export default function PartnerOrderDetailPage() {
  const { orderId } = useParams();
  const [tickets, setTickets] = useState([]);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getOperationsRepository();
      const matched = (data.tickets || []).filter((t) => t.orderId === orderId);
      setTickets(matched);
      if (matched.length > 0) {
        setCustomer(matched[0].holder);
      }
    }
    load();
  }, [orderId]);

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/pedidos"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Operações
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Detalhes do Pedido
            </h1>
            <p className="mt-1 text-sm text-slate-505 my-0">
              Código: {orderId?.toUpperCase().replace("-", "")}
            </p>
          </div>
        </header>

        {customer && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-955 my-0 flex items-center gap-2">
              <UserRound size={20} className="text-slate-400" />
              Dados do Comprador
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 text-sm text-slate-700">
              <div>
                <span className="text-xs font-bold text-slate-400 block">Nome Completo</span>
                <strong className="text-slate-950 font-bold block mt-0.5">{customer.name}</strong>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block">E-mail</span>
                <strong className="text-slate-950 font-bold block mt-0.5">{customer.email}</strong>
              </div>
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-955 my-0 flex items-center gap-2">
            <CalendarDays size={20} className="text-slate-400" />
            Ingressos Associados ({tickets.length})
          </h3>
          <div className="divide-y divide-slate-100">
            {tickets.map((tkt) => (
              <div key={tkt.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-955 my-0">{tkt.holder.name}</h4>
                  <p className="text-xs text-slate-505 my-0 mt-0.5">
                    {tkt.type} • {tkt.code}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                  {tkt.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
