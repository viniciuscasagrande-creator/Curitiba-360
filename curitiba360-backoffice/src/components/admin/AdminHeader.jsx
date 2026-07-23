import React, { useState } from 'react';
import {
  Bell,
  ChevronDown,
  Menu,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { ROUTES } from '../../routes/routePaths';

export function AdminHeader({ onMenuClick }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const operatorName = user?.displayName || user?.name || 'João da Silva';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-4 px-4 sm:px-6 lg:px-8 text-left">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu size={21} />
        </button>

        <div className="hidden md:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600">
            Painel operacional
          </p>

          <h1 className="text-lg font-black tracking-tight text-slate-950">
            Curitiba 360 Backoffice
          </h1>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar usuários, contratos, atrações..."
            className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 xl:block">
            Produção
          </span>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            aria-label="Notificações"
          >
            <Bell size={19} />

            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <button
            type="button"
            onClick={() => navigate(ROUTES.admin.myProfile)}
            className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-left sm:flex hover:bg-slate-50 transition"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-xs font-black text-emerald-700">
              {operatorName.charAt(0)}
            </span>

            <span className="hidden lg:block">
              <strong className="block text-xs text-slate-800 truncate max-w-[120px]">
                {operatorName}
              </strong>

              <span className="block text-[10px] text-slate-400">
                Administrador
              </span>
            </span>

            <ChevronDown size={15} className="text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
