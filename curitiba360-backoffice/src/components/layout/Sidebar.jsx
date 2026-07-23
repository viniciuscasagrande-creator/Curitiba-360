import {
  LayoutDashboard,
  Radio,
  Target,
  Users,
  Headphones,
  CalendarDays,
  Ticket,
  ShoppingCart,
  CreditCard,
  RotateCcw,
  QrCode,
  Activity,
  Award,
  Compass,
  Building2,
  Sparkles,
  Bot,
  Brain,
  DollarSign,
  Landmark,
  Scale,
  Megaphone,
  Share2,
  ShieldCheck,
  Zap,
  Flag,
  Rocket,
  Lock,
  Layers,
  Database,
  TestTube,
  Globe,
  Coins,
  FileText,
  Code2,
  Radio as WebhookIcon,
  Store,
  GitBranch,
  Network,
  Download,
  Terminal,
  Cpu,
  Cloud,
  PieChart,
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
    label: 'Business OS Executivo',
    path: '/admin/business-os',
    icon: Building2
  },
  {
    label: 'Conselho IA C-Level',
    path: '/admin/executive-board',
    icon: Bot
  },
  {
    label: 'Command Center Autônomo',
    path: '/admin/enterprise-command',
    icon: Rocket
  },
  {
    label: 'Simulador What-If',
    path: '/admin/scenarios',
    icon: Layers
  },
  {
    label: 'Global Federation Hub',
    path: '/admin/federation',
    icon: Globe
  },
  {
    label: 'Multi-Cloud & Hybrid',
    path: '/admin/multi-cloud',
    icon: Cloud
  },
  {
    label: 'Business Hub Executivo',
    path: '/admin/business-hub',
    icon: Building2
  },
  {
    label: 'Marketplace Corporativo',
    path: '/admin/marketplace',
    icon: Store
  },
  {
    label: 'Banking Service (BaaS)',
    path: '/admin/banking',
    icon: Landmark
  },
  {
    label: 'AI Command Center',
    path: '/admin/ai-command',
    icon: Brain
  },
  {
    label: 'Biblioteca Agentes IA',
    path: '/admin/agents',
    icon: Bot
  },
  {
    label: 'Executive BI Cockpit',
    path: '/admin/executive',
    icon: PieChart
  },
  {
    label: 'AI Copilot Studio',
    path: '/admin/copilot',
    icon: Bot
  },
  {
    label: 'Digital Twin Simulação',
    path: '/admin/digital-twin',
    icon: Layers
  },
  {
    label: 'Internal Dev Platform',
    path: '/admin/platform',
    icon: Terminal
  },
  {
    label: 'Catálogo de Serviços',
    path: '/admin/service-catalog',
    icon: Cpu
  },
  {
    label: 'MLOps & Model Registry',
    path: '/admin/mlops',
    icon: Brain
  },
  {
    label: 'Developer Hub',
    path: '/admin/developers',
    icon: Code2
  },
  {
    label: 'API Gateway',
    path: '/admin/api-gateway',
    icon: Zap
  },
  {
    label: 'Webhooks',
    path: '/admin/webhooks',
    icon: WebhookIcon
  },
  {
    label: 'Plugins Marketplace',
    path: '/admin/plugins',
    icon: Store
  },
  {
    label: 'Low-Code Workflows',
    path: '/admin/workflows',
    icon: GitBranch
  },
  {
    label: 'Integrações',
    path: '/admin/integrations',
    icon: Network
  },
  {
    label: 'SDKs Oficiais',
    path: '/admin/sdk',
    icon: Download
  },
  {
    label: 'API Monitor',
    path: '/admin/api-monitor',
    icon: BarChart3
  },
  {
    label: 'Control Tower Executive',
    path: '/admin/control-tower',
    icon: Radio
  },
  {
    label: 'FinOps & Governança Custos',
    path: '/admin/finops',
    icon: Coins
  },
  {
    label: 'SLA Executive Center',
    path: '/admin/sla-center',
    icon: ShieldCheck
  },
  {
    label: 'Capacity Planning',
    path: '/admin/capacity',
    icon: Zap
  },
  {
    label: 'Governança Fornecedores',
    path: '/admin/contracts',
    icon: FileText
  },
  {
    label: 'Operação Global & Capacidade',
    path: '/admin/global-operations',
    icon: Globe
  },
  {
    label: 'Disaster Recovery & Backups',
    path: '/admin/disaster-recovery',
    icon: Database
  },
  {
    label: 'Governança & Testes E2E',
    path: '/admin/release-governance',
    icon: TestTube
  },
  {
    label: 'Multi-Tenant',
    path: '/admin/tenants',
    icon: Layers
  },
  {
    label: 'Feature Flags',
    path: '/admin/feature-flags',
    icon: Flag
  },
  {
    label: 'Filas & Jobs',
    path: '/admin/jobs',
    icon: Zap
  },
  {
    label: 'Security Center',
    path: '/admin/security',
    icon: Lock
  },
  {
    label: 'Deployments & CI/CD',
    path: '/admin/deployments',
    icon: Rocket
  },
  {
    label: 'Command Center',
    path: '/admin/command-center',
    icon: Target
  },
  {
    label: 'Observabilidade & API',
    path: '/admin/observability',
    icon: Zap
  },
  {
    label: 'IA Preditiva & Previsão',
    path: '/admin/predictive-ai',
    icon: Brain
  },
  {
    label: 'Automação Marketing',
    path: '/admin/marketing-automation',
    icon: Megaphone
  },
  {
    label: 'Rede Afiliados',
    path: '/admin/affiliates',
    icon: Share2
  },
  {
    label: 'Portal Parceiro B2B',
    path: '/admin/partner-portal',
    icon: Building2
  },
  {
    label: 'Auditoria Central',
    path: '/admin/audit',
    icon: ShieldCheck
  },
  {
    label: 'CRM Customer 360',
    path: '/admin/crm',
    icon: Users
  },
  {
    label: 'Central de Suporte',
    path: '/admin/support',
    icon: Headphones
  },
  {
    label: 'Financeiro 360 & Ledger',
    path: '/admin/finance',
    icon: DollarSign
  },
  {
    label: 'Repasses B2B',
    path: '/admin/payouts',
    icon: Landmark
  },
  {
    label: 'Conciliação',
    path: '/admin/reconciliation',
    icon: Scale
  },
  {
    label: 'Curitiba 360 AI',
    path: '/ai',
    icon: Bot
  },
  {
    label: 'AI Studio',
    path: '/admin/ai-studio',
    icon: Sparkles
  },
  {
    label: 'Pass Curitiba 360',
    path: '/pass',
    icon: Compass
  },
  {
    label: 'Minha Carteira',
    path: '/wallet',
    icon: Award
  },
  {
    label: 'Parceiros B2B',
    path: '/admin/partners',
    icon: Building2
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
          <div className="flex items-center gap-3">
            <img
              src="/logo-360-main.png"
              alt="Curitiba 360"
              className="h-10 w-auto rounded-lg object-contain bg-white p-0.5"
            />
            <div>
              <h1 className="text-lg font-bold leading-tight">
                Curitiba 360
              </h1>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Painel Admin
              </span>
            </div>
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
