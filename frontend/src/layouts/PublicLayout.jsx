import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ROUTES } from "../routes/routePaths";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#0d0f14] text-gray-100 flex flex-col">
      {/* Public Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0d0f14]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <NavLink to={ROUTES.public.landing} className="flex items-center gap-2 font-bold text-white text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 font-bold text-white text-sm">360</span>
              Curitiba 360
            </NavLink>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <NavLink to={ROUTES.public.explore} className={({ isActive }) => isActive ? "text-red-500" : "text-gray-400 hover:text-white"}>Explorar</NavLink>
              <NavLink to={ROUTES.public.events} className={({ isActive }) => isActive ? "text-red-500" : "text-gray-400 hover:text-white"}>Eventos</NavLink>
              <NavLink to={ROUTES.public.places} className={({ isActive }) => isActive ? "text-red-500" : "text-gray-400 hover:text-white"}>Turismo</NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <NavLink to={ROUTES.public.login} className="text-sm font-medium text-gray-300 hover:text-white">Entrar</NavLink>
            <NavLink to={ROUTES.public.register} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 shadow-md shadow-red-600/10">Criar Conta</NavLink>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="border-t border-gray-900 bg-[#07080a] py-8 text-center text-sm text-gray-500">
        <div className="mx-auto max-w-7xl px-4">
          <p>© {new Date().getFullYear()} Curitiba 360. Todos os direitos reservados. Governo Municipal de Curitiba.</p>
        </div>
      </footer>
    </div>
  );
}
