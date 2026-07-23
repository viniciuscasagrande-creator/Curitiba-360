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
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-slate-950/95 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-5">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'flex flex-col items-center justify-center py-2.5 gap-1 text-[10px] font-bold transition-all',
                isActive
                  ? 'text-amber-400 font-extrabold'
                  : 'text-slate-400 hover:text-white'
              ].join(' ')
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
export default BottomNavigation;
