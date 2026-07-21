import { useState, useEffect } from 'react';
import { getCopilotInsights } from '../../../services/copilotService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Layers, Activity, Users, Clock } from 'lucide-react';

export default function DigitalTwinPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getCopilotInsights();
      setData(res);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando simulação de Gêmeo Digital (Digital Twin)...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Digital Twin & Simulação de Eventos 🔮
        </h1>
        <p className="mt-2 text-gray-500">Réplica virtual para simulação de fluxo de público, filas de entrada e gargalos em tempo real.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Evento Simulado</span>
          <span className="text-lg font-black text-gray-900 mt-1 block">{data?.digitalTwin?.eventSimulated}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Participantes Simultâneos</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">{data?.digitalTwin?.simulatedAttendees.toLocaleString('pt-BR')}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Tempo de Fila Estimado</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">{data?.digitalTwin?.predictedQueueTime}</span>
        </Card>
      </div>
    </div>
  );
}
