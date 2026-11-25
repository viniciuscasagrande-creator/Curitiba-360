import React from 'react';
import { TrendingUp, ArrowUpRight, RefreshCw, BarChart2 } from 'lucide-react';

export default function CashFlowChart({ data = [] }) {
  const maxVal = Math.max(...data.map((d) => d.receita || 100000));

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Evolução Financeira dos Últimos 6 Meses</h3>
            <p className="text-[11px] text-slate-500 font-medium">Comparativo histórico de Receita Bruta, Repasses efetuados e Reembolsos estornados.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-bold text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
            <span className="text-slate-700">Receita Bruta</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-slate-700">Repasses B2B</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
            <span className="text-slate-700">Reembolsos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 items-end h-44 pt-6 pb-2 px-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
            <div className="w-full flex items-end justify-center gap-1.5 h-full px-1">
              {/* Barra Receita */}
              <div
                className="w-1/3 bg-blue-600 rounded-t transition-all group-hover:bg-blue-700"
                style={{ height: `${(item.receita / maxVal) * 100}%` }}
                title={`Receita: R$ ${item.receita.toLocaleString('pt-BR')}`}
              />
              {/* Barra Repasses */}
              <div
                className="w-1/3 bg-emerald-500 rounded-t transition-all group-hover:bg-emerald-600"
                style={{ height: `${(item.repasses / maxVal) * 100}%` }}
                title={`Repasses: R$ ${item.repasses.toLocaleString('pt-BR')}`}
              />
              {/* Barra Reembolsos */}
              <div
                className="w-1/3 bg-red-400 rounded-t transition-all group-hover:bg-red-500"
                style={{ height: `${(item.reembolsos / maxVal) * 100}%` }}
                title={`Reembolsos: R$ ${item.reembolsos.toLocaleString('pt-BR')}`}
              />
            </div>
            <span className="font-bold text-slate-600 text-[10px]">{item.mes}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
