import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function OmnichannelChannelMatrix({ canais = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Send className="w-3.5 h-3.5 text-purple-600" /> Canais de Comunicação Integrados (Omnichannel)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{canais.length} canais ativos</span>
      </div>

      <div className="space-y-2">
        {canais.map((c, idx) => (
          <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between font-mono text-[10px]">
            <div>
              <div className="font-bold text-slate-900">{c.canal}</div>
              <div className="text-slate-500 font-sans">Mensagens entregues: {c.msgsEntregues.toLocaleString()}</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
              Abertura: {c.taxaAbertura}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
