import React, { useState, useEffect } from 'react';
import { monitoringService } from '../services/monitoringService';
import SectorOccupancyCards from '../components/SectorOccupancyCards';
import MobileBottomNav from '../../components/MobileBottomNav';

export default function SectorOccupancyScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    monitoringService.getMonitoringOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando ocupação por setor...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-24 text-slate-800 text-xs">
      <div className="max-w-md mx-auto bg-slate-100 min-h-screen shadow-2xl space-y-4 border-x border-slate-200 p-4">
        <SectorOccupancyCards setores={data.setoresOcupacao || []} />
        <MobileBottomNav />
      </div>
    </div>
  );
}
