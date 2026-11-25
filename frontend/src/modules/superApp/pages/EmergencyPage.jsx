import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import EmergencyButton from "../components/EmergencyButton";
import { useEmergency } from "../hooks/useEmergency";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert, CheckCircle, MapPin, Phone } from "lucide-react";

export default function EmergencyPage() {
  const { triggerSOS, triggering } = useEmergency();
  const [dispatched, setDispatched] = useState(null);

  const handleTrigger = async (type) => {
    // Get simulated location
    const res = await triggerSOS(type, -25.4297, -49.2719, `Chamado rápido SOS acionado.`);
    if (res.success) {
      setDispatched(res.data);
    }
  };

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Canal de Emergência SOS</h2>
          <p className="text-[10px] text-slate-500 m-0">Acione suporte imediato e compartilhe dados vitais criptografados com as equipes de campo.</p>
        </div>

        {dispatched ? (
          <div className="bg-red-900 text-white p-5 rounded-3xl border border-red-800 space-y-4 shadow-md animate-fadeIn">
            <div className="flex items-center justify-between border-b border-red-800 pb-2">
              <span className="text-[10px] font-bold text-red-200 font-mono">SUPORTE DESPACHADO</span>
              <ShieldAlert size={18} className="text-white animate-pulse" />
            </div>
            
            <div className="space-y-1.5 font-mono text-[10px]">
              <div>Tipo: <strong className="text-red-200">{dispatched.emergencyType === "medical" ? "SAMU (Médico)" : "Polícia Militar"}</strong></div>
              <div>Status: <strong>A caminho do local</strong></div>
              <div className="flex items-center gap-1 text-[9px] text-red-300">
                <MapPin size={11} /> Coordenadas: {dispatched.latitude?.toFixed(4)}, {dispatched.longitude?.toFixed(4)}
              </div>
            </div>

            <p className="text-[10px] leading-relaxed text-red-200 m-0">
              Mantenha o aplicativo aberto. As equipes de emergência estão a caminho e possuem acesso ao seu histórico médico declarado.
            </p>

            <button
              onClick={() => setDispatched(null)}
              className="w-full py-1.5 bg-red-800 hover:bg-red-700 text-white font-bold text-[10px] rounded-xl border-none transition cursor-pointer"
            >
              Cancelar Chamado
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <EmergencyButton onTrigger={handleTrigger} />

            {/* Quick emergency contact list */}
            <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0">Telefones Úteis</h3>
              <div className="divide-y divide-slate-100 font-mono text-[10px]">
                <div className="py-2 first:pt-0 flex justify-between items-center">
                  <span className="font-sans text-slate-800">Polícia Militar (PM)</span>
                  <a href="tel:190" className="text-red-600 font-bold hover:underline flex items-center gap-0.5">
                    <Phone size={10} /> 190
                  </a>
                </div>
                <div className="py-2 flex justify-between items-center">
                  <span className="font-sans text-slate-800">SAMU (Emergência Médica)</span>
                  <a href="tel:192" className="text-red-600 font-bold hover:underline flex items-center gap-0.5">
                    <Phone size={10} /> 192
                  </a>
                </div>
                <div className="py-2 last:pb-0 flex justify-between items-center">
                  <span className="font-sans text-slate-800">Bombeiros (SIATE)</span>
                  <a href="tel:193" className="text-red-600 font-bold hover:underline flex items-center gap-0.5">
                    <Phone size={10} /> 193
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
