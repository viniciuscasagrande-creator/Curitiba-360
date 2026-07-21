import React from 'react';
import { Wifi, WifiOff, Bell, ShieldCheck, BatteryCharging } from 'lucide-react';

export default function MobileHeader({ profile = {}, unreadCount = 0, onNotificationClick }) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-b-2xl shadow-lg space-y-3">
      {/* BARRA DE STATUS MÓVEL */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-b border-slate-800 pb-2">
        <span>09:41 AM</span>
        <div className="flex items-center gap-2">
          {profile.modoOffline ? (
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <WifiOff className="w-3 h-3" /> OFFLINE (Cache Local)
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <Wifi className="w-3 h-3" /> ONLINE (5G)
            </span>
          )}
          <span className="flex items-center gap-1 text-slate-300">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" /> 98%
          </span>
        </div>
      </div>

      {/* CABEÇALHO DO PRODUTOR */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 border-2 border-purple-400 overflow-hidden shadow-inner flex items-center justify-center font-bold text-sm text-white">
            {profile.nome ? profile.nome.charAt(0) : 'P'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-sm">{profile.nome}</span>
              {profile.biometriaAtiva && (
                <ShieldCheck title="Face ID Ativo" className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </div>
            <p className="text-[10px] text-purple-300 font-medium">{profile.cargo}</p>
          </div>
        </div>

        <button
          onClick={onNotificationClick}
          className="relative p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all text-white"
        >
          <Bell className="w-4 h-4 text-purple-300" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
