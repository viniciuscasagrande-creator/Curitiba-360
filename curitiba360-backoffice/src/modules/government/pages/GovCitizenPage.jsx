import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Lightbulb, CheckSquare } from "lucide-react";

export default function GovCitizenPage() {
  const [ideas, setIdeas] = useState([
    { id: 1, title: "Ampliar ciclovia da Av. Batel", votes: 412, status: "under_review" },
    { id: 2, title: "Instalação de lixeiras de coleta seletiva inteligente", votes: 289, status: "approved" }
  ]);

  const [newIdea, setNewIdea] = useState("");

  const handleAddIdea = (e) => {
    e.preventDefault();
    if (!newIdea) return;
    setIdeas([
      ...ideas,
      { id: Date.now(), title: newIdea, votes: 1, status: "under_review" }
    ]);
    setNewIdea("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Participação Cidadã</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Consultas públicas, votações do orçamento participativo e sugestões diretas da comunidade.
          </p>
        </div>

        <form onSubmit={handleAddIdea} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-purple-700 font-bold">
            <Lightbulb size={16} />
            <h3 className="text-sm font-bold text-slate-900 my-0">Enviar Nova Ideia Legislativa</h3>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Ex: Criar parklets na Rua XV de Novembro..."
              value={newIdea}
              onChange={e => setNewIdea(e.target.value)}
              className="flex-1 h-9 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 bg-white"
            />
            <button type="submit" className="px-4 h-9 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl cursor-pointer border-none transition">
              Enviar Sugestão
            </button>
          </div>
        </form>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 my-0">Ideias Mais Votadas pelos Cidadãos</h3>
          <div className="grid grid-cols-1 gap-3">
            {ideas.map(idea => (
              <div key={idea.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex justify-between items-center">
                <div className="space-y-1">
                  <strong className="text-xs font-bold text-slate-900 block">{idea.title}</strong>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Status: {idea.status === "approved" ? "Encaminhado para Estudo" : "Em Votação"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold font-mono text-purple-700 bg-purple-50 px-2.5 py-1 rounded-xl">
                    {idea.votes} votos
                  </span>
                  <button
                    onClick={() => {
                      setIdeas(ideas.map(i => i.id === idea.id ? { ...i, votes: i.votes + 1 } : i));
                    }}
                    className="px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition"
                  >
                    Apoiar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
