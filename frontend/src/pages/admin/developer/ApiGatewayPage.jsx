import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Server, ShieldCheck, Zap } from 'lucide-react';

export default function ApiGatewayPage() {
  const endpoints = [
    { method: 'GET', path: '/api/v1/events', description: 'Catálogo de eventos e atrações', rateLimit: '1000/min' },
    { method: 'POST', path: '/api/v1/orders', description: 'Criação e processamento de pedidos', rateLimit: '500/min' },
    { method: 'POST', path: '/api/v1/checkins', description: 'Validação de QR Code e entrada catracas', rateLimit: '5000/min' },
    { method: 'GET', path: '/api/v1/finance', description: 'Lançamentos imutáveis e Ledger 360', rateLimit: '200/min' },
    { method: 'GET', path: '/api/v1/crm', description: 'Dados Customer 360 e segmentação', rateLimit: '300/min' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          API Gateway Unified ⚡
        </h1>
        <p className="mt-2 text-gray-500">Gateway único versionado (/v1, /v2) com OAuth 2.0, JWT e Rate Limiting.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">Método</th>
                <th className="p-3">Endpoint</th>
                <th className="p-3">Descrição</th>
                <th className="p-3">Quota / Rate Limit</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {endpoints.map(ep => (
                <tr key={ep.path} className="hover:bg-gray-50">
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-white font-bold ${ep.method === 'GET' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                      {ep.method}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-gray-900">{ep.path}</td>
                  <td className="p-3 font-sans text-gray-700">{ep.description}</td>
                  <td className="p-3 text-purple-700 font-bold">{ep.rateLimit}</td>
                  <td className="p-3 font-sans">
                    <Badge variant="green">Ativo 🟢</Badge>
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
