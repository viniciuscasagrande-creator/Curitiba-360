import React from 'react';
import { Target, TrendingUp, Ticket, DollarSign, Percent } from 'lucide-react';

export default function PerformanceCard({ kpis = {} }) {
  const metaPct = kpis.metaMensalPct || 91.8;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* 1. Meta Mensal */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-500">Progresso da Meta Mensal</span>
          <Target className="w-4 h-4 text-purple-600" />
        </div>

        <div>
          <div className="flex items-center justify-between font-extrabold text-slate-900 mb-1">
            <span className="text-xl">{metaPct}%</span>
            <span className="text-xs text-slate-400">R$ {(kpis.vendasMesValor || 0).toLocaleString('pt-BR')} / R$ {(kpis.metaMensalValor || 27000).toLocaleString('pt-BR')}</span>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(metaPct, 100)}%` }}
            />
          </div>
        </div>

        <p className="text-[10px] text-purple-600 font-semibold">
          Faltam apenas R$ {((kpis.metaMensalValor || 27000) - (kpis.vendasMesValor || 0)).toLocaleString('pt-BR')} para 100%!
        </p>
      </div>

      {/* 2. Vendas Mês */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Vendas no Mês</span>
          <TrendingUp className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          R$ {(kpis.vendasMesValor || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[11px] text-emerald-600 font-semibold">
          {kpis.vendasMesQtd || 0} vendas acumuladas
        </p>
      </div>

      {/* 3. Ticket Médio */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Ticket Médio por Venda</span>
          <DollarSign className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          R$ {(kpis.ticketMedio || 200).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[11px] text-slate-400 font-medium">
          {kpis.ingressosEmitidos || 0} bilhetes emitidos
        </p>
      </div>

      {/* 4. Taxa de Conversão */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Taxa de Conversão</span>
          <Percent className="w-4 h-4 text-amber-600" />
        </div>
        <div className="text-2xl font-extrabold text-amber-700">
          {kpis.taxaConversao || 24.5}%
        </div>
        <p className="text-[11px] text-amber-600 font-semibold">
          Acima da média da agência (+3.2%)
        </p>
      </div>
    </div>
  );
}
