import React from 'react';
import { Users, Clock } from 'lucide-react';

export default function QueueWaitMonitor({ filas = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-purple-600" /> Acompanhamento de Filas & Tempo de Espera
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{filas.length} portões</span>
      </div>

      <div className="space-y-2">
        {filas.map((f) => (
          <div key={f.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-slate-900 text-xs">{f.nome}</div>
              <div className="text-[10px] text-slate-500 font-medium">Fila: <b>{f.pessoasNaFila} pessoas</b></div>
            </div>

            <div className="text-right space-y-0.5">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] block">
                ~ {f.tempoEsperaMin} min espera
              </span>
              <span className="text-[9px] font-bold text-slate-500">{f.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
