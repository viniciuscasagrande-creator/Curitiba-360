import React, { useState, useEffect } from 'react';
import { biService } from '../services/biService';
import ExecutiveDecisionCenterPanel from '../components/ExecutiveDecisionCenterPanel';
import AnalyticsPredictiveEngineCard from '../components/AnalyticsPredictiveEngineCard';
import { BarChart3 } from 'lucide-react';

export default function BiDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    biService.getBiOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando Business Intelligence...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" /> Business Intelligence, Data Lake & Decision Center (MOD-15)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Modelagem analítica em fatos e dimensões, KPIs executivos em tempo real e analytics preditivo com IA.
          </p>
        </div>
      </div>

      <ExecutiveDecisionCenterPanel kpis={data.executiveKpis || {}} />
      <AnalyticsPredictiveEngineCard previsoes={data.previsoesIa || []} />
    </div>
  );
}
