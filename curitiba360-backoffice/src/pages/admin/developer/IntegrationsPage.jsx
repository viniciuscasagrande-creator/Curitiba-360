import { useState, useEffect } from 'react';
import { getIntegrations } from '../../../services/developerPlatformService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Network, CheckCircle2 } from 'lucide-react';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getIntegrations();
      setIntegrations(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando integrações...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Ecossistema de Integrações 🔌
        </h1>
        <p className="mt-2 text-gray-500">Conectores prontos para Meta, Google Analytics/Ads, TikTok, WhatsApp, Stripe, Mercado Pago, Power BI e Looker Studio.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {integrations.map(item => (
          <Card key={item.id} className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Network size={24} className="text-blue-600" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                <p className="text-xs text-gray-500">Provedor: {item.provider} • Sincronização: {item.lastSync}</p>
              </div>
            </div>
            <Badge variant="green">Conectado 🟢</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
