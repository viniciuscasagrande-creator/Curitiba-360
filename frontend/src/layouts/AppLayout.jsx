import React from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '../components/layout/AppHeader';
import { BottomNavigation } from '../components/layout/BottomNavigation';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <AppHeader />

      <main className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-5 sm:px-6 lg:px-8 lg:pb-10 lg:pt-7">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-5 px-4 pb-24 lg:pb-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-[1440px] flex flex-wrap items-center justify-between gap-2">
          <span>© 2026 Curitiba 360° SuperApp. Todos os direitos reservados.</span>
          <span>
            Desenvolvedor: <strong className="text-slate-900">VINICIUS CASAGRANDE</strong> — Programador • <strong className="text-emerald-600">CEO MBA System of America</strong>
          </span>
        </div>
      </footer>

      <BottomNavigation />
    </div>
  );
}

export default AppLayout;
