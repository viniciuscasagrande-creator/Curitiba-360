import React from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';

export default function MobileNotificationFeed({ notifications = [], onRead }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5 text-purple-600" /> Push Notifications em Tempo Real
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{notifications.length} alertas</span>
      </div>

      <div className="space-y-2">
        {notifications.map((ntf) => (
          <div
            key={ntf.id}
            onClick={() => onRead && onRead(ntf.id)}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer space-y-1 ${
              ntf.lida ? 'bg-slate-50 border-slate-200/60 opacity-70' : 'bg-purple-50/80 border-purple-200 font-semibold'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-900">
              <span>{ntf.titulo}</span>
              <span className="text-[9px] font-mono text-slate-400 font-normal">{ntf.horario}</span>
            </div>
            <p className="text-[10px] text-slate-600 font-medium">{ntf.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
