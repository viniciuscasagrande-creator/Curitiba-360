import React, { useState, useEffect } from 'react';
import { smartVenueService } from '../services/smartVenueService';
import NocControlCenterPanel from '../components/NocControlCenterPanel';
import IotDeviceGrid from '../components/IotDeviceGrid';
import OperationalQueueMonitor from '../components/OperationalQueueMonitor';
import { Radio } from 'lucide-react';

export default function SmartVenueNocPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    smartVenueService.getSmartVenueOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando Central NOC Smart Venue...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Radio className="w-6 h-6 text-purple-600 animate-pulse" /> Central de Operações NOC Smart Venue & IoT (MOD-14)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Monitoramento de catracas, leitores QR Code/NFC, tempo de espera em filas e telemetria de sensores de presença.
          </p>
        </div>
      </div>

      <NocControlCenterPanel metrics={data.nocMetrics || {}} />
      <IotDeviceGrid devices={data.iotDevices || []} />
      <OperationalQueueMonitor filas={data.filasAcessos || []} />
    </div>
  );
}
