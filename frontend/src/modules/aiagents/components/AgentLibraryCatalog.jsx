import React from 'react';
import { Bot, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AgentLibraryCatalog({ agentes = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5 text-purple-600" /> Biblioteca de Agentes Especializados
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{agentes.length} agentes prontos</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {agentes.map((a) => (
          <div key={a.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
                <span>{a.nome}</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] uppercase">
                  {a.status}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Módulo: {a.modulo} • Precisão: {a.precisao}</div>
              <div className="text-[9px] text-slate-400 font-mono">Execuções: {a.execucoes?.toLocaleString()} chamadas</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
