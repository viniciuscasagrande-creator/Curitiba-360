import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAiDashboard } from "../hooks/useAiDashboard";
import { Link } from "react-router-dom";
import { Layers, ArrowLeft, Save, Plus } from "lucide-react";

export default function PromptLibraryPage() {
  const { prompts, savePrompt, loading } = useAiDashboard();
  const [name, setName] = useState("");
  const [type, setType] = useState("system");
  const [template, setTemplate] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !template) return;
    savePrompt({
      name,
      type,
      template,
      variables: ["user_query"]
    });
    setName("");
    setTemplate("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando biblioteca de prompts...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/ai" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Biblioteca de Prompts</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Mantenha instruções de sistema versionadas de forma isolada do código-fonte para facilitar testes A/B de respostas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Layers size={14} className="text-purple-700" /> Criar Prompt
            </h3>
            
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome do Prompt</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: System Roteiro Turístico"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Tipo</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="system">Prompt de Sistema (System)</option>
                <option value="task">Prompt de Tarefa (Task)</option>
                <option value="classification">Classificação</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Prompt Template</label>
              <textarea
                rows={6}
                required
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                placeholder="Use chaves para variáveis, ex: {user_query}..."
                className="p-3 border border-slate-200 rounded-xl font-mono text-[10px]"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Salvar Prompt
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Prompt publicado!</span>}
          </form>

          {/* List of prompts */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Prompts de Sistema Ativos</h3>
            <div className="divide-y divide-slate-100">
              {prompts.map(pr => (
                <div key={pr.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <strong className="text-slate-900 text-sm block">{pr.name}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">Tipo: {pr.type} | Versão: v{pr.version}</span>
                    <pre className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-mono text-slate-600 max-h-24 overflow-y-auto whitespace-pre-wrap">
                      {pr.template}
                    </pre>
                  </div>

                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold uppercase shrink-0">
                    ativo
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
