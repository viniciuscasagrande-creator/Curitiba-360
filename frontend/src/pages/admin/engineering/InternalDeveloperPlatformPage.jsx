import { useState, useEffect } from 'react';
import { getEngineeringMetrics } from '../../../services/engineeringPlatformService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Terminal, GitPullRequest, CheckCircle2, Clock } from 'lucide-react';

export default function InternalDeveloperPlatformPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getEngineeringMetrics();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Internal Developer Platform (IDP)...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Internal Developer Platform (IDP) 🛠️
        </h1>
        <p className="mt-2 text-gray-500">Plataforma de engenharia de software, métricas DORA e orquestração de microsserviços.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-4">
        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Serviços Ativos</span>
          <span className="text-3xl font-black text-gray-900 mt-1 block">{data?.activeServicesCount}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Deploys Hoje</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">{data?.deploysToday}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Build Success</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">{data?.buildSuccessRate}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Lead Time</span>
          <span className="text-3xl font-black text-purple-700 mt-1 block">{data?.leadTimeForChanges}</span>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Métricas DORA (DevOps Research and Assessment)</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase block">Deployment Frequency</span>
            <span className="text-lg font-bold text-slate-900">{data?.doraMetrics?.deploymentFrequency}</span>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase block">Lead Time for Changes</span>
            <span className="text-lg font-bold text-slate-900">{data?.doraMetrics?.leadTime}</span>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase block">Change Failure Rate</span>
            <span className="text-lg font-bold text-slate-900">{data?.doraMetrics?.changeFailureRate}</span>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase block">Time to Restore Service (MTTR)</span>
            <span className="text-lg font-bold text-slate-900">{data?.doraMetrics?.timeToRestore}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
