import React from 'react';
import { CheckCircle2, Clock, XCircle, ChevronRight, ShieldCheck, Sparkles, Send, FileCheck2 } from 'lucide-react';

export default function RefundTimeline({ timeline = [], status = 'pendente_financeiro' }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" /> Linha do Tempo & Trilha de Liquidação (BO-06 / BO-08)
        </h3>
        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
          status === 'concluido' ? 'bg-emerald-100 text-emerald-800' : status === 'negado' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
        }`}>
          Status: {status.toUpperCase().replace('_', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3">
        {timeline.map((step) => {
          const isDone = step.status === 'concluido';
          const isRunning = step.status === 'em_andamento';
          const isDenied = step.status === 'negado';

          return (
            <div
              key={step.passo}
              className={`
                p-3 rounded-xl border transition-all text-xs space-y-1.5 flex flex-col justify-between relative
                ${isDone 
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' 
                  : isRunning 
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-2xs font-medium ring-2 ring-amber-500/20' 
                  : isDenied 
                  ? 'bg-red-50 border-red-200 text-red-950' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'}
              `}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold">Passo 0{step.passo}</span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isDenied ? (
                  <XCircle className="w-4 h-4 text-red-600" />
                ) : isRunning ? (
                  <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                ) : (
                  <Clock className="w-4 h-4 text-slate-300" />
                )}
              </div>

              <div>
                <h4 className="font-bold text-slate-900 leading-tight">{step.label}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{step.obs || 'Pendente'}</p>
              </div>

              {step.data && (
                <span className="text-[9px] font-mono text-slate-400 block pt-1 border-t border-slate-100">
                  🕒 {step.data}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
