import React from 'react';
import { Target, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';

export default function GoalProgress({ profile = {} }) {
  const metaMensalPct = profile.metaMensalPct || 91.8;
  const metaAnualPct = profile.metaAnualPct || 57.8;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      {/* Meta Mensal */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Meta Mensal de Vendas</h3>
              <p className="text-[11px] text-slate-500 font-medium">Julho / 2026</p>
            </div>
          </div>
          <span className="text-xl font-extrabold text-purple-700">{metaMensalPct}%</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between font-bold text-slate-800">
            <span>R$ {(profile.metaMensalRealizado || 24800).toLocaleString('pt-BR')}</span>
            <span className="text-slate-400">Meta: R$ {(profile.metaMensalValor || 27000).toLocaleString('pt-BR')}</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(metaMensalPct, 100)}%` }}
            />
          </div>
        </div>

        <div className="p-2.5 bg-purple-50 rounded-lg text-purple-900 font-semibold text-[11px] flex items-center justify-between">
          <span>Restam R$ {((profile.metaMensalValor || 27000) - (profile.metaMensalRealizado || 24800)).toLocaleString('pt-BR')}</span>
          <span className="text-purple-700 font-extrabold">+2% Bônus ao atingir 100%</span>
        </div>
      </div>

      {/* Meta Anual */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Meta Anual Acumulada</h3>
              <p className="text-[11px] text-slate-500 font-medium">Exercício 2026</p>
            </div>
          </div>
          <span className="text-xl font-extrabold text-blue-700">{metaAnualPct}%</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between font-bold text-slate-800">
            <span>R$ {(profile.metaAnualRealizado || 185000).toLocaleString('pt-BR')}</span>
            <span className="text-slate-400">Meta: R$ {(profile.metaAnualValor || 320000).toLocaleString('pt-BR')}</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(metaAnualPct, 100)}%` }}
            />
          </div>
        </div>

        <div className="p-2.5 bg-blue-50 rounded-lg text-blue-900 font-semibold text-[11px] flex items-center justify-between">
          <span>Projeção atual: 104% até Dezembro</span>
          <span className="text-blue-700 font-extrabold">Elegível para Prêmio Anual</span>
        </div>
      </div>
    </div>
  );
}
