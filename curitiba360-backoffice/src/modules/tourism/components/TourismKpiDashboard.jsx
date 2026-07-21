import React from 'react';
import { Compass, Users, Sparkles, AlertTriangle } from 'lucide-react';

export default function TourismKpiDashboard({ metrics = {} }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs font-medium">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-purple-600 animate-spin" /> Indicadores Turísticos & Sustentabilidade ESG
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
          Carbono Neutralizado: {metrics.pegadaCarbonoCompensada} ✓
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold">Total de Visitantes</div>
          <div className="text-lg font-extrabold text-slate-900 font-mono">{metrics.totalVisitantes?.toLocaleString()}</div>
          <div className="text-[9px] text-purple-800 font-bold">Permanência Média {metrics.permanenciaMediaDias} dias</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold">Gasto Médio Diário</div>
          <div className="text-lg font-extrabold text-slate-900 font-mono">R$ {metrics.gastoMedioDiario?.toFixed(2)}</div>
          <div className="text-[9px] text-emerald-700 font-bold">Alimentação & Lazer</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold">Ocupação Hoteleira</div>
          <div className="text-lg font-extrabold text-slate-900 font-mono">{metrics.ocupacaoHoteleiraMedia}</div>
          <div className="text-[9px] text-emerald-700 font-bold">Rede Hoteleira Ativa</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold">Destino Smart (DTI)</div>
          <div className="text-sm font-extrabold text-slate-900">Sustentabilidade ESG</div>
          <div className="text-[9px] text-emerald-700 font-bold">Meta 2030 Aprovada ✓</div>
        </div>
      </div>
    </div>
  );
}
