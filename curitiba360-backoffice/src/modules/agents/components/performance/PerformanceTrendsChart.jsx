import React from 'react';
import { TrendingUp, BarChart2 } from 'lucide-react';

export default function PerformanceTrendsChart({ trendsData = [] }) {
  const maxVal = Math.max(...trendsData.map((t) => t.receita || 10000));

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Evolução do Faturamento Pessoal (Últimos 6 Meses)</h3>
            <p className="text-[11px] text-slate-500 font-medium">Crescimento constante de vendas e emissão de ingressos.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2 items-end h-44 pt-6 pb-2">
        {trendsData.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group">
            <div
              className="w-full bg-gradient-to-t from-purple-800 to-purple-500 rounded-t transition-all group-hover:brightness-110"
              style={{ height: `${(item.receita / maxVal) * 100}%` }}
              title={`${item.mes}: R$ ${item.receita.toLocaleString('pt-BR')} (${item.ingressos} bilhetes)`}
            />
            <span className="font-mono text-[10px] text-slate-600 truncate w-full text-center font-bold">{item.mes.slice(0, 3)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
