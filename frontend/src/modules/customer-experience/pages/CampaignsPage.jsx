import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useExperienceDashboard } from "../hooks/useExperienceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Percent, Plus } from "lucide-react";

export default function CampaignsPage() {
  const { campaigns, saveCampaign, loading } = useExperienceDashboard();
  const [name, setName] = useState("");
  const [type, setType] = useState("cross_sell");
  const [audience, setAudience] = useState(1000);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    saveCampaign({
      name,
      type,
      audience: Number(audience)
    });
    setName("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando campanhas...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Campanhas & Réguas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Cadastre novas réguas automáticas de carrinho abandonado ou cross-selling de ingressos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Create Form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Percent size={14} className="text-purple-755" /> Agendar Disparo
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome da Campanha</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Oferta Inverno Ópera de Arame"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Volume Estimado</label>
                <input
                  type="number"
                  required
                  value={audience}
                  onChange={(e) => setAudience(Number(e.target.value))}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-705">Objetivo</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                  <option value="cross_sell">Cross Selling</option>
                  <option value="abandoned_cart">Carrinho Abandonado</option>
                  <option value="loyalty">Fidelização</option>
                </select>
              </div>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Salvar Régua
            </button>
            {success && <span className="text-emerald-700 font-bold block pt-1 text-center">Campanha programada!</span>}
          </form>

          {/* List of campaigns */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
            <h3 className="text-lg font-bold text-slate-900 my-0 font-sans">Campanhas Ativas</h3>
            <div className="divide-y divide-slate-100">
              {campaigns.map(camp => (
                <div key={camp.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1 font-sans">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 text-xs">{camp.name}</strong>
                      <span className="bg-slate-100 text-slate-650 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px] font-mono">
                        {camp.type}
                      </span>
                    </div>
                    <div className="flex gap-4 text-slate-455 text-[9px] font-mono">
                      <span>Público: {camp.audience.toLocaleString()}</span>
                      <span>•</span>
                      <span>Enviado: {camp.delivered.toLocaleString()}</span>
                      <span>•</span>
                      <span>Cliques: {camp.clicked.toLocaleString()}</span>
                    </div>
                  </div>

                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${camp.status === "running" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-700 border-slate-100"}`}>
                    {camp.status}
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
