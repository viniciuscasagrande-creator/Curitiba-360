import { useState, useEffect } from 'react';
import { getCustomersCRM } from '../../../services/crmService';
import { formatCurrency } from '../../../utils/formatCurrency';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';

export default function CustomerCRMPage() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getCustomersCRM();
      setCustomers(data);
      if (data.length) setSelectedCustomer(data[0]);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando CRM Customer 360...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">CRM & Jornada Customer 360 👥</h1>
        <p className="mt-2 text-gray-500">Visão única de cada cliente, histórico de compras, carteira e linha do tempo de interações.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer List */}
        <Card className="p-6 lg:col-span-1 space-y-3">
          <h2 className="font-bold text-gray-900 text-lg">Clientes</h2>
          <div className="divide-y divide-gray-100">
            {customers.map(c => (
              <div
                key={c.userId}
                onClick={() => setSelectedCustomer(c)}
                className={`p-3 rounded-2xl cursor-pointer transition ${
                  selectedCustomer?.userId === c.userId ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-base">{c.name}</h3>
                  <Badge variant="blue">{c.level}</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">{c.email}</p>
                <div className="mt-2 flex justify-between text-xs font-semibold text-gray-700">
                  <span>Gasto Total:</span>
                  <span className="text-emerald-600 font-bold">{formatCurrency(c.totalSpent)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Customer 360 Details */}
        {selectedCustomer && (
          <Card className="p-6 lg:col-span-2 space-y-6">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">{selectedCustomer.name}</h2>
                <p className="text-sm text-gray-500">{selectedCustomer.email}</p>
              </div>
              <Badge variant="purple">{selectedCustomer.level}</Badge>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-xs font-semibold text-gray-500 block">Total Gasto</span>
                <span className="text-lg font-bold text-emerald-600">{formatCurrency(selectedCustomer.totalSpent)}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-xs font-semibold text-gray-500 block">Compras</span>
                <span className="text-lg font-bold text-gray-900">{selectedCustomer.totalOrders}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-xs font-semibold text-gray-500 block">Cashback</span>
                <span className="text-lg font-bold text-amber-600">{formatCurrency(selectedCustomer.cashbackBalance)}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-xs font-semibold text-gray-500 block">Pontos</span>
                <span className="text-lg font-bold text-purple-600">{selectedCustomer.pointsBalance} pts</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-base">Linha do Tempo de Interações</h3>
              <div className="space-y-3">
                {selectedCustomer.timeline?.map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-sm p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                    <span className="font-mono text-xs font-bold text-blue-600 whitespace-nowrap">{item.date}</span>
                    <span className="font-medium text-gray-800">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
