import { useState, useEffect } from 'react';
import { getPayments } from '../../../services/paymentService';
import Table from '../../../components/tables/Table';
import Badge from '../../../components/ui/Badge';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDateTime } from '../../../utils/formatDate';
import { paymentStatusMap, getStatusBadge } from '../../../utils/status';
import { CreditCard, Search } from 'lucide-react';

export default function PaymentsList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getPayments();
      setPayments(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredPayments = payments.filter(p =>
    p.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.method?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'ID Transação',
      cell: (row) => (
        <div>
          <p className="font-mono font-bold text-gray-900">{row.transaction_id}</p>
          <p className="text-xs text-gray-500">Pedido: {row.order_id}</p>
        </div>
      )
    },
    {
      header: 'Método de Pagamento',
      cell: (row) => <span className="font-medium text-gray-800">{row.method}</span>
    },
    {
      header: 'Valor Transacionado',
      cell: (row) => (
        <span className="font-bold text-emerald-600">{formatCurrency(row.amount)}</span>
      )
    },
    {
      header: 'Data do Pagamento',
      cell: (row) => formatDateTime(row.paid_at)
    },
    {
      header: 'Status',
      cell: (row) => {
        const info = getStatusBadge(row.status, paymentStatusMap);
        return <Badge variant={info.color}>{info.label}</Badge>;
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Pagamentos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Registro de transações financeiras, conciliação de métodos de pagamento e boletos.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <Search size={18} className="text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Buscar por ID de transação, pedido ou método de pagamento..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <Table columns={columns} data={filteredPayments} loading={loading} emptyMessage="Nenhum pagamento encontrado." />
    </div>
  );
}
