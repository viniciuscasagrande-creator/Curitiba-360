import { useState, useEffect } from 'react';
import { getIntelligenceMetrics } from '../../../services/intelligenceService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { ShieldCheck, Database, CheckCircle, RefreshCw } from 'lucide-react';

export default function DataQualityPage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getIntelligenceMetrics();
      setMetrics(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando governança de dados...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Qualidade & Governança de Dados 🛡️
        </h1>
        <p className="mt-2 text-gray-500">Monitoramento da integridade, completude e duplicidade na camada semântica.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-4">
        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Data Quality Score</span>
          <span className="text-3xl font-black text-emerald-600">{metrics?.dataQualityScore}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Completude</span>
          <span className="text-3xl font-black text-blue-600">{metrics?.completude}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Duplicidade</span>
          <span className="text-3xl font-black text-purple-600">{metrics?.duplicidade}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Atualização</span>
          <span className="text-3xl font-black text-amber-500">{metrics?.atualizacao}</span>
        </Card>
      </div>
    </div>
  );
}
