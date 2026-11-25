import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function MobileAiAssistantCard({ alerts = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> IA Mobile Assistant
        </h3>
        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
          Tempo Real
        </span>
      </div>

      <div className="space-y-2">
        {alerts.map((al) => (
          <div key={al.id} className="p-2.5 bg-purple-50/70 rounded-lg border border-purple-200/60 space-y-1">
            <span className="font-extrabold text-purple-900 text-[11px] block">{al.titulo}</span>
            <p className="text-[10px] text-slate-600 font-medium leading-normal">{al.mensagem}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
