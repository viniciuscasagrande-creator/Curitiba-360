import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernmentDashboard } from "../hooks/useGovernmentDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, HelpCircle, AlertCircle, CheckCircle } from "lucide-react";

export default function GovOuvidoriaPage() {
  const { data, createOuvidoria, loading } = useGovernmentDashboard();
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("Reclamação");
  const [subject, setSubject] = useState("");

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando ouvidoria...
        </div>
      </AdminLayout>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) return;
    createOuvidoria({
      category,
      subject,
      status: "pending"
    });
    setSubject("");
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Ouvidoria Geral</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Gerenciamento de manifestações dos cidadãos - Denúncias, reclamações, sugestões e elogios.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 px-3 h-9 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition"
          >
            <Plus size={16} /> Nova Manifestação
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 my-0">Cadastrar Nova Manifestação</h3>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo de Manifestação</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full h-8 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-white"
              >
                <option value="Reclamação">Reclamação</option>
                <option value="Denúncia">Denúncia</option>
                <option value="Sugestão">Sugestão</option>
                <option value="Elogio">Elogio</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Assunto / Descrição</label>
              <textarea
                rows={3}
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-white"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 h-8 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg cursor-pointer border-none transition">
                Enviar Protocolo
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

        <div className="grid grid-cols-1 gap-4">
          {data.ouvidoria.map(ouv => (
            <div key={ouv.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl border ${
                    ouv.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"
                  }`}>
                    {ouv.status === "pending" ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 my-0">{ouv.category}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">Protocolo: {ouv.id} | Data: {ouv.date}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono ${
                  ouv.status === "pending" ? "text-amber-700 bg-amber-50" : "text-emerald-700 bg-emerald-50"
                }`}>
                  {ouv.status === "pending" ? "Pendente" : "Respondido"}
                </span>
              </div>
              <p className="text-slate-600 text-xs my-0 leading-relaxed">{ouv.subject}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
