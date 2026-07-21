import { useEffect, useState } from 'react'
import {
  Users,
  CalendarDays,
  Ticket,
  ShoppingCart,
  CreditCard,
  RotateCcw
} from 'lucide-react'

import Card from '../../components/ui/Card'
import { getUsers } from '../../services/userService'
import { getEvents } from '../../services/eventService'
import { getOrders } from '../../services/orderService'
import { getPayments } from '../../services/paymentService'
import { getRefunds } from '../../services/refundService'

const initialMetrics = {
  users: 0,
  events: 0,
  orders: 0,
  payments: 0,
  refunds: 0
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState(initialMetrics)

  useEffect(() => {
    async function loadDashboard() {
      const [users, events, orders, payments, refunds] = await Promise.all([
        getUsers(),
        getEvents(),
        getOrders(),
        getPayments(),
        getRefunds()
      ])

      setMetrics({
        users: users.length,
        events: events.length,
        orders: orders.length,
        payments: payments.filter(
          item => item.status === 'approved' || item.status === 'pago'
        ).length,
        refunds: refunds.length
      })
    }

    loadDashboard()
  }, [])

  const cards = [
    {
      label: 'Usuários',
      value: metrics.users,
      icon: Users
    },
    {
      label: 'Eventos',
      value: metrics.events,
      icon: CalendarDays
    },
    {
      label: 'Pedidos',
      value: metrics.orders,
      icon: ShoppingCart
    },
    {
      label: 'Pagamentos aprovados',
      value: metrics.payments,
      icon: CreditCard
    },
    {
      label: 'Ingressos vendidos',
      value: metrics.orders * 2 || '-',
      icon: Ticket
    },
    {
      label: 'Reembolsos',
      value: metrics.refunds,
      icon: RotateCcw
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard Comercial
        </h1>

        <p className="mt-2 text-gray-500">
          Visão geral da operação Curitiba 360.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(card => {
          const Icon = card.icon

          return (
            <Card key={card.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <h2 className="mt-2 text-3xl font-bold text-gray-900">{card.value}</h2>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <Icon size={22} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
