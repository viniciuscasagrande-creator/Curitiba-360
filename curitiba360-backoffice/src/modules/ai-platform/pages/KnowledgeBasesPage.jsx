import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAiDashboard } from "../hooks/useAiDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Upload, Check } from "lucide-react";

export default function KnowledgeBasesPage() {
  const { knowledgeBases, saveKnowledgeBase, loading } = useAiDashboard();
  const [name, setName] = useState("");
  const [sourceType, setSourceType] = useState("documents");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    saveKnowledgeBase({
      name,
      sourceType
    });
    setName("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando bases de conhecimento...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Bases de Conhecimento (RAG)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Suba manuais de atrativos turísticos, termos de uso ou políticas de reembolso para servirem de contexto imediato de consulta para os LLMs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Upload size={14} className="text-purple-700" /> Cadastrar Base
            </h3>
            
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome da Base</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Guia Gastronômico PDF"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Tipo de Origem</label>
              <select value={sourceType} onChange={(e) => setSourceType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="documents">Documentos / PDFs</option>
                <option value="cms">Dados do CMS</option>
                <option value="support">FAQ de Suporte</option>
                <option value="website">URL / Crawler Web</option>
              </select>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Iniciar Indexação
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Base cadastrada!</span>}
          </form>

          {/* List of bases */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Bases Ativas no RAG</h3>
            <div className="divide-y divide-slate-100">
              {knowledgeBases.map(kb => (
                <div key={kb.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm block">{kb.name}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">Tipo: {kb.sourceType} | Documentos: {kb.documentCount} | Chunks: {kb.chunkCount}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${kb.status === "ready" ? "bg-emerald-50 text-emerald-700 border-emerald-150" : "bg-blue-50 text-blue-700 border-blue-150"}`}>
                      {kb.status}
                    </span>
                    <button className="h-8 px-3 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border-none rounded-xl cursor-pointer transition flex items-center gap-1">
                      <RefreshCw size={12} /> Indexar
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
