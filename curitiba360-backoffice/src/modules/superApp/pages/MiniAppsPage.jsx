import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import MiniAppCard from "../components/MiniAppCard";
import { useMiniApps } from "../hooks/useMiniApps";
import { Link } from "react-router-dom";
import { ArrowLeft, Box, ShieldAlert } from "lucide-react";

export default function MiniAppsPage() {
  const { miniApps, loading } = useMiniApps();
  const [requestScopeApp, setRequestScopeApp] = useState(null);

  const handleOpenApp = (id) => {
    const app = miniApps.find((a) => a.id === id);
    if (app) {
      setRequestScopeApp(app);
    }
  };

  const handleAuthorize = () => {
    alert(`Mini App ${requestScopeApp.name} iniciado em sandbox seguro!`);
    setRequestScopeApp(null);
  };

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Ecossistema Mini Apps</h2>
          <p className="text-[10px] text-slate-500 m-0">Acesse serviços urbanos integrados de parceiros comerciais e governamentais.</p>
        </div>

        {requestScopeApp ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs space-y-4 animate-fadeIn">
            <div className="flex gap-2.5 items-start">
              <ShieldAlert size={20} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">Permissões de Acesso</h4>
                <span className="text-[9px] text-slate-500 block">{requestScopeApp.name} solicita acesso a:</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 font-mono text-[9px] text-slate-655 space-y-1">
              <div>• Ler perfil digital básico (nome, e-mail)</div>
              <div>• Acessar localização GPS em tempo real</div>
              <div>• Solicitar faturamento à Super Wallet</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAuthorize}
                className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-xl border-none shadow-2xs transition cursor-pointer"
              >
                Autorizar e Iniciar
              </button>
              <button
                onClick={() => setRequestScopeApp(null)}
                className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] rounded-xl border-none transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0 flex items-center gap-1">
              <Box size={14} /> Mini Apps Disponíveis
            </h3>

            {loading ? (
              <div className="text-center py-6 text-slate-400">Pesquisando sandbox...</div>
            ) : (
              <div className="space-y-3">
                {miniApps.map((ma) => (
                  <MiniAppCard key={ma.id} miniApp={ma} onInstall={handleOpenApp} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
