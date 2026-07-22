import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useApiKeys } from "../hooks/useApiKeys";
import { Key, Plus, Trash2, ShieldAlert } from "lucide-react";

export default function ApiKeysPage() {
  const { apiKeys, createKey } = useApiKeys();
  const [name, setName] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createKey(name, ["products.read", "orders.read"]);
    setName("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 my-0">Chaves de API (API Keys)</h1>
          <p className="text-sm text-slate-600 my-0 mt-2">Gere e gerencie chaves de acesso para consumo das APIs REST da plataforma.</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 my-0">Criar Nova Chave</h3>
          <form onSubmit={handleCreate} className="mt-4 flex gap-3 max-w-lg">
            <input
              type="text"
              placeholder="Nome da chave (ex: Tiny ERP)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 h-10 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white hover:bg-emerald-800 transition cursor-pointer border-none"
            >
              <Plus size={16} />
              Gerar Chave
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 my-0">Chaves de API Ativas</h3>
          <div className="mt-4 space-y-3">
            {apiKeys.length === 0 ? (
              <p className="text-sm text-slate-500 font-semibold my-4">Nenhuma chave de API gerada.</p>
            ) : (
              apiKeys.map((key) => (
                <div key={key.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 my-0">{key.name}</h4>
                    <p className="text-xs text-slate-505 my-0 mt-1">Prefixo: {key.prefix} • Status: {key.status.toUpperCase()}</p>
                  </div>
                  <button className="h-8 w-8 rounded-lg text-red-600 hover:bg-red-50 flex items-center justify-center border-none bg-transparent cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
