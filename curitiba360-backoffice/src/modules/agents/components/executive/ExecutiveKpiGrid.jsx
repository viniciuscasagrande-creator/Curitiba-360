import React from 'react';
import { DollarSign, Target, TrendingUp, Users, ShieldCheck, PieChart, Percent, Award, Sparkles } from 'lucide-react';

export default function ExecutiveKpiGrid({ kpis = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* 1. Receita Comercial Total */}
      <div className="p-4 bg-gradient-to-br from-purple-900 to-slate-900 text-white rounded-xl shadow-lg border border-purple-800 space-y-1">
        <div className="flex items-center justify-between text-purple-300 font-semibold">
          <span>Receita Comercial Total</span>
          <DollarSign className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-2xl font-extrabold text-white">
          R$ {(kpis.receitaTotal || 485000).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-purple-300 font-medium">Meta: R$ {(kpis.metaMes || 520000).toLocaleString('pt-BR')} ({kpis.metaPct || 93.2}%)</p>
      </div>

      {/* 2. Forecast IA Ponderado */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Forecast IA Fechamento</span>
          <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
        </div>
        <div className="text-2xl font-extrabold text-purple-700">
          R$ {(kpis.forecastIA || 528000).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-purple-600 font-medium">Nível de Confiança: {kpis.forecastConfiancaPct || 94}%</p>
      </div>

      {/* 3. Taxa de Conversão & Ticket Médio */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Taxa de Conversão Geral</span>
          <TrendingUp className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-700">
          {kpis.conversaoPct || 36.8}%
        </div>
        <p className="text-[10px] text-slate-400 font-medium">Ticket Médio: R$ {(kpis.ticketMedio || 385).toFixed(2)}</p>
      </div>

      {/* 4. Saúde Financeira: CAC, LTV & NPS */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>LTV / CAC & NPS</span>
          <PieChart className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          LTV R$ {kpis.ltvMedio?.toFixed(0)}
        </div>
        <p className="text-[10px] text-blue-600 font-medium">CAC R$ {kpis.cacMedio?.toFixed(0)} | NPS {kpis.npsComercial || 92} ⭐</p>
      </div>
    </div>
  );
}
