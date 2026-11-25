import Badge from '../../../components/ui/Badge';
import { formatDate } from '../../../utils/formatDate';

export default function UserDetails({ user }) {
  if (!user) return null;

  return (
    <div className="space-y-6 text-gray-700">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-700 font-bold text-2xl text-white shadow-md">
          {user.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4 border border-gray-100">
        <div>
          <span className="block text-xs font-semibold uppercase text-gray-400">Perfil</span>
          <span className="font-semibold text-gray-800 capitalize">{user.role}</span>
        </div>
        <div>
          <span className="block text-xs font-semibold uppercase text-gray-400">Status</span>
          <Badge variant={user.status === 'ativo' ? 'green' : 'red'}>
            {user.status === 'ativo' ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>
        <div>
          <span className="block text-xs font-semibold uppercase text-gray-400">Data de Cadastro</span>
          <span className="text-sm font-medium text-gray-700">{formatDate(user.created_at)}</span>
        </div>
        <div>
          <span className="block text-xs font-semibold uppercase text-gray-400">ID Único</span>
          <span className="text-xs font-mono text-gray-500">{user.id}</span>
        </div>
      </div>
    </div>
  );
}
