import React from 'react';
import { Zap, ShieldCheck, Award, Sparkles, Coins } from 'lucide-react';

export default function XPCard({ profile = {} }) {
  const xpTotal = profile.xpTotal || 4850;
  const proximoXP = profile.proximoNivelXP || 6000;
  const pctNivel = Math.round((xpTotal / proximoXP) * 100);

  return (
    <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-xl p-5 shadow-xl space-y-4 text-xs border border-purple-800 relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-purple-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm">Seu Nível & Pontuação de Experiência (XP)</h3>
            <p className="text-[11px] text-purple-300 font-medium">Continue pontuando em cada venda para desbloquear recompensas.</p>
          </div>
        </div>

        <span className="px-3 py-1 bg-amber-400 text-slate-950 font-extrabold text-xs rounded-full flex items-center gap-1 shadow-md">
          <Coins className="w-3.5 h-3.5" /> {profile.moedasBonus || 1250} Moedas Bônus
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div>
          <span className="text-[10px] text-purple-300 font-semibold uppercase tracking-wider block">Nível Comercial Atual</span>
          <div className="text-2xl font-extrabold text-amber-400 flex items-center gap-1.5">
            <Award className="w-6 h-6 text-amber-400" /> {profile.nivelAtual || 'Platina II'}
          </div>
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-purple-200">{xpTotal.toLocaleString('pt-BR')} XP / {proximoXP.toLocaleString('pt-BR')} XP</span>
            <span className="text-amber-400">{pctNivel}% para o nível Diamante</span>
          </div>

          <div className="w-full bg-purple-950 h-3 rounded-full overflow-hidden border border-purple-700/60">
            <div
              className="bg-gradient-to-r from-amber-400 to-purple-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${pctNivel}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
