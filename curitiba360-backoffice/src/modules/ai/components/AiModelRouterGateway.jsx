import React from 'react';
import { Cpu, Server, CheckCircle2 } from 'lucide-react';

export default function AiModelRouterGateway({ status = {}, modelos = [] }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-purple-400" /> AI Gateway & Roteador de Modelos LLM
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-mono text-[9px] font-bold">
          {status.provedorAtivo}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {modelos.map((m) => (
          <div key={m.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between font-extrabold text-white text-xs">
              <span>{m.nome}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-[10px] text-slate-400 font-mono">Provedor: {m.provedor} • Latência: {m.latencia}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
