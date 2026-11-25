import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useCmsDashboard } from "../hooks/useCmsDashboard";
import { Save, Check } from "lucide-react";

export default function CmsTranslationsPage() {
  const { translations, updateTranslation, loading } = useCmsDashboard();
  const [selectedId, setSelectedId] = useState(null);
  const [pt, setPt] = useState("");
  const [en, setEn] = useState("");
  const [es, setEs] = useState("");
  const [success, setSuccess] = useState(false);

  const handleEdit = (tr) => {
    setSelectedId(tr.id);
    setPt(tr.pt);
    setEn(tr.en);
    setEs(tr.es);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateTranslation(selectedId, { pt, en, es });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelectedId(null);
    }, 1200);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando chaves de tradução...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Dicionário de Traduções (i18n)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Customize e traduza termos e frases estáticas das interfaces públicas para Português, Inglês e Espanhol.
          </p>
        </div>

        {/* Translation editor */}
        {selectedId && (
          <form onSubmit={handleSave} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 max-w-xl">
            <h3 className="text-sm font-bold text-slate-900 my-0">Editar Chave: {translations.find(t => t.id === selectedId)?.key}</h3>
            
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Português (pt-BR)</label>
              <input
                type="text"
                required
                value={pt}
                onChange={(e) => setPt(e.target.value)}
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Inglês (en-US)</label>
              <input
                type="text"
                required
                value={en}
                onChange={(e) => setEn(e.target.value)}
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Espanhol (es-ES)</label>
              <input
                type="text"
                required
                value={es}
                onChange={(e) => setEs(e.target.value)}
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
                Salvar Traduções
              </button>
              <button type="button" onClick={() => setSelectedId(null)} className="h-9 px-4 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer border-none transition">
                Cancelar
              </button>
            </div>
            {success && <span className="text-emerald-700 font-bold block pt-1">Traduções atualizadas!</span>}
          </form>
        )}

        {/* Translation keys list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Chaves do Dicionário</h3>
          
          <div className="divide-y divide-slate-100">
            {translations.map(tr => (
              <div key={tr.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <strong className="text-slate-900 text-sm font-mono">{tr.key}</strong>
                  <div className="grid grid-cols-3 gap-6 text-[10px] text-slate-500 pt-1">
                    <span><strong>PT:</strong> {tr.pt}</span>
                    <span><strong>EN:</strong> {tr.en}</span>
                    <span><strong>ES:</strong> {tr.es}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleEdit(tr)}
                  className="h-8 px-3 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border-none cursor-pointer transition flex items-center gap-1 shrink-0"
                >
                  Traduzir
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
