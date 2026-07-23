import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useQualityDashboard } from "../hooks/useQualityDashboard";
import { Shield, Bug, Play, CheckCircle, BarChart3, AlertTriangle, Cpu, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function QualityDashboardPage() {
  const { summary, loading } = useQualityDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando indicadores de qualidade...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Garantia da Qualidade (QA)</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">
            Monitore cobertura de testes, qualidade das releases, taxa de regressão e relatórios de auditoria de performance/acessibilidade.
          </p>
        </div>

        {/* Dashboard Grid KPIs */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Cobertura de Código</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.coveragePercent}%</span>
            <span className="text-[10px] text-emerald-600 block">Meta: ≥ 80%</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Builds Aprovados</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.approvedBuilds}</span>
            <span className="text-[10px] text-slate-400 block">Este mês</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Bugs Críticos</span>
            <span className="text-2xl font-extrabold text-rose-600 block">{summary.criticalBugsCount}</span>
            <span className="text-[10px] text-red-500 font-semibold block">{summary.openBugsCount} bugs abertos</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Defect Escape Rate</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.defectEscapeRate}</span>
            <span className="text-[10px] text-emerald-600 font-semibold block">Abaixo do limite de 1.5%</span>
          </div>
        </section>

        {/* Shortcuts Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Módulos de Homologação</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/quality/releases" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <CheckCircle className="text-emerald-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Controle de Releases</h4>
                <p className="text-xs text-slate-500 mt-1">Aprovação de builds, quality gates e homologação de versões.</p>
              </div>
            </Link>

            <Link to="/admin/quality/test-plans" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <BarChart3 className="text-purple-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Planos & Casos de Teste</h4>
                <p className="text-xs text-slate-505 mt-1">Cenários manuais e automáticos para fluxos críticos da aplicação.</p>
              </div>
            </Link>

            <Link to="/admin/quality/bugs" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Bug className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Central de Defeitos (Bugs)</h4>
                <p className="text-xs text-slate-505 mt-1">Gestão de bugs triados com níveis de severidade e atribuição.</p>
              </div>
            </Link>

            <Link to="/admin/quality/performance" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Cpu className="text-indigo-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Performance (LCP / FID)</h4>
                <p className="text-xs text-slate-505 mt-1">Monitoramento de bundles e métricas vitais web de carregamento.</p>
              </div>
            </Link>

            <Link to="/admin/quality/accessibility" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Eye className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Acessibilidade (WCAG)</h4>
                <p className="text-xs text-slate-505 mt-1">Verificações ARIA, contraste e navegação de teclado homologadas.</p>
              </div>
            </Link>

            <Link to="/admin/quality/security" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Shield className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Segurança (SAST / SCA)</h4>
                <p className="text-xs text-slate-505 mt-1">Escaneamento estático de dependências e auditorias de injeção.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
