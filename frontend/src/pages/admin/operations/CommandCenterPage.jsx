import { useState, useEffect } from 'react';
import { getCommandCenterMetrics, getIncidents } from '../../../services/operationService';
import { formatCurrency } from '../../../utils/formatCurrency';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Activity, Users, ShoppingCart, DollarSign, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function CommandCenterPage() {
  const [metrics, setMetrics] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const mData = await getCommandCenterMetrics();
      const iData = await getIncidents();
      setMetrics(mData);
      setIncidents(iData);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Command Center em tempo real...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            Command Center 🎯
          </h1>
          <p className="mt-1 text-gray-500 text-sm">Centro de comando e monitoramento da operação física e digital do Curitiba 360.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-md">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase">OPERAÇÃO AO VIVO</span>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">GMV Total</span>
            <DollarSign size={20} className="text-emerald-600" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">{formatCurrency(metrics?.gmv)}</h2>
          <span className="text-xs font-bold text-emerald-600">{metrics?.gmvGrowth} este mês</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Receita Plataforma</span>
            <Activity size={20} className="text-blue-600" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-blue-700">{formatCurrency(metrics?.revenue)}</h2>
          <span className="text-xs font-bold text-blue-600">{metrics?.revenueGrowth} este mês</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Usuários Cadastrados</span>
            <Users size={20} className="text-purple-600" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-purple-700">{(metrics?.users)?.toLocaleString('pt-BR')}</h2>
          <span className="text-xs font-bold text-purple-600">{metrics?.usersGrowth} este mês</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Pedidos Realizados</span>
            <ShoppingCart size={20} className="text-amber-500" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">{(metrics?.orders)?.toLocaleString('pt-BR')}</h2>
          <span className="text-xs font-bold text-amber-600">{metrics?.ordersGrowth} este mês</span>
        </Card>
      </div>

      {/* Live Operational Counters */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-center">
          <span className="block text-xs font-bold text-emerald-700 uppercase tracking-wider">Usuários Online Agora</span>
          <span className="text-2xl font-black text-emerald-900">{metrics?.activeOnline}</span>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 text-center">
          <span className="block text-xs font-bold text-blue-700 uppercase tracking-wider">Vendas (Últimos 10m)</span>
          <span className="text-2xl font-black text-blue-900">{metrics?.salesLast10Min} ingressos</span>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-4 text-center">
          <span className="block text-xs font-bold text-purple-700 uppercase tracking-wider">Check-ins Validados Hoje</span>
          <span className="text-2xl font-black text-purple-900">{metrics?.todayCheckins}</span>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-center">
          <span className="block text-xs font-bold text-amber-700 uppercase tracking-wider">Faturamento Hoje</span>
          <span className="text-2xl font-black text-amber-900">{formatCurrency(metrics?.todaySalesAmount)}</span>
        </div>
      </div>

      {/* Gate Turnstiles & Incidents */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Catracas Status */}
        <Card className="p-6 lg:col-span-1 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-600" />
            Status das Catracas / Portões
          </h2>

          <div className="space-y-3">
            {metrics?.turnstiles?.map(t => (
              <div key={t.name} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 text-sm">
                <div>
                  <span className="font-bold text-gray-800 block">{t.name}</span>
                  <span className="text-xs text-gray-500 font-semibold">Fluxo: {t.flow}</span>
                </div>
                <Badge variant={t.status === 'normal' ? 'green' : 'yellow'}>
                  {t.status === 'normal' ? '🟢 Normal' : '🟡 Atenção'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Operational Incident Feed */}
        <Card className="p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <AlertTriangle size={20} className="text-amber-500" />
              Ocorrências e Alertas Operacionais
            </h2>
            <Badge variant="blue">Tempo Real 🔴</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Evento</th>
                  <th className="p-3">Descrição</th>
                  <th className="p-3">Prioridade</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {incidents.map(inc => (
                  <tr key={inc.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold text-gray-900">{inc.id}</td>
                    <td className="p-3 font-semibold text-gray-800">{inc.eventName}</td>
                    <td className="p-3 text-xs text-gray-600 max-w-xs">{inc.description}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        inc.priority === 'Alta' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {inc.priority}
                      </span>
                    </td>
                    <td className="p-3">
                      <Badge variant={inc.status === 'resolvido' ? 'green' : 'yellow'}>
                        {inc.status === 'resolvido' ? 'Resolvido' : 'Em Atendimento'}
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
