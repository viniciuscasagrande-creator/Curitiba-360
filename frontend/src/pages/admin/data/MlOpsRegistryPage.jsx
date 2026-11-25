import { useState, useEffect } from 'react';
import { getDataPlatformMetrics } from '../../../services/dataPlatformService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Brain, CheckCircle2 } from 'lucide-react';

export default function MlOpsRegistryPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getDataPlatformMetrics();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando MLOps & Model Registry...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          MLOps & Registry de Modelos de IA 🧬
        </h1>
        <p className="mt-2 text-gray-500">Gestão de modelos Machine Learning em produção, acurácia, F1 score e drift.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">Nome do Modelo</th>
                <th className="p-3">Acurácia (Accuracy)</th>
                <th className="p-3">F1 Score</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {data?.mlModels?.map(m => (
                <tr key={m.name} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{m.name}</td>
                  <td className="p-3 font-bold text-emerald-600">{m.accuracy}</td>
                  <td className="p-3 font-bold text-purple-700">{m.f1Score}</td>
                  <td className="p-3 font-sans">
                    <Badge variant="green">Em Produção 🟢</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
