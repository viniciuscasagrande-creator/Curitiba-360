import React, { useState, useEffect } from 'react';
import { esgService } from '../services/esgService';
import EsgKpiDashboardCard from '../components/EsgKpiDashboardCard';
import CarbonCalculatorWidget from '../components/CarbonCalculatorWidget';
import { Leaf } from 'lucide-react';

export default function EsgControlHubPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    esgService.getEsgOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando governança ESG...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800 font-medium">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-600 animate-pulse" /> Governança ESG, Sustentabilidade & Impacto Social (MOD-24)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Monitoramento ambiental (CO₂, resíduos), inclusão social (PCD, diversidade) e certificações ISO 14001 / Pacto Global ONU.
          </p>
        </div>
      </div>

      <EsgKpiDashboardCard metrics={data.esgMetrics || {}} />
      <CarbonCalculatorWidget calc={data.calculadoraCarbono || {}} />
    </div>
  );
}
