import React from 'react';
import { Ticket, QrCode } from 'lucide-react';

export default function TicketsApiPanel({ tickets = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Ticket className="w-3.5 h-3.5 text-purple-600" /> API de Ingressos & Participantes (`/v1/tickets`)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{tickets.length} ingressos</span>
      </div>

      <div className="space-y-2">
        {tickets.map((tkt) => (
          <div key={tkt.code} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span className="font-mono text-purple-900">{tkt.code} • {tkt.participante}</span>
              <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                tkt.status === 'valido' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {tkt.status}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">{tkt.categoria} • {tkt.assento}</div>
            <div className="text-[9px] text-purple-700 font-mono flex items-center gap-1">
              <QrCode className="w-3 h-3 text-purple-600" /> {tkt.qrCodeData}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
