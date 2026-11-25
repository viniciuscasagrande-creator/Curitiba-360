import {
  Menu,
  Bell,
  Search
} from 'lucide-react'

import { useAuth } from '../../contexts/AuthContext'

export default function Header({
  onMenuClick
}) {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden items-center gap-3 rounded-xl bg-gray-100 px-4 py-2 md:flex">
          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            placeholder="Pesquisar..."
            className="w-48 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-xl p-2 hover:bg-gray-100">
          <Bell size={20} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-gray-800">
            {user?.name}
          </p>

          <p className="text-xs text-gray-500">
            Administrador
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 font-bold text-white">
          {user?.name?.charAt(0)?.toUpperCase() || 'A'}
        </div>
      </div>
    </header>
  )
}
