import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useCmsDashboard } from "../hooks/useCmsDashboard";
import { Link } from "react-router-dom";
import { FileText, Image, Search, Shuffle, Languages, Calendar, Settings, Compass, Sparkles } from "lucide-react";

export default function CmsDashboardPage() {
  const { summary, loading } = useCmsDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando central de conteúdo...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Experiência Digital (CMS)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Crie landing pages, otimize SEO técnico/local, configure testes A/B e personalize blocos dinâmicos por clima e origem do turista.
          </p>
        </div>

        {/* KPIs grid */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Páginas & Posts</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{summary.publishedPages} páginas</span>
            <span className="text-[10px] text-slate-405 block">{summary.publishedPosts} posts publicados no blog</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">SEO Score Geral</span>
            <span className="text-2xl font-extrabold text-emerald-600 block">{summary.seoScore}%</span>
            <span className="text-[10px] text-slate-405 block">{summary.indexedPages} urls indexadas no Google</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Métricas de Busca</span>
            <span className="text-2xl font-extrabold text-slate-900 block">CTR {summary.organicCtr}%</span>
            <span className="text-[10px] text-emerald-650 font-semibold block">Posição média: #{summary.avgPosition}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Core Web Vitals</span>
            <span className="text-2xl font-extrabold text-emerald-655 block">LCP {summary.coreWebVitals.lcp}</span>
            <span className="text-[10px] text-slate-400 block">INP: {summary.coreWebVitals.inp} | CLS: {summary.coreWebVitals.cls}</span>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Painel CMS Headless</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/admin/cms/pages" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <FileText className="text-emerald-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Páginas & Landing Pages</h4>
                <p className="text-xs text-slate-500 mt-1">Edite o layout visual da Home, Cidades e Atrativos Turísticos com blocos arrastáveis.</p>
              </div>
            </Link>

            <Link to="/admin/cms/banners" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Image className="text-purple-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Banners & Alertas</h4>
                <p className="text-xs text-slate-505 mt-1">Configure carrosséis dinâmicos e pop-ups promocionais direcionados.</p>
              </div>
            </Link>

            <Link to="/admin/cms/seo" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Search className="text-blue-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">SEO Engine & Metadados</h4>
                <p className="text-xs text-slate-505 mt-1">Gerencie títulos canonical, tags OpenGraph, robots.txt e gerador de sitemap XML.</p>
              </div>
            </Link>

            <Link to="/admin/cms/redirects" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Compass className="text-indigo-650" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Redirecionamentos de URL</h4>
                <p className="text-xs text-slate-505 mt-1">Cadastre regras de redirect 301/302 para evitar links 404 quebrados.</p>
              </div>
            </Link>

            <Link to="/admin/cms/ab-tests" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Shuffle className="text-amber-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Testes A/B (Experimentos)</h4>
                <p className="text-xs text-slate-505 mt-1">Crie variantes de botões, imagens de fundo e CTAs para otimizar conversões.</p>
              </div>
            </Link>

            <Link to="/admin/cms/personalization" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Sparkles className="text-rose-500" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Personalização Baseada em Clima</h4>
                <p className="text-xs text-slate-505 mt-1">Direcione atrativos internos em dias de chuva ou passeios de parque no sol.</p>
              </div>
            </Link>

            <Link to="/admin/cms/calendar" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Calendar className="text-teal-655" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Calendário Editorial</h4>
                <p className="text-xs text-slate-505 mt-1">Acompanhe datas de expiração e lançamentos agendados de campanhas urbanas.</p>
              </div>
            </Link>

            <Link to="/admin/cms/translations" className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm hover:border-emerald-300 transition space-y-3 block text-slate-800 hover:no-underline">
              <Languages className="text-cyan-600" size={24} />
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Traduções & Idiomas (i18n)</h4>
                <p className="text-xs text-slate-505 mt-1">Edite textos estáticos da interface em Inglês, Espanhol e Português.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
