import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useEsgDashboard } from "../hooks/useEsgDashboard";
import { Link } from "react-router-dom";
import { ShieldCheck, Leaf, Users, Scale, DollarSign, CloudRain, Trash, Award, AwardIcon, Percent } from "lucide-react";

export default function EsgDashboardPage() {
  const { summary, loading } = useEsgDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando indicadores ESG...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Governança ESG & Sustentabilidade</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Mapeamento de pegada de carbono, economia circular (lixo zero), diversidade, acessibilidade urbana e impacto econômico local.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-455 block font-bold uppercase">Pontuação Geral ESG:</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
              {summary.esgScore} / 100
            </span>
          </div>
        </div>

        {/* KPIs grid */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Pegada de Carbono (GEE)</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.carbonEmittedTons.toLocaleString()} tCO2e</span>
            <span className="text-[10px] text-emerald-650 font-bold block">Compensado: {summary.carbonOffsetTons.toLocaleString()} toneladas</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Economia Circular</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.wasteRecycledPercent}% Reciclado</span>
            <span className="text-[10px] text-slate-455 block">Água consumida: {summary.waterConsumedM3.toLocaleString()} m³</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Impacto Econômico Local</span>
            <span className="text-2xl font-extrabold text-emerald-700 block">R$ {(summary.economicImpactBrl / 1000000).toFixed(1)}M</span>
            <span className="text-[10px] text-slate-455 block">{summary.jobsGenerated} empregos diretos gerados</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Compliance & ODS</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.odsAttended} ODS Metas</span>
            <span className="text-[10px] text-emerald-650 font-bold block">Auditoria Governança: {summary.governanceComplianceRate}%</span>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="space-y-4 text-xs">
          <h3 className="text-lg font-bold text-slate-900 my-0">Painel Executivo de Impacto</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/esg/environment" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Leaf className="text-emerald-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Dimensão Ambiental</h4>
                <p className="text-xs text-slate-505 mt-1">Monitore consumo de energia limpa, água, emissões de GEE escopo 1, 2 e 3.</p>
              </div>
            </Link>

            <Link to="/admin/esg/social" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Users className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Dimensão Social</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe acessibilidade em atrações turísticas, diversidade e impacto social.</p>
              </div>
            </Link>

            <Link to="/admin/esg/governance" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Scale className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Dimensão Governança</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe auditorias e compliance ético com transparência de dados.</p>
              </div>
            </Link>

            <Link to="/admin/esg/economic" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <DollarSign className="text-indigo-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Dimensão Econômica</h4>
                <p className="text-xs text-slate-505 mt-1">Veja arrecadação tributária, comércio local e fomento turístico regional.</p>
              </div>
            </Link>

            <Link to="/admin/esg/projects" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Award className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Projetos ODS & Metas</h4>
                <p className="text-xs text-slate-505 mt-1">Cadastre iniciativas vinculadas à agenda ambiental e metas de redução de perdas.</p>
              </div>
            </Link>

            <Link to="/admin/esg/suppliers" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <ShieldCheck className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Fornecedores Certificados</h4>
                <p className="text-xs text-slate-505 mt-1">Audite o score ecológico de parceiros e cooperativas integradas.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
