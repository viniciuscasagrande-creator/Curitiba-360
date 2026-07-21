import React from 'react';
import { Target, Zap, Clock, CheckCircle2, Gift } from 'lucide-react';

export default function MissionCard({ missoes = [], onClaim }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-600" /> Missões & Desafios Semanais
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          Recompensas em XP & PIX
        </span>
      </div>

      <div className="space-y-3">
        {missoes.map((mis) => {
          const isDone = mis.progressoAtual >= mis.metaQtd;
          const isClaimed = mis.status === 'recompensa_resgatada';

          return (
            <div key={mis.id} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-xs">{mis.titulo}</span>
                <span className="text-[10px] text-purple-700 font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" /> +{mis.recompensaXP} XP
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                  <span>Progresso: {mis.progressoAtual} / {mis.metaQtd}</span>
                  <span className="text-slate-400">{mis.prazo}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full transition-all"
                    style={{ width: `${Math.min((mis.progressoAtual / mis.metaQtd) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                  <Gift className="w-3 h-3" /> Prêmio: {mis.recompensaBonus}
                </span>

                {isClaimed ? (
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Recompensa Resgatada
                  </span>
                ) : isDone ? (
                  <button
                    onClick={() => onClaim && onClaim(mis.id)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] transition-all shadow-sm animate-pulse"
                  >
                    Resgatar Recompensa!
                  </button>
                ) : (
                  <span className="text-[10px] font-semibold text-amber-700">Em Andamento</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
