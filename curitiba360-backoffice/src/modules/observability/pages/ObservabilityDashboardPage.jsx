import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useObservabilityDashboard } from "../hooks/useObservabilityDashboard";
import { Activity, ShieldAlert, Cpu, Layers, HelpCircle, HardDrive, Terminal } from "lucide-react";

export default function ObservabilityDashboardPage() {
  const { summary, services, incidents, loading, error } = useObservabilityDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse bg-slate-200 rounded-3xl" />
      </AdminLayout>
    );
  }

  if (error || !summary) {
    return (
      <AdminLayout>
        <section className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error || "Erro ao carregar dados do painel de observabilidade."}
        </section>
      </AdminLayout>
    );
  }

  const kpis = [
    { label: "Disponibilidade Global", value: `${summary.platform.availability}%`, icon: Activity, color: "text-blue-600 bg-blue-50" },
    { label: "Satisfação Apdex", value: summary.platform.apdex, icon: Cpu, color: "text-emerald-600 bg-emerald-50" },
    { label: "Serviços Operacionais", value: `${summary.services.operational}/${summary.services.total}`, icon: HardDrive, color: "text-purple-600 bg-purple-50" },
    { label: "Incidentes Ativos", value: summary.incidents.active, icon: ShieldAlert, color: "text-red-600 bg-red-50" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Observabilidade & Monitoramento</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Central técnica para análise de saúde de microsserviços, latência p95, taxas de erro e logs correlacionados com Request IDs.</p>
        </div>

        {/* KPIs Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map(({ label, value, icon: Icon, color }) => (
            <article key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${color}`}>
                <Icon size={21} />
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-500 my-0">{label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 my-0">{value}</p>
            </article>
          ))}
        </section>

        {/* Health status of services */}
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 my-0">Saúde dos Microsserviços</h3>
            <div className="mt-4 space-y-3">
              {services.map((srv) => (
                <div key={srv.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 my-0">{srv.name}</h4>
                    <p className="text-xs text-slate-505 my-0 mt-1">Ambiente: {srv.environment.toUpperCase()} • Disponibilidade: {srv.metrics.availability}%</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${srv.status === 'operational' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    {srv.status === 'operational' ? 'Operacional' : 'Degradado'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Active Incidents */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 my-0">Incidentes em Andamento</h3>
            <div className="mt-4 space-y-3">
              {incidents.length === 0 ? (
                <p className="text-sm text-slate-500 font-semibold my-4">Nenhum incidente ativo no momento.</p>
              ) : (
                incidents.map((inc) => (
                  <div key={inc.id} className="p-4 border border-red-200 bg-red-50/50 rounded-2xl">
                    <h4 className="font-bold text-red-800 my-0">{inc.title}</h4>
                    <p className="text-xs text-slate-707 my-0 mt-1">{inc.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100 border border-red-200 px-2 py-0.5 rounded-md">
                        SEVERIDADE: {inc.severity.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 border border-orange-200 px-2 py-0.5 rounded-md">
                        STATUS: {inc.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}
