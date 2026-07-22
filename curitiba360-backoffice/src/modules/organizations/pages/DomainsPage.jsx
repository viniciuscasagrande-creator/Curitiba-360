import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOrganizations } from "../hooks/useOrganizations";
import { Globe, ShieldCheck } from "lucide-react";

export default function DomainsPage() {
  const { activeOrg, addDomain, loading } = useOrganizations();
  const [hostname, setHostname] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!activeOrg || !hostname.trim()) return;
    await addDomain(activeOrg.id, hostname);
    setHostname("");
    alert("Domínio personalizado adicionado e configurado com SSL!");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse bg-slate-200 rounded-3xl" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <h1 className="text-2xl font-bold text-slate-900 my-0">Configurações de Domínios & DNS</h1>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-xl">
          <h3 className="text-lg font-bold text-slate-900 my-0">Adicionar Domínio Próprio</h3>
          <form onSubmit={handleAdd} className="mt-4 flex gap-3">
            <input
              type="text"
              placeholder="Ex: ingressos.minhaempresa.com"
              value={hostname}
              onChange={(e) => setHostname(e.target.value)}
              className="flex-1 h-10 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 text-sm"
            />
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white hover:bg-emerald-800 transition cursor-pointer border-none"
            >
              Adicionar
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-xl">
          <h3 className="text-lg font-bold text-slate-900 my-0">Domínios Configurados</h3>
          <div className="mt-4 space-y-3">
            {activeOrg?.domains?.map(dom => (
              <div key={dom.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="text-slate-500" size={18} />
                  <span className="text-sm font-bold text-slate-800">{dom.hostname}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  <ShieldCheck size={12} />
                  SSL Ativo
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
