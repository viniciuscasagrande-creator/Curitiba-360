import { useState, useEffect } from 'react';
import { getResilienceMetrics } from '../../../services/resilienceService';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../components/admin/StatusBadge';

export default function IncidentsPage() {
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
        Carregando central de incidentes...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Central de Incidentes & Post-Mortem 🚨
        </h1>
        <p className="mt-2 text-gray-500">Histórico de ocorrências operacionais, prioridades P1-P4 e tempos de resposta (MTTA/MTTR).</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Incidente</th>
                <th className="p-3">Título / Descrição</th>
                <th className="p-3">Prioridade</th>
                <th className="p-3">Serviço Afetado</th>
                <th className="p-3">MTTA</th>
                <th className="p-3">MTTR</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {data?.incidents?.map(inc => (
                <tr key={inc.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{inc.id}</td>
                  <td className="p-3 font-sans font-bold text-gray-900">{inc.title}</td>
                  <td className="p-3 font-bold text-purple-700">{inc.priority}</td>
                  <td className="p-3 font-sans text-gray-700">{inc.service}</td>
                  <td className="p-3 text-blue-600 font-bold">{inc.mtta}</td>
                  <td className="p-3 text-emerald-600 font-bold">{inc.mttr}</td>
                  <td className="p-3 font-sans">
                    <StatusBadge status={inc.status} />
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
