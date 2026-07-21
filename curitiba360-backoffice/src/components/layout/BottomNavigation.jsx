import { NavLink } from 'react-router-dom';
import { Home, Compass, Ticket, Wallet, User } from 'lucide-react';

export default function BottomNavigation() {
  const items = [
    { label: 'Início', path: '/portal', icon: Home },
    { label: 'Explorar', path: '/explore', icon: Compass },
    { label: 'Pass', path: '/pass', icon: Ticket },
    { label: 'Carteira', path: '/wallet', icon: Wallet },
    { label: 'Perfil', path: '/profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-slate-800 bg-slate-950/95 px-2 backdrop-blur md:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 text-xs font-semibold transition ${
                isActive ? 'text-blue-500 scale-105' : 'text-slate-400 hover:text-white'
              }`
            }
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
