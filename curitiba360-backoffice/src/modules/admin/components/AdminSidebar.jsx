import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BadgeDollarSign,
  BarChart3,
  Building2,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  SlidersHorizontal,
  UserRound,
  Users,
  X
} from 'lucide-react';

import { ROUTES } from '../../../routes/routePaths';
import { useAuth } from '../../auth/hooks/useAuth';

const menuGroups = [
  {
    label: 'Visão geral',
    items: [
      {
        label: 'Dashboard',
        path: ROUTES.admin.dashboard,
        icon: LayoutDashboard
      }
    ]
  },
  {
    label: 'Administração',
    items: [
      {
        label: 'Gestão de Usuários',
        path: ROUTES.admin.users,
        icon: Users
      },
      {
        label: 'Gestão de Contratos',
        path: ROUTES.admin.contracts,
        icon: FileText
      },
      {
        label: 'Condições Comerciais',
        path: ROUTES.admin.commercialConditions,
        icon: SlidersHorizontal
      }
    ]
  },
  {
    label: 'Operação',
    items: [
      {
        label: 'Gestão de Atrações',
        path: ROUTES.admin.attractions,
        icon: Building2
      }
    ]
  },
  {
    label: 'Financeiro',
    items: [
      {
        label: 'Relatórios Financeiros',
        path: ROUTES.admin.financialReports,
        icon: BarChart3
      }
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
          'group flex items-center gap-3 rounded-2xl px-3 py-2.5',
          'text-sm font-semibold transition text-left',
          isActive
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
        ].join(' ')
      }
    >
      <Icon size={19} strokeWidth={2} />
      <span>{item.label}</span>
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
                Backoffice
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

        <div className="border-b border-slate-200 px-5 py-5">
          <NavLink
            to={ROUTES.admin.myProfile}
            onClick={onClose}
            className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-slate-50"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 font-black text-emerald-800 text-sm shadow-xs">
              {operatorName.charAt(0)}
            </span>

            <span className="min-w-0">
              <strong className="block truncate text-sm text-slate-800">
                {operatorName}
              </strong>

              <span className="block text-xs text-slate-400 font-medium">
                Administrador
              </span>
            </span>
          </NavLink>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-6">
            {menuGroups.map((group) => (
              <section key={group.label}>
                <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  {group.label}
                </p>

                <div className="space-y-1">
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

        <div className="border-t border-slate-200 p-4 space-y-1">
          <NavLink
            to={ROUTES.admin.settings}
            onClick={onClose}
            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <Settings size={19} />
            Configurações
          </NavLink>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-700"
          >
            <LogOut size={19} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
