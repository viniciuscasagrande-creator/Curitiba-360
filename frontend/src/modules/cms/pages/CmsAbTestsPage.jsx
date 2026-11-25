import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useCmsDashboard } from "../hooks/useCmsDashboard";
import { Plus, Shuffle, Check } from "lucide-react";

export default function CmsAbTestsPage() {
  const { experiments, saveExperiment, loading } = useCmsDashboard();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("Conversão de Venda");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    saveExperiment({
      name,
      variants: ["A (Controle)", "B (Variante)"],
      goal,
      trafficPct: 50,
      status: "ativo"
    });
    setName("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando experimentos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Testes A/B (Experimentos)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Divida o tráfego do portal entre diferentes versões de páginas e banners para medir cientificamente qual gera maior conversão de vendas de ingressos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Add form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0">Novo Experimento</h3>
            
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome do Teste</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Novo Banner de Inverno"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Métrica Objetivo</label>
              <select value={goal} onChange={(e) => setGoal(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="Conversão de Venda">Conversão de Venda (Checkout)</option>
                <option value="CTR do Banner">CTR do Banner</option>
                <option value="Inscrições na Newsletter">Inscrições na Newsletter</option>
              </select>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Iniciar Teste
            </button>
            {success && (
              <span className="text-emerald-700 font-bold block pt-1 text-center">
                Experimento ativo!
              </span>
            )}
          </form>

          {/* List of experiments */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Testes A/B em Andamento</h3>
            <div className="divide-y divide-slate-100">
              {experiments.map(exp => (
                <div key={exp.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div className="space-y-1">
                    <strong className="text-slate-900 text-sm block">{exp.name}</strong>
                    <span className="text-[10px] text-slate-450 block">Objetivo: {exp.goal} | Split de tráfego: {exp.trafficPct}%</span>
                    <span className="text-[10px] text-slate-450 block">Variantes: {exp.variants.join(" vs ")}</span>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${exp.status === "ativo" ? "bg-purple-50 text-purple-750 border-purple-200" : "bg-slate-50 text-slate-700 border-slate-200"}`}>
                      {exp.status}
                    </span>
                    {exp.winner && (
                      <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                        <Check size={10} /> Vencedor: {exp.winner}
                      </span>
                    )}
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
