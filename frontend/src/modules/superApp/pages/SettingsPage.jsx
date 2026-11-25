import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert, Wifi, Globe, BellRing } from "lucide-react";

export default function SettingsPage() {
  const [gpsConsent, setGpsConsent] = useState(true);
  const [pushConsent, setPushConsent] = useState(true);
  const [emailConsent, setEmailConsent] = useState(false);

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/profile" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Perfil
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Configurações</h2>
          <p className="text-[10px] text-slate-500 m-0">Ajuste canais de avisos, geolocalização e controle de privacidade.</p>
        </div>

        {/* Privacy options */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0 flex items-center gap-1.5">
            <ShieldAlert size={14} /> Privacidade & GPS
          </h3>

          <div className="space-y-3 text-[10px]">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Autorizar Geomonitoramento</span>
                <span className="text-slate-500 block leading-tight">Necessário para rotas e alertas georreferenciados.</span>
              </div>
              <input
                type="checkbox"
                checked={gpsConsent}
                onChange={(e) => setGpsConsent(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Notificações Push</span>
                <span className="text-slate-500 block leading-tight">Receber lembretes de eventos e vencimento de EstaR.</span>
              </div>
              <input
                type="checkbox"
                checked={pushConsent}
                onChange={(e) => setPushConsent(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Comunicações Promocionais</span>
                <span className="text-slate-500 block leading-tight">Ofertas e cupons dos parceiros comerciais B2B.</span>
              </div>
              <input
                type="checkbox"
                checked={emailConsent}
                onChange={(e) => setEmailConsent(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Offline synchronization */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0 flex items-center gap-1.5">
            <Wifi size={14} /> Modo Off-line
          </h3>
          <p className="text-[10px] text-slate-500 leading-snug m-0">
            O Super App armazena automaticamente seus ingressos e reservas em cache persistente local para leitura sem rede.
          </p>
        </div>

        <button
          onClick={() => alert("Sessão finalizada com segurança.")}
          className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition border-none cursor-pointer"
        >
          Sair da Conta
        </button>
      </div>
    </SuperAppLayout>
  );
}
