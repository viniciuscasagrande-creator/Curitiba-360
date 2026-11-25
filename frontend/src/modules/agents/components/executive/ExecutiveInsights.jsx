import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';

export default function ExecutiveInsights({ insights = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" /> Copiloto IA Executivo & Recomendações Estratégicas
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Análise preditiva em tempo real sobre faturamento, demanda e agências.</p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          {insights.length} análises estratégicas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {insights.map((ins) => (
          <div key={ins.id} className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="font-extrabold text-purple-900 text-xs block">{ins.titulo}</span>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{ins.descricao}</p>
            </div>

            <button
              onClick={() => alert(`Ação ativada para insight executivo: ${ins.id}`)}
              className="mt-2 py-1.5 px-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[10px] transition-all flex items-center justify-center gap-1 shadow-xs"
            >
              <span>Aplicar Recomendação IA</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
