import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSupportDashboard } from "../hooks/useSupportDashboard";
import { Plus, BookOpen, Check } from "lucide-react";

export default function KnowledgeBasePage() {
  const { articles, saveArticle, loading } = useSupportDashboard();
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Financeiro");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    saveArticle({
      title,
      category,
      content,
      author: "Comitê de Suporte"
    });
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando base de conhecimento...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Base de Conhecimento</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Escreva e gerencie artigos de FAQ para autoatendimento de parceiros e clientes no portal principal.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1"
          >
            <Plus size={14} /> Novo Artigo
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 max-w-xl text-xs">
            <h3 className="text-sm font-bold text-slate-900 my-0">Publicar Novo Artigo</h3>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Título do Artigo</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Como configurar repasses automáticos do split"
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Categoria</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl">
                  <option value="Financeiro">Financeiro</option>
                  <option value="Conta">Conta</option>
                  <option value="FAQ">FAQ</option>
                  <option value="Operação">Operação</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Conteúdo em Markdown / Texto</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="p-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
                  Publicar Artigo
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="h-9 px-4 font-bold text-slate-707 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer border-none transition">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Articles List */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100 text-xs">
            {articles.map(art => (
              <div key={art.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[9px]">
                    {art.category}
                  </span>
                  <span className="text-[10px] text-slate-400">Autor: {art.author}</span>
                </div>
                <strong className="text-slate-900 text-sm block">{art.title}</strong>
                <p className="text-slate-600 my-0 leading-relaxed">{art.content}</p>
                <span className="text-[10px] text-slate-400 block mt-1">Atualizado em: {new Date(art.updatedAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
