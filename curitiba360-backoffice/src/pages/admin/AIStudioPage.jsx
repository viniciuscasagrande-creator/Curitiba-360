import { useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { Sparkles, Users, TrendingUp, Target, Zap } from 'lucide-react';

export default function AIStudioPage() {
  const [generating, setGenerating] = useState(false);
  const [campaignGenerated, setCampaignGenerated] = useState(false);

  const segments = [
    { name: 'Turistas de Alto Valor', count: '1.240 usuários', probability: '89%', target: 'Pass Experience' },
    { name: 'Amantes de Gastronomia', count: '3.850 usuários', probability: '76%', target: 'Restaurantes Parceiros' },
    { name: 'Famílias de Fim de Semana', count: '5.120 usuários', probability: '82%', target: 'Parques & Museus' },
    { name: 'Frequência Recorrente', count: '2.400 usuários', probability: '94%', target: 'Clube Ouro' }
  ];

  const handleGenerateCampaign = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setCampaignGenerated(true);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            Curitiba 360 AI Studio 🔮
          </h1>
          <p className="mt-2 text-gray-500">Segmentação inteligente, previsão de vendas e automação de campanhas por IA.</p>
        </div>

        <button
          onClick={handleGenerateCampaign}
          disabled={generating}
          className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          <Sparkles size={18} />
          {generating ? 'IA Gerando Campanha...' : 'Gerar Campanha com IA'}
        </button>
      </div>

      {/* Campaign Result Card */}
      {campaignGenerated && (
        <Card className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
              ⚡ Campanha Sugerida pela IA
            </span>
            <Badge variant="green">Previsão: +34% Conversão</Badge>
          </div>
          <h2 className="text-xl font-bold">Oferta Personalizada: "Fim de Semana Cultural em Curitiba"</h2>
          <p className="text-sm text-blue-100 opacity-90">
            Público Alvo: <strong>Turistas de Alto Valor (1.240 usuários)</strong> • Disparar via WhatsApp e Web Push com cupom de 10% de cashback no Pass Experience.
          </p>
        </Card>
      )}

      {/* Top AI Insights */}
      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-semibold">Segmentos Ativos</span>
            <Users size={20} className="text-blue-600" />
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900">4 Grupos</h3>
          <p className="text-xs text-emerald-600 font-semibold">Sugeridos automaticamente pela IA</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-semibold">Previsão de Vendas</span>
            <TrendingUp size={20} className="text-emerald-600" />
          </div>
          <h3 className="text-3xl font-extrabold text-emerald-600">950 Vendas</h3>
          <p className="text-xs text-gray-500">Previsão de vendas de ingressos para o fim de semana</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-semibold">Assertividade da IA</span>
            <Zap size={20} className="text-amber-500" />
          </div>
          <h3 className="text-3xl font-extrabold text-blue-600">91,4%</h3>
          <p className="text-xs text-gray-500">Taxa de retenção e precisão nas recomendações</p>
        </Card>
      </div>

      {/* Customer Segments Table */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Target size={20} className="text-blue-600" />
          Segmentos de Clientes Inteligentes (IA CRM)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">Segmento</th>
                <th className="p-3">Volume</th>
                <th className="p-3">Probabilidade de Compra</th>
                <th className="p-3">Produto Recomendado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {segments.map((s, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{s.name}</td>
                  <td className="p-3 text-gray-600">{s.count}</td>
                  <td className="p-3 font-bold text-emerald-600">{s.probability}</td>
                  <td className="p-3 font-semibold text-blue-700">{s.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
