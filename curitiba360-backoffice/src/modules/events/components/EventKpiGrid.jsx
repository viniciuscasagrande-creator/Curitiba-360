import React from 'react';
import { DollarSign, Ticket, Users, Calendar, TrendingUp } from 'lucide-react';

export default function EventKpiGrid({ metrics = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* 1. Receita Acumulada */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Receita Total Acumulada</span>
          <DollarSign className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-700">
          R$ {(metrics.receitaTotalGeral || 418150).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-emerald-600 font-medium">Faturamento bruto de bilheteria</p>
      </div>

      {/* 2. Ingressos Vendidos */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Ingressos Emitidos</span>
          <Ticket className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-2xl font-extrabold text-purple-700">
          {metrics.totalVendidosGeral || 1105} bilhetes
        </div>
        <p className="text-[10px] text-purple-600 font-medium">Em todas as categorias de eventos</p>
      </div>

      {/* 3. Ocupação Média */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Taxa Médica de Ocupação</span>
          <TrendingUp className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          {metrics.ocupacaoMediaGeral || 63}%
        </div>
        <p className="text-[10px] text-blue-600 font-medium">Percentual de ocupação das venues</p>
      </div>

      {/* 4. Eventos em Gestão */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Eventos no Catálogo</span>
          <Calendar className="w-4 h-4 text-slate-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          {metrics.totalEventos || 3} eventos
        </div>
        <p className="text-[10px] text-slate-400 font-medium">Ativos e em fase de produção</p>
      </div>
    </div>
  );
}
