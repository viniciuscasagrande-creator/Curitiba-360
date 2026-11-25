import { useState } from 'react';
import { useUsers } from '../../../hooks/useUsers';
import Table from '../../../components/tables/Table';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import UserForm from './UserForm';
import UserDetails from './UserDetails';
import { formatDate } from '../../../utils/formatDate';
import { UserPlus, Search, Eye, Edit2, ShieldAlert } from 'lucide-react';

export default function UsersList() {
  const { users, loading, addUser, editUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setDetailsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (selectedUser) {
      await editUser(selectedUser.id, formData);
    } else {
      await addUser(formData);
    }
    setModalOpen(false);
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'ativo' ? 'inativo' : 'ativo';
    await editUser(user.id, { status: newStatus });
  };

  const columns = [
    {
      header: 'Usuário',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-sm text-blue-700">
            {row.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Perfil',
      cell: (row) => (
        <span className="capitalize font-medium text-gray-700">{row.role}</span>
      )
    },
    {
      header: 'Status',
      cell: (row) => (
        <Badge variant={row.status === 'ativo' ? 'green' : 'red'}>
          {row.status === 'ativo' ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    },
    {
      header: 'Cadastrado Em',
      cell: (row) => formatDate(row.created_at)
    },
    {
      header: 'Ações',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(row)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition"
            title="Visualizar Detalhes"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition"
            title="Editar Usuário"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => handleToggleStatus(row)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-amber-600 transition"
            title={row.status === 'ativo' ? 'Inativar Usuário' : 'Ativar Usuário'}
          >
            <ShieldAlert size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Usuários</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie administradores, parceiros comerciais, agências e turistas.
          </p>
        </div>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <UserPlus size={18} />
          Novo Usuário
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <Search size={18} className="text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Buscar por nome, e-mail ou perfil..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* Table */}
      <Table columns={columns} data={filteredUsers} loading={loading} emptyMessage="Nenhum usuário encontrado." />

      {/* Create / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedUser ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}
      >
        <UserForm
          initialValues={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        title="Perfil do Usuário"
      >
        <UserDetails user={selectedUser} />
      </Modal>
    </div>
  );
}
