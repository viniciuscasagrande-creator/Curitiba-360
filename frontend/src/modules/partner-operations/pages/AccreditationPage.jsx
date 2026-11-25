import React, { useState } from "react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { Plus, UserCheck } from "lucide-react";

export default function AccreditationPage() {
  const [accreditations, setAccreditations] = useState([
    { id: "a1", name: "Palestrante VIP", type: "Speaker", status: "printed" },
    { id: "a2", name: "Staff Operacional", type: "Staff", status: "checked_in" }
  ]);

  const [name, setName] = useState("");
  const [type, setType] = useState("Staff");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name) return;

    setAccreditations([
      ...accreditations,
      {
        id: `a-${Date.now()}`,
        name,
        type,
        status: "approved"
      }
    ]);
    setName("");
    window.alert("Credenciamento registrado com sucesso!");
  };

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
            Operações
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
            Mesa de Credenciamento
          </h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Emita credenciais adicionais para palestrantes, staff e imprensa.
          </p>
        </header>

        <form onSubmit={handleCreate} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm grid gap-4 sm:grid-cols-3 items-end">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Nome Completo</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Ana Souza"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Tipo de Acesso</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            >
              <option value="Speaker">Palestrante</option>
              <option value="Staff">Staff</option>
              <option value="Press">Imprensa</option>
              <option value="VIP">Convidado VIP</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm border-none cursor-pointer transition"
            >
              <Plus size={18} />
              Emitir Credencial
            </button>
          </div>
        </form>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
          <h3 className="text-lg font-bold text-slate-955 my-0 mb-4">Credenciais Emitidas</h3>
          <div className="divide-y divide-slate-100">
            {accreditations.map((acc) => (
              <div key={acc.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-955 my-0">{acc.name}</h4>
                  <p className="text-xs text-slate-505 my-0 mt-0.5">{acc.type}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                  {acc.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
