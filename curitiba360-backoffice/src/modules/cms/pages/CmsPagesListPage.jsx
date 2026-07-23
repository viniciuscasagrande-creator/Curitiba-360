import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useCmsDashboard } from "../hooks/useCmsDashboard";
import { Link } from "react-router-dom";
import { Plus, Edit3, Globe } from "lucide-react";

export default function CmsPagesListPage() {
  const { pages, loading } = useCmsDashboard();

  const getStatusBadge = (status) => {
    switch (status) {
      case "publicado": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "agendado": return "bg-blue-50 text-blue-700 border-blue-200";
      case "em_revisao": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando lista de páginas...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Páginas CMS</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Gerencie a árvore de páginas do portal do cidadão, landing pages sazonais e termos institucionais.
            </p>
          </div>
          <Link
            to="/admin/cms/pages/new"
            className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1 hover:no-underline"
          >
            <Plus size={14} /> Nova Página
          </Link>
        </div>

        {/* Pages Grid */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100 text-xs">
            {pages.map(page => (
              <div key={page.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-sm">{page.title}</strong>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${getStatusBadge(page.status)}`}>
                      {page.status}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-450 text-[10px] font-mono">
                    <span>Slug: /{page.slug}</span>
                    <span>•</span>
                    <span>Template: {page.template}</span>
                  </div>
                  {page.publishedAt && (
                    <span className="text-[10px] text-slate-400 block">Publicado em: {new Date(page.publishedAt).toLocaleString()}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/admin/cms/pages/${page.id}`}
                    className="h-8 px-3 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition flex items-center gap-1 hover:no-underline text-xs"
                  >
                    <Edit3 size={12} /> Editar
                  </Link>
                  <a
                    href={`https://curitiba360.com.br/${page.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="h-8 px-3 font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer transition flex items-center gap-1 hover:no-underline text-xs border border-slate-200"
                  >
                    <Globe size={12} /> Ver
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
