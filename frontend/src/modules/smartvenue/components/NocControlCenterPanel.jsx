import React from 'react';
import { Radio, Users, Zap, Clock, ShieldCheck } from 'lucide-react';

export default function NocControlCenterPanel({ metrics = {} }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Central de Operações NOC Smart Venue (Ao Vivo)
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-mono text-[9px] font-bold">
          {metrics.statusNoc}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1">
            <Users className="w-3 h-3 text-purple-400" /> Público Presente
          </div>
          <div className="text-lg font-extrabold text-white">{metrics.pessoasPresentes?.toLocaleString()}</div>
          <div className="text-[9px] text-emerald-400 font-bold">Ocupação {metrics.taxaOcupacao}%</div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1">
            <Zap className="w-3 h-3 text-purple-400" /> Check-ins / min
          </div>
          <div className="text-lg font-extrabold text-white">{metrics.checkinsMin} / min</div>
          <div className="text-[9px] text-emerald-400 font-bold">Vazão Normal ✓</div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-purple-400" /> Tempo Médio Entrada
          </div>
          <div className="text-lg font-extrabold text-white">{metrics.tempoMedioEntradaSeg} seg</div>
          <div className="text-[9px] text-emerald-400 font-bold">Meta &lt; 80 seg ✓</div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-purple-400" /> Portões Abertos
          </div>
          <div className="text-lg font-extrabold text-white">{metrics.portoesAbertos} Portões</div>
          <div className="text-[9px] text-emerald-400 font-bold">Sem Gargalos</div>
        </div>
      </div>
    </div>
  );
}
