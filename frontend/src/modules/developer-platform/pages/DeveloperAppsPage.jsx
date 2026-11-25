import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDeveloperDashboard } from "../hooks/useDeveloperDashboard";
import { Plus, ShieldAlert, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function DeveloperAppsPage() {
  const { apps, createDevApp, updateAppStatus, loading } = useDeveloperDashboard();
  const [showForm, setShowForm] = useState(false);
  const [showSecretId, setShowSecretId] = useState(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    createDevApp({
      name,
      description
    });
    setName("");
    setDescription("");
    setShowForm(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando aplicações...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Aplicações Integradas</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Gerencie credenciais OAuth 2.0 de parceiros integrados e aprove tokens de acesso B2B.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1"
          >
            <Plus size={14} /> Registrar App
          </button>
        </div>

        {/* Create App Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 max-w-xl text-xs">
            <h3 className="text-sm font-bold text-slate-900 my-0">Nova Aplicação de Integração</h3>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Nome do App</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Conector ERP Totvs"
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Descrição</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o propósito da integração"
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
                  Salvar App
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="h-9 px-4 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer border-none transition">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Applications List */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100">
            {apps.map(app => (
              <div key={app.id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                <div className="space-y-1.5 max-w-lg">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-sm">{app.name}</strong>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-slate-500 my-0">{app.description}</p>
                  
                  {/* Credentials panel */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[10px] font-mono text-slate-600 space-y-1">
                    <div>
                      <span className="text-slate-400">Client ID:</span> {app.clientId}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Client Secret:</span>
                      <span>{showSecretId === app.id ? app.clientSecret : "sec_••••••••••••••••••••••••"}</span>
                      <button
                        type="button"
                        onClick={() => setShowSecretId(showSecretId === app.id ? null : app.id)}
                        className="bg-transparent border-none text-slate-450 hover:text-slate-800 cursor-pointer"
                      >
                        {showSecretId === app.id ? <EyeOff size={12} /> : <Eye size={12} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <select
                    value={app.status}
                    onChange={(e) => updateAppStatus(app.id, e.target.value)}
                    className="h-8 px-2 border border-slate-200 rounded-xl bg-slate-50 cursor-pointer font-bold text-xs"
                  >
                    <option value="draft">Draft</option>
                    <option value="pending">Pendente</option>
                    <option value="approved">Aprovado</option>
                    <option value="blocked">Bloqueado</option>
                    <option value="suspended">Suspenso</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
