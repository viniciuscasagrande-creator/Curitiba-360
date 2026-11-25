import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrders } from '../../../services/orderService'
import StatusBadge from '../../../components/admin/StatusBadge'
import { formatCurrency } from '../../../utils/formatCurrency'

export default function OrdersList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const data = await getOrders()
      setOrders(data)
      setLoading(false)
    }

    load()
  }, [])

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando pedidos...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
        <p className="mt-2 text-gray-500">Acompanhe todos os pedidos realizados no sistema.</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="border-b border-gray-200 bg-gray-50/80 text-xs font-semibold uppercase text-gray-700">
            <tr>
              <th className="p-4">Pedido</th>
              <th className="p-4">Cliente / ID</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Ação</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-bold text-gray-900">
                  #{order.id.slice(0, 8)}
                </td>

                <td className="p-4">
                  <p className="font-semibold text-gray-800">{order.userName || order.userId}</p>
                  {order.userEmail && <p className="text-xs text-gray-500">{order.userEmail}</p>}
                </td>

                <td className="p-4 font-bold text-emerald-600">
                  {formatCurrency(order.total)}
                </td>

                <td className="p-4">
                  <StatusBadge status={order.status} />
                </td>

                <td className="p-4 text-center">
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="font-bold text-blue-700 hover:text-blue-800 hover:underline text-xs"
                  >
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
