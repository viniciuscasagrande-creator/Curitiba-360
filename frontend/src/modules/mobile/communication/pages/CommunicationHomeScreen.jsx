import React, { useState, useEffect } from 'react';
import { communicationService } from '../services/communicationService';
import OperationalChatWidget from '../components/OperationalChatWidget';
import ChannelsListPanel from '../components/ChannelsListPanel';
import EmergencyAlertsPanel from '../components/EmergencyAlertsPanel';
import PushSettingsPanel from '../components/PushSettingsPanel';
import MobileBottomNav from '../../components/MobileBottomNav';

export default function CommunicationHomeScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await communicationService.getCommunicationOverview();
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

  const handleSendMessage = async (text, isPriority) => {
    await communicationService.sendMessage(text, isPriority);
    loadData();
  };

  const handleAcknowledge = async (alertId) => {
    await communicationService.acknowledgeAlert(alertId);
    loadData();
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando comunicação operacional...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200 p-4">
        <OperationalChatWidget mensagens={data.mensagens || []} onSendMessage={handleSendMessage} />
        <EmergencyAlertsPanel alertas={data.alertasUrgentes || []} onAcknowledge={handleAcknowledge} />
        <ChannelsListPanel canais={data.canais || []} />
        <PushSettingsPanel settings={data.pushSettings || {}} />
        <MobileBottomNav />
      </div>
    </div>
  );
}
