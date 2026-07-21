import React from 'react';
import { Calendar, DollarSign, Users, Award, TrendingUp } from 'lucide-react';

export default function EventsPerformanceKpiGrid({ kpis = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Eventos Ativos Globais</span>
          <Calendar className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          {kpis.totalEventosAtivos || 14} eventos
        </div>
        <p className="text-[10px] text-purple-600 font-medium">Em vendas e operação ativa</p>
      </div>

      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Receita Bruta Acumulada</span>
          <DollarSign className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-700">
          R$ {(kpis.receitaBrutaGlobal || 1845000).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-emerald-600 font-medium">Faturamento total do módulo</p>
      </div>

      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Ingressos Vendidos Globais</span>
          <Users className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-blue-700">
          {(kpis.ingressosVendidosGlobais || 4850).toLocaleString('pt-BR')} ingressos
        </div>
        <p className="text-[10px] text-blue-600 font-medium">Ocupação Média: {kpis.ocupacaoMediaPct || 88.4}%</p>
      </div>

      <div className="p-4 bg-gradient-to-br from-purple-900 to-slate-900 text-white rounded-xl shadow-lg border border-purple-800 space-y-1">
        <div className="flex items-center justify-between text-purple-300 font-semibold">
          <span>NPS Médio dos Eventos</span>
          <Award className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-2xl font-extrabold text-amber-400">
          {kpis.npsMedioEventos || 94} / 100 ⭐
        </div>
        <p className="text-[10px] text-purple-300 font-medium">Excelência na experiência turística</p>
      </div>
    </div>
  );
}
