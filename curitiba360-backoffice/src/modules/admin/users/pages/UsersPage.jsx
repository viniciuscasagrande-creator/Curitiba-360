import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  UserPlus,
  Search,
  Shield,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  Download,
  Filter,
  Trash2,
  UserCheck,
  UserX,
  Edit,
  Eye,
  Sliders
} from 'lucide-react';

import AdminPageHeader from '../../../../components/admin/AdminPageHeader';
import PageContainer from '../../../../components/admin/PageContainer';
import StatusTabs from '../../../../components/admin/StatusTabs';
import BulkActionBar from '../../../../components/admin/BulkActionBar';
import FilterDrawer from '../../../../components/admin/FilterDrawer';
import Pagination from '../../../../components/admin/Pagination';
import UserCreateDrawer from '../components/UserCreateDrawer';

const initialUsersList = [
  {
    id: '2798',
    firstName: 'Darlene',
    lastName: 'Robertson',
    email: 'darlene.robertson@gmail.com',
    phone: '(41) 99887-1122',
    document: '123.456.789-00',
    role: 'Administrador',
    companyName: 'Curitiba 360 HQ',
    status: 'active',
    createdAt: '2026-07-02T16:44:22',
    lastLoginAt: 'Hoje, 13:20',
    twoFactorEnabled: true
  },
  {
    id: '2799',
    firstName: 'Carlos Eduardo',
    lastName: 'Silva',
    email: 'carlos.silva@curitiba360.com.br',
    phone: '(41) 99123-4567',
    document: '987.654.321-11',
    role: 'Gestor',
    companyName: 'Jardim Botânico Eireli',
    status: 'active',
    createdAt: '2026-06-15T10:30:00',
    lastLoginAt: 'Hoje, 12:45',
    twoFactorEnabled: false
  },
  {
    id: '2800',
    firstName: 'Mariana',
    lastName: 'Costa',
    email: 'mariana.costa@operadearame.com.br',
    phone: '(41) 98877-3322',
    document: '456.789.123-44',
    role: 'Financeiro',
    companyName: 'Ópera de Arame S.A.',
    status: 'active',
    createdAt: '2026-05-20T14:15:10',
    lastLoginAt: 'Ontem, 18:20',
    twoFactorEnabled: true
  },
  {
    id: '2801',
    firstName: 'Roberto',
    lastName: 'Andrade Filho',
    email: 'roberto@mon.org.br',
    phone: '(41) 99655-4411',
    document: '321.654.987-88',
    role: 'Parceiro',
    companyName: 'Associação MON',
    status: 'active',
    createdAt: '2026-04-10T09:00:00',
    lastLoginAt: '20/07/2026',
    twoFactorEnabled: false
  },
  {
    id: '2802',
    firstName: 'Fernanda',
    lastName: 'Lima',
    email: 'fernanda.lima@turismo.curitiba.pr.gov.br',
    phone: '(41) 99221-8899',
    document: '789.123.456-55',
    role: 'Supervisor',
    companyName: 'Prefeitura de Curitiba',
    status: 'inactive',
    createdAt: '2026-03-01T11:20:00',
    lastLoginAt: '10/06/2026',
    twoFactorEnabled: false
  },
  {
    id: '2803',
    firstName: 'Guilherme',
    lastName: 'Mendes',
    email: 'guilherme.mendes@curitiba360.com.br',
    phone: '(41) 98765-1122',
    document: '654.987.321-22',
    role: 'Check-in',
    companyName: 'Parque Tanguá Concessão',
    status: 'inactive',
    createdAt: '2026-02-14T08:30:00',
    lastLoginAt: '01/05/2026',
    twoFactorEnabled: false
  }
];

export function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Status Tab from URL: ?status=ativos | inativos | todos
  const currentStatusTab = searchParams.get('status') || 'todos';

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

  // Users Data & Selection State
  const [usersList, setUsersList] = useState(initialUsersList);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sync tab change with URL params
  const handleTabChange = (tabId) => {
    setSearchParams({ status: tabId });
    setSelectedUserIds([]);
    setCurrentPage(1);
  };

  // Filtered Users List
  const filteredUsers = useMemo(() => {
    return usersList.filter((u) => {
      // Tab Status Filter
      const matchesTab =
        currentStatusTab === 'todos' ||
        (currentStatusTab === 'ativos' && u.status === 'active') ||
        (currentStatusTab === 'inativos' && u.status === 'inactive');

      // Search Term
      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchTerm.toLowerCase().trim()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        u.id.includes(searchTerm.trim());

      // Drawer Role & Company Filter
      const matchesRole = selectedRole === 'all' || u.role === selectedRole;
      const matchesCompany = selectedCompany === 'all' || u.companyName === selectedCompany;

      return matchesTab && matchesSearch && matchesRole && matchesCompany;
    });
  }, [usersList, currentStatusTab, searchTerm, selectedRole, selectedCompany]);

  // Pagination Slice
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Bulk Selection Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUserIds(paginatedUsers.map((u) => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleToggleSelectUser = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Actions
  const handleBulkDeactivate = () => {
    setUsersList((prev) =>
      prev.map((u) => (selectedUserIds.includes(u.id) ? { ...u, status: 'inactive' } : u))
    );
    setSelectedUserIds([]);
  };

  const handleBulkActivate = () => {
    setUsersList((prev) =>
      prev.map((u) => (selectedUserIds.includes(u.id) ? { ...u, status: 'active' } : u))
    );
    setSelectedUserIds([]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Deseja realmente excluir os ${selectedUserIds.length} usuários selecionados?`)) {
      setUsersList((prev) => prev.filter((u) => !selectedUserIds.includes(u.id)));
      setSelectedUserIds([]);
    }
  };

  const handleUserCreated = (newUser) => {
    setUsersList((prev) => [newUser, ...prev]);
  };

  return (
    <PageContainer>
      {/* 1. Page Header & Actions */}
      <AdminPageHeader
        breadcrumbItems={[
          { label: 'Administração', path: '/admin/usuarios' },
          { label: 'Gestão de Usuários' }
        ]}
        icon="👥"
        title="Gestão de Usuários"
        description="Gerencie os usuários operacionais do sistema, perfis de acesso, permissões e convites."
        actions={
          <>
            <button
              type="button"
              onClick={() => alert('Exportando catálogo de usuários em CSV...')}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <Download size={15} />
              Exportar CSV
            </button>

            <button
              type="button"
              onClick={() => setIsCreateDrawerOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
            >
              <UserPlus size={16} />
              Adicionar Usuário
            </button>
          </>
        }
      />

      {/* 2. Controls & Search Toolbar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between text-left">
        {/* Status Tabs synced with URL */}
        <StatusTabs
          activeTab={currentStatusTab}
          onChange={handleTabChange}
          tabs={[
            { id: 'todos', label: 'Todos', count: usersList.length },
            { id: 'ativos', label: 'Ativos', count: usersList.filter((u) => u.status === 'active').length },
            { id: 'inativos', label: 'Inativos', count: usersList.filter((u) => u.status === 'inactive').length }
          ]}
        />

        {/* Search & Filter Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, e-mail ou ID..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white placeholder:text-slate-400"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            <Sliders size={15} />
            Filtros
          </button>
        </div>
      </div>

      {/* 3. Main Data Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs text-left">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={paginatedUsers.length > 0 && paginatedUsers.every((u) => selectedUserIds.includes(u.id))}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3.5">ID</th>
                <th className="px-6 py-3.5">Nome / E-mail</th>
                <th className="px-6 py-3.5">Perfil</th>
                <th className="px-6 py-3.5">Empresa / Parceiro</th>
                <th className="px-6 py-3.5">Último Login</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400 font-medium">
                    Nenhum usuário encontrado com os parâmetros selecionados.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => {
                  const isSelected = selectedUserIds.includes(user.id);
                  return (
                    <tr
                      key={user.id}
                      className={`transition ${isSelected ? 'bg-emerald-50/40' : 'hover:bg-slate-50/80'}`}
                    >
                      <td className="px-4 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectUser(user.id)}
                          className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                      </td>

                      <td className="px-4 py-4 font-mono font-bold text-slate-400">
                        #{user.id}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 font-black text-emerald-800 text-xs">
                            {user.firstName.charAt(0)}
                          </span>
                          <div>
                            <p className="font-bold text-slate-900">{user.firstName} {user.lastName}</p>
                            <p className="text-[11px] text-slate-500 font-medium">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-800">
                          <Shield size={11} className="text-emerald-600" />
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {user.companyName}
                      </td>

                      <td className="px-6 py-4 text-slate-500 font-medium">
                        {user.lastLoginAt}
                      </td>

                      <td className="px-6 py-4">
                        {user.status === 'active' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                            <CheckCircle2 size={13} className="text-emerald-500" />
                            Ativo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                            <XCircle size={13} className="text-rose-500" />
                            Inativo
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => navigate(`/admin/usuarios/${user.id}`)}
                            title="Ver detalhes"
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* 4. Bulk Action Bar (Appears when at least 1 item is checked) */}
      <BulkActionBar
        selectedCount={selectedUserIds.length}
        activeTab={currentStatusTab}
        onClearSelection={() => setSelectedUserIds([])}
        onEdit={() => alert(`Editando usuário #${selectedUserIds[0]}`)}
        onDeactivate={handleBulkDeactivate}
        onActivate={handleBulkActivate}
        onDelete={handleBulkDelete}
      />

      {/* 5. Filter Slide-over Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        onReset={() => {
          setSelectedRole('all');
          setSelectedCompany('all');
        }}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Perfil de Acesso (Role)
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500"
            >
              <option value="all">Todos os Perfis</option>
              <option value="Administrador">Administrador</option>
              <option value="Gestor">Gestor</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Parceiro">Parceiro</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Operador">Operador</option>
              <option value="Check-in">Check-in</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Empresa / Parceiro Vinculado
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500"
            >
              <option value="all">Todas as Empresas</option>
              <option value="Curitiba 360 HQ">Curitiba 360 HQ</option>
              <option value="Jardim Botânico Eireli">Jardim Botânico Eireli</option>
              <option value="Ópera de Arame S.A.">Ópera de Arame S.A.</option>
              <option value="Associação MON">Associação MON</option>
            </select>
          </div>
        </div>
      </FilterDrawer>

      {/* 6. User Creation Drawer */}
      <UserCreateDrawer
        isOpen={isCreateDrawerOpen}
        onClose={() => setIsCreateDrawerOpen(false)}
        onUserCreated={handleUserCreated}
      />
    </PageContainer>
  );
}

export default UsersPage;
