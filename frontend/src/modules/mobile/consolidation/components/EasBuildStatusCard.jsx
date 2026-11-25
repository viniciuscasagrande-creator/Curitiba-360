import React from 'react';
import { Package, Terminal, CheckCircle2 } from 'lucide-react';

export default function EasBuildStatusCard({ buildHistory = [], onTriggerBuild }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5 text-purple-400" /> Configuração Expo & EAS Build (Produção)
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-mono font-bold text-[9px]">
          eas.json Pronto ✓
        </span>
      </div>

      <div className="space-y-1.5 font-mono text-[10px] text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
        <div>$ eas build --profile production --platform all</div>
        <div className="text-purple-400">$ eas submit --profile production --platform android</div>
      </div>

      <div className="space-y-2">
        <div className="text-[10px] font-bold text-slate-400">Histórico de Builds EAS:</div>
        {buildHistory.map((b) => (
          <div key={b.buildId} className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-white text-xs">{b.platform}</div>
              <div className="text-[9px] text-slate-400 font-mono">{b.buildId} • {b.data}</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-bold text-[9px]">
              {b.status}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
        <button
          onClick={() => onTriggerBuild && onTriggerBuild('android')}
          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[10px] transition-all"
        >
          Gerar Android AAB
        </button>
        <button
          onClick={() => onTriggerBuild && onTriggerBuild('ios')}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-[10px] border border-slate-700 transition-all"
        >
          Gerar iOS IPA
        </button>
      </div>
    </div>
  );
}
