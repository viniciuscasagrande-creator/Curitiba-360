import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSafetyDashboard } from "../hooks/useSafetyDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

export default function IncidentsPage() {
  const { incidents, saveIncident, loading } = useSafetyDashboard();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("crowd");
  const [priority, setPriority] = useState("high");
  const [sector, setSector] = useState("Setor Norte");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    saveIncident({
      title,
      category,
      priority,
      sector
    });
    setTitle("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando ocorrências...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/safety" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fila de Ocorrências & Incidentes</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie e despache equipes de campo para atendimento a ocorrências patrimoniais ou emergências médicas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Plus size={14} className="text-purple-755" /> Relatar Ocorrência
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Título do Incidente</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Vazamento de Gás na Cozinha"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="crowd">Aglomeração / Tumulto</option>
                <option value="health">Saúde / Emergência Médica</option>
                <option value="fire">Combate a Incêndio</option>
                <option value="security">Segurança Patrimonial</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Prioridade</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="critical">Crítica</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Setor / Local</label>
                <input
                  type="text"
                  required
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Relatar Incidente
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Incidente registrado!</span>}
          </form>

          {/* List of incidents */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Fila Ativa</h3>
            <div className="divide-y divide-slate-100">
              {incidents.map(inc => (
                <div key={inc.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <Link to={`/admin/safety/incidents/${inc.id}`} className="text-slate-900 text-sm font-bold block hover:text-purple-700 hover:underline">
                      {inc.title}
                    </Link>
                    <span className="text-[10px] text-slate-400 block font-mono">Setor: {inc.sector} | Categoria: {inc.category} | Criado em: {inc.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${inc.priority === "critical" || inc.priority === "high" ? "bg-red-50 text-red-750 border-red-100" : "bg-slate-50 text-slate-700 border-slate-100"}`}>
                      {inc.priority}
                    </span>
                    <span className="text-[8px] font-bold px-2 py-0.5 rounded border border-purple-100 bg-purple-50 text-purple-700 uppercase">
                      {inc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
