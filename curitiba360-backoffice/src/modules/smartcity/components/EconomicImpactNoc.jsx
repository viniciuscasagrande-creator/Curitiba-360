import React from 'react';
import { DollarSign, Landmark, TrendingUp } from 'lucide-react';

export default function EconomicImpactNoc({ impact = {} }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs font-medium">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Landmark className="w-3.5 h-3.5 text-purple-400" /> Painel de Impacto Econômico & Turismo da Cidade
        </h3>
        <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-200 font-mono text-[9px] font-bold">
          IPPUC / Sec. Finanças
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center font-mono">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold font-sans">Receita Estimada Eventos</div>
          <div className="text-base font-extrabold text-white">
            R$ {impact.receitaMovimentadaAno?.toLocaleString('pt-BR')}
          </div>
          <div className="text-[9px] text-emerald-400 font-bold">+14.2% PIB Municipal</div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold font-sans">ISSQN Estimado</div>
          <div className="text-base font-extrabold text-white">
            R$ {impact.impostosArrecadados?.toLocaleString('pt-BR')}
          </div>
          <div className="text-[9px] text-emerald-400 font-bold">Arrecadação Direta</div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold font-sans">Empregos Temporários</div>
          <div className="text-base font-extrabold text-white">{impact.empregosDiretosGerados?.toLocaleString()}</div>
          <div className="text-[9px] text-emerald-400 font-bold">Postos Criados</div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold font-sans">Hospedagem & Turismo</div>
          <div className="text-base font-extrabold text-white">{impact.ocupacaoRedeHoteleira}</div>
          <div className="text-[9px] text-emerald-400 font-bold">Ocupação Média</div>
        </div>
      </div>
    </div>
  );
}
