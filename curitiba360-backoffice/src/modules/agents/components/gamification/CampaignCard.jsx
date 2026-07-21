import React from 'react';
import { Gift, Trophy, Calendar, Sparkles } from 'lucide-react';

export default function CampaignCard({ campanhas = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Gift className="w-4 h-4 text-purple-600" /> Campanhas de Incentivo & Grandes Prêmios
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          Viagens & Prêmios em Dinheiro
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {campanhas.map((cmp) => (
          <div key={cmp.id} className="p-4 bg-gradient-to-br from-purple-900 to-slate-900 text-white rounded-xl space-y-3 shadow-lg border border-purple-800 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-white text-sm">{cmp.nome}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[10px]">
                Seu Posição: #{cmp.suaPosicao}
              </span>
            </div>

            <p className="text-[11px] text-purple-200 leading-normal">{cmp.objetivo}</p>

            <div className="p-2.5 bg-purple-950/80 rounded-lg border border-purple-800/80 space-y-1 text-[11px]">
              <span className="font-extrabold text-amber-400 block">🏆 1º Lugar: {cmp.premioPrincipal}</span>
              {cmp.premioSegundo && (
                <span className="text-purple-300 block">🥈 2º Lugar: {cmp.premioSegundo}</span>
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] text-purple-300 font-mono pt-1">
              <span>📅 {cmp.periodo}</span>
              <span>{cmp.participantesTotal} participantes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
