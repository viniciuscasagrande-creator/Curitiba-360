import { useState, useEffect } from 'react';
import { getFederationMetrics, getGlobalRegionsList } from '../../../services/globalFederationService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import StatusBadge from '../../../components/admin/StatusBadge';
import { Globe, Server, Cloud, ShieldCheck } from 'lucide-react';

export default function GlobalFederationPage() {
  const [metrics, setMetrics] = useState(null);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const m = await getFederationMetrics();
      const r = await getGlobalRegionsList();
      setMetrics(m);
      setRegions(r);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Global Federation Center...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Global Federation Center 🌍
        </h1>
        <p className="mt-2 text-gray-500">Federação distribuída em 12 países, 28 regiões e 3 provedores multi-cloud (AWS, GCP, Azure).</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-4">
        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Instâncias Federadas</span>
          <span className="text-3xl font-black text-gray-900 mt-1 block">{metrics?.activeInstances}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Países Conectados</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">{metrics?.activeCountries}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Disponibilidade Global</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">{metrics?.globalAvailability}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Latência Média</span>
          <span className="text-3xl font-black text-purple-700 mt-1 block">{metrics?.averageGlobalLatency}</span>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Regiões Operacionais & Soberania Local</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">Região / Hub</th>
                <th className="p-3">País de Atuação</th>
                <th className="p-3">Moeda Local</th>
                <th className="p-3">Conformidade Legal</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {regions.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="p-3 font-sans font-bold text-gray-900">{r.name}</td>
                  <td className="p-3 font-sans text-gray-700">{r.country}</td>
                  <td className="p-3 font-bold text-emerald-600">{r.currency}</td>
                  <td className="p-3 text-purple-700 font-bold">{r.compliance}</td>
                  <td className="p-3 font-sans">
                    <StatusBadge status={r.status} />
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
