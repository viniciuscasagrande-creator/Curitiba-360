import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDeveloperDashboard } from "../hooks/useDeveloperDashboard";
import { Link } from "react-router-dom";
import { Terminal, Database, PlayCircle, BarChart3, ShieldAlert, Cpu, Eye, ExternalLink } from "lucide-react";

export default function DeveloperDashboardPage() {
  const { summary, loading } = useDeveloperDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando indicadores do ecossistema...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Plataforma de Desenvolvedores</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o tráfego das APIs públicas, homologue novas integrações de parceiros B2B e configure webhooks.
          </p>
        </div>

        {/* Dashboard KPIs Grid */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Aplicações Ativas</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.registeredApps}</span>
            <span className="text-[10px] text-emerald-600 block">{summary.homologatedIntegrations} homologações concluídas</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Chamadas de API</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.apiCallsTotal.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 block">{summary.callsPerMinute} req/min em média</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Latência Média</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.avgLatencyMs}ms</span>
            <span className="text-[10px] text-emerald-650 font-semibold block">Abaixo do limite de 100ms</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Rate Limit reached</span>
            <span className="text-2xl font-extrabold text-rose-600 block">{summary.rateLimitsReachedCount}</span>
            <span className="text-[10px] text-slate-400 block">Este mês</span>
          </div>
        </section>

        {/* Shortcut Cards */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Menu de Configurações</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/developers/apps" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Terminal className="text-emerald-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Aplicações (OAuth2)</h4>
                <p className="text-xs text-slate-500 mt-1">Gerencie credenciais de parceiros, Client ID e chaves secretas.</p>
              </div>
            </Link>

            <Link to="/admin/developers/webhooks" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Database className="text-purple-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Webhooks & Eventos</h4>
                <p className="text-xs text-slate-505 mt-1">Configure endpoints HTTPS para receber notificações de pedidos e pagamentos.</p>
              </div>
            </Link>

            <Link to="/admin/developers/logs" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <BarChart3 className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Logs de API (Gateway)</h4>
                <p className="text-xs text-slate-505 mt-1">Pesquise erros de requisições, payloads JSON e latência de rotas.</p>
              </div>
            </Link>

            <Link to="/admin/developers/sandbox" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <PlayCircle className="text-indigo-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Console Sandbox</h4>
                <p className="text-xs text-slate-505 mt-1">Simule fluxos de pagamentos de teste e dispare webhooks de faturamento.</p>
              </div>
            </Link>

            <Link to="/admin/developers/plans" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Cpu className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Planos & Rate Limits</h4>
                <p className="text-xs text-slate-505 mt-1">Estabeleça limites de concorrência por plano (Free, Starter, Pro).</p>
              </div>
            </Link>

            <Link to="/admin/developers/marketplace" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <ExternalLink className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Marketplace de Integrações</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie conectores integrados de PMS hoteleiros e ERPs.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
