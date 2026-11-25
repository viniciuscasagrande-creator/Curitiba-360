import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function AuditLogsTable({ logs = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Trilha de Auditoria & Segurança
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{logs.length} eventos</span>
      </div>

      <div className="space-y-2">
        {logs.map((lg) => (
          <div key={lg.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-slate-900 text-xs">{lg.evento}</div>
              <div className="text-[10px] text-slate-500 font-medium">{lg.dispositivo} • {lg.horario}</div>
            </div>

            <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
              lg.resultado === 'SUCESSO' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
            }`}>
              {lg.resultado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
