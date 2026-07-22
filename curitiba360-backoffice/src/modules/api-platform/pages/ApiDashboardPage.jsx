import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useApiKeys } from "../hooks/useApiKeys";
import { Terminal, Shield, Webhook, Activity, Cpu, Sparkles, Key } from "lucide-react";

export default function ApiDashboardPage() {
  const { metrics, apiKeys, loading, error } = useApiKeys();

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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">API & Integration Console</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Gerenciamento global de API Keys, OAuth 2.1, assinaturas de Webhooks e consumo do Sandbox da Plataforma.</p>
        </div>

        {/* Dashboard metrics */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Activity size={21} />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500 my-0">Total de Chamadas (24h)</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 my-0">{metrics?.totalCalls || 0}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Cpu size={21} />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500 my-0">Latência Média</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 my-0">{metrics?.averageLatencyMs || 0} ms</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <Key size={21} />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500 my-0">Chaves de API Ativas</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 my-0">{apiKeys?.length || 0}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <Webhook size={21} />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500 my-0">Fila de Webhooks</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 my-0">Normal</p>
          </div>
        </section>

        {/* Security guidelines */}
        <section className="p-6 border border-amber-200 bg-amber-50 text-amber-900 rounded-3xl flex gap-3 items-start">
          <Shield size={22} className="text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold my-0">Diretriz de Segurança Crítica</h4>
            <p className="text-xs text-amber-800 my-0 mt-1">Nunca exponha API Keys privadas ou segredos OAuth no lado do cliente (frontend). Assinaturas de webhook devem ser validadas usando HMAC SHA-256 e timestamps curtos para evitar ataques de replay.</p>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
