import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernmentDashboard } from "../hooks/useGovernmentDashboard";
import { Link } from "react-router-dom";
import {
  TrendingUp, Target, Landmark, ShieldCheck, FileText, CheckCircle, HelpCircle,
  FileSpreadsheet, Users, Settings, Database, Activity, Map, Sparkles
} from "lucide-react";

export default function GovDashboardPage() {
  const { data, loading } = useGovernmentDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dados governamentais...
        </div>
      </AdminLayout>
    );
  }

  const kpis = [
    { title: "Programas Ativos", value: data.programs.length, icon: Landmark, color: "text-blue-600 bg-blue-50" },
    { title: "Projetos Públicos", value: data.projects.length, icon: Target, color: "text-purple-600 bg-purple-50" },
    { title: "Metas Atendidas", value: `${data.goals.filter(g => g.status === 'on_track').length} / ${data.goals.length}`, icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" },
    { title: "Execução Orçamentária", value: `${data.budget.executed ? ((data.budget.executed / data.budget.planned) * 100).toFixed(1) : 0}%`, icon: TrendingUp, color: "text-indigo-600 bg-indigo-50" }
  ];

  const submodules = [
    { name: "Programas Governamentais", path: "/admin/government/programs", desc: "Gestão de programas da gestão", icon: Landmark },
    { name: "Projetos Públicos", path: "/admin/government/projects", desc: "Cronogramas, equipes e orçamentos", icon: Target },
    { name: "Metas Governamentais", path: "/admin/government/goals", desc: "Metas de sustentabilidade e urbanismo", icon: CheckCircle },
    { name: "Indicadores Municipais", path: "/admin/government/indicators", desc: "Tecnologia, saúde e habitação", icon: Activity },
    { name: "Dados Abertos", path: "/admin/government/open-data", desc: "GeoJSON, APIs e catálogos", icon: Database },
    { name: "Portal Transparência", path: "/admin/government/transparency", desc: "Receitas e despesas municipais", icon: FileText },
    { name: "Orçamento Público", path: "/admin/government/budget", desc: "Execução orçamentária, PPA e LDO", icon: TrendingUp },
    { name: "Contratos Públicos", path: "/admin/government/contracts", desc: "Contratos de prestação de serviços", icon: ShieldCheck },
    { name: "Licitações & Compras", path: "/admin/government/procurement", desc: "Pregões eletrônicos e concorrências", icon: FileSpreadsheet },
    { name: "Convênios", path: "/admin/government/agreements", desc: "Ministérios e emendas parlamentares", icon: Landmark },
    { name: "Observatório Turístico & Urbano", path: "/admin/government/observatory", desc: "Dados econômicos e ambientais", icon: Map },
    { name: "Serviços Públicos Digitais", path: "/admin/government/public-services", desc: "Agendamentos, alvarás e certidões", icon: Sparkles },
    { name: "Participação Cidadã", path: "/admin/government/citizen", desc: "Consultas públicas e sugestões", icon: Users },
    { name: "Audiências Públicas", path: "/admin/government/hearings", desc: "Assembleias e audiências da LOA", icon: Users },
    { name: "Ouvidoria Geral", path: "/admin/government/ouvidoria", desc: "Denúncias, elogios e reclamações", icon: HelpCircle },
    { name: "Relatórios Estratégicos", path: "/admin/government/reports", desc: "Board packs e relatórios fiscais", icon: FileText },
    { name: "Configurações", path: "/admin/government/settings", desc: "Parâmetros do Governo Digital", icon: Settings }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Smart Governance & Governo Digital</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitoramento de metas, transparência, orçamento público e participação cidadã do ecossistema Curitiba 360.
          </p>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${kpi.color}`}>
                <kpi.icon size={22} className="font-bold" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">{kpi.title}</span>
                <strong className="text-2xl font-bold text-slate-900 block font-sans mt-0.5">{kpi.value}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Submodules Grid */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            Módulos Operacionais
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {submodules.map((sub, idx) => (
              <Link
                key={idx}
                to={sub.path}
                className="p-4 bg-slate-50 hover:bg-slate-100/80 border border-slate-100 rounded-2xl flex items-start gap-3 transition cursor-pointer hover:no-underline"
              >
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-purple-700">
                  <sub.icon size={16} />
                </div>
                <div>
                  <strong className="text-slate-900 text-xs font-bold block">{sub.name}</strong>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{sub.desc}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
