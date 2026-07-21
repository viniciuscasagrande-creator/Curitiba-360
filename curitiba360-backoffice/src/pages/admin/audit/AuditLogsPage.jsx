import { useState, useEffect } from 'react';
import { getCentralAuditLogs } from '../../../services/auditService';
import Card from '../../../components/ui/Card';
import { ShieldCheck } from 'lucide-react';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getCentralAuditLogs();
      setLogs(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando logs de auditoria central...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Auditoria Central & Logs de Segurança 🛡️
        </h1>
        <p className="mt-2 text-gray-500">Histórico imutável de ações administrativas, aprovações financeiras e alterações de sistema.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Log</th>
                <th className="p-3">Usuário Administrador</th>
                <th className="p-3">Ação Executada</th>
                <th className="p-3">Entidade Afetada</th>
                <th className="p-3">Endereço IP</th>
                <th className="p-3">Data / Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{log.id}</td>
                  <td className="p-3 text-blue-700 font-bold">{log.user}</td>
                  <td className="p-3 font-sans font-semibold text-gray-800">{log.action}</td>
                  <td className="p-3 font-sans text-purple-700 font-medium">{log.entity}</td>
                  <td className="p-3 text-gray-500">{log.ip}</td>
                  <td className="p-3 text-gray-500">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
