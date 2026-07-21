import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

export default function WebhookDeliveryLogsTable({ logs = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-purple-600" /> Logs de Entrega de Webhooks & Assinatura HMAC
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{logs.length} entregas</span>
      </div>

      <div className="space-y-2">
        {logs.map((lg) => (
          <div key={lg.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span className="font-mono text-purple-900">{lg.evento}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                HTTP {lg.statusHttp} ✓
              </span>
            </div>

            <div className="text-[10px] text-slate-500 font-mono">
              Assinatura HMAC: <b className="text-slate-800">{lg.hmacSignature}</b>
            </div>

            <div className="text-[9px] text-slate-400 font-mono">
              Entregue em: {lg.horario} • Tentativa: {lg.tentativas}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
