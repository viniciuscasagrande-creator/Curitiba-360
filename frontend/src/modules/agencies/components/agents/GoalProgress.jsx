import React from 'react';
import { Target, Award, TrendingUp } from 'lucide-react';

export default function GoalProgress({ vendas = 0, meta = 50000 }) {
  const percent = Math.min(Math.round((vendas / (meta || 1)) * 100), 100);

  const getTier = () => {
    if (percent >= 100) return { label: '🏆 Meta Batida!', color: 'bg-emerald-500 text-white' };
    if (percent >= 70) return { label: '🔥 A Caminho do Alvo', color: 'bg-blue-500 text-white' };
    return { label: '⚡ Em Evolução', color: 'bg-amber-500 text-white' };
  };

  const tier = getTier();

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block text-xs">Meta Mensal de Vendas</span>
            <span className="text-[10px] text-slate-400">Progresso do agente no período</span>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${tier.color}`}>
          {tier.label}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between font-bold text-xs">
          <span className="text-slate-800">
            R$ {vendas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-slate-400 font-mono">
            Meta: R$ {meta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({percent}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percent >= 100 ? 'bg-emerald-500' : percent >= 70 ? 'bg-blue-600' : 'bg-amber-500'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
