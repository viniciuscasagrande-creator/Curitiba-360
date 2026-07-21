import { useState, useEffect } from 'react';
import { getAutomationCampaigns } from '../../../services/marketingAutomationService';
import StatusBadge from '../../../components/admin/StatusBadge';
import Card from '../../../components/ui/Card';
import { Megaphone, Zap, Send, TrendingUp } from 'lucide-react';

export default function MarketingAutomationPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getAutomationCampaigns();
      setCampaigns(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando automações de marketing...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Automação de Marketing & Drip Campaigns 📢
        </h1>
        <p className="mt-2 text-gray-500">Disparos automáticos baseados em gatilhos de comportamento do usuário (Push, Email, WhatsApp).</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Campanhas Ativas</span>
            <Zap size={20} className="text-amber-500" />
          </div>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">{campaigns.length}</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Mensagens Disparadas</span>
            <Send size={20} className="text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-blue-700 mt-2">24.100</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Conversão Média</span>
            <TrendingUp size={20} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">20,8%</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">Campanha</th>
                <th className="p-3">Gatilho Disparador</th>
                <th className="p-3">Canais</th>
                <th className="p-3">Envios</th>
                <th className="p-3">Taxa de Conversão</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{c.name}</td>
                  <td className="p-3 text-blue-700 font-semibold">{c.trigger}</td>
                  <td className="p-3 text-gray-700 font-medium">{c.channel}</td>
                  <td className="p-3 font-bold text-gray-900">{c.sentCount.toLocaleString('pt-BR')}</td>
                  <td className="p-3 font-extrabold text-emerald-600">{c.conversionRate}</td>
                  <td className="p-3">
                    <StatusBadge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
