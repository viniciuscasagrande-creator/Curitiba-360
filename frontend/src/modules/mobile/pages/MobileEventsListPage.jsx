import React, { useState, useEffect } from 'react';
import { mobileService } from '../services/mobileService';
import MobileHeader from '../components/MobileHeader';
import MobileBottomNav from '../components/MobileBottomNav';
import { Calendar, Search } from 'lucide-react';

export default function MobileEventsListPage() {
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
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando lista de eventos...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200">
        <MobileHeader profile={data.userProfile || {}} />

        <div className="p-4 space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" /> Meus Eventos
          </h2>

          <div className="space-y-3">
            {(data.eventosProdutor || []).map((evt) => (
              <div key={evt.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs">{evt.nome}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                    {evt.status}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500">{evt.data}</div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 font-mono font-bold">
                  <span className="text-purple-700">{evt.vendas} / {evt.capacidade} ingressos</span>
                  <span className="text-emerald-700">R$ {evt.receita?.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <MobileBottomNav />
      </div>
    </div>
  );
}
