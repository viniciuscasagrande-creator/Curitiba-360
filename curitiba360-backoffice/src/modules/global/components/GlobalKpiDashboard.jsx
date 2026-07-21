import React from 'react';
import { Globe, DollarSign, Euro, ShieldCheck } from 'lucide-react';

export default function GlobalKpiDashboard({ kpis = {} }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs font-medium">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-purple-600 animate-spin" /> Dashboard Executivo Global (Multi-Moeda & Países)
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
          {kpis.paisesAtivos} Países Ativos
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center font-mono">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold font-sans">Receita Consolidada USD</div>
          <div className="text-lg font-extrabold text-slate-900">
            $ {kpis.receitaConsolidadaUsd?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[9px] text-emerald-700 font-bold">Dólares Americanos</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold font-sans">Receita Consolidada EUR</div>
          <div className="text-lg font-extrabold text-slate-900">
            € {kpis.receitaConsolidadaEur?.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[9px] text-purple-800 font-bold">Euros União Europeia</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold font-sans">Eventos Internacionais</div>
          <div className="text-lg font-extrabold text-slate-900">{kpis.eventosGlobais} Eventos</div>
          <div className="text-[9px] text-emerald-700 font-bold">Multi-region Checkin</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold font-sans">Moedas Suportadas</div>
          <div className="text-sm font-extrabold text-slate-900">7 Moedas Ativas</div>
          <div className="text-[9px] text-emerald-700 font-bold">Conversão Automática ✓</div>
        </div>
      </div>
    </div>
  );
}
