import React from 'react';
import { Outlet } from 'react-router-dom';

import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <AdminSidebar />

      <div className="pl-64">
        <AdminHeader />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
