import React, { useState, useEffect } from 'react';
import { monitoringService } from '../services/monitoringService';
import RealtimeExecutiveDashboard from '../components/RealtimeExecutiveDashboard';
import SectorOccupancyCards from '../components/SectorOccupancyCards';
import QueueWaitMonitor from '../components/QueueWaitMonitor';
import LiveIncidentsStream from '../components/LiveIncidentsStream';
import MobileBottomNav from '../../components/MobileBottomNav';

export default function MonitoringHomeScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await monitoringService.getMonitoringOverview();
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

  const handleRefresh = async () => {
    const res = await monitoringService.refreshMonitoringData();
    if (res.success) setData(res.data);
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando monitoramento móvel ao vivo...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200 p-4">
        <RealtimeExecutiveDashboard
          kpis={data.kpis || {}}
          lastUpdatedTime={data.lastUpdatedTime || ''}
          onRefresh={handleRefresh}
        />
        <SectorOccupancyCards setores={data.setoresOcupacao || []} />
        <QueueWaitMonitor filas={data.filasEntrada || []} />
        <LiveIncidentsStream ocorrencias={data.ocorrenciasAoVivo || []} />
        <MobileBottomNav />
      </div>
    </div>
  );
}
