import React from 'react';
import { Smartphone, LogOut, CheckCircle2 } from 'lucide-react';

export default function AuthorizedDevicesList({ dispositivos = [], onRevoke }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-purple-600" /> Dispositivos Autorizados & Sessões
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{dispositivos.length} ativos</span>
      </div>

      <div className="space-y-2">
        {dispositivos.map((dev) => (
          <div key={dev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                <span>{dev.modelo}</span>
                {dev.status === 'este_dispositivo' && (
                  <span className="px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
                    Este Aparelho
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">{dev.os} • IP: {dev.ip}</div>
              <div className="text-[9px] text-slate-400 font-mono">Último acesso: {dev.ultimoAcesso}</div>
            </div>

            {dev.status !== 'este_dispositivo' && (
              <button
                onClick={() => onRevoke && onRevoke(dev.id)}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-[9px] flex items-center gap-1 shadow-xs"
              >
                <LogOut className="w-3 h-3" /> Revogar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
