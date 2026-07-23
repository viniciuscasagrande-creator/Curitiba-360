import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useCmsDashboard } from "../hooks/useCmsDashboard";
import { Sparkles, Plus, Check } from "lucide-react";

export default function CmsPersonalizationPage() {
  const { personalizationRules, savePersonalizationRule, loading } = useCmsDashboard();
  const [name, setName] = useState("");
  const [parameter, setParameter] = useState("clima == chuva");
  const [targetContent, setTargetContent] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !targetContent) return;
    savePersonalizationRule({
      name,
      parameter,
      targetContent
    });
    setName("");
    setTargetContent("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando regras de personalização...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Personalização de Conteúdo</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Customize o que o visitante vê dependendo do clima de Curitiba em tempo real, da origem geográfica do visitante ou do idioma configurado no navegador.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Add form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Sparkles size={14} className="text-purple-600" /> Nova Regra
            </h3>
            
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome do Segmento</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Turistas em Dia de Chuva"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Condição (Gatilho)</label>
              <select value={parameter} onChange={(e) => setParameter(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="clima == chuva">Clima Chuvoso em Curitiba</option>
                <option value="temperatura <= 12">Temperatura abaixo de 12°C</option>
                <option value="idioma != pt-BR">Idioma Estrangeiro</option>
                <option value="origem == curitiba">Visitante Local (Curitibano)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Ação / Bloco Injetado</label>
              <input
                type="text"
                required
                value={targetContent}
                onChange={(e) => setTargetContent(e.target.value)}
                placeholder="Ex: Recomendar Museus e Cafés"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Ativar Regra
            </button>
            {success && (
              <span className="text-emerald-700 font-bold block pt-1 text-center">
                Regra cadastrada!
              </span>
            )}
          </form>

          {/* List of rules */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Regras de Exibição Dinâmica</h3>
            <div className="divide-y divide-slate-100">
              {personalizationRules.map(rule => (
                <div key={rule.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div className="space-y-1">
                    <strong className="text-slate-900 text-sm block">{rule.name}</strong>
                    <span className="text-[10px] text-slate-400 block font-mono">Gatilho: {rule.parameter}</span>
                    <span className="text-[10px] text-slate-500 block">Ação: {rule.targetContent}</span>
                  </div>

                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold">
                    Ativa
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
