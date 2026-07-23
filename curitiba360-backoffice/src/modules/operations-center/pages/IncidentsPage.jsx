import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOperationsDashboard } from "../hooks/useOperationsDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert, Plus, HelpCircle } from "lucide-react";

export default function IncidentsPage() {
  const { incidents, saveIncident, loading } = useOperationsDashboard();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("p3");
  const [category, setCategory] = useState("device");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    saveIncident({
      title,
      priority,
      category,
      description
    });
    setTitle("");
    setDescription("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
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
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/operations" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Centro
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Incidentes Operacionais</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o tempo decorrido, triagens ativas, responsáveis e conformidade com o SLA de resolução de falhas críticas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <ShieldAlert size={14} className="text-purple-700" /> Reportar Incidente
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Título do Ocorrido</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Queda de Energia Setor Sul"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Prioridade</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                  <option value="p1">P1 — Crítico</option>
                  <option value="p2">P2 — Alto</option>
                  <option value="p3">P3 — Médio</option>
                  <option value="p4">P4 — Baixo</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Categoria</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                  <option value="device">Dispositivo / Catraca</option>
                  <option value="payment">Pagamento / Checkout</option>
                  <option value="security">Segurança / Acesso</option>
                  <option value="infrastructure">Infraestrutura</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Descrição Detalhada</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explique o impacto aos clientes e ações executadas..."
                className="p-3 border border-slate-200 rounded-xl"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Abrir Ocorrência
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Incidente aberto!</span>}
          </form>

          {/* List of incidents */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono">
            <h3 className="text-lg font-bold text-slate-900 my-0 font-sans">Histórico de Ocorrências</h3>
            <div className="divide-y divide-slate-100">
              {incidents.map(inc => (
                <div key={inc.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 text-xs font-sans">{inc.title}</strong>
                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${inc.priority === "p1" || inc.priority === "p2" ? "bg-red-50 text-red-700 border-red-150" : "bg-amber-50 text-amber-700 border-amber-150"}`}>
                        {inc.priority}
                      </span>
                    </div>
                    <span className="text-slate-455 block font-sans text-[10px]">{inc.description || "Sem descrição informada."}</span>
                    <div className="flex gap-4 text-slate-400 font-mono text-[9px]">
                      <span>Decorridos: {inc.elapsedMinutes} min</span>
                      <span>•</span>
                      <span>SLA restante: {inc.slaRemainingMinutes} min</span>
                    </div>
                  </div>

                  <Link
                    to={`/admin/operations/incidents/${inc.id}`}
                    className="h-8 px-3 font-bold text-purple-755 hover:text-purple-805 bg-purple-50 hover:bg-purple-100 rounded-xl cursor-pointer transition flex items-center justify-center gap-1 hover:no-underline border border-purple-100 font-sans text-xs shrink-0"
                  >
                    Ver Linha de Tempo
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
