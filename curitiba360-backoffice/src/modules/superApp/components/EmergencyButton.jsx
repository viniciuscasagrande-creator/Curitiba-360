import React, { useState } from "react";
import { AlertOctagon, HelpCircle, Activity } from "lucide-react";

export default function EmergencyButton({ onTrigger = () => {} }) {
  const [confirming, setConfirming] = useState(false);

  const handleTrigger = (type) => {
    onTrigger(type);
    setConfirming(false);
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-3xl p-4 shadow-2xs space-y-3 font-sans animate-fadeIn text-center">
      {!confirming ? (
        <div className="space-y-3">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center border border-red-200">
              <AlertOctagon size={24} className="animate-pulse" />
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-red-900 m-0">Central de Ajuda SOS</h4>
            <p className="text-[10px] text-red-700 m-0 mt-0.5 leading-snug">
              Selecione para acionar serviços de emergência e compartilhar sua geolocalização.
            </p>
          </div>
          <button
            onClick={() => setConfirming(true)}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition border-none cursor-pointer"
          >
            Acionar Botão SOS
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-red-900 m-0">Confirmar Tipo de Emergência</h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleTrigger("medical")}
              className="py-2 bg-white border border-red-200 rounded-xl text-red-700 hover:bg-red-100 text-[10px] font-bold transition cursor-pointer flex flex-col items-center justify-center gap-1"
            >
              <Activity size={16} /> Médica (SAMU)
            </button>
            <button
              onClick={() => handleTrigger("security")}
              className="py-2 bg-white border border-red-200 rounded-xl text-red-700 hover:bg-red-100 text-[10px] font-bold transition cursor-pointer flex flex-col items-center justify-center gap-1"
            >
              <AlertOctagon size={16} /> Segurança (PM)
            </button>
          </div>
          <button
            onClick={() => setConfirming(false)}
            className="w-full py-1 text-[10px] text-slate-500 bg-transparent hover:bg-slate-100 rounded-xl border-none cursor-pointer transition"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
