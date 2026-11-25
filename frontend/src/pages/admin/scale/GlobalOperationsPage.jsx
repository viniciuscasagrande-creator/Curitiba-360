import { useState, useEffect } from 'react';
import { getGlobalOperationsHealth } from '../../../services/globalOperationsService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Globe, Cpu, Radio, ShieldCheck } from 'lucide-react';

export default function GlobalOperationsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getGlobalOperationsHealth();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando painel de operação global...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Painel de Operação Global & Capacidade 🌐
        </h1>
        <p className="mt-2 text-gray-500">Monitoramento global de throughput (RPS), regiões multi-cloud e planejamento de capacidade.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Status Global</span>
          <span className="text-xl font-black text-emerald-600 mt-1 block">{data?.globalHealthStatus}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Throughput de Pico</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">{data?.peakThroughput}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Uso de Capacidade</span>
          <span className="text-2xl font-black text-purple-700 mt-1 block">{data?.activeCapacityRatio}</span>
          <span className="text-xs text-emerald-600 font-bold block mt-1">Alta margem de expansão</span>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Regiões da Infraestrutura Multi-Cloud</h2>
        <div className="divide-y divide-gray-100">
          {data?.geoRegions?.map(reg => (
            <div key={reg.region} className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-blue-600" />
                <span className="font-bold text-gray-900">{reg.region}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-gray-500">Carga: {reg.load} | Latência: {reg.latency}</span>
                <Badge variant={reg.status === 'primaria' ? 'green' : 'blue'}>
                  {reg.status === 'primaria' ? 'Primária 🟢' : 'DR Standby 🔵'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
