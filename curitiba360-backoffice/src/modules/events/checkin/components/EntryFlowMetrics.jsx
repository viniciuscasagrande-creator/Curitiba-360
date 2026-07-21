import React from 'react';
import { Users, TrendingUp, Zap, Clock } from 'lucide-react';

export default function EntryFlowMetrics({ data = {} }) {
  const realizados = data.checkinsRealizados || 245;
  const total = data.publicoTotal || 300;
  const pct = total > 0 ? Math.round((realizados / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Check-in Acumulado</span>
          <Users className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-700">
          {realizados} / {total} ({pct}%)
        </div>
        <p className="text-[10px] text-emerald-600 font-medium">{data.checkinsPendentes || 55} pessoas a entrar</p>
      </div>

      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Velocidade de Entrada</span>
          <TrendingUp className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-2xl font-extrabold text-purple-700">
          {data.velocidadeEntradaPaxMin || 18} pax/min
        </div>
        <p className="text-[10px] text-purple-600 font-medium">Média por minuto nas catracas</p>
      </div>

      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Tempo de Leitura</span>
          <Zap className="w-4 h-4 text-amber-500" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          {data.tempoMedioValidacaoMs || 320} ms
        </div>
        <p className="text-[10px] text-amber-600 font-medium">Validação ultra-rápida sem atraso</p>
      </div>

      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Modo de Operação</span>
          <Clock className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-blue-700">
          Online + Offline
        </div>
        <p className="text-[10px] text-blue-600 font-medium">Sincronização em tempo real ativa</p>
      </div>
    </div>
  );
}
