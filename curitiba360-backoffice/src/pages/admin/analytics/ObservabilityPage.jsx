import { useState, useEffect } from 'react';
import { getPlatformObservability } from '../../../services/observabilityService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Activity, Server, Zap, CheckCircle2 } from 'lucide-react';

export default function ObservabilityPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getPlatformObservability();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando telemetria e observabilidade...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Observabilidade & Telemetria do Sistema ⚡
        </h1>
        <p className="mt-2 text-gray-500">Monitoramento de saúde das APIs, latência do banco de dados e gateways de pagamento.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Uptime Geral</span>
            <CheckCircle2 size={20} className="text-emerald-600" />
          </div>
          <h2 className="mt-2 text-3xl font-black text-emerald-600">{data?.uptime}</h2>
          <span className="text-xs text-gray-500 font-semibold">Sem quedas registradas</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Latência da API</span>
            <Zap size={20} className="text-blue-600" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-blue-700">{data?.apiLatency}</h2>
          <span className="text-xs text-gray-500 font-semibold">Tempo médio de resposta</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Leitura/Escrita Firestore</span>
            <Server size={20} className="text-purple-600" />
          </div>
          <h2 className="mt-2 text-xl font-bold text-gray-900">{data?.databaseReadWrite}</h2>
          <span className="text-xs text-purple-600 font-semibold">Desempenho ótimo</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Validador Catracas</span>
            <Activity size={20} className="text-amber-500" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-amber-600">{data?.gateScanValidationTime}</h2>
          <span className="text-xs text-gray-500 font-semibold">Validação instantânea QR</span>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Status dos Serviços Integrados</h2>
        <div className="divide-y divide-gray-100">
          {data?.services?.map(service => (
            <div key={service.name} className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-gray-800">{service.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-gray-500 font-semibold">Latência: {service.latency}</span>
                <Badge variant="green">Operacional 🟢</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
