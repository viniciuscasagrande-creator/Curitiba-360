import React from 'react';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';

export default function EventsExecutiveInsights({ insights = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" /> Executive Copilot: Insights de Eventos
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          IA Recomendadora
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {insights.map((ins) => (
          <div key={ins.id} className="p-3.5 bg-purple-50/70 rounded-xl border border-purple-200/70 space-y-2">
            <span className="font-extrabold text-purple-900 text-xs block">{ins.titulo}</span>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{ins.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
