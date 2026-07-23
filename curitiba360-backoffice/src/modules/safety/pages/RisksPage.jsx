import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSafetyDashboard } from "../hooks/useSafetyDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

export default function RisksPage() {
  const { risks, saveRisk, loading } = useSafetyDashboard();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("crowd");
  const [probability, setProbability] = useState(3);
  const [impact, setImpact] = useState(3);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    saveRisk({
      title,
      category,
      probability: parseInt(probability),
      impact: parseInt(impact)
    });
    setTitle("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando matriz de riscos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/safety/risk-map" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Mapa de Riscos
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Matriz de Riscos & Prevenção</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Identifique e classifique riscos operacionais multiplicando probabilidade e impacto para mitigações preventivas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Plus size={14} className="text-purple-755" /> Registrar Risco
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Título do Risco</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Falha de Energia no Palco"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Categoria do Risco</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="crowd">Multidão / Lotação</option>
                <option value="fire">Incêndio</option>
                <option value="electrical">Elétrico / Energia</option>
                <option value="weather">Climático</option>
                <option value="health">Saúde Operacional</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Probabilidade (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  required
                  value={probability}
                  onChange={(e) => setProbability(e.target.value)}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Impacto (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  required
                  value={impact}
                  onChange={(e) => setImpact(e.target.value)}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Salvar Risco
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Risco registrado!</span>}
          </form>

          {/* List of risks */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Riscos Mapeados</h3>
            <div className="divide-y divide-slate-100">
              {risks.map(r => (
                <div key={r.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm block">{r.title}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">Categoria: {r.category} | Probabilidade: {r.probability} | Impacto: {r.impact} | Score: {r.riskScore}</span>
                  </div>

                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${r.level === "critical" ? "bg-red-50 text-red-750 border-red-100" : r.level === "high" ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-slate-50 text-slate-700 border-slate-100"}`}>
                    {r.level}
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
