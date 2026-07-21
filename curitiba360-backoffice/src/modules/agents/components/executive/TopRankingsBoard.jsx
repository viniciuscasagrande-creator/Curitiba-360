import React from 'react';
import { Trophy, MapPin, Building2, TrendingUp } from 'lucide-react';

export default function TopRankingsBoard({ topAgencias = [], topRegioes = [] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
      {/* Top Agências */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Building2 className="w-4 h-4 text-purple-600" /> Ranking de Agências Comerciais
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
            {topAgencias.length} líderes
          </span>
        </div>

        <div className="space-y-3">
          {topAgencias.map((ag) => (
            <div key={ag.posicao} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-extrabold text-slate-900 text-xs">{ag.posicao}º {ag.nome}</span>
                <div className="text-[10px] text-slate-400">Região: {ag.regiao} • {ag.agentes} agentes</div>
              </div>

              <div className="text-right">
                <div className="font-extrabold text-emerald-700 text-sm">R$ {ag.faturamento?.toLocaleString('pt-BR')}</div>
                <span className="text-[10px] font-bold text-purple-700">{ag.metaPct}% da meta</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Regiões */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" /> Performance Por Região (Brasil)
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
            Distribuição Nacional
          </span>
        </div>

        <div className="space-y-3">
          {topRegioes.map((reg, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-extrabold text-slate-900 text-xs">{reg.regiao}</span>
                <div className="text-[10px] text-emerald-700 font-bold">Crescimento: {reg.crescimento}</div>
              </div>

              <div className="text-right">
                <div className="font-extrabold text-slate-900 text-sm">R$ {reg.faturamento?.toLocaleString('pt-BR')}</div>
                <span className="text-[10px] text-slate-400 font-mono">{reg.pctTotal}% do total</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
