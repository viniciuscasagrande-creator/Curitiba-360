import React from 'react';
import { BarChart2, TrendingUp, ShoppingBag } from 'lucide-react';

export default function SalesChart({ salesData = [], topProducts = [] }) {
  const maxVal = Math.max(...salesData.map((s) => s.receita || 10000));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
      {/* Gráfico 1: Evolução 12 Meses */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Histórico de Receita Pessoal (Últimos 12 Meses)</h3>
              <p className="text-[11px] text-slate-500 font-medium">Evolução do seu faturamento mensal como agente comercial.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-1.5 items-end h-44 pt-6 pb-2">
          {salesData.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group">
              <div
                className="w-full bg-purple-600 rounded-t transition-all group-hover:bg-purple-700"
                style={{ height: `${(item.receita / maxVal) * 100}%` }}
                title={`${item.mes}: R$ ${item.receita.toLocaleString('pt-BR')} (${item.ingressos} bilhetes)`}
              />
              <span className="font-mono text-[9px] text-slate-500 truncate w-full text-center">{item.mes.slice(0, 3)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico 2: Atrações Mais Vendidas */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-purple-600" /> Eventos Mais Vendidos Por Você
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Ranking dos passeios mais emitidos no seu código.</p>
        </div>

        <div className="space-y-3">
          {topProducts.map((prod, idx) => (
            <div key={prod.id} className="space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span className="truncate max-w-[180px]">{idx + 1}. {prod.nome}</span>
                <span className="text-purple-700 font-extrabold">{prod.vendas} vendas</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all"
                  style={{ width: `${(prod.vendas / 70) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
