import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Compass,
  House,
  Ticket,
  UserRound,
  Wallet
} from 'lucide-react';

import { ROUTES } from '../../routes/routePaths';

const navItems = [
  {
    label: 'Início',
    icon: House,
    to: ROUTES.app.home
  },
  {
    label: 'Explorar',
    icon: Compass,
    to: ROUTES.public.explore
  },
  {
    label: 'Ingressos',
    icon: Ticket,
    to: ROUTES.app.tickets
  },
  {
    label: 'Carteira',
    icon: Wallet,
    to: ROUTES.app.wallet
  },
  {
    label: 'Perfil',
    icon: UserRound,
    to: ROUTES.app.profile
  }
];

export function BottomNavigation() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 shadow-[0_-10px_30px_rgba(15,23,42,0.07)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto grid h-[68px] max-w-lg grid-cols-5">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-semibold transition',
                isActive
                  ? 'text-emerald-700'
                  : 'text-slate-500 hover:text-slate-900'
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute top-0 h-[3px] w-8 rounded-b-full bg-emerald-600" />
                )}

                <span
                  className={[
                    'flex h-8 w-10 items-center justify-center rounded-xl transition',
                    isActive ? 'bg-emerald-50' : ''
                  ].join(' ')}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </span>

                <span className="truncate">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNavigation;
