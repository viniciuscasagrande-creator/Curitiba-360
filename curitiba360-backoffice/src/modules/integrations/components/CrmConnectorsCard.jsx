import React from 'react';
import { Share2, RefreshCw, Power } from 'lucide-react';

export default function CrmConnectorsCard({ crmConnectors = [], onToggle, onSync }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5 text-purple-600" /> Integrações com CRM & Automação de Marketing
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{crmConnectors.length} conectores</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {crmConnectors.map((c) => (
          <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
                <span>{c.nome}</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                  c.status === 'conectado' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {c.status}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Categoria: {c.categoria}</div>
              <div className="text-[10px] text-purple-800 font-mono font-bold">Leads Sincronizados: {c.leadsSincronizados.toLocaleString()}</div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-1">
              <button
                onClick={() => onToggle && onToggle(c.id)}
                className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-bold text-[9px] flex items-center gap-1"
              >
                <Power className="w-3 h-3 text-slate-600" /> {c.status === 'conectado' ? 'Desconectar' : 'Conectar'}
              </button>

              <button
                onClick={() => onSync && onSync(c.nome)}
                className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded font-bold text-[9px] flex items-center gap-1 shadow-xs"
              >
                <RefreshCw className="w-3 h-3" /> Sincronizar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
