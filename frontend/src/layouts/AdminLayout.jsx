import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../modules/admin/components/AdminSidebar';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>© 2026 Curitiba 360° Enterprise OS. Todos os direitos reservados.</span>
          <span>
            Desenvolvedor: <strong className="text-slate-900">VINICIUS CASAGRANDE</strong> — Programador • <strong className="text-emerald-600">CEO MBA System of America</strong>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default AdminLayout;
