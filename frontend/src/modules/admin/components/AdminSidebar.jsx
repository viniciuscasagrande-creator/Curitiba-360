import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Activity,
  Award,
  BarChart3,
  Bot,
  Brain,
  Building2,
  CalendarDays,
  Cloud,
  Code2,
  Coins,
  Compass,
  Cpu,
  CreditCard,
  Database,
  DollarSign,
  Download,
  FileText,
  Flag,
  GitBranch,
  Globe,
  Grid2X2,
  Headphones,
  Landmark,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  Megaphone,
  Network,
  PieChart,
  QrCode,
  Radio,
  Rocket,
  RotateCcw,
  Scale,
  Settings,
  Share2,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Store,
  Target,
  Terminal,
  TestTube,
  Ticket,
  Users,
  X,
  Zap
} from 'lucide-react';

import { ROUTES } from '../../../routes/routePaths';
import { useAuth } from '../../auth/hooks/useAuth';

const menuGroups = [
  {
    label: 'Atalhos Principais & Navegação',
    items: [
      { label: 'Dashboard Operacional', path: ROUTES.admin.dashboard, icon: LayoutDashboard },
      { label: 'Dashboard Comercial', path: '/admin/commercial-dashboard', icon: BarChart3 },
      { label: 'Backoffice Clássico (MOD 1-26)', path: '/dashboard', icon: Building2 },
      { label: 'SuperApp Cidadão (/home)', path: '/home', icon: Compass },
      { label: 'Galeria 71 Telas Oficiais', path: '/telas', icon: Grid2X2 },
      { label: 'Visualizador de Wireframes', path: '/wireframes', icon: Layers }
    ]
  },
  {
    label: 'Administração & Operação Core',
    items: [
      { label: 'Gestão de Usuários', path: ROUTES.admin.users, icon: Users },
      { label: 'Gestão de Contratos', path: ROUTES.admin.contracts, icon: FileText },
      { label: 'Condições Comerciais', path: ROUTES.admin.commercialConditions, icon: SlidersHorizontal },
      { label: 'Gestão de Atrações', path: ROUTES.admin.attractions, icon: Building2 },
      { label: 'Relatórios Financeiros', path: ROUTES.admin.financialReports, icon: BarChart3 },
      { label: 'Eventos', path: '/admin/events-list', icon: CalendarDays },
      { label: 'Ingressos', path: '/admin/tickets', icon: Ticket },
      { label: 'Pedidos', path: '/admin/orders-list', icon: ShoppingCart },
      { label: 'Pagamentos', path: '/admin/payments', icon: CreditCard },
      { label: 'Reembolsos', path: '/admin/refunds', icon: RotateCcw },
      { label: 'Check-in Operacional', path: '/admin/checkin', icon: Activity },
      { label: 'Validador QR Code', path: '/access', icon: QrCode }
    ]
  },
  {
    label: 'Plataformas WF-045 a WF-050',
    items: [
      { label: 'Smart City & Digital Twin (WF-045)', path: '/admin/digital-twin', icon: Layers },
      { label: 'Ecossistema & B2B (WF-046)', path: '/admin/partners-b2b', icon: Store },
      { label: 'Portfólio & Projetos (WF-047)', path: '/admin/portfolio', icon: Target },
      { label: 'Governança Executiva (WF-048)', path: '/admin/governance', icon: ShieldCheck },
      { label: 'Governo Digital (WF-049)', path: '/admin/government', icon: Landmark },
      { label: 'Super App & Serviços (WF-050)', path: '/admin/super-app', icon: Compass }
    ]
  },
  {
    label: 'Business OS, IA & Enterprise (Fases 9-29)',
    items: [
      { label: 'Business OS Executivo', path: '/admin/business-os', icon: Building2 },
      { label: 'Conselho IA C-Level', path: '/admin/executive-board', icon: Bot },
      { label: 'Command Center Autônomo', path: '/admin/enterprise-command', icon: Rocket },
      { label: 'Simulador What-If', path: '/admin/scenarios', icon: Layers },
      { label: 'Global Federation Hub', path: '/admin/federation', icon: Globe },
      { label: 'Multi-Cloud & Hybrid', path: '/admin/multi-cloud', icon: Cloud },
      { label: 'Business Hub Executivo', path: '/admin/business-hub', icon: Building2 },
      { label: 'Marketplace Corporativo', path: '/admin/marketplace', icon: Store },
      { label: 'Banking Service (BaaS)', path: '/admin/banking', icon: Landmark },
      { label: 'AI Command Center', path: '/admin/ai-command', icon: Brain },
      { label: 'Biblioteca Agentes IA', path: '/admin/agents', icon: Bot },
      { label: 'Executive BI Cockpit', path: '/admin/executive', icon: PieChart },
      { label: 'AI Copilot Studio', path: '/admin/copilot', icon: Bot },
      { label: 'AI Studio', path: '/admin/ai-studio', icon: Sparkles },
      { label: 'Curitiba 360 AI Concierge', path: '/ai', icon: Bot },
      { label: 'IA Preditiva & Previsão', path: '/admin/predictive-ai', icon: Brain },
      { label: 'MLOps & Model Registry', path: '/admin/mlops', icon: Brain }
    ]
  },
  {
    label: 'CRM, Financeiro 360 & Marketing',
    items: [
      { label: 'Control Tower Executive', path: '/admin/control-tower', icon: Radio },
      { label: 'Command Center Operacional', path: '/admin/command-center', icon: Target },
      { label: 'Financeiro 360 & Ledger', path: '/admin/finance', icon: DollarSign },
      { label: 'Repasses B2B', path: '/admin/payouts', icon: Landmark },
      { label: 'Conciliação Financeira', path: '/admin/reconciliation', icon: Scale },
      { label: 'CRM Customer 360', path: '/admin/crm', icon: Users },
      { label: 'Central de Suporte', path: '/admin/support', icon: Headphones },
      { label: 'Automação de Marketing', path: '/admin/marketing-automation', icon: Megaphone },
      { label: 'Rede de Afiliados', path: '/admin/affiliates', icon: Share2 },
      { label: 'Portal Parceiro B2B', path: '/admin/partner-portal', icon: Building2 },
      { label: 'Parceiros B2B', path: '/admin/partners', icon: Building2 },
      { label: 'Pass Curitiba 360', path: '/pass', icon: Compass },
      { label: 'Minha Carteira Digital', path: '/wallet', icon: Award }
    ]
  },
  {
    label: 'Engenharia, DevOps, Escala & FinOps',
    items: [
      { label: 'Internal Dev Platform', path: '/admin/platform', icon: Terminal },
      { label: 'Catálogo de Serviços', path: '/admin/service-catalog', icon: Cpu },
      { label: 'Developer Hub', path: '/admin/developers', icon: Code2 },
      { label: 'API Gateway', path: '/admin/api-gateway', icon: Zap },
      { label: 'Webhooks', path: '/admin/webhooks', icon: Radio },
      { label: 'Plugins Marketplace', path: '/admin/plugins', icon: Store },
      { label: 'Low-Code Workflows', path: '/admin/workflows', icon: GitBranch },
      { label: 'Integrações', path: '/admin/integrations', icon: Network },
      { label: 'SDKs Oficiais', path: '/admin/sdk', icon: Download },
      { label: 'API Monitor', path: '/admin/api-monitor', icon: BarChart3 },
      { label: 'FinOps & Custos', path: '/admin/finops', icon: Coins },
      { label: 'SLA Executive Center', path: '/admin/sla-center', icon: ShieldCheck },
      { label: 'Capacity Planning', path: '/admin/capacity', icon: Zap },
      { label: 'Governança Fornecedores', path: '/admin/vendor-contracts', icon: FileText },
      { label: 'Operação Global', path: '/admin/global-operations', icon: Globe },
      { label: 'Disaster Recovery & Backups', path: '/admin/disaster-recovery', icon: Database },
      { label: 'Governança & Testes E2E', path: '/admin/release-governance', icon: TestTube },
      { label: 'Multi-Tenant', path: '/admin/tenants', icon: Layers },
      { label: 'Feature Flags', path: '/admin/feature-flags', icon: Flag },
      { label: 'Filas & Jobs', path: '/admin/jobs', icon: Zap },
      { label: 'Security Center', path: '/admin/security', icon: Lock },
      { label: 'Deployments & CI/CD', path: '/admin/deployments', icon: Rocket },
      { label: 'Observabilidade & API', path: '/admin/observability', icon: Zap },
      { label: 'Auditoria Central', path: '/admin/audit', icon: ShieldCheck }
    ]
  }
];

function MenuItem({ item, onClose }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onClose}
      className={({ isActive }) =>
        [
          'group flex items-center gap-3 rounded-2xl px-3 py-2',
          'text-xs font-semibold transition text-left',
          isActive
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
        ].join(' ')
      }
    >
      <Icon size={17} strokeWidth={2} className="shrink-0" />
      <span className="truncate">{item.label}</span>
    </NavLink>
  );
}

export function AdminSidebar({ open, onClose }) {
  const { user, logout } = useAuth();

  const operatorName =
    user?.displayName || user?.name || 'João da Silva';

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col text-left',
          'border-r border-slate-200 bg-white',
          'transition-transform duration-200 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        ].join(' ')}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">
          <NavLink
            to={ROUTES.admin.dashboard}
            className="flex items-center gap-3"
          >
            <img
              src="/logo-360-main.png"
              alt="Curitiba 360"
              className="h-10 w-auto rounded-xl object-contain shadow-xs border border-slate-100 p-0.5 bg-white"
            />

            <div>
              <strong className="block text-base font-black tracking-tight text-slate-950">
                Curitiba 360
              </strong>

              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Enterprise OS
              </span>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-slate-200 px-5 py-4">
          <NavLink
            to={ROUTES.admin.myProfile}
            onClick={onClose}
            className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-slate-50"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 font-black text-emerald-800 text-sm shadow-xs">
              {operatorName.charAt(0)}
            </span>

            <span className="min-w-0">
              <strong className="block truncate text-sm text-slate-800">
                {operatorName}
              </strong>

              <span className="block text-xs text-slate-400 font-medium">
                Administrador 360
              </span>
            </span>
          </NavLink>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-5">
            {menuGroups.map((group) => (
              <section key={group.label}>
                <p className="mb-1.5 px-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  {group.label}
                </p>

                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <MenuItem
                      key={item.path}
                      item={item}
                      onClose={onClose}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </nav>

        <div className="border-t border-slate-200 p-3 space-y-1">
          <NavLink
            to={ROUTES.admin.settings}
            onClick={onClose}
            className="flex items-center gap-3 rounded-2xl px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <Settings size={17} />
            Configurações
          </NavLink>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-700"
          >
            <LogOut size={17} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
