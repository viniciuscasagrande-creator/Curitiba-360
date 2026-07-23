import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Bell, MapPin, User, Wallet, Compass, Ticket, Calendar } from 'lucide-react';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { ROUTES } from '../../routes/routePaths';

export function AppHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`${ROUTES.public.explore}?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-xs">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Logo & Localização */}
        <div className="flex items-center gap-6">
          <NavLink to={ROUTES.app.home} className="flex items-center gap-2.5 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 font-black text-slate-950 text-base shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              360
            </span>
            <div className="flex flex-col">
              <span className="font-black text-slate-900 text-lg tracking-tight leading-none">
                Curitiba <span className="text-amber-600">360</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
                Super App da Cidade
              </span>
            </div>
          </NavLink>

          <div className="hidden lg:flex items-center gap-1.5 border-l border-slate-200 pl-4 py-1 text-xs text-slate-600 font-medium">
            <MapPin size={14} className="text-amber-600" />
            <span>Curitiba, PR</span>
          </div>
        </div>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wide">
          <NavLink
            to={ROUTES.app.home}
            className={({ isActive }) =>
              isActive
                ? 'text-amber-600 font-extrabold border-b-2 border-amber-600 pb-1'
                : 'text-slate-600 hover:text-slate-950 transition-colors'
            }
          >
            Início
          </NavLink>
          <NavLink
            to={ROUTES.public.explore}
            className={({ isActive }) =>
              isActive
                ? 'text-amber-600 font-extrabold border-b-2 border-amber-600 pb-1'
                : 'text-slate-600 hover:text-slate-950 transition-colors'
            }
          >
            Explorar
          </NavLink>
          <NavLink
            to={ROUTES.public.events}
            className={({ isActive }) =>
              isActive
                ? 'text-amber-600 font-extrabold border-b-2 border-amber-600 pb-1'
                : 'text-slate-600 hover:text-slate-950 transition-colors'
            }
          >
            Eventos
          </NavLink>
          <NavLink
            to={ROUTES.public.tourism}
            className={({ isActive }) =>
              isActive
                ? 'text-amber-600 font-extrabold border-b-2 border-amber-600 pb-1'
                : 'text-slate-600 hover:text-slate-950 transition-colors'
            }
          >
            Turismo
          </NavLink>
          <NavLink
            to={ROUTES.app.wallet}
            className={({ isActive }) =>
              isActive
                ? 'text-amber-600 font-extrabold border-b-2 border-amber-600 pb-1'
                : 'text-slate-600 hover:text-slate-950 transition-colors'
            }
          >
            Carteira
          </NavLink>
        </nav>

        {/* Busca Inteligente & Perfil */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:flex items-center">
            <Search size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar eventos, restaurantes, parques..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-48 md:w-64 bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:w-72 transition-all duration-300"
            />
          </div>

          {/* Wallet Shortcut */}
          <NavLink
            to={ROUTES.app.wallet}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors hidden sm:flex"
            title="Carteira Digital"
          >
            <Wallet size={18} />
          </NavLink>

          {/* Notifications */}
          <button
            onClick={() => navigate('/notificacoes')}
            className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Notificações"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
          </button>

          {/* User Profile */}
          <NavLink
            to={ROUTES.app.profile}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 border border-amber-300 text-amber-800 font-extrabold text-xs hover:bg-amber-500 hover:text-slate-950 transition-all shadow-xs"
          >
            {(user?.displayName || user?.name || 'V')?.charAt(0).toUpperCase()}
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
