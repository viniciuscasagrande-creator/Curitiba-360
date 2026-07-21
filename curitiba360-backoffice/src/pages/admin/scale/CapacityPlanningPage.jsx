import { useState, useEffect } from 'react';
import { getEnterpriseOperations } from '../../../services/enterpriseOperationsService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Cpu, Zap } from 'lucide-react';

export default function CapacityPlanningPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getEnterpriseOperations();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Capacity Planning...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Capacity Planning & Headroom Mínimo ⚡
        </h1>
        <p className="mt-2 text-gray-500">Previsão de capacidade atual, pico projetado para grandes eventos e margem de segurança (Headroom &gt; 30%).</p>
      </div>

      <Card className="p-6 text-center bg-gradient-to-br from-blue-900 to-indigo-950 text-white">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block">Headroom de Segurança</span>
        <span className="text-4xl font-black text-emerald-400 mt-1 block">{data?.minHeadroom}</span>
        <span className="text-xs text-blue-200 block mt-1">Prontidão garantida para megaeventos</span>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Previsão de Capacidade da Infraestrutura</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">Métrica de Capacidade</th>
                <th className="p-3">Uso Atual</th>
                <th className="p-3">Pico Projetado</th>
                <th className="p-3">Headroom %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {data?.capacityForecasts?.map(item => (
                <tr key={item.metric} className="hover:bg-gray-50">
                  <td className="p-3 font-sans font-bold text-gray-900">{item.metric}</td>
                  <td className="p-3 font-bold text-blue-600">{item.current}</td>
                  <td className="p-3 font-bold text-purple-700">{item.peakProjected}</td>
                  <td className="p-3 font-bold text-emerald-600">{item.headroom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
