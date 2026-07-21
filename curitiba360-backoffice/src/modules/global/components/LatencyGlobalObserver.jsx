import React from 'react';
import { ShieldCheck, Server } from 'lucide-react';

export default function LatencyGlobalObserver({ latencias = [] }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Server className="w-3.5 h-3.5 text-purple-400" /> Observabilidade Global & Latências Regionais (Multi-Region Cloud)
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-mono text-[9px] font-bold">
          Edge Nodes Ativos
        </span>
      </div>

      <div className="space-y-2">
        {latencias.map((item, idx) => (
          <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono">
            <div className="flex items-center justify-between font-extrabold text-white text-xs font-sans">
              <span>{item.regiao}</span>
              <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                item.latenciaMs <= 80 ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
              }`}>
                Ping: {item.latenciaMs} ms
              </span>
            </div>
            <div className="text-[10px] text-slate-400">{item.dataCenter} • Status: <b className="text-emerald-400">{item.status}</b></div>
          </div>
        ))}
      </div>
    </div>
  );
}
