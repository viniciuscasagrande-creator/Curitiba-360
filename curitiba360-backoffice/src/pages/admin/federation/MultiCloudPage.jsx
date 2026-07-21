import { useState, useEffect } from 'react';
import { getMultiCloudProviders } from '../../../services/globalFederationService';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../components/admin/StatusBadge';
import { Cloud, Server, DollarSign } from 'lucide-react';

export default function MultiCloudPage() {
  const [clouds, setClouds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getMultiCloudProviders();
      setClouds(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Multi-Cloud Management...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Multi-Cloud & Hybrid Infra ☁️
        </h1>
        <p className="mt-2 text-gray-500">Gerenciamento orquestrado entre AWS, Google Cloud Platform (GCP) e Microsoft Azure.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {clouds.map(c => (
          <Card key={c.id} className="p-6 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <Cloud className="text-blue-600" size={24} />
                <StatusBadge status={c.status} />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mt-2">{c.provider}</h2>
              <p className="text-xs text-gray-500 mt-1 font-mono">Região: {c.region}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-600">{c.clusters} Clusters K8s</span>
              <span className="text-sm font-bold text-purple-700">{c.monthlyCost}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
