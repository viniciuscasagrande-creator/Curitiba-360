import { useState, useEffect } from 'react';
import { getDeveloperMetrics } from '../../../services/developerPlatformService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Radio, CheckCircle2 } from 'lucide-react';

export default function WebhooksPage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getDeveloperMetrics();
      setMetrics(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando webhooks...
      </div>
    );
  }

  const events = [
    'order.created', 'payment.approved', 'payment.failed', 'ticket.generated',
    'checkin.completed', 'wallet.updated', 'partner.created', 'customer.created'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Gerenciamento de Webhooks 📡
        </h1>
        <p className="mt-2 text-gray-500">Disparo de eventos HTTP em tempo real para sistemas parceiros.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Webhooks Enviados</span>
          <span className="text-3xl font-black text-gray-900 mt-1 block">{metrics?.webhooksSent}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Taxa de Sucesso</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">{metrics?.webhookSuccessRate}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Falhas Registradas</span>
          <span className="text-3xl font-black text-amber-600 mt-1 block">{metrics?.webhookFailures}</span>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Eventos Suportados no Barramento de Webhooks</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {events.map(ev => (
            <div key={ev} className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-blue-700">{ev}</span>
              <Badge variant="green">Ativo 🟢</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
