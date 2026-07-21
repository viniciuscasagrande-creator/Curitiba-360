import { useState, useEffect } from 'react';
import { getFeatureFlags } from '../../../services/platformService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Flag } from 'lucide-react';

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getFeatureFlags();
      setFlags(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando feature flags...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Feature Flags & Rollout Progressivo 🚩
        </h1>
        <p className="mt-2 text-gray-500">Ativação/desativação remota de recursos, testes beta e liberação por ambiente.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">Recurso</th>
                <th className="p-3">Chave de Flag</th>
                <th className="p-3">Rollout %</th>
                <th className="p-3">Ambiente</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {flags.map(flag => (
                <tr key={flag.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{flag.name}</td>
                  <td className="p-3 font-mono text-blue-700 font-bold">{flag.key}</td>
                  <td className="p-3 font-bold text-purple-700">{flag.rolloutPercent}</td>
                  <td className="p-3 text-gray-700 font-medium capitalize">{flag.environment}</td>
                  <td className="p-3 text-center">
                    <Badge variant={flag.enabled ? 'green' : 'yellow'}>
                      {flag.enabled ? 'Ativo 🟢' : 'Desativado 🔴'}
                    </Badge>
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
