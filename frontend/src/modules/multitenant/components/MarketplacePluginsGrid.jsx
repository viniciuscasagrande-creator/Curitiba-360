import React from 'react';
import { Package, Download, Trash2, CheckCircle2 } from 'lucide-react';

export default function MarketplacePluginsGrid({ plugins = [], onToggleInstall }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5 text-purple-600" /> Marketplace de Aplicativos & Extensões
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{plugins.length} plugins no catálogo</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {plugins.map((p) => (
          <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
                <span>{p.nome}</span>
                {p.instalado && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Categoria: {p.categoria} • Autor: {p.autor}</div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end">
              <button
                onClick={() => onToggleInstall && onToggleInstall(p.id)}
                className={`px-3 py-1 rounded-lg font-bold text-[10px] flex items-center gap-1 shadow-xs transition-all ${
                  p.instalado ? 'bg-red-100 hover:bg-red-200 text-red-800' : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {p.instalado ? <Trash2 className="w-3 h-3" /> : <Download className="w-3 h-3" />}
                {p.instalado ? 'Desinstalar' : 'Instalar Extension'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
