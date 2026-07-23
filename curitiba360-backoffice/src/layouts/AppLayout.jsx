import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../components/layout/AppHeader';
import { BottomNavigation } from '../components/layout/BottomNavigation';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans antialiased">
      <AppHeader />

      <main className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-12">
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  );
}

export default AppLayout;
