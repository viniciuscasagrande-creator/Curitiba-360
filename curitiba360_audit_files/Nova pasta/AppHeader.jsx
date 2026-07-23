import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Bell, MapPin, User, LogOut, Ticket, Wallet } from 'lucide-react';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { ROUTES } from '../../routes/routePaths';

export function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`${ROUTES.public.explore}?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.public.login);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Logo e Saudação / Localização */}
        <div className="flex items-center gap-6">
          <NavLink to={ROUTES.app.home} className="flex items-center gap-2.5 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 font-black text-slate-950 text-base shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              360
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-lg tracking-tight leading-none">
                Curitiba <span className="text-amber-400">360</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                Super App da Cidade
              </span>
            </div>
          </NavLink>

          {/* Saudação e Localização Compacta */}
          <div className="hidden lg:flex flex-col border-l border-slate-800 pl-4 py-1 text-xs">
            <span className="text-slate-200 font-bold">
              Olá, {user?.displayName?.split(' ')[0] || user?.name?.split(' ')[0] || 'visitante'} 👋
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <MapPin size={12} className="text-amber-400" />
              Curitiba, PR
            </span>
          </div>
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wide">
          <NavLink
            to={ROUTES.app.home}
            className={({ isActive }) =>
              isActive ? 'text-amber-400 font-extrabold border-b-2 border-amber-400 pb-1' : 'text-slate-400 hover:text-white transition-colors'
            }
          >
            Início
          </NavLink>
          <NavLink
            to={ROUTES.public.explore}
            className={({ isActive }) =>
              isActive ? 'text-amber-400 font-extrabold border-b-2 border-amber-400 pb-1' : 'text-slate-400 hover:text-white transition-colors'
            }
          >
            Explorar
          </NavLink>
          <NavLink
            to={ROUTES.public.events}
            className={({ isActive }) =>
              isActive ? 'text-amber-400 font-extrabold border-b-2 border-amber-400 pb-1' : 'text-slate-400 hover:text-white transition-colors'
            }
          >
            Eventos
          </NavLink>
          <NavLink
            to={ROUTES.public.tourism}
            className={({ isActive }) =>
              isActive ? 'text-amber-400 font-extrabold border-b-2 border-amber-400 pb-1' : 'text-slate-400 hover:text-white transition-colors'
            }
          >
            Turismo
          </NavLink>
          <NavLink
            to={ROUTES.app.wallet}
            className={({ isActive }) =>
              isActive ? 'text-amber-400 font-extrabold border-b-2 border-amber-400 pb-1' : 'text-slate-400 hover:text-white transition-colors'
            }
          >
            Carteira
          </NavLink>
        </nav>

        {/* Global Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Caixa de Busca Global */}
          <div className="relative hidden sm:flex items-center">
            <Search size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar eventos, atrativos, parques..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-48 md:w-64 bg-slate-900 border border-slate-800 rounded-2xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/80 focus:w-72 transition-all duration-300 shadow-inner"
            />
          </div>

          {/* Notificações */}
          <button
            onClick={() => navigate('/notificacoes')}
            className="relative p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
            title="Notificações"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-slate-950" />
          </button>

          {/* Perfil & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <NavLink
              to={ROUTES.app.profile}
              className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-xs hover:bg-amber-500 hover:text-slate-950 transition-all shadow-md"
            >
              {(user?.displayName || user?.name || 'V')?.charAt(0).toUpperCase()}
            </NavLink>

            {user && (
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                title="Sair"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
export default AppHeader;
