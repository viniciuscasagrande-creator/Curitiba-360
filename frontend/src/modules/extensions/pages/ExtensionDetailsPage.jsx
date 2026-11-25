import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMarketplace } from "../hooks/useMarketplace";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, AlertTriangle } from "lucide-react";

export default function ExtensionDetailsPage() {
  const { extensionId } = useParams();
  const { data, installExtension, uninstallExtension, loading } = useMarketplace();

  if (loading || !data || !data.featuredExtensions) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando detalhes da extensão...
        </div>
      </AdminLayout>
    );
  }

  const ext = data.featuredExtensions.find(e => e.id === extensionId);
  const isInstalled = data.installedExtensions.some(i => i.extensionId === extensionId);

  if (!ext) {
    return (
      <AdminLayout>
        <div className="p-6 text-slate-500 text-xs">
          <Link to="/admin/marketplace/catalogo" className="flex items-center gap-1 text-purple-700 font-bold mb-4 hover:no-underline">
            <ArrowLeft size={14} /> Voltar ao catálogo
          </Link>
          Extensão não encontrada.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn max-w-3xl">
        <Link to="/admin/marketplace/catalogo" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Catálogo
        </Link>

        {/* Extension Header */}
        <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 my-0">{ext.name}</h1>
              {ext.verified && (
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-205">
                  Homologado
                </span>
              )}
            </div>
            <p className="text-slate-550 text-sm my-0 leading-relaxed">{ext.shortDescription}</p>
            <div className="flex gap-4 text-slate-450 text-[10px]">
              <span>Versão Atual: {ext.currentVersion}</span>
              <span>•</span>
              <span>Requer Plataforma: {ext.minimumPlatformVersion}</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <strong className="text-purple-700 font-mono text-lg block text-right">
              {ext.price === 0 || ext.price === null ? "Gratuito" : `R$ ${ext.price.toFixed(2)}/mês`}
            </strong>
            {isInstalled ? (
              <button
                onClick={() => uninstallExtension(ext.id)}
                className="h-9 px-4 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-xl cursor-pointer border border-red-200 transition"
              >
                Desinstalar Módulo
              </button>
            ) : (
              <button
                onClick={() => installExtension(ext.id)}
                className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition"
              >
                Instalar Extensão
              </button>
            )}
          </div>
        </div>

        {/* Detailed description and manifest permissions */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3 text-xs">
              <h3 className="text-sm font-bold text-slate-900 my-0">Sobre a Extensão</h3>
              <p className="text-slate-600 leading-relaxed my-0">{ext.description}</p>
            </section>
          </div>

          <div className="space-y-4 text-xs">
            {/* Manifest info */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 my-0">Permissões do Manifesto</h3>
              
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-bold">Acessos Requeridos:</span>
                <div className="space-y-1.5 font-mono text-[10px] text-slate-600">
                  {ext.manifest.permissions.map((perm, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded px-2 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {perm}
                    </div>
                  ))}
                </div>
              </div>

              {ext.manifest.events.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-bold">Eventos Assinados:</span>
                  <div className="space-y-1.5 font-mono text-[10px] text-slate-600">
                    {ext.manifest.events.map((ev, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded px-2 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {ev}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
