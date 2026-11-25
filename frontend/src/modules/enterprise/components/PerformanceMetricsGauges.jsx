import React from 'react';
import { ShieldCheck, Zap, Activity, Clock, Server } from 'lucide-react';

export default function PerformanceMetricsGauges({ slaTarget = {} }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> Nível de Serviço Corporativo (SLA & Latências)
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
          Uptime {slaTarget.uptimeAtual}% (SLA Meta 99.95%)
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1">
            <Zap className="w-3 h-3 text-purple-600" /> Latência da API
          </div>
          <div className="text-lg font-extrabold text-slate-900">{slaTarget.latenciaApiMs} ms</div>
          <div className="text-[9px] text-emerald-700 font-bold">Meta &lt; 150 ms ✓</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 text-purple-600" /> Latência Check-in
          </div>
          <div className="text-lg font-extrabold text-slate-900">{slaTarget.latenciaCheckinMs} ms</div>
          <div className="text-[9px] text-emerald-700 font-bold">Meta &lt; 80 ms ✓</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1">
            <Server className="w-3 h-3 text-purple-600" /> Latência Busca
          </div>
          <div className="text-lg font-extrabold text-slate-900">{slaTarget.latenciaPesquisaMs} ms</div>
          <div className="text-[9px] text-emerald-700 font-bold">Meta &lt; 300 ms ✓</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
          <div className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-purple-600" /> Recuperação (RTO/RPO)
          </div>
          <div className="text-sm font-extrabold text-slate-900">RTO: {slaTarget.rtoMin}m / RPO: {slaTarget.rpoMin}m</div>
          <div className="text-[9px] text-emerald-700 font-bold">Resiliência Máxima ✓</div>
        </div>
      </div>
    </div>
  );
}
