import React from 'react';
import { DollarSign, Target, TrendingUp, Award, Trophy, ShieldCheck, ShoppingCart } from 'lucide-react';

export default function PerformanceKpiGrid({ kpis = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* Faturamento Mês */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Receita Mensal</span>
          <DollarSign className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-2xl font-extrabold text-slate-900">
          R$ {(kpis.receitaTotalMes || 24800).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-purple-600 font-medium">Meta em {kpis.metaMensalPct || 91.8}% (Restam R$ 2.200)</p>
      </div>

      {/* Comissão Disponível */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Comissão Liberada</span>
          <TrendingUp className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-extrabold text-emerald-700">
          R$ {(kpis.comissaoDisponivel || 8530).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="text-[10px] text-emerald-600 font-medium">+ R$ {kpis.comissaoPrevista || 2150} a liberar este mês</p>
      </div>

      {/* Gamificação & XP */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Nível & XP Total</span>
          <Award className="w-4 h-4 text-amber-500" />
        </div>
        <div className="text-2xl font-extrabold text-amber-600">
          {kpis.nivelGamificacao || 'Platina II'}
        </div>
        <p className="text-[10px] text-amber-700 font-medium">⚡ {kpis.xpTotal || 4850} XP Acumulados</p>
      </div>

      {/* Posicionamento Ranking */}
      <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-slate-500 font-semibold">
          <span>Posição no Ranking</span>
          <Trophy className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-extrabold text-purple-700">
          #{kpis.posicaoRankingRegional || 5} Sul
        </div>
        <p className="text-[10px] text-slate-400 font-medium">#{kpis.posicaoRankingNacional || 21} Nacional (Brasil)</p>
      </div>
    </div>
  );
}
