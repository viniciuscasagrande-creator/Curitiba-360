import React, { useState, useEffect } from 'react';
import { smartVenueService } from '../services/smartVenueService';
import IotDeviceGrid from '../components/IotDeviceGrid';
import { Cpu } from 'lucide-react';

export default function IotDevicesPage() {
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
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando dispositivos IoT...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-purple-600" /> Dispositivos IoT & Hardware Conectado
        </h1>
      </div>

      <IotDeviceGrid devices={data.iotDevices || []} />
    </div>
  );
}
