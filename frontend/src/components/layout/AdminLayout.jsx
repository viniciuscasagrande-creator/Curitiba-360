import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'
import Header from './Header'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
