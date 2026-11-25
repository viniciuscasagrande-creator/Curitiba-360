import React from 'react';
import { WifiOff, Database, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function OfflineSyncStatusBadge({ networkStatus = {}, onSync }) {
  const pending = networkStatus.pendingSyncCount || 0;

  return (
    <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-md border border-slate-800 flex items-center justify-between text-xs">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-amber-500/20 border border-amber-500/40 rounded-lg text-amber-400">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <div className="font-extrabold text-white text-xs flex items-center gap-1.5">
            <span>SQLite Local Cache</span>
            <span className="px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-300 font-mono text-[9px] font-bold">
              OFFLINE MODE
            </span>
          </div>
          <div className="text-[10px] text-slate-400">
            {pending > 0 ? `${pending} leituras pendentes de sync` : '100% sincronizado com nuvem'}
          </div>
        </div>
      </div>

      <button
        onClick={onSync}
        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[10px] transition-all flex items-center gap-1 shadow-sm"
      >
        <RefreshCw className="w-3.5 h-3.5" /> Sync Nuvem
      </button>
    </div>
  );
}
