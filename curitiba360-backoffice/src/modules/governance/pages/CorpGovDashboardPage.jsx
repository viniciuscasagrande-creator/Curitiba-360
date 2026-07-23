import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernanceDashboard } from "../hooks/useGovernanceDashboard";
import { Link } from "react-router-dom";
import { Sparkles, Scale, ShieldAlert, Award, FileText, ChevronRight, Settings, BarChart2 } from "lucide-react";

export default function CorpGovDashboardPage() {
  const { data, loading } = useGovernanceDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando governança executiva...
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
              <Scale size={28} className="text-purple-755 font-bold" /> Governança Executiva & Compliance
            </h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Acompanhamento de metas estratégicas, comitês deliberativos, riscos regulatórios e auditorias corporativas.
            </p>
          </div>
          <button className="flex items-center gap-1.5 px-3 h-9 bg-purple-50 text-purple-700 font-bold border border-purple-200 rounded-xl hover:bg-purple-100 transition text-[11px] cursor-pointer">
            <Sparkles size={14} /> IA Compliance Advisor
          </button>
        </div>

        {/* KPIs grid */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider font-sans">Score Estratégico</span>
            <span className="text-2xl font-extrabold text-slate-900 block font-mono">{kpis.strategicScore}/100</span>
            <span className="text-[10px] text-emerald-655 font-bold block">Status: Alto Desempenho</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider font-sans">Objetivos Corporativos</span>
            <span className="text-2xl font-extrabold text-slate-900 block font-mono">{kpis.objectivesOnTrack} No Prazo</span>
            <span className="text-[10px] text-slate-455 block">{kpis.objectivesAtRisk} Em Risco | {kpis.objectivesDelayed} Atrasado</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider font-sans">Índice Compliance</span>
            <span className="text-2xl font-extrabold text-slate-900 block font-mono">{kpis.complianceIndex}%</span>
            <span className="text-[10px] text-slate-455 block">{kpis.pendingObligations} Obrigações pendentes</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider font-sans">ESG Corporativo</span>
            <span className="text-2xl font-extrabold text-slate-900 block font-mono">{kpis.esgIndex}%</span>
            <span className="text-[10px] text-emerald-655 font-bold block">Critérios ASG Atendidos</span>
          </div>
        </section>

        {/* Action Panel / Shortcuts */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Menu de Governança Estratégica</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/governance/executive-cockpit" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <BarChart2 className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Cockpit Executivo</h4>
                <p className="text-xs text-slate-505 mt-1">Visão holística consolidada para alta liderança e diretores de área.</p>
              </div>
            </Link>

            <Link to="/admin/governance/councils" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Award className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Conselhos & Comitês</h4>
                <p className="text-xs text-slate-505 mt-1">Administre atas de reuniões, votações eletrônicas e resoluções.</p>
              </div>
            </Link>

            <Link to="/admin/governance/compliance" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <ShieldAlert className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Compliance & Riscos</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie matriz de riscos corporativos, obrigações LGPD e denúncias.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
