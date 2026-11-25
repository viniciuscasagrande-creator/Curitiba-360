import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDevopsDashboard } from "../hooks/useDevopsDashboard";
import { GitBranch, AlertCircle, Clock, Database, ToggleRight } from "lucide-react";

export default function DevopsDashboardPage() {
  const { pipelines, flags, backups, loading } = useDevopsDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse bg-slate-200 rounded-3xl" />
      </AdminLayout>
    );
  }

  const kpis = [
    { label: "Deploys (Semanal)", value: "32", icon: GitBranch, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Falhas de Build/Deploy", value: "1", icon: AlertCircle, color: "text-red-600 bg-red-50 border-red-100" },
    { label: "Tempo de Build Médio", value: "2m 15s", icon: Clock, color: "text-sky-600 bg-sky-50 border-sky-100" },
    { label: "Backups Automatizados", value: backups.length.toString(), icon: Database, color: "text-purple-600 bg-purple-50 border-purple-100" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Painel DevOps e Infraestrutura</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Monitore builds do Vite, deploys da Vercel, OTA updates do Expo e integridade dos backups do Firebase.</p>
        </div>

        {/* KPIs Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k, idx) => {
            const Icon = k.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                <span className={`p-3 rounded-2xl border ${k.color}`}>
                  <Icon size={24} />
                </span>
                <div>
                  <span className="text-xs font-bold text-slate-500 block">{k.label}</span>
                  <span className="text-2xl font-bold text-slate-900 mt-1 block">{k.value}</span>
                </div>
              </div>
            );
          })}
        </section>

        {/* System Deployment Overview */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Active pipelines list */}
          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Status das Pipelines Recentes</h3>
            <div className="space-y-3">
              {pipelines.slice(0, 3).map(p => (
                <div key={p.id} className="p-4 border border-slate-200 rounded-2xl flex justify-between items-center bg-slate-50">
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 my-0">{p.name}</h4>
                    <p className="text-[10px] text-slate-505 my-0 mt-0.5">Branch: {p.branch} • Gatilho: {p.trigger.toUpperCase()}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${p.status === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : p.status === 'running' ? 'bg-sky-50 text-sky-700 border-sky-200 animate-pulse' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {p.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Feature flags list */}
          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Feature Flags Ativas</h3>
            <div className="space-y-3">
              {flags.map(f => (
                <div key={f.id} className="p-4 border border-slate-200 rounded-2xl flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 my-0">{f.name}</h4>
                    <p className="text-[10px] text-slate-550 my-0 mt-0.5">{f.description}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${f.enabled ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                    {f.enabled ? 'ATIVADO' : 'DESATIVADO'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
