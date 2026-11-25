import React from 'react';
import { Folder, Star, Download, ShieldCheck } from 'lucide-react';

export default function DocumentRepositoryPanel({ documentos = [], onToggleFavorite }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Folder className="w-3.5 h-3.5 text-purple-600" /> Central de Documentos & Alvarás
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{documentos.length} documentos</span>
      </div>

      <div className="space-y-2">
        {documentos.map((doc) => (
          <div key={doc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                <span>{doc.titulo}</span>
                {doc.disponivelOffline && (
                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                    Offline ✓
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">{doc.tipo} • {doc.tamanho}</div>
            </div>

            <button
              onClick={() => onToggleFavorite && onToggleFavorite(doc.id)}
              className={`p-2 rounded-lg border transition-all ${
                doc.favorito ? 'bg-amber-100 border-amber-300 text-amber-600' : 'bg-white border-slate-200 text-slate-400'
              }`}
              title="Favoritar documento"
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
