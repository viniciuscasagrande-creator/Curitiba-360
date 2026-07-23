import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernmentDashboard } from "../hooks/useGovernmentDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Landmark, Award } from "lucide-react";

export default function GovProgramsPage() {
  const { data, createProgram, loading } = useGovernmentDashboard();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [secretariat, setSecretariat] = useState("sec-tecnologia");
  const [budget, setBudget] = useState("");

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando programas...
        </div>
      </AdminLayout>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) return;
    createProgram({
      name,
      description,
      secretariatId: secretariat,
      secretariatName: secretariat === "sec-tecnologia" ? "Secretaria de Tecnologia" : "Secretaria do Meio Ambiente",
      budget: Number(budget) || 0,
      status: "active",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "2028-12-31"
    });
    setName("");
    setDescription("");
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Programas Governamentais</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Planejamento e coordenação de grandes iniciativas municipais do ecossistema.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 px-3 h-9 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition"
          >
            <Plus size={16} /> Novo Programa
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 my-0">Cadastrar Novo Programa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Nome do Programa</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full h-8 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Orçamento Inicial (R$)</label>
                <input
                  type="number"
                  required
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  className="w-full h-8 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-white"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Secretaria Responsável</label>
              <select
                value={secretariat}
                onChange={e => setSecretariat(e.target.value)}
                className="w-full h-8 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-white"
              >
                <option value="sec-tecnologia">Secretaria de Tecnologia e Inovação</option>
                <option value="sec-meio-ambiente">Secretaria do Meio Ambiente</option>
                <option value="sec-turismo">Instituto Municipal de Turismo</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Descrição/Objetivos</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-white"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 h-8 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg cursor-pointer border-none transition">
                Salvar Programa
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
          {data.programs.map(prog => (
            <div key={prog.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-purple-50 rounded-xl text-purple-700">
                    <Landmark size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 my-0">{prog.name}</h3>
                    <span className="text-[10px] text-slate-500 font-mono">ID: {prog.id} | {prog.secretariatName}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold font-mono text-emerald-700 bg-emerald-50 rounded-full">
                  Ativo
                </span>
              </div>
              <p className="text-slate-600 text-xs my-0 leading-relaxed">{prog.description}</p>
              <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono">
                <span>Orçamento: R$ {prog.budget.toLocaleString("pt-BR")}</span>
                <span>Vigência: {prog.startDate} até {prog.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
