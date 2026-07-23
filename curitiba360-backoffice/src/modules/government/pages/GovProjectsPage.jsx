import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernmentDashboard } from "../hooks/useGovernmentDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Target, Users, Calendar } from "lucide-react";

export default function GovProjectsPage() {
  const { data, createProject, loading } = useGovernmentDashboard();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [scope, setScope] = useState("");
  const [lead, setLead] = useState("");
  const [budget, setBudget] = useState("");
  const [programId, setProgramId] = useState("");

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando projetos...
        </div>
      </AdminLayout>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !scope || !lead) return;
    createProject({
      name,
      scope,
      lead,
      programId: programId || data.programs[0]?.id || "",
      budget: Number(budget) || 0,
      timeline: "Fase 1",
      teamSize: 5,
      status: "in_progress"
    });
    setName("");
    setScope("");
    setLead("");
    setBudget("");
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Projetos Públicos</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Gerenciamento de cronograma, escopo, equipes e execução de obras e sistemas públicos.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 px-3 h-9 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition"
          >
            <Plus size={16} /> Novo Projeto
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 my-0">Cadastrar Novo Projeto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Nome do Projeto</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full h-8 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Gestor / Liderança</label>
                <input
                  type="text"
                  required
                  value={lead}
                  onChange={e => setLead(e.target.value)}
                  className="w-full h-8 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Orçamento do Projeto (R$)</label>
                <input
                  type="number"
                  required
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  className="w-full h-8 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Programa Vinculado</label>
                <select
                  value={programId}
                  onChange={e => setProgramId(e.target.value)}
                  className="w-full h-8 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-white"
                >
                  {data.programs.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Escopo / Descritivo Técnico</label>
              <textarea
                rows={3}
                required
                value={scope}
                onChange={e => setScope(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-white"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 h-8 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg cursor-pointer border-none transition">
                Salvar Projeto
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 h-8 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer border-none transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.projects.map(proj => (
            <div key={proj.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-50 rounded-xl text-purple-700">
                    <Target size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 my-0">{proj.name}</h3>
                    <span className="text-[9px] text-slate-400 font-mono">ID: {proj.id}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[9px] font-bold font-mono text-purple-700 bg-purple-50 rounded-full">
                  {proj.timeline}
                </span>
              </div>

              <p className="text-slate-600 text-xs my-0 leading-relaxed">{proj.scope}</p>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>Progresso Físico</span>
                  <span>{proj.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${proj.progress}%` }} />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1"><Users size={12} /> {proj.lead}</span>
                <span>R$ {proj.budget.toLocaleString("pt-BR")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
