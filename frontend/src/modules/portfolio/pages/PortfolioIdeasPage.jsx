import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnerDashboard } from "../hooks/usePartnerDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, MessageSquare, Plus } from "lucide-react";

export default function PortfolioIdeasPage() {
  const { data, addIdea, loading } = usePartnerDashboard();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Mobilidade");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    addIdea({
      id: "idea-" + Date.now(),
      title,
      description,
      category,
      votes: 1,
      status: "screening",
      author: "Gestor PMO"
    });
    setTitle("");
    setDescription("");
  };

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando banco de ideias...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/portfolio" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Banco de Ideias & Funil de Inovação</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Envie novas ideias de tecnologia urbana e acompanhe as propostas enviadas por colaboradores do Curitiba 360.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Submissão */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Plus size={14} className="text-purple-755 font-bold" /> Propor Ideia
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Título da Proposta</label>
              <input type="text" placeholder="Ex: Sensor de Enchente IoT" value={title} onChange={(e) => setTitle(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Descrição da Ideia</label>
              <textarea placeholder="Explique os benefícios..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="p-2 border border-slate-200 rounded-xl bg-slate-50" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="Mobilidade">Mobilidade</option>
                <option value="Turismo">Turismo</option>
                <option value="ESG">ESG & Sustentabilidade</option>
              </select>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Enviar Proposta
            </button>
          </form>

          {/* Lista de ideias */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1">
              <Sparkles size={16} className="text-amber-505 fill-amber-500" /> Propostas Recentes
            </h3>

            <div className="divide-y divide-slate-100 font-mono text-[10px]">
              {data.ideas.map(idea => (
                <div key={idea.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-start text-sans font-sans">
                  <div>
                    <strong className="text-slate-900 text-xs block">{idea.title}</strong>
                    <p className="text-[10px] text-slate-655 my-1">{idea.description}</p>
                    <span className="text-[9px] text-slate-505 block">Autor: {idea.author} | Categoria: {idea.category}</span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded border border-amber-100 uppercase">
                      {idea.status}
                    </span>
                    <button className="flex items-center gap-1 h-5 px-1.5 font-bold text-[9px] text-slate-700 border border-slate-200 rounded hover:bg-slate-50 transition cursor-pointer">
                      <MessageSquare size={10} /> {idea.votes} Votos
                    </button>
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
