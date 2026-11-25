import React, { useState, useEffect } from 'react';
import { mobileService } from '../services/mobileService';
import MobileHeader from '../components/MobileHeader';
import MobileBottomNav from '../components/MobileBottomNav';
import { DollarSign, TrendingUp } from 'lucide-react';

export default function MobileFinancialPage() {
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
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando financeiro mobile...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200">
        <MobileHeader profile={data.userProfile || {}} />

        <div className="p-4 space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-purple-600" /> Resumo Financeiro Mobile
          </h2>

          <div className="p-4 bg-gradient-to-br from-purple-900 to-slate-900 text-white rounded-xl shadow-lg border border-purple-800 space-y-2">
            <div className="text-[10px] text-purple-300 font-bold">Lucro Estimado Hoje</div>
            <div className="text-2xl font-extrabold text-emerald-400">
              R$ {(data.kpis?.lucroEstimadoHoje || 12400).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[10px] text-purple-300">Margem estimada de 28.9%</p>
          </div>
        </div>

        <MobileBottomNav />
      </div>
    </div>
  );
}
