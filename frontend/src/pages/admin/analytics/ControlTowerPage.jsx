import { useState, useEffect } from 'react';
import { getControlTowerData } from '../../../services/dataPlatformService';
import { getFunnelMetrics, getCohortMetrics, getRiskAlerts } from '../../../services/biAnalyticsService';
import { formatCurrency } from '../../../utils/formatCurrency';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Sparkles, ShieldAlert, HeartPulse, Filter, Users, DollarSign, ArrowUpRight } from 'lucide-react';

export default function ControlTowerPage() {
  const [controlData, setControlData] = useState(null);
  const [funnel, setFunnel] = useState([]);
  const [cohort, setCohort] = useState([]);
  const [riskAlerts, setRiskAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [cData, fData, chData, rData] = await Promise.all([
        getControlTowerData(),
        getFunnelMetrics(),
        getCohortMetrics(),
        getRiskAlerts()
      ]);
      setControlData(cData);
      setFunnel(fData);
      setCohort(chData);
      setRiskAlerts(rData);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Control Tower Executive & BI Preditivo...
      </div>
    );
  }

  const healthMap = controlData?.healthMap;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-2xl">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 uppercase tracking-wider mb-2">
            <Sparkles size={14} /> Executive Control Tower 🗼
          </span>
          <h1 className="text-3xl font-black">Curitiba 360 Control Tower</h1>
          <p className="text-xs text-slate-300 mt-1">Nível Executivo Máximo — Inteligência de dados, IA preditiva e mapa de saúde do ecossistema.</p>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 font-mono block">SEMANTIC LAYER ACTIVE</span>
          <span className="text-emerald-400 font-bold text-sm flex items-center gap-1 justify-end">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> Single Source of Truth 🟢
          </span>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">GMV Total</span>
            <DollarSign size={20} className="text-emerald-600" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">{formatCurrency(controlData?.gmv)}</h2>
          <span className="text-xs font-bold text-emerald-600">{controlData?.gmvGrowth} vs mês anterior</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Receita Líquida</span>
            <ArrowUpRight size={20} className="text-blue-600" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-blue-700">{formatCurrency(controlData?.revenue)}</h2>
          <span className="text-xs font-bold text-blue-600">{controlData?.revenueGrowth} vs mês anterior</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Usuários Ativos</span>
            <Users size={20} className="text-purple-600" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-purple-700">{(controlData?.users)?.toLocaleString('pt-BR')}</h2>
          <span className="text-xs font-bold text-purple-600">{controlData?.usersGrowth} vs mês anterior</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Volume de Pedidos</span>
            <Filter size={20} className="text-amber-500" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">{(controlData?.orders)?.toLocaleString('pt-BR')}</h2>
          <span className="text-xs font-bold text-amber-600">{controlData?.ordersGrowth} vs mês anterior</span>
        </Card>
      </div>

      {/* Ecosystem Health Map & Predictive AI */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Health Map */}
        <Card className="p-6 lg:col-span-1 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <HeartPulse size={20} className="text-red-500" />
            Mapa de Saúde do Ecossistema
          </h2>

          <div className="space-y-3">
            {[
              { label: 'Financeiro', status: healthMap?.financial },
              { label: 'CRM & Clientes', status: healthMap?.crm },
              { label: 'Plataforma & APIs', status: healthMap?.platform },
              { label: 'Operação & Catracas', status: healthMap?.operations },
              { label: 'Marketplace B2B', status: healthMap?.marketplace },
              { label: 'Marketing & Ads', status: healthMap?.marketing }
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 text-sm">
                <span className="font-bold text-gray-800">{item.label}</span>
                <Badge variant={item.status === 'saudavel' ? 'green' : 'yellow'}>
                  {item.status === 'saudavel' ? '🟢 Saudável' : '🟡 Atenção'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Predictive AI Insights */}
        <Card className="p-6 lg:col-span-2 space-y-4 bg-gradient-to-br from-indigo-950 to-slate-900 text-white">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Sparkles size={20} className="text-blue-400" />
              IA Preditiva & Previsão de Demanda
            </h2>
            <span className="text-xs font-mono bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-400/30 font-bold">
              MODELO ATIVO 🤖
            </span>
          </div>

          <div className="space-y-4">
            {controlData?.predictiveInsights?.map(pred => (
              <div key={pred.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-white">{pred.title}</h3>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Confiança: {pred.confidence}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  <strong className="text-blue-400">Recomendação da IA:</strong> {pred.recommendation}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Conversion Funnel & Cohort Retention */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Funnel Table */}
        <Card className="p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <Filter size={20} className="text-blue-600" />
            Funil Executivo de Conversão
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
                <tr>
                  <th className="p-3">Etapa do Funil</th>
                  <th className="p-3">Volume</th>
                  <th className="p-3">Conversão Etapa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {funnel.map(f => (
                  <tr key={f.step} className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-gray-900">{f.step}</td>
                    <td className="p-3 text-gray-700 font-semibold">{f.count.toLocaleString('pt-BR')}</td>
                    <td className="p-3 font-bold text-emerald-600">{f.conversion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Cohort Retention Table */}
        <Card className="p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <Users size={20} className="text-purple-600" />
            Análise de Cohort & Retenção
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
                <tr>
                  <th className="p-3">Cohort</th>
                  <th className="p-3">D1</th>
                  <th className="p-3">D7</th>
                  <th className="p-3">D30</th>
                  <th className="p-3">D90</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cohort.map(c => (
                  <tr key={c.cohort} className="hover:bg-gray-50 font-semibold">
                    <td className="p-3 font-bold text-gray-900">{c.cohort}</td>
                    <td className="p-3 text-blue-600">{c.d1}</td>
                    <td className="p-3 text-blue-700">{c.d7}</td>
                    <td className="p-3 text-purple-600">{c.d30}</td>
                    <td className="p-3 text-purple-700">{c.d90}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Risk Engine Alerts */}
      <Card className="p-6 space-y-4">
        <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
          <ShieldAlert size={20} className="text-red-600" />
          Risk Engine & Alertas de Fraude
        </h2>

        <div className="space-y-3">
          {riskAlerts.map(alert => (
            <div key={alert.id} className="flex items-center justify-between p-4 rounded-2xl border border-red-100 bg-red-50/50">
              <div>
                <span className="font-bold text-red-900 text-sm block">{alert.title}</span>
                <span className="text-xs text-red-700">{alert.detail}</span>
              </div>
              <Badge variant="red">{alert.action}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
