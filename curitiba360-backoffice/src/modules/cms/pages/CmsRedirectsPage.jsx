import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useCmsDashboard } from "../hooks/useCmsDashboard";
import { Plus, Check } from "lucide-react";

export default function CmsRedirectsPage() {
  const { redirects, saveRedirect, loading } = useCmsDashboard();
  const [sourcePath, setSourcePath] = useState("");
  const [targetPath, setTargetPath] = useState("");
  const [code, setCode] = useState("301");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sourcePath || !targetPath) return;
    saveRedirect({
      sourcePath,
      targetPath,
      code: Number(code)
    });
    setSourcePath("");
    setTargetPath("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando redirecionamentos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Redirecionamentos de URL (Redirects)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie redirecionamentos permanentes (301) e temporários (302) para manter o tráfego orgânico e evitar erros 404 de links legados.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Add form */}
          <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0">Novo Redirecionamento</h3>
            
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Caminho de Origem</label>
              <input
                type="text"
                required
                value={sourcePath}
                onChange={(e) => setSourcePath(e.target.value)}
                placeholder="Ex: /antigo-guia"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Caminho de Destino</label>
              <input
                type="text"
                required
                value={targetPath}
                onChange={(e) => setTargetPath(e.target.value)}
                placeholder="Ex: /linha-turismo"
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Tipo de Redirecionamento</label>
              <select value={code} onChange={(e) => setCode(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="301">301 - Permanente (Recomendado)</option>
                <option value="302">302 - Temporário</option>
              </select>
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Adicionar Regra
            </button>
            {success && (
              <span className="text-emerald-700 font-bold block pt-1 text-center">
                Redirecionamento salvo!
              </span>
            )}
          </form>

          {/* Redirects list */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Regras de Redirect Ativas</h3>
            <div className="divide-y divide-slate-100">
              {redirects.map(red => (
                <div key={red.id} className="py-3.5 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-500 font-mono">De: </span>
                    <strong className="text-slate-800 font-mono">{red.sourcePath}</strong>
                    <div className="text-[10px] text-slate-400 mt-1">
                      <span className="text-slate-500 font-mono">Para: </span>
                      <span className="font-mono">{red.targetPath}</span>
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 font-mono font-bold text-[10px] text-slate-700 shrink-0">
                    HTTP {red.code}
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
