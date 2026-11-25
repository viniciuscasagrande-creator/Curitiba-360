import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useObservabilityDashboard } from "../hooks/useObservabilityDashboard";
import { ShieldAlert, Plus } from "lucide-react";

export default function IncidentsPage() {
  const { incidents, createIncident } = useObservabilityDashboard();
  const [title, setTitle] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createIncident(title, "Incidente registrado manualmente pela equipe técnica.", "sev3");
    setTitle("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 my-0">Incidentes Técnicos (SEV-1 a SEV-5)</h1>
          <p className="text-sm text-slate-600 my-0 mt-2">Acompanhe incidentes operacionais detectados automaticamente ou registrados de forma manual.</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 my-0">Registrar Incidente</h3>
          <form onSubmit={handleCreate} className="mt-4 flex gap-3 max-w-lg">
            <input
              type="text"
              placeholder="Título do incidente (ex: Lentidão checkout)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 h-10 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white hover:bg-emerald-800 transition cursor-pointer border-none"
            >
              <Plus size={16} />
              Registrar
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 my-0">Histórico de Incidentes</h3>
          <div className="mt-4 space-y-3">
            {incidents.map(inc => (
              <div key={inc.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 my-0">{inc.title}</h4>
                  <p className="text-xs text-slate-505 my-0 mt-1">Status: {inc.status.toUpperCase()} • Severidade: {inc.severity.toUpperCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
