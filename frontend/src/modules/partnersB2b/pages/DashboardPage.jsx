import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnersB2b } from "../hooks/usePartnersB2b";
import { Link } from "react-router-dom";
import { Shield, Sparkles, Building, Settings, Star, TrendingUp, Key, DollarSign, Gift, Layers, ShoppingBag, Landmark, Compass, Bus, Calendar } from "lucide-react";

export default function DashboardPage() {
  const { kpis, loading } = usePartnersB2b();

  if (loading || !kpis) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando portal do ecossistema...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0 flex items-center gap-2">
            <Sparkles size={28} className="text-purple-755" /> Gestão de Ecossistema & Marketplace B2B
          </h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Administre parceiros comerciais (hotéis, restaurantes, guias turísticos), comissionamento, split financeiro e motor de reservas.
          </p>
        </div>

        {/* KPIs grid */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider font-sans">Total de Parceiros</span>
            <span className="text-2xl font-extrabold text-slate-900 block font-mono">{kpis.totalPartners}</span>
            <span className="text-[10px] text-purple-700 font-bold block">Hotéis, Restaurantes e Outros</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider font-sans">Contratos Ativos</span>
            <span className="text-2xl font-extrabold text-slate-900 block font-mono">{kpis.activeContracts} Assinados</span>
            <span className="text-[10px] text-slate-455 block">Monitoramento de conformidade</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider font-sans">Volume Transacionado (GVM)</span>
            <span className="text-2xl font-extrabold text-slate-900 block font-mono">R$ {(kpis.monthlyGvM / 1000).toFixed(0)}k</span>
            <span className="text-[10px] text-slate-455 block">Taxa média de comissão: {kpis.averageCommissionPct}%</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider font-sans">Satisfação dos Parceiros</span>
            <span className="text-2xl font-extrabold text-slate-900 block font-mono">{kpis.satisfactionScore} / 5.0</span>
            <span className="text-[10px] text-emerald-655 font-bold">Classificação: Excelente</span>
          </div>
        </section>

        {/* Shortcuts grid */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Módulos de Gestão Comercial</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/partners-b2b/marketplace" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <ShoppingBag className="text-purple-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Marketplace de Parceiros</h4>
                <p className="text-xs text-slate-505 mt-1">Vitrine B2B/B2C unificada com hotéis, restaurantes e transportadoras.</p>
              </div>
            </Link>

            <Link to="/admin/partners-b2b/hotels" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Building className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Rede de Hotéis</h4>
                <p className="text-xs text-slate-505 mt-1">Disponibilidade de acomodações de hotelaria parceira de Curitiba.</p>
              </div>
            </Link>

            <Link to="/admin/partners-b2b/restaurants" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Landmark className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Restaurantes & Gastronomia</h4>
                <p className="text-xs text-slate-505 mt-1">Combos gastronômicos inteligentes e reservas integradas.</p>
              </div>
            </Link>

            <Link to="/admin/partners-b2b/guides" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Compass className="text-emerald-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Guias & Experiências</h4>
                <p className="text-xs text-slate-505 mt-1">Credenciamento de profissionais de guiamento turístico e roteiros.</p>
              </div>
            </Link>

            <Link to="/admin/partners-b2b/transport" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Bus className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Transportadoras & Traslados</h4>
                <p className="text-xs text-slate-505 mt-1">Gestão de frotas e traslados para passeios em Curitiba.</p>
              </div>
            </Link>

            <Link to="/admin/partners-b2b/contracts" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Shield className="text-slate-700" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Contratos & Comissões</h4>
                <p className="text-xs text-slate-505 mt-1">Regras de comissão variável, split financeiro e vigência legal.</p>
              </div>
            </Link>

            <Link to="/admin/partners-b2b/pricing" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <DollarSign className="text-emerald-700" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Gestão de Preços & Combos</h4>
                <p className="text-xs text-slate-505 mt-1">Precificação dinâmica, tarifas de balcão e combos inteligentes.</p>
              </div>
            </Link>

            <Link to="/admin/partners-b2b/reviews" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Star className="text-amber-500" size={24} fill="currentColor" />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Ranking & Avaliações</h4>
                <p className="text-xs text-slate-505 mt-1">Feedback de visitantes, pontuação e qualidade do serviço.</p>
              </div>
            </Link>

            <Link to="/admin/partners-b2b/integrations" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-purple-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Key className="text-slate-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">APIs & Webhooks</h4>
                <p className="text-xs text-slate-505 mt-1">Documentação de API para motor de reservas de terceiros.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
