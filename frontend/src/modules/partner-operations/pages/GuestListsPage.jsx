import React from "react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { Users } from "lucide-react";

export default function GuestListsPage() {
  const listsMock = [
    { id: "l1", name: "Lista de Convidados VIP", count: 24, lastUpdated: "22/07/2026" },
    { id: "l2", name: "Lista de Imprensa Local", count: 8, lastUpdated: "22/07/2026" }
  ];

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
            Operações
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
            Listas de Convidados
          </h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Administre listas de participantes convidados externamente para entrada gratuita.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {listsMock.map((list) => (
            <div key={list.id} className="border border-slate-200 bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-955 my-0">{list.name}</h4>
                  <p className="text-xs text-slate-505 my-0 mt-0.5">{list.count} Convidados • Atualizada em {list.lastUpdated}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </PartnerLayout>
  );
}
