import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function EmergencyAlertsPanel({ alertas = [], onAcknowledge }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Central de Alertas & Emergências
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{alertas.length} alertas</span>
      </div>

      <div className="space-y-2">
        {alertas.map((alt) => (
          <div key={alt.id} className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 space-y-2">
            <div className="flex items-center justify-between font-extrabold text-amber-950 text-xs">
              <span>{alt.titulo}</span>
              <span className="text-[9px] font-mono text-slate-500 font-normal">{alt.horario}</span>
            </div>
            <p className="text-[10px] text-slate-700 font-medium leading-normal">{alt.mensagem}</p>

            <div className="pt-1 border-t border-amber-200/60 flex items-center justify-between">
              <span className="text-[9px] font-bold text-amber-800 uppercase">Severidade: {alt.severidade}</span>
              {alt.lido ? (
                <span className="text-[9px] font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Leitura Confirmada
                </span>
              ) : (
                <button
                  onClick={() => onAcknowledge && onAcknowledge(alt.id)}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded text-[9px]"
                >
                  Confirmar Leitura
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
