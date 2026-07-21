import React from 'react';
import { Target, Trophy, Users, ShieldCheck } from 'lucide-react';

export default function BenchmarkingCard({ benchmarking = {} }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" /> Benchmarking Comercial & Comparativo de Desempenho
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
          Sua Performance vs Equipe
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        {/* Faturamento */}
        <div className="p-3.5 bg-purple-50/70 rounded-xl border border-purple-200/70 space-y-2">
          <span className="font-bold text-purple-900 text-xs block">Receita Mensal</span>
          <div className="space-y-1">
            <div className="text-xl font-extrabold text-purple-700">R$ {(benchmarking.agenteReceita || 24800).toLocaleString('pt-BR')} (Você)</div>
            <div className="text-[10px] text-slate-500 font-medium">Média Agência: R$ {(benchmarking.mediaAgenciaReceita || 18400).toLocaleString('pt-BR')}</div>
            <div className="text-[10px] text-amber-700 font-bold">Top 1 Regional: R$ {(benchmarking.top1Receita || 34500).toLocaleString('pt-BR')}</div>
          </div>
        </div>

        {/* Taxa de Conversão */}
        <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200/70 space-y-2">
          <span className="font-bold text-emerald-900 text-xs block">Taxa de Conversão</span>
          <div className="space-y-1">
            <div className="text-xl font-extrabold text-emerald-700">{benchmarking.agenteConversao || 34.2}% (Você)</div>
            <div className="text-[10px] text-slate-500 font-medium">Média Agência: {benchmarking.mediaAgenciaConversao || 28.5}%</div>
            <div className="text-[10px] text-amber-700 font-bold">Top 1 Regional: {benchmarking.top1Conversao || 42.0}%</div>
          </div>
        </div>

        {/* SLA de Atendimento */}
        <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200/70 space-y-2">
          <span className="font-bold text-blue-900 text-xs block">SLA Cumprido</span>
          <div className="space-y-1">
            <div className="text-xl font-extrabold text-blue-700">{benchmarking.agenteSla || 96.4}% (Você)</div>
            <div className="text-[10px] text-slate-500 font-medium">Média Agência: {benchmarking.mediaAgenciaSla || 91.2}%</div>
            <div className="text-[10px] text-blue-800 font-bold">Excelente Desempenho!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
