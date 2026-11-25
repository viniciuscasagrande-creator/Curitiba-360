import React from 'react';
import { DollarSign, Users, Activity, TrendingUp } from 'lucide-react';

export default function MobileKpiCards({ kpis = {} }) {
  return (
    <div className="grid grid-cols-2 gap-3 text-xs">
      {/* Receita Hoje */}
      <div className="p-3.5 bg-gradient-to-br from-purple-900 to-slate-900 text-white rounded-xl shadow-md border border-purple-800 space-y-1">
        <div className="flex items-center justify-between text-purple-300 font-bold text-[10px]">
          <span>Receita Hoje</span>
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="text-lg font-extrabold text-emerald-400">
          R$ {(kpis.receitaHoje || 42850).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[9px] text-purple-300 font-medium">95 vendas hoje</p>
      </div>

      {/* Público & Ocupação */}
      <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-bold text-[10px]">
          <span>Público Presente</span>
          <Users className="w-3.5 h-3.5 text-purple-600" />
        </div>
        <div className="text-lg font-extrabold text-slate-900">
          {kpis.publicoPresenteTotal || 245} / {kpis.capacidadeTotal || 300}
        </div>
        <p className="text-[9px] text-purple-600 font-semibold">{kpis.ocupacaoPct || 81.6}% de ocupação</p>
      </div>
    </div>
  );
}
