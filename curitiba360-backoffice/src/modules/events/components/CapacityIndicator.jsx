import React from 'react';

export default function CapacityIndicator({ vendidos = 0, capacidade = 100 }) {
  const pct = capacidade > 0 ? Math.min(Math.round((vendidos / capacidade) * 100), 100) : 0;
  const restantes = Math.max(capacidade - vendidos, 0);

  return (
    <div className="space-y-1.5 text-xs">
      <div className="flex items-center justify-between font-bold">
        <span className="text-slate-700 font-mono text-[11px]">{vendidos} / {capacidade} vagas ({pct}%)</span>
        <span className={`text-[10px] ${restantes === 0 ? 'text-red-600 font-extrabold' : 'text-slate-400'}`}>
          {restantes === 0 ? 'Lotação Esgotada' : `${restantes} vagas restantes`}
        </span>
      </div>

      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/60">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            pct >= 90 ? 'bg-red-600' : pct >= 60 ? 'bg-purple-600' : 'bg-emerald-600'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
