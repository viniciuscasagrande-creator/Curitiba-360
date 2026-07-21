import { useState, useEffect } from 'react';
import { getRefunds, processRefundStatus } from '../../../services/refundService';
import Table from '../../../components/tables/Table';
import Badge from '../../../components/ui/Badge';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDateTime } from '../../../utils/formatDate';
import { refundStatusMap, getStatusBadge } from '../../../utils/status';
import { RotateCcw, Search, Check, X } from 'lucide-react';

export default function RefundsList() {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRefundsData = async () => {
    setLoading(true);
    const data = await getRefunds();
    setRefunds(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRefundsData();
  }, []);

  const handleAction = async (id, status) => {
    await processRefundStatus(id, status);
    fetchRefundsData();
  };

  const filteredRefunds = refunds.filter(r =>
    r.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'ID Solicitação / Pedido',
      cell: (row) => (
        <div>
          <p className="font-bold text-gray-900">{row.id}</p>
          <p className="text-xs text-gray-500">Pedido: {row.order_id}</p>
        </div>
      )
    },
    {
      header: 'Solicitante',
      cell: (row) => <span className="font-semibold text-gray-800">{row.user_name}</span>
    },
    {
      header: 'Motivo',
      cell: (row) => (
        <p className="text-xs text-gray-600 max-w-xs truncate" title={row.reason}>
          {row.reason}
        </p>
      )
    },
    {
      header: 'Valor Solicitado',
      cell: (row) => (
        <span className="font-bold text-gray-900">{formatCurrency(row.amount)}</span>
      )
    },
    {
      header: 'Data da Solicitação',
      cell: (row) => formatDateTime(row.requested_at)
    },
    {
      header: 'Status',
      cell: (row) => {
        const info = getStatusBadge(row.status, refundStatusMap);
        return <Badge variant={info.color}>{info.label}</Badge>;
      }
    },
    {
      header: 'Ações',
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.status === 'em_analise' || row.status === 'solicitado' ? (
            <>
              <button
                onClick={() => handleAction(row.id, 'aprovado')}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition flex items-center gap-1 text-xs font-semibold"
                title="Aprovar Reembolso"
              >
                <Check size={16} /> Aprovar
              </button>
              <button
                onClick={() => handleAction(row.id, 'rejeitado')}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 transition flex items-center gap-1 text-xs font-semibold"
                title="Rejeitar Reembolso"
              >
                <X size={16} /> Rejeitar
              </button>
            </>
          ) : (
            <span className="text-xs text-gray-400 italic">Concluído</span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Reembolsos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Fila de análise e aprovação de devoluções e solicitações de estorno.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <Search size={18} className="text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Buscar por ID, número do pedido ou nome do solicitante..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <Table columns={columns} data={filteredRefunds} loading={loading} emptyMessage="Nenhuma solicitação de reembolso na fila." />
    </div>
  );
}
