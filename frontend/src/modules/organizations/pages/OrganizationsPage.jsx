import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOrganizations } from "../hooks/useOrganizations";
import { Plus, Check, Globe, LayoutGrid, ShieldCheck, Landmark } from "lucide-react";

export default function OrganizationsPage() {
  const { organizations, activeOrgId, switchOrganization, createOrganization, loading, error } = useOrganizations();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [document, setDocument] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createOrganization({ name, slug: slug || name.toLowerCase().replace(/\s+/g, "-"), document });
    setName("");
    setSlug("");
    setDocument("");
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gerenciamento Multiempresa (Multi-Tenant)</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Gerencie organizações, switch de contexto, White Label e isolamento de dados de parceiros.</p>
        </div>

        {/* Switcher & List */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Organizações Ativas</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {organizations.map(org => {
                const isActive = org.id === activeOrgId;
                return (
                  <article
                    key={org.id}
                    onClick={() => switchOrganization(org.id)}
                    className={`p-5 rounded-3xl border cursor-pointer transition relative flex flex-col justify-between h-40 shadow-sm ${isActive ? 'border-emerald-600 bg-emerald-50/20' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                  >
                    {isActive && (
                      <span className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                        <Check size={14} />
                      </span>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 my-0">{org.name}</h4>
                      <p className="text-xs text-slate-500 my-0 mt-1">CNPJ: {org.document}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-505">
                      <span className="capitalize font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{org.plan.replace('_', ' ')}</span>
                      <span>{org.companies.length} empresa(s)</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* New Org Form */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 my-0">Nova Organização</h3>
            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nome da Organização</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Passeios Curitiba S/A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Slug URL</label>
                <input
                  type="text"
                  placeholder="Ex: passeios-curitiba"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full h-10 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">CNPJ/Documento</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 00.000.000/0001-00"
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                  className="w-full h-10 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-emerald-700 text-sm font-bold text-white hover:bg-emerald-800 transition border-none cursor-pointer"
              >
                Cadastrar Organização
              </button>
            </form>
          </section>
        </section>
      </div>
    </AdminLayout>
  );
}
