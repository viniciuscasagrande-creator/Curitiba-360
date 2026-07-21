import React from 'react';
import { Sparkles, Brain, ArrowRight } from 'lucide-react';

export default function AnalyticsPredictiveEngineCard({ previsoes = [] }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Brain className="w-3 h-3 text-purple-400" /> Motor IA Analytics Preditivo (Demanda & No-show)
        </h3>
        <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-200 font-mono text-[9px] font-bold">
          Previsões Ativas
        </span>
      </div>

      <div className="space-y-2">
        {previsoes.map((pred) => (
          <div key={pred.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 font-mono">
            <div className="flex items-center justify-between font-extrabold text-purple-300 text-xs">
              <span>{pred.descricao}</span>
              <span className="text-[9px] text-slate-400">Confiança {pred.confianca}</span>
            </div>
            <div className="text-[10px] text-slate-200 flex items-center gap-2">
              <span>Previsão: <b>{pred.previsto}</b></span>
              <span className="text-slate-600">•</span>
              <span>Prob. No-show: <b className="text-red-400">{pred.noShowProbabilidade}</b></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
