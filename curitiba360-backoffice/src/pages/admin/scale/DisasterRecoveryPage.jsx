import { useState, useEffect } from 'react';
import { getDisasterRecoveryStatus } from '../../../services/disasterRecoveryService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Database, ShieldCheck, HardDrive, RefreshCw } from 'lucide-react';

export default function DisasterRecoveryPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getDisasterRecoveryStatus();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Disaster Recovery e estatísticas de backup...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Disaster Recovery & Backups Automatizados 💾
        </h1>
        <p className="mt-2 text-gray-500">Métricas RTO/RPO, replicação geográfica multi-região e histórico de snapshots.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">RTO (Tempo Máximo Retorno)</span>
          <span className="text-2xl font-black text-emerald-600 mt-1">{data?.rtoTarget}</span>
          <span className="text-xs text-gray-500 block mt-1">Meta: &lt; 15 min</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">RPO (Perda Máxima Dados)</span>
          <span className="text-2xl font-black text-blue-600 mt-1">{data?.rpoTarget}</span>
          <span className="text-xs text-gray-500 block mt-1">Meta: &lt; 5 min</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Último Backup Snapshot</span>
          <span className="text-sm font-extrabold text-purple-700 mt-1 block">{data?.lastBackupSnapshot}</span>
          <span className="text-xs text-emerald-600 font-bold block mt-1">Status: Íntegro 🟢</span>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Histórico de Snapshots Diários (GCS Cloud Storage)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Snapshot</th>
                <th className="p-3">Tipo de Backup</th>
                <th className="p-3">Tamanho</th>
                <th className="p-3">Data / Hora</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {data?.backupHistory?.map(snap => (
                <tr key={snap.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{snap.id}</td>
                  <td className="p-3 font-sans font-semibold text-gray-800">{snap.type}</td>
                  <td className="p-3 font-bold text-purple-700">{snap.size}</td>
                  <td className="p-3 text-gray-500">{snap.timestamp}</td>
                  <td className="p-3 font-sans">
                    <Badge variant="green">Concluído 🟢</Badge>
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
