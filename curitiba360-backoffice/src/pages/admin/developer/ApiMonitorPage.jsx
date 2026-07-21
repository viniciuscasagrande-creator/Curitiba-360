import { useState, useEffect } from 'react';
import { getDeveloperMetrics } from '../../../services/developerPlatformService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Activity, Zap, Server } from 'lucide-react';

export default function ApiMonitorPage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getDeveloperMetrics();
      setMetrics(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando observabilidade de APIs...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Observabilidade de APIs & Métricas 📊
        </h1>
        <p className="mt-2 text-gray-500">Monitoramento de throughput, disponibilidade, erros e consumidores de maior tráfego.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Chamadas Diárias</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">{metrics?.apiCallsToday}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Latência Média</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">{metrics?.averageLatency}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Taxa de Sucesso API</span>
          <span className="text-3xl font-black text-purple-700 mt-1 block">99,97%</span>
        </Card>
      </div>
    </div>
  );
}
