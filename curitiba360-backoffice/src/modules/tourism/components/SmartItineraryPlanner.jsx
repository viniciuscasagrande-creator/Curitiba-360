import React from 'react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export default function SmartItineraryPlanner({ roteiro = [] }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Roteiro Turístico Inteligente Recomendado (IA Planner)
        </h3>
        <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-200 font-mono text-[9px] font-bold">
          3 Dias Ativos
        </span>
      </div>

      <div className="space-y-3">
        {roteiro.map((item, idx) => (
          <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 font-extrabold text-purple-300 text-xs">
              <Calendar className="w-3.5 h-3.5" /> {item.dia}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-slate-300">
              {item.atividades.map((act, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <ArrowRight className="w-3 h-3 text-slate-600" />}
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-white font-medium border border-slate-700">
                    {act}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
