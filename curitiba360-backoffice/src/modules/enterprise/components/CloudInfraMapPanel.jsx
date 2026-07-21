import React from 'react';
import { Cloud, CheckCircle2 } from 'lucide-react';

export default function CloudInfraMapPanel({ cloudInfra = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Cloud className="w-3.5 h-3.5 text-purple-600" /> Infraestrutura Cloud GCP (Google Cloud Platform)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{cloudInfra.length} componentes</span>
      </div>

      <div className="space-y-2">
        {cloudInfra.map((item, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span className="text-purple-950 font-extrabold">{item.componente}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                {item.status} ✓
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">{item.papel}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
