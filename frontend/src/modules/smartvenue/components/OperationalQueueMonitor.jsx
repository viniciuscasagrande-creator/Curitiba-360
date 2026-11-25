import React from 'react';
import { Layers, AlertTriangle } from 'lucide-react';

export default function OperationalQueueMonitor({ filas = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-purple-600" /> Sensor de Filas & Tempo de Espera
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Monitor de Acesso</span>
      </div>

      <div className="space-y-2">
        {filas.map((f) => {
          const isCrowded = f.pessoasAguardando >= 40;

          return (
            <div key={f.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
                <span>{f.portao}</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                  isCrowded ? 'bg-red-100 text-red-800 animate-pulse' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {f.pessoasAguardando} pessoas • Espera: {f.tempoEsperaMin}m
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Velocidade: {f.velocidadeCheckinsMin} check-ins/min</div>

              {isCrowded && (
                <div className="p-2 rounded bg-red-50 text-red-700 text-[10px] font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>IA Operacional: Recomendado abrir Portão C para desafogar fluxo!</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
