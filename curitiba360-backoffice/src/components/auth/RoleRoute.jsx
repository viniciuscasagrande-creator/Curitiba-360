import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function RoleRoute({ roles }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-gray-500 font-medium animate-pulse">
        Verificando permissões...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const userRole = user.role || 'admin'; // fallback permitindo admin no ambiente de dev

  if (roles && !roles.includes(userRole) && userRole !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
