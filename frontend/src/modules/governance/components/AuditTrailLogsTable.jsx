import React from 'react';
import { History, ShieldAlert } from 'lucide-react';

export default function AuditTrailLogsTable({ logs = [] }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-purple-400" /> Trilha de Auditoria (Audit Trail)
        </h3>
        <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-200 font-mono text-[9px] font-bold">
          Imutável & Criptografado
        </span>
      </div>

      <div className="space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 font-mono">
            <div className="flex items-center justify-between font-extrabold text-purple-300 text-xs">
              <span>{log.usuario}</span>
              <span className="text-[9px] text-slate-400">{log.data}</span>
            </div>
            <div className="text-[10px] text-slate-200">
              Ação: <b className="text-emerald-400">{log.acao}</b> • Alterado para: <b className="text-white">{log.valorNovo}</b>
            </div>
            <div className="text-[9px] text-slate-400">Origem IP: {log.ip}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
