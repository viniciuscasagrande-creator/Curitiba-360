import React from 'react';
import { Trophy, Calendar } from 'lucide-react';

export default function TopEventsRankingTable({ ranking = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" /> Ranking dos Eventos Mais Rentáveis & Populares
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
          Top Performance
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <th className="p-3">Evento</th>
              <th className="p-3">Categoria</th>
              <th className="p-3 text-right">Vendas / Capacidade</th>
              <th className="p-3 text-right">Receita Bruta (R$)</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {ranking.map((evt) => (
              <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-extrabold text-slate-900">{evt.nome}</td>
                <td className="p-3 font-bold text-slate-500">{evt.categoria}</td>
                <td className="p-3 text-right font-mono font-bold">
                  {evt.ingressosVendidos} / {evt.capacidade} ({evt.ocupacaoPct}%)
                </td>
                <td className="p-3 text-right font-mono font-extrabold text-emerald-700">
                  R$ {evt.receitaBruta?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                    evt.status === 'Esgotado' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {evt.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
