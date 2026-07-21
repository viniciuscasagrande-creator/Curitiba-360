import { useState, useEffect } from 'react';
import { getResilienceMetrics } from '../../../services/resilienceService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

export default function ReliabilityCenterPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getResilienceMetrics();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Reliability Center...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Reliability Center & Disponibilidade SLO ⚡
        </h1>
        <p className="mt-2 text-gray-500">Error budget, disponibilidade dos serviços e tempo médio de recuperação (MTTR).</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Disponibilidade SLO</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">{data?.sloAvailability}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Error Budget Restante</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">{data?.errorBudgetRemaining}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">MTTR Médio</span>
          <span className="text-3xl font-black text-purple-600 mt-1 block">{data?.mttr}</span>
        </Card>
      </div>
    </div>
  );
}
