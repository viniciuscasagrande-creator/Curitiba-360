import React from 'react';
import { BarChart3, TrendingUp, DollarSign, PieChart } from 'lucide-react';

export default function ExecutiveDecisionCenterPanel({ kpis = {} }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-purple-600" /> Decision Center & KPIs Executivos BI
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
          NPS {kpis.npsGeral} ★
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold">Receita Bruta Consolidada</div>
          <div className="text-lg font-extrabold text-slate-900 font-mono">
            R$ {kpis.receitaBruta?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[9px] text-emerald-700 font-bold">+18.4% YoY</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold">EBITDA Estimado</div>
          <div className="text-lg font-extrabold text-slate-900 font-mono">
            R$ {kpis.ebitdaEstimado?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[9px] text-purple-800 font-bold">Margem {kpis.margemLucro}%</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold">CAC vs LTV</div>
          <div className="text-sm font-extrabold text-slate-900 font-mono">
            CAC R$ {kpis.cac} / LTV R$ {kpis.ltv}
          </div>
          <div className="text-[9px] text-emerald-700 font-bold">LTV/CAC = 13.0x ✓</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold">ROI Geral Mkt</div>
          <div className="text-lg font-extrabold text-purple-900 font-mono">{kpis.roiMarketing}</div>
          <div className="text-[9px] text-emerald-700 font-bold">Alta Eficiência</div>
        </div>
      </div>
    </div>
  );
}
