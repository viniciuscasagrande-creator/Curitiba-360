import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useCmsDashboard } from "../hooks/useCmsDashboard";
import { Plus, Image, Check } from "lucide-react";

export default function CmsBannersPage() {
  const { banners, saveBanner, loading } = useCmsDashboard();

  const [title, setTitle] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !targetUrl) return;
    saveBanner({
      title,
      targetUrl,
      imageUrl: null
    });
    setTitle("");
    setTargetUrl("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando banners...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Banners</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Cadastre carrosséis e banners promocionais sazonais. Você pode segmentar a exibição com base em localização e tags meteorológicas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0">Novo Banner</h3>
            
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Título do Banner</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Primavera nos Parques"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Link de Destino</label>
              <input
                type="text"
                required
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="Ex: /parques"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Salvar Banner
            </button>
            {success && (
              <span className="text-emerald-700 font-bold block pt-1 text-center">
                Banner publicado!
              </span>
            )}
          </form>

          {/* List of banners */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Banners Publicados</h3>
            <div className="divide-y divide-slate-100">
              {banners.map(ban => (
                <div key={ban.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <Image size={18} />
                    </div>
                    <div>
                      <strong className="text-slate-900 text-sm block">{ban.title}</strong>
                      <span className="text-[10px] text-slate-450 block">Destino: {ban.targetUrl}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-emerald-650 font-bold block">{ban.clickCount} Cliques</span>
                    <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold">
                      Ativo
                    </span>
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
