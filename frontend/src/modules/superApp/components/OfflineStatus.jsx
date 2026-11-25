import React from "react";
import { Wifi, WifiOff } from "lucide-react";

export default function OfflineStatus({ isOnline = true, pendingActionsCount = 0 }) {
  if (isOnline) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-full flex items-center justify-center gap-1 text-[9px] font-bold font-mono">
        <Wifi size={10} /> Online • Dados Sincronizados
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-full flex items-center justify-center gap-1 text-[9px] font-bold font-mono animate-pulse">
      <WifiOff size={10} /> Offline • {pendingActionsCount} pendentes de envio
    </div>
  );
}
