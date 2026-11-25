import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useEsgDashboard } from "../hooks/useEsgDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, Plus } from "lucide-react";

export default function EsgProjectsPage() {
  const { projects, saveProject, loading } = useEsgDashboard();
  const [name, setName] = useState("");
  const [targetOds, setTargetOds] = useState("ODS 13");
  const [investment, setInvestment] = useState(15000);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    saveProject({
      name,
      targetOds: [targetOds],
      investment: Number(investment)
    });
    setName("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando projetos ESG...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/esg" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Projetos & Ações ESG</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Cadastre novos projetos socioambientais vinculados aos Objetivos de Desenvolvimento Sustentável (ODS) da ONU.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Award size={14} className="text-purple-750" /> Iniciar Projeto
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome da Iniciativa</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Plantio de Nativas nos Parques"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Aporte Inicial (BRL)</label>
                <input
                  type="number"
                  required
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">ODS Primário</label>
                <select value={targetOds} onChange={(e) => setTargetOds(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                  <option value="ODS 11">ODS 11 - Cidades Sustentáveis</option>
                  <option value="ODS 12">ODS 12 - Consumo Responsável</option>
                  <option value="ODS 13">ODS 13 - Ação Climática</option>
                  <option value="ODS 15">ODS 15 - Vida Terrestre</option>
                </select>
              </div>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Lançar Iniciativa ODS
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Iniciativa criada!</span>}
          </form>

          {/* List of projects */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Portfólio de Ações Ambientais</h3>
            <div className="divide-y divide-slate-100">
              {projects.map(proj => (
                <div key={proj.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm block">{proj.name}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">Alvo: {proj.targetOds.join(", ")} | Aporte: R$ {proj.investment.toLocaleString()}</span>
                  </div>

                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${proj.status === "active" || proj.status === "in_progress" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-blue-50 text-blue-700 border-blue-100"}`}>
                    {proj.status}
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
