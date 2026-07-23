import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Bell,
  ChevronDown,
  MapPin,
  Search,
  Ticket,
  UserRound,
  Wallet
} from 'lucide-react';

import { useAuth } from '../../modules/auth/hooks/useAuth';
import { ROUTES } from '../../routes/routePaths';

export function AppHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const firstName =
    user?.displayName?.split(' ')[0] ||
    user?.name?.split(' ')[0] ||
    'Visitante';

  function submitSearch(event) {
    event.preventDefault();

    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      navigate(ROUTES.public.explore);
      return;
    }

    navigate(
      `${ROUTES.public.explore}?q=${encodeURIComponent(normalizedQuery)}`
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:min-h-[72px] lg:px-8">
        <NavLink
          to={ROUTES.app.home}
          aria-label="Ir para a página inicial"
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-sm">
            360
          </span>

          <div className="hidden sm:block">
            <p className="text-base font-black leading-none tracking-tight text-slate-950">
              Curitiba <span className="text-emerald-600">360</span>
            </p>

            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              Viva a cidade
            </p>
          </div>
        </NavLink>

        <button
          type="button"
          className="hidden min-w-0 items-center gap-2 rounded-2xl px-3 py-2 text-left transition hover:bg-slate-100 lg:flex"
          aria-label="Alterar localização"
        >
          <MapPin
            size={18}
            className="shrink-0 text-emerald-600"
            strokeWidth={2.2}
          />

          <span className="min-w-0">
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Localização
            </span>

            <span className="block truncate text-xs font-bold text-slate-700">
              Curitiba, Paraná
            </span>
          </span>

          <ChevronDown size={15} className="text-slate-400" />
        </button>

        <form
          onSubmit={submitSearch}
          className="relative mx-auto hidden w-full max-w-xl md:block"
        >
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar eventos, parques, restaurantes..."
            className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-100/80 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:bg-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          />
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => navigate(ROUTES.public.explore)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700 md:hidden"
            aria-label="Pesquisar"
          >
            <Search size={20} />
          </button>

          <button
            type="button"
            onClick={() => navigate(ROUTES.app.tickets)}
            className="hidden h-10 w-10 items-center justify-center rounded-2xl text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700 sm:flex"
            aria-label="Meus ingressos"
          >
            <Ticket size={20} />
          </button>

          <button
            type="button"
            onClick={() => navigate(ROUTES.app.wallet)}
            className="hidden h-10 w-10 items-center justify-center rounded-2xl text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700 sm:flex"
            aria-label="Minha carteira"
          >
            <Wallet size={20} />
          </button>

          <button
            type="button"
            onClick={() => navigate(ROUTES.app.notifications)}
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700"
            aria-label="Notificações"
          >
            <Bell size={20} />

            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <NavLink
            to={ROUTES.app.profile}
            className="ml-1 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 pr-2.5 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              {user ? (
                <span className="text-xs font-black">
                  {firstName.charAt(0).toUpperCase()}
                </span>
              ) : (
                <UserRound size={17} />
              )}
            </span>

            <span className="hidden text-left xl:block">
              <span className="block text-[10px] font-medium text-slate-400">
                Olá,
              </span>

              <span className="block max-w-24 truncate text-xs font-bold text-slate-700">
                {firstName}
              </span>
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
