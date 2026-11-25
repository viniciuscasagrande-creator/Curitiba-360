import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function RiskHeatmapWidget({ riscos = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-purple-600" /> Matriz de Riscos Corporativos & Planos de Mitigação
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">LGPD / ISO 27001</span>
      </div>

      <div className="space-y-2">
        {riscos.map((r) => {
          const isCritical = r.criticidade === 'Crítica' || r.criticidade === 'Alta';

          return (
            <div key={r.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
                <span>Risco: {r.categoria} ({r.id})</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                  isCritical ? 'bg-red-100 text-red-800 animate-pulse' : 'bg-amber-100 text-amber-800'
                }`}>
                  Criticidade: {r.criticidade}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Plano de Mitigação: <b className="text-slate-800">{r.mitigacao}</b></div>
              <div className="text-[9px] text-slate-400 font-mono">Probabilidade: {r.probabilidade} | Impacto: {r.impacto} | Status: <b className="text-emerald-700">{r.status}</b></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
