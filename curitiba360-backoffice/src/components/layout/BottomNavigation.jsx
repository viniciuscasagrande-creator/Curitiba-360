import React from 'react';
import { NavLink } from 'react-router-dom';
import { House, Compass, Ticket, Wallet, User } from 'lucide-react';
import { ROUTES } from '../../routes/routePaths';

const navItems = [
  { label: 'Início', icon: House, to: ROUTES.app.home },
  { label: 'Explorar', icon: Compass, to: ROUTES.public.explore },
  { label: 'Ingressos', icon: Ticket, to: ROUTES.app.tickets },
  { label: 'Carteira', icon: Wallet, to: ROUTES.app.wallet },
  { label: 'Perfil', icon: User, to: ROUTES.app.profile }
];

export function BottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl md:hidden">
      <div className="grid h-16 grid-cols-5">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'relative flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition',
                isActive
                  ? 'text-amber-600 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900'
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-amber-500" />
                )}

                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNavigation;
