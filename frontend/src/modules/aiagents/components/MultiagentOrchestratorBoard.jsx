import React from 'react';
import { Network, Bot, ArrowRight } from 'lucide-react';

export default function MultiagentOrchestratorBoard({ fluxo = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Network className="w-3.5 h-3.5 text-purple-600" /> Orquestração Multiagente (Fluxo de Colaboração Digital)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Execução em Cadeia</span>
      </div>

      <div className="space-y-2">
        {fluxo.map((f, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 font-mono">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span className="text-purple-900">{f.etapa}</span>
              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
                {f.agente}
              </span>
            </div>
            <div className="text-[10px] text-slate-600 font-sans font-medium">{f.acao}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
