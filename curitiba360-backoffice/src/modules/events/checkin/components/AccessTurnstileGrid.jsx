import React from 'react';
import { Activity, ShieldCheck, Wifi } from 'lucide-react';

export default function AccessTurnstileGrid({ catracas = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-600" /> Painel de Catracas & Portões de Acesso
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
          {catracas.length} catracas ativas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {catracas.map((ctr) => (
          <div key={ctr.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-xs">{ctr.nome}</span>
              <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                <Wifi className="w-3 h-3" /> ONLINE
              </span>
            </div>

            <div className="text-[10px] text-slate-500">Operador: <b>{ctr.operador}</b></div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 font-mono font-bold">
              <span className="text-purple-700">{ctr.fluxoPaxMin} pax/min</span>
              <span className="text-slate-900">{ctr.totalLidos} leituras</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
