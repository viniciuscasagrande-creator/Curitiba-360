import React from 'react';
import { PieChart } from 'lucide-react';

export default function SectorOccupancyCards({ setores = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <PieChart className="w-3.5 h-3.5 text-purple-600" /> Ocupação por Setor & Vagão
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{setores.length} setores</span>
      </div>

      <div className="space-y-2.5">
        {setores.map((set) => (
          <div key={set.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span>{set.nome}</span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                set.ocupacaoPct >= 100 ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'
              }`}>
                {set.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>{set.vendidos} de {set.capacidade} assentos</span>
              <span className="font-bold text-slate-800">{set.ocupacaoPct}%</span>
            </div>

            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  set.ocupacaoPct >= 100 ? 'bg-red-500' : set.ocupacaoPct >= 80 ? 'bg-purple-600' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, set.ocupacaoPct)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
