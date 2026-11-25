import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDevopsDashboard } from "../hooks/useDevopsDashboard";
import { Play, GitPullRequest, RotateCcw } from "lucide-react";

export default function PipelinesPage() {
  const { pipelines, triggerPipeline, loading } = useDevopsDashboard();
  const [pipeName, setPipeName] = useState("Web Deploy Staging");
  const [branch, setBranch] = useState("develop");

  const handleTrigger = async (e) => {
    e.preventDefault();
    await triggerPipeline(pipeName, branch);
    alert("Pipeline disparada com sucesso! Acompanhe o log de execução.");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse bg-slate-200 rounded-3xl" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">GitHub Actions & Pipelines</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Gerencie e execute pipelines de testes, linters e implantações automáticas.</p>
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          {/* List of pipelines */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Fila de Execuções</h3>
            <div className="space-y-3">
              {pipelines.map(p => (
                <div key={p.id} className="p-4 border border-slate-200 rounded-2xl bg-white flex justify-between items-center shadow-sm">
                  <div>
                    <h4 className="font-bold text-slate-800 my-0">{p.name}</h4>
                    <p className="text-xs text-slate-505 my-0 mt-1">Branch: {p.branch} • Duração: {p.durationSeconds}s • Executado: {new Date(p.createdAt).toLocaleTimeString()}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${p.status === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : p.status === 'running' ? 'bg-sky-50 text-sky-700 border-sky-200 animate-pulse' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {p.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trigger pipeline manual */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
            <h3 className="text-lg font-bold text-slate-900 my-0">Disparar Pipeline Manual</h3>
            <form onSubmit={handleTrigger} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Workflow</label>
                <select
                  value={pipeName}
                  onChange={(e) => setPipeName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 text-sm bg-white"
                >
                  <option value="Web Deploy Staging">Web Deploy Staging (QA)</option>
                  <option value="Web Deploy Production">Web Deploy Production (main)</option>
                  <option value="Mobile Build Android AAB">Mobile Build Android (AAB)</option>
                  <option value="Mobile OTA Update">Mobile Expo OTA Update</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Branch / Tag de Origem</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: develop ou release/v2.4"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full h-10 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-emerald-700 text-sm font-bold text-white hover:bg-emerald-800 transition border-none cursor-pointer flex items-center justify-center gap-2"
              >
                <Play size={16} />
                Disparar Execução
              </button>
            </form>
          </section>
        </section>
      </div>
    </AdminLayout>
  );
}
