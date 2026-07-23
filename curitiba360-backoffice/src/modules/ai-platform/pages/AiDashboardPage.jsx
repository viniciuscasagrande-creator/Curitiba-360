import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAiDashboard } from "../hooks/useAiDashboard";
import { Link } from "react-router-dom";
import { Cpu, Users, Layers, DollarSign, Activity, AlertTriangle, Shield, Settings, Play } from "lucide-react";

export default function AiDashboardPage() {
  const { summary, alerts, loading } = useAiDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando painel de inteligência artificial...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Plataforma de Inteligência Artificial</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Orquestração unificada de LLMs (Gemini, GPT, Claude), controle de orçamentos, monitoramento de RAG e aplicação de Guardrails de segurança.
          </p>
        </div>

        {/* Alerts section */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((al) => (
              <div key={al.id} className="p-4 bg-amber-50 border border-amber-150 rounded-2xl flex items-start gap-2.5 text-xs text-amber-850">
                <AlertTriangle className="shrink-0 text-amber-600 mt-0.5" size={16} />
                <div>
                  <strong className="block text-slate-900 font-bold">{al.title}</strong>
                  <span className="text-[11px] text-slate-600">{al.description}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KPIs grid */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Requisições Hoje</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.executionsToday.toLocaleString()}</span>
            <span className="text-[10px] text-slate-455 block">Taxa de sucesso: {summary.successRate}%</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Custo Mensal Consolidado</span>
            <span className="text-2xl font-extrabold text-emerald-650 block">R$ {summary.monthlyCost.toLocaleString()}</span>
            <span className="text-[10px] text-slate-455 block">Orçamento: R$ {summary.monthlyBudget.toLocaleString()}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Desempenho Geral</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.averageLatencyMs} ms</span>
            <span className="text-[10px] text-emerald-650 font-semibold block">Fallback rate: {summary.fallbackRate}%</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Respostas Bloqueadas</span>
            <span className="text-2xl font-extrabold text-red-600 block">{summary.blockedResponses}</span>
            <span className="text-[10px] text-slate-400 block">Guardrails de Conteúdo/PII</span>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="space-y-4 text-xs">
          <h3 className="text-lg font-bold text-slate-900 my-0">Orquestração & Governança</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/ai/agents" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Users className="text-emerald-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Agentes Especializados</h4>
                <p className="text-xs text-slate-505 mt-1">Configure parâmetros de temperatura, buffers de contexto e aprovação humana.</p>
              </div>
            </Link>

            <Link to="/admin/ai/models" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Cpu className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Model Router & Provedores</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie chaves secretas de modelos OpenAI, Gemini, Claude e prioridade de fallbacks.</p>
              </div>
            </Link>

            <Link to="/admin/ai/prompts" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Layers className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Prompt Library</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe histórico de versões de prompts de sistema e templates de variáveis.</p>
              </div>
            </Link>

            <Link to="/admin/ai/knowledge" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Activity className="text-indigo-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Bases de Conhecimento (RAG)</h4>
                <p className="text-xs text-slate-505 mt-1">Indexe PDFs, políticas, FAQs e dados do CMS em nossa Base Vetorial isolada.</p>
              </div>
            </Link>

            <Link to="/admin/ai/executions" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Shield className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Observabilidade & Logs</h4>
                <p className="text-xs text-slate-505 mt-1">Monitore tempos de resposta, custo por chamada, tokens e logs de auditoria.</p>
              </div>
            </Link>

            <Link to="/admin/ai/playground" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Play className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">AI Playground</h4>
                <p className="text-xs text-slate-505 mt-1">Teste prompts e compare respostas de múltiplos LLMs lado a lado em tempo real.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
