import { ShieldAlert, UserCheck } from 'lucide-react';
import { formatDateTime } from '../../reports/utils/reportUtils';

export default function ApprovalHistory({ logs = [] }) {
  return (
    <div className="space-y-3 text-left">
      <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
        <UserCheck size={14} className="text-emerald-600" />
        Log de Auditoria & Histórico
      </h3>

      <div className="space-y-2">
        {logs.map((log) => (
          <div
            key={log.id}
            className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 text-xs space-y-1"
          >
            <div className="flex items-center justify-between font-black text-slate-800">
              <span>{log.action}</span>
              <span className="text-[10px] text-slate-400 font-mono">
                {formatDateTime(log.date)}
              </span>
            </div>

            <p className="text-slate-600 font-medium">{log.observation}</p>

            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">
              <span>Usuário: {log.user}</span>
              <span>IP: {log.ip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
