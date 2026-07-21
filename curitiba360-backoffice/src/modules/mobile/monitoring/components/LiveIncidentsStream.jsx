import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LiveIncidentsStream({ ocorrencias = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-purple-600" /> Ocorrências Operacionais ao Vivo
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{ocorrencias.length} eventos</span>
      </div>

      <div className="space-y-2">
        {ocorrencias.map((oc) => (
          <div key={oc.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-slate-900 text-xs">{oc.titulo}</div>
              <div className="text-[10px] text-slate-500 font-medium">{oc.setor} • {oc.horario}</div>
            </div>

            <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
              oc.resolvido ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {oc.resolvido ? 'RESOLVIDO ✓' : 'EM ATENDIMENTO'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
