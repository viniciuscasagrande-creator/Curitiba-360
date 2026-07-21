import React, { useState, useEffect } from 'react';
import { mobileService } from '../services/mobileService';
import MobileHeader from '../components/MobileHeader';
import MobileBottomNav from '../components/MobileBottomNav';
import { Activity, ShieldCheck, Clock } from 'lucide-react';

export default function MobileOperationsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mobileService.getMobileOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando operação mobile...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200">
        <MobileHeader profile={data.userProfile || {}} />

        <div className="p-4 space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" /> Operação em Tempo Real
          </h2>

          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between font-bold">
              <span>Status Operacional</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">Normal ✓</span>
            </div>
            <div className="text-[11px] text-slate-600">Público Presente: <b>{data.kpis?.publicoPresenteTotal} pessoas</b></div>
            <div className="text-[11px] text-slate-600">Staff em Campo: <b>32 profissionais</b></div>
            <div className="text-[11px] text-slate-600">Vistoria Bombeiros: <b>Aprovada</b></div>
          </div>
        </div>

        <MobileBottomNav />
      </div>
    </div>
  );
}
