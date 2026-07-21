import React from 'react';
import { Cpu, CheckCircle2, Battery, AlertTriangle } from 'lucide-react';

export default function IotDeviceGrid({ devices = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-purple-600" /> Dispositivos IoT (Catracas, Scanners, Totens & Cancelas)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{devices.length} ativos</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {devices.map((d) => {
          const isOnline = d.status === 'online';

          return (
            <div key={d.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
                <span>{d.nome}</span>
                <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] ${
                  isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {d.status}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">{d.tipo} • Firmware: {d.firmware}</div>
              <div className="text-[9px] text-slate-400 font-mono flex items-center gap-1">
                <Battery className="w-3 h-3 text-slate-600" /> Bateria: {d.bateria}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
