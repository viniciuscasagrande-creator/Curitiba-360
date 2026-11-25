import React from 'react';
import { Target, TrendingUp } from 'lucide-react';

export default function UtmTrackingTable({ utms = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-600" /> Rastreamento UTM & Origem de Tráfego
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
          Pixel Tracking
        </span>
      </div>

      <div className="space-y-3">
        {utms.map((u, idx) => (
          <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-mono font-extrabold text-slate-900 text-xs">{u.utmSource} / {u.utmMedium}</div>
              <div className="text-[10px] text-slate-500 font-medium">Campanha: <b>{u.utmCampaign}</b></div>
            </div>

            <div className="text-right">
              <div className="font-extrabold text-emerald-700 text-xs">R$ {u.receita?.toFixed(2)}</div>
              <div className="text-[10px] text-slate-400 font-mono">{u.conversoes} conversões ({u.acessos} cliques)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
