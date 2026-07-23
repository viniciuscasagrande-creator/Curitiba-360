import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernanceDashboard } from "../hooks/useGovernanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function CorpGovResolutionsPage() {
  const { data, loading, addResolution } = useGovernanceDashboard();
  const [title, setTitle] = useState("");

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando resoluções...
        </div>
      </AdminLayout>
    );
  }

  const handleAdd = () => {
    if (title.trim()) {
      addResolution({
        id: `res-${Date.now()}`,
        title: title.trim(),
        status: "proposed",
        votesFor: 0,
        votesAgainst: 0,
        abstentions: 0
      });
      setTitle("");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Deliberações & Resoluções</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o status de votação e publicação de resoluções e diretrizes regulatórias corporativas.
          </p>
        </div>

        {/* Resolutions list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <CheckCircle size={18} className="text-purple-755 font-bold" /> Livro de Resoluções
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px] space-y-4">
            {data.resolutions.map(res => (
              <div key={res.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{res.title}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {res.id} | Votos a favor: {res.votesFor} | Contra: {res.votesAgainst}</span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${res.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                  {res.status}
                </span>
              </div>
            ))}
          </div>

          {/* New proposed resolution */}
          <div className="flex gap-2 items-center pt-4 border-t border-slate-100">
            <input
              type="text"
              placeholder="Nova proposta de deliberação..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="h-8 px-3 rounded-lg border border-slate-200 text-[10px] w-64"
            />
            <button
              onClick={handleAdd}
              className="h-8 px-3 text-[10px] font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg cursor-pointer transition border-none"
            >
              Propor Resolução
            </button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
