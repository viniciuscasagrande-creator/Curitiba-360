import React from 'react';
import { Activity, RefreshCw, DollarSign, Users, Clock } from 'lucide-react';

export default function RealtimeExecutiveDashboard({ kpis = {}, lastUpdatedTime = '', onRefresh }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Monitoramento Executivo Ao Vivo
        </h3>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
          <span>Atualizado às {lastUpdatedTime}</span>
          <button
            onClick={onRefresh}
            className="p-1 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded transition-all"
            title="Atualizar dados"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold">Receita Bruta Ao Vivo</div>
          <div className="text-base font-extrabold text-emerald-400">
            R$ {(kpis.receitaTempoReal || 136125).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[9px] text-purple-300">275/300 ingressos vendidos</p>
        </div>

        <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold">Público Presente</div>
          <div className="text-base font-extrabold text-purple-300">
            {kpis.publicoPresente || 245} pax
          </div>
          <p className="text-[9px] text-emerald-400 font-bold">{kpis.ocupacaoGeralPct || 81.6}% de ocupação</p>
        </div>
      </div>
    </div>
  );
}
