import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAIChat } from "../hooks/useAIChat";
import { Brain, Cpu, MessageSquare, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";

export default function AIDashboardPage() {
  const { kpis, insights, loading } = useAIChat();

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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">AI Console & Intelligence</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Console central de monitoramento do AI Gateway, consumo de LLMs, insights preditivos de faturamento e regras do Copilot.</p>
        </div>

        {/* AI KPIs */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <MessageSquare size={21} />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500 my-0">Total de Conversas (IA)</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 my-0">{kpis?.totalConversations || 0}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Cpu size={21} />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500 my-0">Tempo Médio de Resposta</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 my-0">{kpis?.averageResponseTimeMs || 0} ms</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <TrendingUp size={21} />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500 my-0">Acurácia Preditiva (Forecast)</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 my-0">{kpis?.forecastAccuracyPercentage || 0}%</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <Brain size={21} />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500 my-0">Faturamento Mensal Estimado (Tokens)</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 my-0">${kpis?.estimatedCostUsd || 0}</p>
          </div>
        </section>

        {/* AI Preditivo / Insights */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <Sparkles size={18} className="text-purple-600" />
            Insights de Performance Ativos
          </h3>
          <div className="mt-4 space-y-4">
            {insights.map((ins) => (
              <div key={ins.id} className={`p-4 border rounded-2xl ${ins.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                <h4 className="font-bold my-0">{ins.title}</h4>
                <p className="text-xs mt-1 my-0">{ins.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
