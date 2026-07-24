import { useMemo, useState } from 'react';
import {
  Edit3,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  UserRound,
  Users,
  X,
} from 'lucide-react';

const INITIAL_USERS = [
  {
    id: '2798',
    name: 'Darlene Robertson',
    email: 'darlene.robertson@gmail.com',
    document: '999.999.999-99',
    phone: '(41) 99999-9999',
    language: 'pt-BR',
    role: 'Editor',
    status: 'active',
    createdAt: '2026-07-02T16:44:22',
    lastLogin: '2026-07-20T11:12:00',
  },
  {
    id: '2799',
    name: 'João da Silva',
    email: 'joao@gmail.com',
    document: '123.456.789-10',
    phone: '(41) 98888-7777',
    language: 'pt-BR',
    role: 'Leitor',
    status: 'active',
    createdAt: '2026-07-03T10:10:00',
    lastLogin: '2026-07-22T09:31:00',
  },
  {
    id: '2800',
    name: 'Mariana Costa',
    email: 'mariana@agencia.com',
    document: '12.345.678/0001-99',
    phone: '(41) 3333-4444',
    language: 'pt-BR',
    role: 'Agência',
    status: 'inactive',
    createdAt: '2026-07-05T14:00:00',
    lastLogin: '2026-07-18T17:40:00',
  },
];

const EMPTY_USER = {
  name: '',
  email: '',
  document: '',
  phone: '',
  language: 'pt-BR',
  password: '',
  role: 'Leitor',
  status: 'active',
};

const ROLES = [
  'Administrador',
  'Editor',
  'Leitor',
  'Agência',
  'Agente',
  'Financeiro',
  'Validador',
];

export default function AttractionUsersPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState('active');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [openedMenuId, setOpenedMenuId] = useState(null);
  const [formModal, setFormModal] = useState(null);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesStatus =
        statusTab === 'all' || user.status === statusTab;

      const matchesRole =
        roleFilter === 'all' || user.role === roleFilter;

      const matchesSearch =
        !query ||
        `${user.id} ${user.name} ${user.email}`
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesRole && matchesSearch;
    });
  }, [users, search, statusTab, roleFilter]);

  function saveUser(formData) {
    if (formModal.mode === 'edit') {
      setUsers((current) =>
        current.map((user) =>
          user.id === formModal.user.id
            ? {
                ...user,
                ...formData,
              }
            : user,
        ),
      );
    } else {
      setUsers((current) => [
        {
          id: String(Date.now()),
          ...formData,
          createdAt: new Date().toISOString(),
          lastLogin: null,
        },
        ...current,
      ]);
    }

    setFormModal(null);
    setStatusTab('all');
  }

  function changeSelectedStatus(status) {
    setUsers((current) =>
      current.map((user) =>
        selectedIds.includes(user.id)
          ? {
              ...user,
              status,
            }
          : user,
      ),
    );

    setSelectedIds([]);
  }

  function deleteUsers(ids) {
    setUsers((current) =>
      current.filter((user) => !ids.includes(user.id)),
    );

    setSelectedIds([]);
    setOpenedMenuId(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
              <Users size={15} />
              Parque Jaime Lerner
            </p>

            <h1 className="mt-2 text-3xl font-black text-slate-950">
              Usuários da atração
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Gerencie perfis, permissões e acessos da equipe.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setFormModal({
                mode: 'create',
                user: EMPTY_USER,
              })
            }
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-lg shadow-emerald-600/20"
          >
            <Plus size={18} />
            Adicionar usuário
          </button>
        </header>

        <section className="mt-6 overflow-visible rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-wrap gap-2">
              {[
                ['active', 'Ativos'],
                ['inactive', 'Inativos'],
                ['all', 'Todos'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setStatusTab(value);
                    setSelectedIds([]);
                  }}
                  className={[
                    'rounded-2xl px-4 py-2 text-xs font-black transition',
                    statusTab === value
                      ? 'bg-slate-950 text-white'
                      : 'bg-slate-100 text-slate-500',
                  ].join(' ')}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Pesquisar por nome, e-mail ou ID"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={roleFilter}
                  onChange={(event) =>
                    setRoleFilter(event.target.value)
                  }
                  className="h-12 rounded-2xl border border-slate-200 bg-white pl-11 pr-8 text-sm font-bold text-slate-600"
                >
                  <option value="all">
                    Todos os perfis
                  </option>

                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {selectedIds.length > 0 && (
            <div className="flex flex-col gap-3 border-b border-emerald-100 bg-emerald-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <strong className="text-sm text-emerald-900">
                {selectedIds.length} selecionado(s)
              </strong>

              <div className="flex flex-wrap gap-2">
                <BulkButton
                  label="Ativar"
                  onClick={() =>
                    changeSelectedStatus('active')
                  }
                />

                <BulkButton
                  label="Inativar"
                  onClick={() =>
                    changeSelectedStatus('inactive')
                  }
                />

                <BulkButton
                  label="Excluir"
                  danger
                  onClick={() =>
                    deleteUsers(selectedIds)
                  }
                />

                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  className="rounded-xl p-2 text-emerald-700"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4" />

                  {[
                    'User ID',
                    'Nome',
                    'Perfil',
                    'Data de criação',
                    'Último login',
                    'Status',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-500"
                    >
                      {heading}
                    </th>
                  ))}

                  <th />
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(
                          user.id,
                        )}
                        onChange={() =>
                          setSelectedIds((current) =>
                            current.includes(user.id)
                              ? current.filter(
                                  (id) => id !== user.id,
                                )
                              : [...current, user.id],
                          )
                        }
                      />
                    </td>

                    <td className="px-4 py-4 text-xs font-black text-slate-600">
                      {user.id}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                          <UserRound size={18} />
                        </span>

                        <div>
                          <strong className="block text-sm text-slate-900">
                            {user.name}
                          </strong>

                          <span className="text-xs text-slate-400">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-600">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-xs text-slate-600">
                      {formatDateTime(user.createdAt)}
                    </td>

                    <td className="px-4 py-4 text-xs text-slate-600">
                      {formatDateTime(user.lastLogin)}
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={user.status} />
                    </td>

                    <td className="relative px-4 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenedMenuId(
                            openedMenuId === user.id
                              ? null
                              : user.id,
                          )
                        }
                        className="rounded-xl p-2 hover:bg-slate-100"
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openedMenuId === user.id && (
                        <div className="absolute right-4 top-12 z-30 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                          <button
                            type="button"
                            onClick={() => {
                              setFormModal({
                                mode: 'edit',
                                user,
                              });

                              setOpenedMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                          >
                            <Edit3 size={15} />
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteUsers([user.id])
                            }
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 size={15} />
                            Excluir
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {formModal && (
        <UserFormModal
          mode={formModal.mode}
          initialData={formModal.user}
          onClose={() => setFormModal(null)}
          onSave={saveUser}
        />
      )}
    </div>
  );
}

function UserFormModal({
  mode,
  initialData,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(initialData);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    onSave(form);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm text-left">
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-[28px] bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              {mode === 'create'
                ? 'Novo usuário'
                : 'Editar usuário'}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Cadastre os dados e defina o perfil de acesso.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-slate-100 p-3"
          >
            <X size={18} />
          </button>
        </header>

        <div className="grid max-h-[70vh] gap-5 overflow-y-auto p-6 md:grid-cols-2">
          <Field label="Atração">
            <input
              value="Parque Jaime Lerner"
              disabled
              className={`${inputClass} bg-slate-100`}
            />
          </Field>

          <Field label="Nome completo">
            <input
              value={form.name}
              onChange={(event) =>
                updateField('name', event.target.value)
              }
              className={inputClass}
            />
          </Field>

          <Field label="CPF/CNPJ">
            <input
              value={form.document}
              onChange={(event) =>
                updateField('document', event.target.value)
              }
              className={inputClass}
            />
          </Field>

          <Field label="Telefone">
            <input
              value={form.phone}
              onChange={(event) =>
                updateField('phone', event.target.value)
              }
              className={inputClass}
            />
          </Field>

          <Field label="E-mail">
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                updateField('email', event.target.value)
              }
              className={inputClass}
            />
          </Field>

          <Field label="Idioma">
            <select
              value={form.language}
              onChange={(event) =>
                updateField(
                  'language',
                  event.target.value,
                )
              }
              className={inputClass}
            >
              <option value="pt-BR">
                Português Brasil
              </option>

              <option value="en-US">
                English
              </option>

              <option value="es">
                Español
              </option>
            </select>
          </Field>

          <Field label="Senha">
            <input
              type="password"
              value={form.password || ''}
              onChange={(event) =>
                updateField(
                  'password',
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </Field>

          <Field label="Perfil">
            <select
              value={form.role}
              onChange={(event) =>
                updateField('role', event.target.value)
              }
              className={inputClass}
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Status">
            <select
              value={form.status}
              onChange={(event) =>
                updateField(
                  'status',
                  event.target.value,
                )
              }
              className={inputClass}
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </Field>
        </div>

        <footer className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-600"
          >
            Descartar
          </button>

          <button
            type="submit"
            className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white"
          >
            Salvar
          </button>
        </footer>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-xs font-black text-slate-700">
        {label}
      </span>

      {children}
    </label>
  );
}

function BulkButton({
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-xl bg-white px-3 py-2 text-xs font-black',
        danger
          ? 'text-rose-600'
          : 'text-emerald-700',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }) {
  const active = status === 'active';

  return (
    <span
      className={[
        'rounded-full px-3 py-1.5 text-[10px] font-black',
        active
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-slate-100 text-slate-500',
      ].join(' ')}
    >
      {active ? 'Ativo' : 'Inativo'}
    </span>
  );
}

const inputClass =
  'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500';

function formatDateTime(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}
