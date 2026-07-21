import { useState, useEffect } from 'react';
import { getCheckins } from '../../services/checkinService';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { formatDateTime } from '../../utils/formatDate';
import { Users, Ticket, CheckCircle2, Percent } from 'lucide-react';

export default function CheckinDashboard() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getCheckins();
      setCheckins(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const totalSold = 5000;
  const validatedCount = 3842 + checkins.filter(c => c.status === 'liberado').length;
  const occupancyRate = ((validatedCount / totalSold) * 100).toFixed(1);

  const gateStats = [
    { name: 'PORTÃO A', count: 1240 + checkins.filter(c => c.gateId === 'Portão A' && c.status === 'liberado').length },
    { name: 'PORTÃO B', count: 987 + checkins.filter(c => c.gateId === 'Portão B' && c.status === 'liberado').length },
    { name: 'PORTÃO C', count: 1015 + checkins.filter(c => c.gateId === 'Portão C' && c.status === 'liberado').length },
    { name: 'PORTÃO D', count: 600 + checkins.filter(c => c.gateId === 'Portão D' && c.status === 'liberado').length }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Operacional em Tempo Real</h1>
        <p className="mt-2 text-gray-500">Monitoramento da fluxo de entradas, catracas e ocupação dos eventos.</p>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Ingressos Vendidos</p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900">{totalSold.toLocaleString('pt-BR')}</h2>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
              <Ticket size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Validados na Entrada</p>
              <h2 className="mt-2 text-3xl font-extrabold text-emerald-600">{validatedCount.toLocaleString('pt-BR')}</h2>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pessoas Presentes</p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900">{validatedCount.toLocaleString('pt-BR')}</h2>
            </div>
            <div className="rounded-xl bg-purple-50 p-3 text-purple-700">
              <Users size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Taxa de Ocupação</p>
              <h2 className="mt-2 text-3xl font-extrabold text-blue-600">{occupancyRate}%</h2>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
              <Percent size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Gate Breakdown and Real-time Progress */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Entradas por Portão */}
        <Card className="p-6 lg:col-span-1 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg">Entradas por Portão</h2>
          <div className="space-y-4">
            {gateStats.map(gate => {
              const gatePercent = ((gate.count / validatedCount) * 100).toFixed(1);
              return (
                <div key={gate.name} className="space-y-1.5">
                  <div className="flex justify-between text-sm font-semibold text-gray-700">
                    <span>{gate.name}</span>
                    <span className="font-bold text-gray-900">{gate.count.toLocaleString('pt-BR')} ({gatePercent}%)</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${gatePercent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Real-time Access Feed */}
        <Card className="p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-lg">Feed de Validações em Tempo Real</h2>
            <Badge variant="blue">Ao Vivo 🔴</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
                <tr>
                  <th className="p-3">Código Ingresso</th>
                  <th className="p-3">Portão</th>
                  <th className="p-3">Horário</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {checkins.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold text-gray-900">{item.ticketId}</td>
                    <td className="p-3 font-semibold text-gray-800">{item.gateId}</td>
                    <td className="p-3 text-xs">{formatDateTime(item.timestamp)}</td>
                    <td className="p-3">
                      <Badge variant={item.status === 'liberado' ? 'green' : 'yellow'}>
                        {item.status === 'liberado' ? 'Acesso Liberado' : 'Já Utilizado'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
