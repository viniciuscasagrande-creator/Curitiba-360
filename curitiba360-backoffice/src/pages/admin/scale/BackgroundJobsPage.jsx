import { useState, useEffect } from 'react';
import { getBackgroundJobs } from '../../../services/platformService';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../components/admin/StatusBadge';
import { Zap } from 'lucide-react';

export default function BackgroundJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getBackgroundJobs();
      setJobs(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando filas e jobs assíncronos...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Filas & Jobs Assíncronos ⚡
        </h1>
        <p className="mt-2 text-gray-500">Monitoramento de processamento em segundo plano, retentativas e Dead-Letter Queue.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Job</th>
                <th className="p-3">Nome da Tarefa</th>
                <th className="p-3">Fila</th>
                <th className="p-3">Tentativas</th>
                <th className="p-3">Duração</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {jobs.map(j => (
                <tr key={j.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{j.id}</td>
                  <td className="p-3 font-sans font-bold text-gray-900">{j.name}</td>
                  <td className="p-3 text-purple-700 font-bold">{j.queue}</td>
                  <td className="p-3 text-gray-700">{j.attempts}</td>
                  <td className="p-3 text-emerald-600 font-bold">{j.duration}</td>
                  <td className="p-3 font-sans">
                    <StatusBadge status={j.status} />
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
