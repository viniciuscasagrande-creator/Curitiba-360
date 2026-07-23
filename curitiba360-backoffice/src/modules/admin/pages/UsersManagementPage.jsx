import React, { useState } from 'react';
import {
  Users,
  Search,
  UserPlus,
  Shield,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  Lock,
  Download
} from 'lucide-react';

const mockUsers = [
  {
    id: 'usr-001',
    name: 'Carlos Eduardo Silva',
    email: 'carlos.silva@curitiba360.com.br',
    phone: '(41) 99884-1234',
    role: 'Administrador Geral',
    roleBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    status: 'active',
    lastAccess: 'Hoje, 13:14',
    createdAt: '12/01/2025'
  },
  {
    id: 'usr-002',
    name: 'Mariana Santos Costa',
    email: 'mariana.costa@parquejardimbotanico.com.br',
    phone: '(41) 99123-5566',
    role: 'Operador de Atração',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    status: 'active',
    lastAccess: 'Hoje, 12:45',
    createdAt: '18/02/2025'
  },
  {
    id: 'usr-003',
    name: 'Roberto Andrade Filho',
    email: 'roberto@operadearame.com.br',
    phone: '(41) 98877-3322',
    role: 'Gestor Comercial',
    roleBadge: 'bg-amber-50 text-amber-700 border-amber-200',
    status: 'active',
    lastAccess: 'Ontem, 18:20',
    createdAt: '03/03/2025'
  },
  {
    id: 'usr-004',
    name: 'Fernanda Oliveira Lima',
    email: 'fernanda.lima@mon.org.br',
    phone: '(41) 99655-4411',
    role: 'Operador de Atração',
    roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    status: 'inactive',
    lastAccess: '14/07/2026',
    createdAt: '15/04/2025'
  },
  {
    id: 'usr-005',
    name: 'Guilherme Rocha Mendes',
    email: 'guilherme.mendes@turismo.curitiba.pr.gov.br',
    phone: '(41) 99221-8899',
    role: 'Auditor de Finanças',
    roleBadge: 'bg-sky-50 text-sky-700 border-sky-200',
    status: 'active',
    lastAccess: 'Hoje, 10:15',
    createdAt: '22/05/2025'
  }
];

export function UsersManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = mockUsers.filter((usr) => {
    const matchesSearch =
      usr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usr.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || usr.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Title */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Operação & Controle de Acessos
          </p>
          <h1 className="text-2xl font-black text-slate-950">
            Gestão de Usuários
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <Download size={15} />
            Exportar Lista
          </button>

          <button
            type="button"
            onClick={() => alert('Abrir modal de novo usuário')}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
          >
            <UserPlus size={16} />
            Novo Usuário
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative min-w-[300px] flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, e-mail..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500"
          >
            <option value="all">Todos os Perfis</option>
            <option value="Administrador Geral">Administrador Geral</option>
            <option value="Operador de Atração">Operador de Atração</option>
            <option value="Gestor Comercial">Gestor Comercial</option>
            <option value="Auditor de Finanças">Auditor de Finanças</option>
          </select>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Usuário</th>
                <th className="px-6 py-3.5">Contato</th>
                <th className="px-6 py-3.5">Perfil de Acesso</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Último Acesso</th>
                <th className="px-6 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 font-black text-emerald-800 text-xs">
                        {user.name.charAt(0)}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <span className="text-[10px] text-slate-400 font-mono">{user.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <p className="flex items-center gap-1.5 text-slate-600">
                        <Mail size={12} className="text-slate-400" />
                        {user.email}
                      </p>
                      <p className="flex items-center gap-1.5 text-slate-400">
                        <Phone size={12} className="text-slate-400" />
                        {user.phone}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold ${user.roleBadge}`}>
                      <Shield size={11} />
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {user.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <CheckCircle2 size={13} className="text-emerald-500" />
                        Ativo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                        <XCircle size={13} className="text-slate-400" />
                        Inativo
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-slate-500 font-medium">
                    {user.lastAccess}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Ações do usuário ${user.name}`)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersManagementPage;
