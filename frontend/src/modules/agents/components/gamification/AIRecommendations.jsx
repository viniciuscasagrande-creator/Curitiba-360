import React from 'react';
import { Sparkles, ArrowRight, Zap, Target } from 'lucide-react';

export default function AIRecommendations({ recommendations = [] }) {
  return (
    <div className="bg-gradient-to-r from-purple-950 to-indigo-950 text-white rounded-xl p-5 shadow-xl space-y-4 text-xs border border-purple-800">
      <div className="flex items-center justify-between border-b border-purple-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
          <div>
            <h3 className="font-extrabold text-white text-sm">Copiloto IA de Vendas & Recomendador de Metas 🤖</h3>
            <p className="text-[11px] text-purple-300 font-medium">Recomendações em tempo real para alavancar seu ranking e atingir 100% da meta.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-3.5 bg-purple-900/60 rounded-xl border border-purple-700/60 space-y-2 flex flex-col justify-between">
            <p className="text-purple-100 font-semibold leading-relaxed text-[11px]">{rec.texto}</p>
            <button
              onClick={() => alert(`Ação ativada para recomendação: ${rec.id}`)}
              className="mt-2 py-1.5 px-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-[10px] transition-all flex items-center justify-center gap-1 shadow-xs"
            >
              <span>Executar Recomendação</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
