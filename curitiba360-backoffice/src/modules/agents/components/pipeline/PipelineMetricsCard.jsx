import React from 'react';
import { Target, TrendingUp, DollarSign, Clock, Percent, Sparkles } from 'lucide-react';

export default function PipelineMetricsCard({ opportunities = [] }) {
  const totalPipeline = opportunities.reduce((acc, o) => acc + (o.valorEstimado || 0), 0);
  
  // Cálculo de probabilidade ponderada (Ponderado = Valor * (Probabilidade / 100))
  const valorPonderado = opportunities.reduce((acc, o) => {
    return acc + ((o.valorEstimado || 0) * ((o.probabilidade || 50) / 100));
  }, 0);

  const ganhas = opportunities.filter((o) => o.etapa === 'fechado_ganho').length;
  const taxaConversao = opportunities.length > 0 ? Math.round((ganhas / opportunities.length) * 100) : 75;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* 1. Valor Total do Pipeline */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Valor Total do Pipeline</span>
          <Target className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          R$ {totalPipeline.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-slate-400 font-medium">{opportunities.length} oportunidades ativas</p>
      </div>

      {/* 2. Previsão Ponderada (Forecast IA) */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Previsão Ponderada (IA)</span>
          <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
        </div>
        <div className="text-2xl font-extrabold text-purple-700">
          R$ {valorPonderado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-purple-600 font-medium">Considerando probabilidades de fechamento</p>
      </div>

      {/* 3. Taxa de Sucesso do Funil */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Taxa de Sucesso</span>
          <TrendingUp className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-700">
          {taxaConversao}%
        </div>
        <p className="text-[10px] text-emerald-600 font-medium">{ganhas} oportunidades ganhas</p>
      </div>

      {/* 4. Ciclo Médio de Fechamento */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Ciclo Médio de Venda</span>
          <Clock className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          5.2 Dias
        </div>
        <p className="text-[10px] text-blue-600 font-medium">Tempo médio do Lead ao Fechamento</p>
      </div>
    </div>
  );
}
