import React from 'react';
import { Radio, ArrowRight } from 'lucide-react';

export default function EventBusMonitorPanel({ eventStream = [] }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Pub/Sub Event Bus Barramento Interno
        </h3>
        <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-200 font-mono text-[9px] font-bold">
          Stream Live Pub/Sub
        </span>
      </div>

      <div className="space-y-2">
        {eventStream.map((ev) => (
          <div key={ev.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono">
            <div className="flex items-center justify-between font-extrabold text-emerald-400 text-xs">
              <span>{ev.evento} ({ev.id})</span>
              <span className="text-[9px] text-slate-400">{ev.horario}</span>
            </div>
            <div className="text-[10px] text-slate-300 flex items-center gap-1.5">
              <span className="text-purple-300">{ev.origem}</span>
              <ArrowRight className="w-3 h-3 text-slate-600" />
              <span className="text-amber-300">{ev.destino}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
