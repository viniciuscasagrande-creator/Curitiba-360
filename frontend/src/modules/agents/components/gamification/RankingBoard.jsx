import React, { useState } from 'react';
import { Trophy, Medal, Star, Shield, Filter } from 'lucide-react';

export default function RankingBoard({ ranking = [] }) {
  const [filterPeriod, setFilterPeriod] = useState('mes'); // dia, semana, mes, ano
  const [filterScope, setFilterScope] = useState('regional'); // regional, nacional

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Leaderboard Comercial em Tempo Real</h3>
            <p className="text-[11px] text-slate-500 font-medium">Ranking de vendas acumuladas e pontuação XP.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterScope}
            onChange={(e) => setFilterScope(e.target.value)}
            className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
          >
            <option value="regional">Ranking Regional (Sul)</option>
            <option value="nacional">Ranking Nacional (Brasil)</option>
          </select>

          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
          >
            <option value="mes">Mês Atual</option>
            <option value="semana">Esta Semana</option>
            <option value="ano">Ano 2026</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 uppercase tracking-wider font-semibold text-[11px]">
              <th className="p-3.5 text-center">Posição</th>
              <th className="p-3.5">Agente Comercial</th>
              <th className="p-3.5">Agência Vinculada</th>
              <th className="p-3.5 text-right">Pontuação XP</th>
              <th className="p-3.5 text-right">Faturamento Mês (R$)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
            {ranking.map((item) => {
              const isYou = item.nome.includes('Você');

              return (
                <tr key={item.posicao} className={`transition-colors ${
                  isYou ? 'bg-purple-50 font-bold text-purple-950 border-l-4 border-l-purple-600' : 'hover:bg-slate-50/80'
                }`}>
                  <td className="p-3.5 text-center font-extrabold text-sm">
                    {item.medalha}
                  </td>

                  <td className="p-3.5 font-extrabold text-slate-900 flex items-center gap-2">
                    <span>{item.nome}</span>
                    {isYou && (
                      <span className="px-2 py-0.5 rounded bg-purple-600 text-white text-[9px] uppercase tracking-wider">
                        SEU PERFIL
                      </span>
                    )}
                  </td>

                  <td className="p-3.5 font-medium text-slate-700">{item.agencia}</td>

                  <td className="p-3.5 text-right font-extrabold text-purple-700">
                    ⚡ {item.xp.toLocaleString('pt-BR')} XP
                  </td>

                  <td className="p-3.5 text-right font-extrabold text-emerald-700 text-sm">
                    R$ {item.receitaMes?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
