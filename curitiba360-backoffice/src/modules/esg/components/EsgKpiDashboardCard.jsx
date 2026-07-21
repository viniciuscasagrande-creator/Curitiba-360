import React from 'react';
import { Leaf, ShieldCheck, Heart } from 'lucide-react';

export default function EsgKpiDashboardCard({ metrics = {} }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Dashboard de Governança ESG & Sustentabilidade
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Score de Governança: {metrics.scoreGovernanca}/100</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1">
            <Leaf className="w-3 h-3 text-emerald-600" /> Emissão de CO₂
          </div>
          <div className="text-lg font-extrabold text-slate-900">{metrics.co2PorParticipanteKg} kg / part</div>
          <div className="text-[9px] text-emerald-700 font-bold">Taxa Reciclagem {metrics.taxaReciclagemResiduos}%</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-red-500" /> Diversidade e PCD
          </div>
          <div className="text-lg font-extrabold text-slate-900">{metrics.inclusaoPcd} PCD</div>
          <div className="text-[9px] text-emerald-700 font-bold">Equipes Femininas {metrics.participacaoFemininaEquipes}</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-purple-600" /> Compras Locais
          </div>
          <div className="text-lg font-extrabold text-slate-900">{metrics.comprasFornecedoresLocais}</div>
          <div className="text-[9px] text-emerald-700 font-bold">Fomento local verificado</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold">Energia Renovável</div>
          <div className="text-lg font-extrabold text-slate-900">{metrics.energiaRenovavelUtilizada}</div>
          <div className="text-[9px] text-emerald-700 font-bold">Fontes limpas ✓</div>
        </div>
      </div>
    </div>
  );
}
