import { useState, useEffect } from 'react';
import { getSupportTickets, resolveTicket } from '../../../services/supportService';
import StatusBadge from '../../../components/admin/StatusBadge';
import Card from '../../../components/ui/Card';

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getSupportTickets();
      setTickets(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleResolve = async (id) => {
    await resolveTicket(id, 'resolvido');
    const data = await getSupportTickets();
    setTickets(data);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando tickets de atendimento...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Central de Suporte & Atendimento 🎧</h1>
        <p className="mt-2 text-gray-500">Gestão de tickets de atendimento, controle de SLA e suporte ao cliente.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Ticket</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Categoria</th>
                <th className="p-3">Assunto</th>
                <th className="p-3">SLA / Tempo</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-gray-900">{t.id}</td>
                  <td className="p-3 font-semibold text-gray-800">{t.customerName}</td>
                  <td className="p-3 font-semibold text-blue-700">{t.category}</td>
                  <td className="p-3 font-medium text-gray-700">{t.subject}</td>
                  <td className="p-3 font-mono text-xs font-bold text-amber-600">{t.sla}</td>
                  <td className="p-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="p-3 text-center">
                    {t.status !== 'resolvido' && (
                      <button
                        onClick={() => handleResolve(t.id)}
                        className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition"
                      >
                        Resolver
                      </button>
                    )}
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
