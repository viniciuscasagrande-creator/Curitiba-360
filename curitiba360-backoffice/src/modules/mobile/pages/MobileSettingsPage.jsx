import React, { useState, useEffect } from 'react';
import { mobileService } from '../services/mobileService';
import MobileHeader from '../components/MobileHeader';
import MobileBottomNav from '../components/MobileBottomNav';
import { Settings, ShieldCheck, WifiOff, RefreshCw } from 'lucide-react';

export default function MobileSettingsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await mobileService.getMobileOverview();
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleBiometrics = async () => {
    await mobileService.toggleBiometrics();
    loadData();
  };

  const handleToggleOffline = async () => {
    await mobileService.toggleOfflineMode();
    loadData();
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando ajustes mobile...</p>
      </div>
    );
  }

  const profile = data.userProfile || {};

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200">
        <MobileHeader profile={profile} />

        <div className="p-4 space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" /> Perfil & Ajustes Mobile
          </h2>

          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div>
                <div className="font-extrabold text-slate-900 text-xs">Autenticação Biomiétrica (Face ID)</div>
                <div className="text-[10px] text-slate-500">Acesso rápido por biometria facial no app.</div>
              </div>
              <button
                onClick={handleToggleBiometrics}
                className={`px-3 py-1.5 rounded-full font-bold text-[10px] transition-all ${
                  profile.biometriaAtiva ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {profile.biometriaAtiva ? 'ATIVO ✓' : 'DESATIVADO'}
              </button>
            </div>

            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div>
                <div className="font-extrabold text-slate-900 text-xs">Modo Offline (Cache Local SQLite)</div>
                <div className="text-[10px] text-slate-500">Operar sem internet e sincronizar quando houver sinal.</div>
              </div>
              <button
                onClick={handleToggleOffline}
                className={`px-3 py-1.5 rounded-full font-bold text-[10px] transition-all ${
                  profile.modoOffline ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {profile.modoOffline ? 'OFFLINE ATIVO' : 'ONLINE (5G)'}
              </button>
            </div>
          </div>
        </div>

        <MobileBottomNav />
      </div>
    </div>
  );
}
