import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Ticket,
  ShoppingCart,
  CreditCard,
  RotateCcw,
  QrCode,
  Activity,
  BarChart3,
  Settings,
  LogOut,
  X
} from 'lucide-react'

import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const menu = [
  {
    label: 'Dashboard Comercial',
    path: '/admin',
    icon: LayoutDashboard
  },
  {
    label: 'Check-in Operacional',
    path: '/admin/checkin',
    icon: Activity
  },
  {
    label: 'Validador de Entrada',
    path: '/access',
    icon: QrCode
  },
  {
    label: 'Usuários',
    path: '/admin/users',
    icon: Users
  },
  {
    label: 'Eventos',
    path: '/admin/events',
    icon: CalendarDays
  },
  {
    label: 'Ingressos',
    path: '/admin/tickets',
    icon: Ticket
  },
  {
    label: 'Pedidos',
    path: '/admin/orders',
    icon: ShoppingCart
  },
  {
    label: 'Pagamentos',
    path: '/admin/payments',
    icon: CreditCard
  },
  {
    label: 'Reembolsos',
    path: '/admin/refunds',
    icon: RotateCcw
  },
  {
    label: 'Relatórios',
    path: '/admin/reports',
    icon: BarChart3
  },
  {
    label: 'Configurações',
    path: '/admin/settings',
    icon: Settings
  }
]

export default function Sidebar({
  open,
  onClose
}) {
  const { logout } = useAuth()

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-40
          flex h-screen w-72
          flex-col
          bg-slate-950 text-white
          transition-transform
          lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div>
            <h1 className="text-xl font-bold">
              Curitiba 360
            </h1>

            <span className="text-xs text-slate-400">
              Administração
            </span>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {menu.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  rounded-xl px-4 py-3
                  text-sm font-medium
                  transition
                  ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }
                  `
                }
              >
                <Icon size={19} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={logout}
            className="
              flex w-full items-center gap-3
              rounded-xl px-4 py-3
              text-sm text-slate-300
              hover:bg-red-500/10
              hover:text-red-400
            "
          >
            <LogOut size={19} />
            Sair
          </button>
        </div>
      </aside>
    </>
  )
}
