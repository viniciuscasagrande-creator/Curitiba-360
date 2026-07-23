import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Check } from "lucide-react";

export default function RoadmapSettingsPage() {
  const [reviewFrequency, setReviewFrequency] = useState("semestral");
  const [dynamicPricing, setDynamicPricing] = useState(true);
  const [minExpansionScore, setMinExpansionScore] = useState(7.0);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn max-w-xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Configurações de Governança</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Ajuste parâmetros do comitê de portfólio, regras de precificação dinâmica e thresholds de score territorial.
          </p>
        </div>

        <form onSubmit={handleSave} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 text-xs">
          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Ciclo de Revisão do Comitê</label>
            <select
              value={reviewFrequency}
              onChange={(e) => setReviewFrequency(e.target.value)}
              className="h-9 px-2 border border-slate-200 rounded-xl"
            >
              <option value="mensal">Mensal (Execução)</option>
              <option value="trimestral">Trimestral (Prioridades)</option>
              <option value="semestral">Semestral (Portfólio)</option>
              <option value="anual">Anual (Estratégia)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Threshold Mínimo de Score para Expansão</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="5.0"
                max="9.5"
                step="0.5"
                value={minExpansionScore}
                onChange={(e) => setMinExpansionScore(Number(e.target.value))}
                className="w-full"
              />
              <strong className="text-slate-800 text-sm font-mono shrink-0">{minExpansionScore.toFixed(1)}</strong>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-b border-slate-50">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-700 block">Precificação Dinâmica por Demanda</span>
              <span className="text-[10px] text-slate-400">Permitir algoritmos dinâmicos de faturamento nos atrativos H2+</span>
            </div>
            <input
              type="checkbox"
              checked={dynamicPricing}
              onChange={(e) => setDynamicPricing(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
              Salvar Parâmetros
            </button>
            {saved && (
              <span className="text-emerald-700 flex items-center gap-1 font-bold">
                <Check size={14} /> Configurações Salvas!
              </span>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
