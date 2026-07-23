import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMarketplace } from "../hooks/useMarketplace";
import { Link } from "react-router-dom";
import { ShoppingBag, BookOpen, Layers, DollarSign, Terminal, Settings } from "lucide-react";

export default function MarketplaceDashboardPage() {
  const { data, loading } = useMarketplace();

  if (loading || !data || !data.summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando indicadores do marketplace...
        </div>
      </AdminLayout>
    );
  }

  const { summary } = data;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Marketplace de Extensões</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Adicione módulos de ERP, PMS hoteleiros, gateways de pagamentos e inteligência artificial para ampliar as funções do Curitiba 360.
          </p>
        </div>

        {/* Dashboard Grid KPIs */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Extensões Publicadas</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.publishedExtensions}</span>
            <span className="text-[10px] text-slate-400 block">{summary.availableUpdates} atualizações disponíveis</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Receita Mensal (Split)</span>
            <span className="text-2xl font-extrabold text-emerald-600 block">R$ {summary.monthlyRevenue.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 block">Instalações ativas: {summary.activeInstallations}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Desenvolvedores Ativos</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.activeDevelopers}</span>
            <span className="text-[10px] text-emerald-650 font-semibold block">Nota média: {summary.averageRating} / 5.0</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Status de Execução</span>
            <span className="text-2xl font-extrabold text-slate-900 block">Operando</span>
            <span className="text-[10px] text-emerald-650 font-semibold block">{summary.suspendedExtensions} suspensões ativas</span>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Painel de Extensões</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/marketplace/catalogo" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <ShoppingBag className="text-emerald-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Catálogo de Extensões</h4>
                <p className="text-xs text-slate-505 mt-1">Navegue pelas soluções prontas de pagamentos, IA, ERP e atendimento.</p>
              </div>
            </Link>

            <Link to="/admin/marketplace/instaladas" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Layers className="text-purple-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Extensões Instaladas</h4>
                <p className="text-xs text-slate-505 mt-1">Configure parâmetros, chaves de API e permissões dos módulos ativos.</p>
              </div>
            </Link>

            <Link to="/admin/marketplace/faturamento" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <DollarSign className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Faturamento & Repasses</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe splits de vendas de assinaturas de desenvolvedores externos.</p>
              </div>
            </Link>

            <Link to="/admin/marketplace/logs" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Terminal className="text-indigo-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Logs do Sandbox</h4>
                <p className="text-xs text-slate-505 mt-1">Analise permissões solicitadas por scripts JS rodando de forma isolada.</p>
              </div>
            </Link>

            <Link to="/admin/marketplace/developers" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Settings className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Portal Developer</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie chaves secretas de acesso a APIs públicas e publique novas versões.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
