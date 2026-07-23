import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSupportDashboard } from "../hooks/useSupportDashboard";
import { Plus, CheckCircle, ShieldAlert } from "lucide-react";

export default function SupportTicketsPage() {
  const { tickets, createTicket, updateTicketStatus, loading } = useSupportDashboard();
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Financeiro");
  const [priority, setPriority] = useState("normal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) return;
    createTicket({
      subject,
      description,
      category,
      priority,
      status: "novo",
      customerId: "usr-cust-manual"
    });
    setSubject("");
    setDescription("");
    setShowForm(false);
  };

  const getPriorityBadge = (prio) => {
    switch (prio) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando central de tickets...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Tickets de Suporte</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Gerencie chamados abertos por clientes e parceiros para solução de problemas técnicos, financeiros ou operacionais.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1"
          >
            <Plus size={14} /> Novo Ticket
          </button>
        </div>

        {/* Create ticket form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 max-w-xl text-xs">
            <h3 className="text-sm font-bold text-slate-900 my-0">Abertura de Chamado Manual</h3>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Assunto</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Erro ao baixar PDF de ingresso"
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Descrição do Problema</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Categoria</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl">
                    <option value="Financeiro">Financeiro</option>
                    <option value="Ingresso">Ingresso</option>
                    <option value="Erro Técnico">Erro Técnico</option>
                    <option value="Parceiros">Parceiros</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Prioridade</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl">
                    <option value="critical">Crítica</option>
                    <option value="high">Alta</option>
                    <option value="normal">Normal</option>
                    <option value="low">Baixa</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
                  Confirmar Chamado
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="h-9 px-4 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer border-none transition">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Tickets list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100">
            {tickets.map(tick => (
              <div key={tick.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getPriorityBadge(tick.priority)}`}>
                      {tick.priority}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {tick.id}</span>
                  </div>
                  <strong className="text-slate-900 text-sm block">{tick.subject}</strong>
                  <p className="text-slate-500 my-0">{tick.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={tick.status}
                    onChange={(e) => updateTicketStatus(tick.id, e.target.value)}
                    className="h-8 px-2 border border-slate-200 rounded-xl bg-slate-50 cursor-pointer font-bold text-xs"
                  >
                    <option value="novo">Novo</option>
                    <option value="em_triagem">Triagem</option>
                    <option value="em_atendimento">Atendimento</option>
                    <option value="resolvido">Resolvido</option>
                    <option value="fechado">Fechado</option>
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
