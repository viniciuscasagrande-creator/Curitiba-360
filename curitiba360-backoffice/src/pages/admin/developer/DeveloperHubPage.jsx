import { useState, useEffect } from 'react';
import { getDeveloperMetrics, getDeveloperApps } from '../../../services/developerPlatformService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import StatusBadge from '../../../components/admin/StatusBadge';
import { Code2, Key, Zap, Activity, Layers } from 'lucide-react';

export default function DeveloperHubPage() {
  const [metrics, setMetrics] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const m = await getDeveloperMetrics();
      const a = await getDeveloperApps();
      setMetrics(m);
      setApps(a);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Developer Portal & API Platform...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Developer Hub & API Platform 💻
        </h1>
        <p className="mt-2 text-gray-500">Ecossistema de desenvolvedores, chaves de API, webhooks e OpenAPI 3.1.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-4">
        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Aplicações Conectadas</span>
          <span className="text-3xl font-black text-gray-900 mt-1 block">{metrics?.activeAppsCount} Apps</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">API Calls Hoje</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">{metrics?.apiCallsToday}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Latência Média</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">{metrics?.averageLatency}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Taxa de Erro</span>
          <span className="text-3xl font-black text-purple-700 mt-1 block">{metrics?.errorRate}</span>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Aplicações & API Keys Cadastradas</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">Nome da Aplicação</th>
                <th className="p-3">API Key</th>
                <th className="p-3">Escopos Permitidos</th>
                <th className="p-3">Rate Limit</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {apps.map(app => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="p-3 font-sans font-bold text-gray-900">{app.name}</td>
                  <td className="p-3 text-blue-700 font-bold">{app.apiKey}</td>
                  <td className="p-3 font-sans">
                    <div className="flex flex-wrap gap-1">
                      {app.scopes.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-purple-700 font-bold">{app.rateLimit}</td>
                  <td className="p-3 font-sans">
                    <StatusBadge status={app.status} />
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
