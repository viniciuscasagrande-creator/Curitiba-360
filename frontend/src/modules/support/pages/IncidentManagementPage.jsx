import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSupportDashboard } from "../hooks/useSupportDashboard";
import { Plus, AlertTriangle, Check } from "lucide-react";

export default function IncidentManagementPage() {
  const { incidents, saveIncident, loading } = useSupportDashboard();
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Pagamento");
  const [impact, setImpact] = useState("Normal");
  const [channels, setChannels] = useState(["Status Page"]);

  const handleToggleChannel = (ch) => {
    if (channels.includes(ch)) {
      setChannels(channels.filter(x => x !== ch));
    } else {
      setChannels([...channels, ch]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    saveIncident({
      title,
      category,
      impact,
      communicationSent: channels.join(" & ")
    });
    setTitle("");
    setShowForm(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando incidentes...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Incidentes Operacionais</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Gerencie e reporte instabilidades ativas nos módulos críticos de pagamento, emissão de tickets e infraestrutura.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1"
          >
            <Plus size={14} /> Reportar Incidente
          </button>
        </div>

        {/* Create form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 max-w-xl text-xs">
            <h3 className="text-sm font-bold text-slate-900 my-0">Nova Notificação de Instabilidade</h3>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Título do Incidente</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Lentidão no retorno de status de pagamento Pix"
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Categoria</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl">
                    <option value="Pagamento">Pagamento</option>
                    <option value="API Gateway">API Gateway</option>
                    <option value="Check-in">Check-in</option>
                    <option value="Infraestrutura">Infraestrutura</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Impacto</label>
                  <select value={impact} onChange={(e) => setImpact(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl">
                    <option value="Crítico">Crítico</option>
                    <option value="Urgente">Urgente</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700">Canais de Comunicação</label>
                <div className="flex gap-4">
                  {["Status Page", "E-mail", "WhatsApp", "Push Alert"].map(ch => (
                    <label key={ch} className="flex items-center gap-1.5 cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={channels.includes(ch)}
                        onChange={() => handleToggleChannel(ch)}
                      />
                      {ch}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
                  Publicar Incidente
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="h-9 px-4 font-bold text-slate-707 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer border-none transition">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Incidents List */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100 text-xs">
            {incidents.map(inc => (
              <div key={inc.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded font-bold uppercase text-[9px]">
                      {inc.impact}
                    </span>
                    <strong className="text-slate-900 text-sm block">{inc.title}</strong>
                  </div>
                  <p className="text-slate-500 my-0">Categoria: {inc.category} | Comunicação enviada: {inc.communicationSent}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-750 bg-slate-100 px-3 py-1 rounded-full uppercase border border-slate-200">
                    {inc.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 my-0">Identificado em: {new Date(inc.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
