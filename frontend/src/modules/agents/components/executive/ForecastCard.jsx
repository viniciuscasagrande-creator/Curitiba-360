import React from 'react';
import { Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function ForecastCard({ kpis = {} }) {
  const receitaAtual = kpis.receitaTotal || 485000;
  const forecastIA = kpis.forecastIA || 528000;
  const metaMes = kpis.metaMes || 520000;

  return (
    <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-xl p-5 shadow-xl space-y-3 text-xs border border-purple-800">
      <div className="flex items-center justify-between border-b border-purple-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
          <div>
            <h3 className="font-extrabold text-white text-sm">IA Forecast Executivo de Fechamento</h3>
            <p className="text-[11px] text-purple-300 font-medium">Previsão preditiva com base em probabilidade de funil e histórico.</p>
          </div>
        </div>

        <span className="px-3 py-1 bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-full shadow-md">
          {kpis.forecastConfiancaPct || 94}% Precisão Predita
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center pt-1">
        <div className="p-3 bg-purple-950/60 rounded-xl border border-purple-800">
          <span className="text-[10px] text-purple-300 uppercase font-semibold">Realizado Atual</span>
          <div className="text-xl font-extrabold text-white">R$ {receitaAtual.toLocaleString('pt-BR')}</div>
        </div>

        <div className="p-3 bg-purple-950/60 rounded-xl border border-purple-800">
          <span className="text-[10px] text-purple-300 uppercase font-semibold">Meta Estipulada</span>
          <div className="text-xl font-extrabold text-purple-200">R$ {metaMes.toLocaleString('pt-BR')}</div>
        </div>

        <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-700/60">
          <span className="text-[10px] text-emerald-300 uppercase font-semibold">Projeção IA Fechamento</span>
          <div className="text-xl font-extrabold text-emerald-400">R$ {forecastIA.toLocaleString('pt-BR')}</div>
        </div>
      </div>
    </div>
  );
}
