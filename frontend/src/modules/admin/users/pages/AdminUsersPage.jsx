import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter,
  Plus,
  Search,
  Users
} from 'lucide-react';

import { ROUTES } from '../../../../routes/routePaths';
import UserFormDrawer from '../components/UserFormDrawer';
import UsersBulkActions from '../components/UsersBulkActions';
import UsersFilterDrawer from '../components/UsersFilterDrawer';
import UsersTable from '../components/UsersTable';
import UserStatusTabs from '../components/UserStatusTabs';

import {
  usersMock
} from '../data/usersMock';

const emptyFilters = {
  role: '',
  company: '',
  status: '',
  twoFactor: ''
};

export function AdminUsersPage() {
  const [usersData, setUsersData] = useState(usersMock);
  const [query, setQuery] = useState('');
  const [statusTab, setStatusTab] = useState('active');
  const [filters, setFilters] = useState(emptyFilters);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] =
    useState(false);
  const [formDrawerOpen, setFormDrawerOpen] =
    useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState({
    field: 'firstName',
    direction: 'asc'
  });

  const companies = useMemo(
    () => [
      ...new Set(
        usersData
          .map((user) => user.company)
          .filter(Boolean)
      )
    ],
    [usersData]
  );

  const counts = useMemo(
    () => ({
      active: usersData.filter(
        (user) => user.status === 'active'
      ).length,
      inactive: usersData.filter(
        (user) => user.status === 'inactive'
      ).length,
      all: usersData.length
    }),
    [usersData]
  );

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return usersData
      .filter((user) => {
        if (
          statusTab !== 'all' &&
          user.status !== statusTab
        ) {
          return false;
        }

        if (
          filters.role &&
          user.role !== filters.role
        ) {
          return false;
        }

        if (
          filters.company &&
          user.company !== filters.company
        ) {
          return false;
        }

        if (
          filters.status &&
          user.status !== filters.status
        ) {
          return false;
        }

        if (
          filters.twoFactor === 'enabled' &&
          !user.twoFactorEnabled
        ) {
          return false;
        }

        if (
          filters.twoFactor === 'disabled' &&
          user.twoFactorEnabled
        ) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        const searchable = [
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.company,
          user.role
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchable.includes(normalizedQuery);
      })
      .sort((first, second) => {
        const firstValue =
          first[sort.field] ?? '';
        const secondValue =
          second[sort.field] ?? '';

        const comparison = String(firstValue).localeCompare(
          String(secondValue),
          'pt-BR',
          {
            numeric: true
          }
        );

        return sort.direction === 'asc'
          ? comparison
          : comparison * -1;
      });
  }, [
    usersData,
    query,
    statusTab,
    filters,
    sort
  ]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page, pageSize]);

  const activeFilterCount = Object.values(filters).filter(
    Boolean
  ).length;

  function changeTab(tab) {
    setStatusTab(tab);
    setSelectedIds([]);
    setPage(1);
  }

  function handleSort(field) {
    setSort((current) => ({
      field,
      direction:
        current.field === field &&
        current.direction === 'asc'
          ? 'desc'
          : 'asc'
    }));
  }

  function toggleUser(userId) {
    setSelectedIds((current) =>
      current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId]
    );
  }

  function toggleAllVisible() {
    const visibleIds = paginatedUsers.map(
      (user) => user.id
    );

    const allVisibleSelected = visibleIds.every((id) =>
      selectedIds.includes(id)
    );

    if (allVisibleSelected) {
      setSelectedIds((current) =>
        current.filter((id) => !visibleIds.includes(id))
      );

      return;
    }

    setSelectedIds((current) => [
      ...new Set([...current, ...visibleIds])
    ]);
  }

  const navigate = useNavigate();

  function openCreateUser() {
    navigate(ROUTES.admin.userCreate);
  }

  function openEditUser(user) {
    navigate(ROUTES.admin.userDetails(user.id));
  }

  function editSelectedUser() {
    if (selectedIds.length !== 1) {
      return;
    }

    const selectedUser = usersData.find(
      (user) => user.id === selectedIds[0]
    );

    if (selectedUser) {
      openEditUser(selectedUser);
    }
  }

  function saveUser(form) {
    if (editingUser) {
      setUsersData((current) =>
        current.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...form
              }
            : user
        )
      );
    } else {
      const newUser = {
        ...form,
        id: String(Date.now()).slice(-6),
        createdAt: new Date().toISOString(),
        lastLoginAt: null,
        twoFactorEnabled: false,
        status: form.sendInvite
          ? 'pending'
          : 'active'
      };

      setUsersData((current) => [
        newUser,
        ...current
      ]);
    }

    setFormDrawerOpen(false);
    setEditingUser(null);
    setSelectedIds([]);
  }

  function updateSelectedStatus(status) {
    setUsersData((current) =>
      current.map((user) =>
        selectedIds.includes(user.id)
          ? {
              ...user,
              status
            }
          : user
      )
    );

    setSelectedIds([]);
  }

  function deleteSelected() {
    const confirmed = window.confirm(
      `Deseja excluir ${selectedIds.length} usuário(s)?`
    );

    if (!confirmed) {
      return;
    }

    setUsersData((current) =>
      current.filter(
        (user) => !selectedIds.includes(user.id)
      )
    );

    setSelectedIds([]);
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 text-left">
      <header className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
            Administração
          </p>

          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black tracking-tight text-slate-950">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Users size={22} />
            </span>

            Gestão de Usuários
          </h1>

          <p className="mt-2 text-sm text-slate-500 font-medium">
            Gerencie usuários, perfis, empresas e acessos ao
            Backoffice.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 sm:w-80">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Pesquisar usuários..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
            />
          </div>

          <button
            type="button"
            onClick={() => setFilterDrawerOpen(true)}
            className="relative inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <Filter size={18} />
            Filtros

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={openCreateUser}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20"
          >
            <Plus size={18} />
            Adicionar usuário
          </button>
        </div>
      </header>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <UserStatusTabs
          value={statusTab}
          counts={counts}
          onChange={changeTab}
        />

        <div className="p-4 sm:p-5">
          <UsersBulkActions
            selectedCount={selectedIds.length}
            currentTab={statusTab}
            onEdit={editSelectedUser}
            onActivate={() =>
              updateSelectedStatus('active')
            }
            onDeactivate={() =>
              updateSelectedStatus('inactive')
            }
            onDelete={deleteSelected}
            onClear={() => setSelectedIds([])}
          />
        </div>
      </section>

      <UsersTable
        users={paginatedUsers}
        selectedIds={selectedIds}
        sort={sort}
        page={page}
        pageSize={pageSize}
        totalItems={filteredUsers.length}
        onToggle={toggleUser}
        onToggleAll={toggleAllVisible}
        onSort={handleSort}
        onEdit={openEditUser}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />

      <UsersFilterDrawer
        open={filterDrawerOpen}
        filters={filters}
        companies={companies}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setPage(1);
        }}
        onClose={() => setFilterDrawerOpen(false)}
      />

      <UserFormDrawer
        open={formDrawerOpen}
        user={editingUser}
        companies={companies}
        onSave={saveUser}
        onClose={() => {
          setFormDrawerOpen(false);
          setEditingUser(null);
        }}
      />
    </div>
  );
}

export default AdminUsersPage;
