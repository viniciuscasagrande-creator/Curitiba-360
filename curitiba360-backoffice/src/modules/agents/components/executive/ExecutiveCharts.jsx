import React from 'react';
import { BarChart2, Filter, TrendingUp, Target } from 'lucide-react';

export default function ExecutiveCharts({ evolucaoData = [], funilData = [] }) {
  const maxVal = Math.max(...evolucaoData.map((e) => e.receita || 100000));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
      {/* Evolução de Faturamento */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Faturamento Comercial Global (Últimos 6 Meses)</h3>
              <p className="text-[11px] text-slate-500 font-medium">Histórico consolidado de vendas de todas as agências e parceiros.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2 items-end h-44 pt-6 pb-2">
          {evolucaoData.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group">
              <div
                className="w-full bg-purple-600 rounded-t transition-all group-hover:bg-purple-700"
                style={{ height: `${(item.receita / maxVal) * 100}%` }}
                title={`${item.mes}: R$ ${item.receita.toLocaleString('pt-BR')} (Meta: R$ ${item.meta.toLocaleString('pt-BR')})`}
              />
              <span className="font-mono text-[10px] text-slate-600 truncate w-full text-center font-bold">{item.mes.slice(0, 3)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Funil Executivo */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" /> Funil Executivo Global
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Conversão geral de Leads para Vendas.</p>
        </div>

        <div className="space-y-3">
          {funilData.map((stg, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>{stg.etapa}</span>
                <span className="text-purple-700 font-extrabold">{stg.quantidade}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Volume Estimado:</span>
                <span className="font-bold text-emerald-700">R$ {stg.valor?.toLocaleString('pt-BR')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
