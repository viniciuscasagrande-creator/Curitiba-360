import { useState, useEffect } from 'react';
import { getIntelligenceMetrics } from '../../../services/intelligenceService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { ShieldAlert, AlertCircle, Lock } from 'lucide-react';

export default function RiskIntelligencePage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getIntelligenceMetrics();
      setMetrics(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Risk Intelligence...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Risk Intelligence & Antifraude 🛡️
        </h1>
        <p className="mt-2 text-gray-500">Casos sob investigação, prevenção de chargeback e compras de alto risco.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Caso</th>
                <th className="p-3">Usuário</th>
                <th className="p-3">Score de Risco</th>
                <th className="p-3">Motivo / Anomalia</th>
                <th className="p-3">Ação Preventiva</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {metrics?.riskCases?.map(rc => (
                <tr key={rc.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-gray-900">{rc.id}</td>
                  <td className="p-3 font-semibold text-blue-700">{rc.user}</td>
                  <td className="p-3 font-bold text-red-600">{rc.score}/100</td>
                  <td className="p-3 text-xs text-gray-700">{rc.reason}</td>
                  <td className="p-3 font-semibold text-amber-600">{rc.action}</td>
                  <td className="p-3">
                    <Badge variant="yellow">Em Análise</Badge>
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
