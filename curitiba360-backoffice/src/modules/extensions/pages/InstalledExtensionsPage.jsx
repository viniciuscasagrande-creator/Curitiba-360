import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMarketplace } from "../hooks/useMarketplace";
import { Settings, Save, AlertCircle } from "lucide-react";

export default function InstalledExtensionsPage() {
  const { data, updateConfig, loading } = useMarketplace();
  const [selectedId, setSelectedId] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [syncInterval, setSyncInterval] = useState(15);
  const [saved, setSaved] = useState(false);

  if (loading || !data || !data.installedExtensions) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando módulos instalados...
        </div>
      </AdminLayout>
    );
  }

  const handleEdit = (inst) => {
    setSelectedId(inst.extensionId);
    setApiKey(inst.config?.apiKey || "");
    setSyncInterval(inst.config?.syncIntervalMinutes || 15);
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    updateConfig(selectedId, {
      apiKey,
      syncIntervalMinutes: Number(syncInterval)
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setSelectedId(null);
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Extensões Instaladas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe chaves de API, credenciais e configurações de sincronização dos conectores ativos nesta conta.
          </p>
        </div>

        {/* Configurations edit modal/panel */}
        {selectedId && (
          <form onSubmit={handleSaveConfig} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 max-w-xl text-xs">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1.5">
              <Settings size={16} /> Configurações do Módulo
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Chave de API do Canal</label>
                <input
                  type="text"
                  required
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Ex: key_erp_••••••••"
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Intervalo de Sincronização (minutos)</label>
                <input
                  type="number"
                  required
                  value={syncInterval}
                  onChange={(e) => setSyncInterval(e.target.value)}
                  className="h-9 px-3 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1">
                  Salvar Parâmetros
                </button>
                <button type="button" onClick={() => setSelectedId(null)} className="h-9 px-4 font-bold text-slate-707 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer border-none transition">
                  Cancelar
                </button>
              </div>
              {saved && <span className="text-emerald-700 font-bold block pt-1">Configurações sincronizadas!</span>}
            </div>
          </form>
        )}

        {/* Installed plugins list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100 text-xs">
            {data.installedExtensions.length === 0 ? (
              <span className="text-slate-500 block py-4">// Nenhuma extensão instalada nesta organização.</span>
            ) : (
              data.installedExtensions.map(inst => {
                const ext = data.featuredExtensions.find(e => e.id === inst.extensionId);
                if (!ext) return null;
                return (
                  <div key={inst.extensionId} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <strong className="text-slate-900 text-sm">{ext.name}</strong>
                      <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 uppercase tracking-wider font-bold block w-fit mt-1">
                        {inst.status}
                      </span>
                      <div className="text-[10px] text-slate-450 mt-1">
                        Sincronização: {inst.config?.syncIntervalMinutes || "N/A"} min | API Key: {inst.config?.apiKey ? "••••" + inst.config.apiKey.slice(-4) : "Não configurado"}
                      </div>
                    </div>

                    <button
                      onClick={() => handleEdit(inst)}
                      className="h-8 px-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border-none cursor-pointer transition flex items-center gap-1"
                    >
                      <Settings size={12} /> Configurar
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
