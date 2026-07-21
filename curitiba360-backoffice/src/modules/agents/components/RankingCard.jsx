import React from 'react';
import { Award, Trophy, Star, Medal } from 'lucide-react';

export default function RankingCard({ kpis = {} }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Seu Posicionamento Comercial</h3>
            <p className="text-[11px] text-slate-500 font-medium">Ranking atualizado de desempenho em tempo real.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-1">
          <div className="flex items-center justify-center gap-1 text-amber-800 font-bold text-[11px]">
            <Medal className="w-3.5 h-3.5" /> Ranking Regional (Sul)
          </div>
          <div className="text-3xl font-extrabold text-amber-700">#{kpis.posicaoRankingRegional || 5}</div>
          <span className="text-[10px] text-amber-800 font-semibold block">Entre 48 Agentes</span>
        </div>

        <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200/80 space-y-1">
          <div className="flex items-center justify-center gap-1 text-purple-800 font-bold text-[11px]">
            <Star className="w-3.5 h-3.5" /> Ranking Nacional (Brasil)
          </div>
          <div className="text-3xl font-extrabold text-purple-700">#{kpis.posicaoRankingNacional || 21}</div>
          <span className="text-[10px] text-purple-800 font-semibold block">Entre 310 Agentes</span>
        </div>
      </div>
    </div>
  );
}
