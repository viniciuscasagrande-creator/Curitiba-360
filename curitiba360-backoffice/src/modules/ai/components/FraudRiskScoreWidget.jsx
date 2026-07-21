import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function FraudRiskScoreWidget({ scores = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-purple-600" /> Sensor de IA Antifraude & Score de Risco
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">0–30 Baixo | 31–70 Médio | 71–100 Alto</span>
      </div>

      <div className="space-y-2">
        {scores.map((sc) => {
          const isHigh = sc.scoreRisco >= 71;
          const isMed = sc.scoreRisco >= 31 && sc.scoreRisco < 71;

          return (
            <div key={sc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
                <span>{sc.comprador} (R$ {sc.valor.toFixed(2)})</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                  isHigh ? 'bg-red-100 text-red-800' : isMed ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  Score {sc.scoreRisco} - {sc.nivel}
                </span>
              </div>

              <div className="text-[10px] text-slate-500 font-medium">Recomendação IA: <b className="text-slate-800">{sc.recomendacao}</b></div>

              <div className="flex items-center gap-1 flex-wrap text-[9px] text-slate-400 font-mono">
                {sc.fatores.map((f, i) => (
                  <span key={i} className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                    • {f}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
