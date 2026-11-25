import React, { useState, useEffect } from 'react';
import { enterpriseService } from '../services/enterpriseService';
import PerformanceMetricsGauges from '../components/PerformanceMetricsGauges';
import MicroservicesTopologyCard from '../components/MicroservicesTopologyCard';
import CloudInfraMapPanel from '../components/CloudInfraMapPanel';
import EventBusMonitorPanel from '../components/EventBusMonitorPanel';
import { Network } from 'lucide-react';

export default function EnterpriseArchitectureScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await enterpriseService.getEnterpriseOverview();
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

  const handleScale = async (msId, numInstances) => {
    const res = await enterpriseService.scaleMicroservice(msId, numInstances);
    alert(res.message);
    loadData();
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando Arquitetura Enterprise...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Network className="w-6 h-6 text-purple-600" /> Arquitetura Enterprise & Observabilidade (MOD-10)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Microsserviços serverless no Cloud Run, barramento de eventos Pub/Sub, Redis Cache e Data Warehouse BigQuery.
          </p>
        </div>
      </div>

      <PerformanceMetricsGauges slaTarget={data.slaTarget || {}} />
      <MicroservicesTopologyCard microservices={data.microservices || []} onScale={handleScale} />
      <CloudInfraMapPanel cloudInfra={data.cloudInfra || []} />
      <EventBusMonitorPanel eventStream={data.eventStream || []} />
    </div>
  );
}
