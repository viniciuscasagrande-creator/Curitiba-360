import React from 'react';
import { Cpu, Bot, Zap, ShieldCheck } from 'lucide-react';

export default function AiControlCenterPanel({ control = {} }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-purple-400" /> AI Control Center & Observabilidade de IA (MOD-25)
        </h3>
        <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-200 font-mono text-[9px] font-bold">
          {control.humanInTheLoopAprovacao}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center font-mono">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold font-sans">Agentes Ativos</div>
          <div className="text-lg font-extrabold text-white">{control.agentesAtivos} Agentes</div>
          <div className="text-[9px] text-emerald-400 font-bold">Autônomos ✓</div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold font-sans">Execuções Hoje</div>
          <div className="text-lg font-extrabold text-white">{control.execucoesHoje?.toLocaleString()}</div>
          <div className="text-[9px] text-emerald-400 font-bold">Latência {control.latenciaMediaMs}ms</div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold font-sans">Custo Médio / Exec</div>
          <div className="text-lg font-extrabold text-white">{control.custoMedioExecucao}</div>
          <div className="text-[9px] text-emerald-400 font-bold">Ultra Eficiente</div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold font-sans">Provedores</div>
          <div className="text-xs font-bold text-purple-300">Gemini, GPT-4o, Llama</div>
          <div className="text-[9px] text-emerald-400 font-bold">Multi-Model Router</div>
        </div>
      </div>
    </div>
  );
}
