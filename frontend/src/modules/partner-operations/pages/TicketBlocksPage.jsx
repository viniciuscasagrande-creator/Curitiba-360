import React, { useEffect, useState } from "react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { getOperationsRepository } from "../repositories/partnerOperationsRepository";
import { Ban } from "lucide-react";

export default function TicketBlocksPage() {
  const [blocked, setBlocked] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getOperationsRepository();
      const matched = (data.tickets || []).filter((t) => t.status === "blocked");
      setBlocked(matched);
    }
    load();
  }, []);

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
            Operações
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
            Ingressos Bloqueados
          </h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Histórico e controle de ingressos suspensos por suspeita de fraude, chargeback ou erro.
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden space-y-4">
          <h3 className="text-lg font-bold text-slate-955 my-0 flex items-center gap-2">
            <Ban size={20} className="text-red-500" />
            Ingressos Bloqueados Ativos
          </h3>
          <div className="divide-y divide-slate-100">
            {blocked.map((tkt) => (
              <div key={tkt.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-955 my-0">{tkt.holder.name}</h4>
                  <p className="text-xs text-slate-505 my-0 mt-0.5">{tkt.type} • {tkt.code}</p>
                </div>
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700 border border-red-100">
                  BLOQUEADO
                </span>
              </div>
            ))}
            {blocked.length === 0 && (
              <p className="text-sm text-slate-500 py-4 my-0">Nenhum ingresso bloqueado no momento.</p>
            )}
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
