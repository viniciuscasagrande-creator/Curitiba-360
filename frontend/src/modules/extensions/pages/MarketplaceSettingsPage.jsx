import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Check } from "lucide-react";

export default function MarketplaceSettingsPage() {
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [sandboxTimeout, setSandboxTimeout] = useState(10);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn max-w-xl text-xs">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Configurações do Marketplace</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Ajuste políticas globais de atualização, limites de tempo de resposta de scripts de terceiros e permissões mínimas.
          </p>
        </div>

        <form onSubmit={handleSave} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div>
              <strong className="text-slate-900 text-sm block">Atualizações Automáticas (Patch)</strong>
              <span className="text-[10px] text-slate-450 block">Aplica patches de correção sem necessitar reautorizar escopos.</span>
            </div>
            <input
              type="checkbox"
              checked={autoUpdates}
              onChange={(e) => setAutoUpdates(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5 pt-2">
            <label className="font-bold text-slate-700">Timeout Máximo de Execução do Sandbox (segundos)</label>
            <input
              type="number"
              value={sandboxTimeout}
              onChange={(e) => setSandboxTimeout(Number(e.target.value))}
              className="h-9 px-3 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
              Salvar Configurações
            </button>
            {saved && (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Check size={14} /> Configurações salvas!
              </span>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
