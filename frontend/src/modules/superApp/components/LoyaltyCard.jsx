import React from "react";
import { Award, Sparkles } from "lucide-react";

export default function LoyaltyCard({ points = 0, level = "Essencial" }) {
  const pointsToNext = 5000 - points;
  const progressPct = Math.min((points / 5000) * 100, 100);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs space-y-3 font-sans animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Award size={16} />
          </div>
          <div>
            <span className="text-[9px] text-slate-500 block">Nível de Fidelidade</span>
            <strong className="text-xs font-bold text-slate-800">{level}</strong>
          </div>
        </div>
        <strong className="text-xs text-amber-600 font-mono flex items-center gap-0.5">
          <Sparkles size={11} className="fill-amber-400 text-amber-400" /> {points} Pts
        </strong>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-[8px] text-slate-400 font-mono">
          <span>Progresso</span>
          <span>{pointsToNext > 0 ? `Faltam ${pointsToNext} pts para o nível Premium` : "Nível Máximo Atingido!"}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
