import React, { useState } from "react";
import PartnerLayout from "../layouts/PartnerLayout";
import { Users, UserPlus } from "lucide-react";
import { PARTNER_ROLES } from "../constants/partnerRoles";

export default function PartnerTeamPage() {
  const [members, setMembers] = useState([
    { id: "m1", name: "Responsável Curitiba", email: "parceiro@curitiba360.com.br", role: "owner", status: "active" },
    { id: "m2", name: "Operador de Caixa", email: "operador@curitiba360.com.br", role: "operational", status: "active" }
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");

  const handleInvite = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    setMembers([
      ...members,
      {
        id: `m-${Date.now()}`,
        name,
        email,
        role,
        status: "invited"
      }
    ]);
    setName("");
    setEmail("");
    window.alert(`Convite enviado para ${email} com sucesso!`);
  };

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
            Equipe
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
            Membros da Equipe
          </h1>
          <p className="mt-2 text-sm text-slate-650 my-0">
            Convide novos membros para ajudar a administrar sua operação comercial no Curitiba 360.
          </p>
        </header>

        <form onSubmit={handleInvite} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm grid gap-4 sm:grid-cols-4 items-end">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 block mb-1">Nome Completo</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João Silva"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">E-mail</label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: joao@email.com"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Função / Perfil</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            >
              {Object.entries(PARTNER_ROLES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm border-none cursor-pointer px-5 transition"
            >
              <UserPlus size={18} />
              Convidar Membro
            </button>
          </div>
        </form>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
          <h3 className="text-lg font-bold text-slate-955 my-0 mb-4">Equipe Cadastrada</h3>
          <div className="divide-y divide-slate-100">
            {members.map((m) => (
              <div key={m.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-955 my-0">{m.name}</h4>
                  <p className="text-xs text-slate-500 my-0 mt-0.5">{m.email} • {PARTNER_ROLES[m.role]?.label}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                  m.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                }`}>
                  {m.status === "active" ? "Ativo" : "Convidado"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
