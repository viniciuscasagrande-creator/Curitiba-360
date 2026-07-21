import React, { useState, useEffect } from 'react';
import { mobileService } from '../services/mobileService';
import MobileHeader from '../components/MobileHeader';
import MobileKpiCards from '../components/MobileKpiCards';
import MobileAiAssistantCard from '../components/MobileAiAssistantCard';
import MobileNotificationFeed from '../components/MobileNotificationFeed';
import MobileBottomNav from '../components/MobileBottomNav';
import { RefreshCw, Smartphone } from 'lucide-react';

export default function MobileProducerAppPage() {
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

  const handleNotificationRead = async (id) => {
    await mobileService.markNotificationAsRead(id);
    loadData();
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando App do Produtor Mobile...</p>
      </div>
    );
  }

  const unreadCount = (data.notifications || []).filter((n) => !n.lida).length;

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      {/* SIMULADOR DE MOLDURA SMARTPHONE */}
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200">
        {/* CABEÇALHO DA TELA MOBILE */}
        <MobileHeader profile={data.userProfile || {}} unreadCount={unreadCount} />

        <div className="p-4 space-y-4">
          {/* CARDS DE KPIS */}
          <MobileKpiCards kpis={data.kpis || {}} />

          {/* IA ASSISTANT */}
          <MobileAiAssistantCard alerts={data.aiAssistantAlerts || []} />

          {/* FEED DE NOTIFICAÇÕES PUSH */}
          <MobileNotificationFeed notifications={data.notifications || []} onRead={handleNotificationRead} />
        </div>

        {/* BOTTOM NAVIGATION BAR */}
        <MobileBottomNav />
      </div>
    </div>
  );
}
