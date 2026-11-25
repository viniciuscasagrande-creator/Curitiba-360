import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useRoadmap } from "../hooks/useRoadmap";
import { Link } from "react-router-dom";
import { Compass, Target, PlayCircle, BarChart3, AlertTriangle, Layers, TrendingUp, HelpCircle } from "lucide-react";

export default function RoadmapDashboardPage() {
  const { summary, alerts, loading } = useRoadmap();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando painel estratégico...
        </div>
      </AdminLayout>
    );
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Roadmap 2027+ & Evolução</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o planejamento estratégico plurianual, pilares de investimento, expansão regional e pipeline de inovação urbana do Curitiba 360.
          </p>
        </div>

        {/* Dashboard Grid KPIs */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Iniciativas Ativas</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeInitiatives}</span>
            <span className="text-[10px] text-emerald-600 block">{summary.completedInitiatives} concluídas com sucesso</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Investimento Total</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{formatCurrency(summary.actualInvestment)}</span>
            <span className="text-[10px] text-slate-400 block">Planejado: {formatCurrency(summary.plannedInvestment)}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Projeção de Receita</span>
            <span className="text-2xl font-extrabold text-emerald-600 block">{formatCurrency(summary.projectedRevenue)}</span>
            <span className="text-[10px] text-slate-400 block">Horizonte H1 & H2</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Expansão de Cidades</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeCities} / {summary.plannedCities}</span>
            <span className="text-[10px] text-purple-600 font-semibold block">Foco: Região Metropolitana</span>
          </div>
        </section>

        {/* Alerts Feed */}
        {alerts.length > 0 && (
          <section className="bg-amber-50 border border-amber-250 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle size={18} />
              <strong className="text-xs uppercase tracking-wider">Dependências Estratégicas / Riscos</strong>
            </div>
            {alerts.map(a => (
              <div key={a.id} className="text-xs">
                <span className="font-bold text-slate-900 block">{a.title}</span>
                <p className="text-slate-600 mt-0.5 my-0">{a.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Shortcuts Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Painéis do Portfólio</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/roadmap/estrategico" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Compass className="text-emerald-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Visualização de Horizontes</h4>
                <p className="text-xs text-slate-500 mt-1">Navegue pelas metas H1, H2 e H3 de consolidação nacional do superapp.</p>
              </div>
            </Link>

            <Link to="/admin/roadmap/iniciativas" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <PlayCircle className="text-purple-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Registro de Iniciativas</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe projetos de expansão, novos canais e infraestrutura digital.</p>
              </div>
            </Link>

            <Link to="/admin/roadmap/portfolio" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Layers className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Portfólio de Produtos</h4>
                <p className="text-xs text-slate-505 mt-1">Gestão de produtos (Ads, Pass, Insights, Destinos e White Label).</p>
              </div>
            </Link>

            <Link to="/admin/roadmap/priorizacao" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <BarChart3 className="text-indigo-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Matriz de Priorização (RICE)</h4>
                <p className="text-xs text-slate-505 mt-1">Compare esforço, impacto, alcance e score estratégico dos projetos.</p>
              </div>
            </Link>

            <Link to="/admin/roadmap/objetivos" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Target className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Objetivos & OKRs</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe metas trimestrais de lançamento e NPS de novas praças.</p>
              </div>
            </Link>

            <Link to="/admin/roadmap/cenarios" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <TrendingUp className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Cenários de Investimento</h4>
                <p className="text-xs text-slate-505 mt-1">Simulações de crescimento (Conservador, Base, Acelerado).</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
