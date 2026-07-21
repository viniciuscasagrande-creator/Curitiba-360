import { useEffect, useState } from 'react'
import {
  Users,
  CalendarDays,
  Ticket,
  ShoppingCart,
  CreditCard,
  RotateCcw,
  TrendingUp,
  DollarSign
} from 'lucide-react'

import Card from '../../components/ui/Card'
import { getUsers } from '../../services/userService'
import { getEvents } from '../../services/eventService'
import { getOrders } from '../../services/orderService'
import { getPayments } from '../../services/paymentService'
import { getRefunds } from '../../services/refundService'
import { formatCurrency } from '../../utils/formatCurrency'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

const initialMetrics = {
  users: 0,
  events: 0,
  orders: 0,
  payments: 0,
  refunds: 0
}

const chartData = [
  { day: 'Seg', vendas: 12400 },
  { day: 'Ter', vendas: 18500 },
  { day: 'Qua', vendas: 15200 },
  { day: 'Qui', vendas: 24800 },
  { day: 'Sex', vendas: 38900 },
  { day: 'Sáb', vendas: 52400 },
  { day: 'Dom', vendas: 41200 }
]

export default function Dashboard() {
  const [metrics, setMetrics] = useState(initialMetrics)
  const [recentOrders, setRecentOrders] = useState([])

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

      setRecentOrders(orders.slice(0, 5))
    }

    loadDashboard()
  }, [])

  const cards = [
    {
      label: 'Usuários Cadastrados',
      value: metrics.users,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      label: 'Eventos Ativos',
      value: metrics.events,
      icon: CalendarDays,
      color: 'text-purple-600'
    },
    {
      label: 'Pedidos Realizados',
      value: metrics.orders,
      icon: ShoppingCart,
      color: 'text-amber-600'
    },
    {
      label: 'Pagamentos Aprovados',
      value: metrics.payments,
      icon: CreditCard,
      color: 'text-emerald-600'
    },
    {
      label: 'Ingressos Vendidos',
      value: metrics.orders * 2 || 48,
      icon: Ticket,
      color: 'text-indigo-600'
    },
    {
      label: 'Solicitações de Reembolso',
      value: metrics.refunds,
      icon: RotateCcw,
      color: 'text-red-500'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            Dashboard Comercial 📊
          </h1>
          <p className="mt-1 text-gray-500 text-sm">Visão geral em tempo real da operação comercial e vendas do Curitiba 360.</p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl border border-blue-200">
          <TrendingUp size={18} />
          <span className="text-xs font-bold uppercase">Crescimento de +18,4% este mês</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(card => {
          const Icon = card.icon

          return (
            <Card key={card.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">{card.label}</p>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">{card.value}</p>
                </div>
                <div className={`p-3 rounded-2xl bg-gray-50 border border-gray-100 ${card.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recharts Sales Performance & Recent Sales */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recharts Area Chart */}
        <Card className="p-6 xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Desempenho de Vendas Semanal</h2>
              <p className="text-xs text-gray-500">Volume diário de faturamento gerado em R$</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <DollarSign size={14} /> Total: {formatCurrency(203400)}
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(v) => `R$ ${v/1000}k`} />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Vendas']} />
                <Area type="monotone" dataKey="vendas" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Orders List */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Últimos Pedidos</h2>

          <div className="divide-y divide-gray-100 space-y-2">
            {recentOrders.map(ord => (
              <div key={ord.id} className="pt-2 flex items-center justify-between text-sm">
                <div>
                  <span className="font-mono font-bold text-gray-900 block">{ord.id}</span>
                  <span className="text-xs text-gray-500">{ord.clientName || 'Cliente Curitiba 360'}</span>
                </div>
                <strong className="text-emerald-600 font-extrabold">{formatCurrency(ord.totalAmount || ord.total || 120)}</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
