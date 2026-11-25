import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnerDashboard } from "../hooks/usePartnerDashboard";
import { Link } from "react-router-dom";
import { Sparkles, BarChart3, Briefcase, ListTodo, Map, Flame, AlertTriangle, Settings, RefreshCw, Layers } from "lucide-react";

export default function PortfolioDashboardPage() {
  const { data, loading } = usePartnerDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando portfólio executivo...
        </div>
      </AdminLayout>
    );
  }

  const { kpis } = data;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        {/* Title */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0 flex items-center gap-2">
              <Layers size={28} className="text-purple-755 font-bold" /> Gestão de Inovação & Portfólio Estratégico (PMO)
            </h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Planejamento estratégico, roadmaps, OKRs, banco de ideias e priorização inteligente de projetos urbanos.
            </p>
          </div>
          <button className="flex items-center gap-1.5 px-3 h-9 bg-purple-50 text-purple-700 font-bold border border-purple-200 rounded-xl hover:bg-purple-100 transition text-[11px] cursor-pointer">
            <Sparkles size={14} /> IA Priorizar
          </button>
        </div>

        {/* KPIs grid */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider font-sans">Projetos Ativos</span>
            <span className="text-2xl font-extrabold text-slate-900 block font-mono">{kpis.activeProjects}</span>
            <span className="text-[10px] text-purple-700 font-bold block">{kpis.delayedProjects} Atrasados | {kpis.criticalProjects} Críticos</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider font-sans">Orçamento Consumido</span>
            <span className="text-2xl font-extrabold text-slate-900 block font-mono">R$ {(kpis.consumedBudget / 1000000).toFixed(1)}M</span>
            <span className="text-[10px] text-slate-455 block">De R$ {(kpis.totalInvestment / 1000000).toFixed(1)}M Alocados</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider font-sans">Benefício Estimado</span>
            <span className="text-2xl font-extrabold text-slate-900 block font-mono">R$ {(kpis.forecastBenefit / 1000000).toFixed(1)}M</span>
            <span className="text-[10px] text-slate-455 block">Realizado: R$ {(kpis.realizedBenefit / 1000000).toFixed(1)}M</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider font-sans">Alinhamento OKR</span>
            <span className="text-2xl font-extrabold text-slate-900 block font-mono">{kpis.okrsAchievedPct}%</span>
            <span className="text-[10px] text-emerald-655 font-bold block">Status: Alto Impacto</span>
          </div>
        </section>

        {/* Navigation Grid */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Painel do PMO Estratégico</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/portfolio/ideas" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Sparkles className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Banco de Ideias</h4>
                <p className="text-xs text-slate-505 mt-1">Capture e avalie inovações sugeridas por colaboradores e munícipes.</p>
              </div>
            </Link>

            <Link to="/admin/portfolio/business-cases" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Briefcase className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Business Cases</h4>
                <p className="text-xs text-slate-505 mt-1">Estudos de viabilidade, ROI, custos e análise RICE de novos projetos.</p>
              </div>
            </Link>

            <Link to="/admin/portfolio/projects" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <ListTodo className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Projetos & Programas</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe escopo, cronograma, equipes e status das entregas.</p>
              </div>
            </Link>

            <Link to="/admin/portfolio/roadmaps" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Map className="text-emerald-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Roadmaps Executivos</h4>
                <p className="text-xs text-slate-505 mt-1">Linha do tempo visual de entregas consolidadas por Quarter e Ano.</p>
              </div>
            </Link>

            <Link to="/admin/portfolio/kanban" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Flame className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Kanban & Sprints</h4>
                <p className="text-xs text-slate-505 mt-1">Gestão ágil de equipes, quadros de tarefas e velocidade das sprints.</p>
              </div>
            </Link>

            <Link to="/admin/portfolio/risks" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <AlertTriangle className="text-red-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Riscos & Benefícios</h4>
                <p className="text-xs text-slate-505 mt-1">Monitoramento de riscos e metas de valor capturado de sustentabilidade.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
