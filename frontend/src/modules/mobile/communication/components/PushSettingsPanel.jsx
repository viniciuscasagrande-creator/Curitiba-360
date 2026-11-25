import React, { useState } from 'react';
import { BellRing, Volume2, Vibrate, ShieldAlert } from 'lucide-react';

export default function PushSettingsPanel({ settings = {} }) {
  const [localSettings, setLocalSettings] = useState({
    somAtivo: settings.somAtivo ?? true,
    vibracaoAtiva: settings.vibracaoAtiva ?? true,
    alertasCriticos: settings.alertasCriticos ?? true
  });

  const toggle = (key) => {
    setLocalSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <BellRing className="w-3.5 h-3.5 text-purple-600" /> Preferências de Notificação Push
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Expo Notifications</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-purple-600" />
            <span className="font-extrabold text-slate-900 text-xs">Som de Alerta</span>
          </div>
          <button
            onClick={() => toggle('somAtivo')}
            className={`px-3 py-1 rounded-full font-bold text-[10px] ${
              localSettings.somAtivo ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {localSettings.somAtivo ? 'ATIVADO' : 'SILENCIADO'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Vibrate className="w-4 h-4 text-purple-600" />
            <span className="font-extrabold text-slate-900 text-xs">Vibração Hática</span>
          </div>
          <button
            onClick={() => toggle('vibracaoAtiva')}
            className={`px-3 py-1 rounded-full font-bold text-[10px] ${
              localSettings.vibracaoAtiva ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {localSettings.vibracaoAtiva ? 'ATIVADO' : 'DESATIVADO'}
          </button>
        </div>
      </div>
    </div>
  );
}
