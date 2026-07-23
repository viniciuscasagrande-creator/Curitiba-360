import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useWorkforceDashboard } from "../hooks/useWorkforceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Plus } from "lucide-react";

export default function CandidatesPage() {
  const { candidates, saveCandidate, loading } = useWorkforceDashboard();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    saveCandidate({
      name,
      email,
      phone
    });
    setName("");
    setEmail("");
    setPhone("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando candidatos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/workforce/recruitment" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Recrutamento
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Banco de Candidatos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Adicione novos currículos de forma manual ou visualize candidatos em triagem ativa.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Plus size={14} className="text-purple-755" /> Cadastrar Candidato
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Roberta Souza"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: roberta@domain.com"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Telefone de Contato</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: (41) 99881-2233"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Salvar Cadastro
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Candidato registrado!</span>}
          </form>

          {/* List of candidates */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Fila de Candidatos</h3>
            <div className="divide-y divide-slate-100">
              {candidates.map(cand => (
                <div key={cand.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm block">{cand.name}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">E-mail: {cand.email} | Telefone: {cand.phone || "N/A"} | Fonte: {cand.source} | IA Score: {cand.score || "N/A"}%</span>
                  </div>

                  <span className="text-[9px] font-bold px-2 py-0.5 rounded border border-purple-100 bg-purple-50 text-purple-700 uppercase">
                    {cand.stage}
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
