import React from 'react';
import { Sparkles, ArrowRight, Zap, Lightbulb } from 'lucide-react';

export default function AIInsights({ insights = [], onAction }) {
  return (
    <div className="bg-purple-900 text-white rounded-2xl p-5 shadow-xl space-y-4 text-xs border border-purple-800 relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-purple-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
          <div>
            <h3 className="font-extrabold text-white text-sm">Assistente de Inteligência Artificial Comercial 🤖</h3>
            <p className="text-[11px] text-purple-300 font-medium">Recomendações preditivas para aumentar suas vendas e reativar clientes.</p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-purple-800 text-purple-200 font-bold text-[10px]">
          {insights.length} sugestões ativas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {insights.map((ins) => (
          <div key={ins.id} className="p-3.5 bg-purple-950/60 rounded-xl border border-purple-800/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="font-extrabold text-purple-200 text-xs block">{ins.titulo}</span>
              <p className="text-[11px] text-purple-300 leading-relaxed">{ins.descricao}</p>
            </div>

            <button
              onClick={() => onAction && onAction(ins)}
              className="w-full mt-2 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-1 shadow-md text-[11px]"
            >
              <span>{ins.acao}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
