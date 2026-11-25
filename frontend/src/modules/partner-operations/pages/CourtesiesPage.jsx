import React, { useState } from "react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { Plus, Coins } from "lucide-react";

export default function CourtesiesPage() {
  const [courtesies, setCourtesies] = useState([
    { id: "c1", name: "Maria Silva", reason: "Parceria Comercial", status: "issued" },
    { id: "c2", name: "Pedro Santos", reason: "Sorteio Mídias Sociais", status: "used" }
  ]);

  const [name, setName] = useState("");
  const [reason, setReason] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name || !reason) return;

    setCourtesies([
      ...courtesies,
      {
        id: `c-${Date.now()}`,
        name,
        reason,
        status: "issued"
      }
    ]);
    setName("");
    setReason("");
    window.alert("Cortesia gerada e registrada na auditoria!");
  };

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
            Operações
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
            Emissão de Cortesias
          </h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Crie ingressos cortesia. Toda cortesia gerada é auditada e reportada ao painel.
          </p>
        </header>

        <form onSubmit={handleCreate} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm grid gap-4 sm:grid-cols-3 items-end">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Nome do Destinatário</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Carlos Roberto"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Motivo</label>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex: Parceria de Divulgação"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm border-none cursor-pointer transition"
            >
              <Plus size={18} />
              Gerar Cortesia
            </button>
          </div>
        </form>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
          <h3 className="text-lg font-bold text-slate-955 my-0 mb-4">Cortesias Emitidas</h3>
          <div className="divide-y divide-slate-100">
            {courtesies.map((c) => (
              <div key={c.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-955 my-0">{c.name}</h4>
                  <p className="text-xs text-slate-505 my-0 mt-0.5">Motivo: {c.reason}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                  {c.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
