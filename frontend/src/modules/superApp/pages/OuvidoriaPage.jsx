import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function OuvidoriaPage() {
  const [type, setType] = useState("sugestao");
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;
    setSuccess(true);
    setDescription("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/services" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar aos Serviços
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Ouvidoria Municipal</h2>
          <p className="text-[10px] text-slate-500 m-0">Canal direto para reclamações, denúncias, elogios e sugestões municipais.</p>
        </div>

        {success ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-3xl text-center space-y-3 animate-fadeIn my-6">
            <CheckCircle size={40} className="text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold m-0">Manifestação Registrada!</h3>
            <p className="text-[10px] m-0">Agradecemos sua colaboração. Sua manifestação foi encaminhada para análise da Controladoria Geral do Município.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 block uppercase">Tipo de Manifestação</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full pl-3 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="sugestao">Sugestão</option>
                <option value="reclamacao">Reclamação</option>
                <option value="elogio">Elogio</option>
                <option value="denuncia">Denúncia</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 block uppercase">Mensagem</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva de forma clara e objetiva a situação..."
                rows={4}
                required
                className="w-full pl-3 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs resize-none"
              />
            </div>

            <div className="flex items-center gap-2 select-none">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="anonymous" className="text-[10px] text-slate-655 font-bold cursor-pointer">
                Enviar de forma anônima
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition border-none cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Send size={14} /> Registrar Manifestação
            </button>
          </form>
        )}
      </div>
    </SuperAppLayout>
  );
}
