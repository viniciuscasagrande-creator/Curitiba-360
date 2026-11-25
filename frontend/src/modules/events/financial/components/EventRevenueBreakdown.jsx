import React from 'react';
import { PieChart, DollarSign } from 'lucide-react';

export default function EventRevenueBreakdown({ receitaCanais = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <PieChart className="w-4 h-4 text-purple-600" /> Distribuição da Receita por Canal de Venda
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          Canais Comerciais
        </span>
      </div>

      <div className="space-y-3">
        {receitaCanais.map((cnl, idx) => (
          <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-xs">{cnl.canal}</span>
              <span className="font-mono font-bold text-emerald-700">R$ {cnl.receita?.toFixed(2)}</span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full"
                style={{ width: `${cnl.pctTotal}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 font-mono text-right">{cnl.pctTotal}% da receita total</div>
          </div>
        ))}
      </div>
    </div>
  );
}
