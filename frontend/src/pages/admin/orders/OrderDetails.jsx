import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrderById } from '../../../services/orderService'
import StatusBadge from '../../../components/admin/StatusBadge'
import { formatCurrency } from '../../../utils/formatCurrency'
import { ArrowLeft } from 'lucide-react'

export default function OrderDetails() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const data = await getOrderById(id)
      setOrder(data)
      setLoading(false)
    }

    load()
  }, [id])

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando detalhes do pedido...
      </div>
    )
  }

  if (!order) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Pedido não encontrado.
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/admin/orders" className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Pedido #{id.slice(0, 8)}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">Informações do Pedido</h2>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Cliente / ID</span>
              <p className="font-bold text-gray-800">{order.userName || order.userId}</p>
              {order.userEmail && <p className="text-xs text-gray-500">{order.userEmail}</p>}
            </div>

            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Evento</span>
              <p className="font-medium text-gray-800">{order.eventName || 'Atração Curitiba 360'}</p>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Total do Pedido</span>
              <p className="text-2xl font-bold text-emerald-600">
                {formatCurrency(order.total)}
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Status Geral</span>
              <div className="mt-1">
                <StatusBadge status={order.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">Status do Pagamento</h2>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Método Utilizado</span>
              <p className="font-semibold text-gray-800">{order.paymentMethod || 'PIX / Cartão'}</p>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Estado do Pagamento</span>
              <div className="mt-2">
                <StatusBadge status={order.paymentStatus || order.status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
