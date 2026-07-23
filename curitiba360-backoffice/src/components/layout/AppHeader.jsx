import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bell, Search, LogOut, User, Wallet, Ticket } from "lucide-react";
import { useAuth } from "../../modules/auth/hooks/useAuth";
import { ROUTES } from "../../routes/routePaths";

export function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.public.login);
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-[#0d0f14]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo and Nav links */}
        <div className="flex items-center gap-6">
          <NavLink to={ROUTES.app.home} className="flex items-center gap-2 font-bold text-white text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 font-bold text-white text-sm">360</span>
            Curitiba 360
          </NavLink>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <NavLink to={ROUTES.app.home} className={({ isActive }) => isActive ? "text-red-500 font-semibold" : "text-gray-400 hover:text-white"}>Início</NavLink>
            <NavLink to={ROUTES.public.explore} className={({ isActive }) => isActive ? "text-red-500 font-semibold" : "text-gray-400 hover:text-white"}>Explorar</NavLink>
            <NavLink to={ROUTES.app.tickets} className={({ isActive }) => isActive ? "text-red-500 font-semibold" : "text-gray-400 hover:text-white"}>Ingressos</NavLink>
            <NavLink to={ROUTES.app.wallet} className={({ isActive }) => isActive ? "text-red-500 font-semibold" : "text-gray-400 hover:text-white"}>Carteira</NavLink>
          </nav>
        </div>

        {/* Global Search & User area */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 rounded-lg bg-gray-900 border border-gray-800 px-3 py-1.5 text-sm">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Buscar eventos ou pontos..."
              className="bg-transparent text-gray-200 outline-none w-48 placeholder-gray-500 focus:w-64 transition-all duration-300"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`${ROUTES.public.explore}?q=${e.target.value}`);
                }
              }}
            />
          </div>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition">
            <Bell size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-600" />
          </button>

          {/* User Profile dropdown or trigger */}
          <div className="flex items-center gap-3 pl-2 border-l border-gray-800">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-white">{user?.displayName || user?.name || "Cidadão"}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role || "Usuário"}</p>
            </div>

            <NavLink to={ROUTES.app.profile} className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600/10 border border-red-600/20 font-bold text-red-500 hover:bg-red-600 hover:text-white transition">
              {(user?.displayName || user?.name || "C")?.charAt(0).toUpperCase()}
            </NavLink>

            <button onClick={handleLogout} className="rounded-lg p-2 text-gray-400 hover:bg-red-950/30 hover:text-red-500 transition" title="Sair da conta">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
