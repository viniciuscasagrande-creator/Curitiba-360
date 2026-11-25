import { useState, useEffect } from 'react';
import { getEnterpriseOperations } from '../../../services/enterpriseOperationsService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SlaCenterPage() {
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
        Carregando SLA Executive Center...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          SLA Executive Center 🛡️
        </h1>
        <p className="mt-2 text-gray-500">Metas de disponibilidade dos serviços core (99,95%), SLA realizado e política de penalidades.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Meta de SLA Core</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">{data?.coreSlaTarget}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Custo por Pedido Alvo</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">{data?.costPerOrderTarget}</span>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Medição Diária de SLA por Serviço Core</h2>
        <div className="divide-y divide-gray-100">
          {data?.slaMeasurements?.map(item => (
            <div key={item.service} className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <div>
                  <span className="font-bold text-gray-900 block">{item.service}</span>
                  <span className="text-xs text-gray-500">Meta: {item.target}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-bold text-emerald-600">Realizado: {item.achieved}</span>
                <Badge variant="green">Conforme 🟢</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
