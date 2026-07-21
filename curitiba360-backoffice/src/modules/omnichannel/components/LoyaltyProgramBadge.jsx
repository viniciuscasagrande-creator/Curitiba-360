import React from 'react';
import { Award, Sparkles } from 'lucide-react';

export default function LoyaltyProgramBadge({ profile = {} }) {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-4 rounded-xl shadow-lg border border-purple-900 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-purple-800/80 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-400" /> Programa de Fidelidade (Clube de Benefícios 360)
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow-sm">
          Categoria {profile.nivelFidelidade} ★
        </span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div>
          <div className="text-[10px] text-purple-300 font-bold">Saldo de Pontos</div>
          <div className="text-xl font-black text-white font-mono">{profile.pontosAcumulados?.toLocaleString()} pts</div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-purple-300 font-bold">Benefícios Ativos</div>
          <div className="text-base font-extrabold text-amber-400 font-mono">{profile.beneficiosDisponiveis} cupons vip</div>
        </div>
      </div>
    </div>
  );
}
