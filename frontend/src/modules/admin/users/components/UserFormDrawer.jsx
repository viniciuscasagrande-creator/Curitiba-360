import React, { useEffect, useState } from 'react';
import {
  Save,
  Send,
  UserPlus,
  X
} from 'lucide-react';

import { roleLabels } from '../data/usersMock';

const emptyUser = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  document: '',
  role: 'operator',
  company: '',
  status: 'active',
  sendInvite: true
};

export function UserFormDrawer({
  open,
  user,
  companies,
  onSave,
  onClose
}) {
  const [form, setForm] = useState(emptyUser);

  useEffect(() => {
    setForm(user ? { ...emptyUser, ...user } : emptyUser);
  }, [user, open]);

  if (!open) {
    return null;
  }

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function submit(event) {
    event.preventDefault();

    if (!form.firstName.trim() || !form.email.trim()) {
      return;
    }

    onSave(form);
  }

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar formulário"
        className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm"
      />

      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-slate-200 bg-white shadow-2xl text-left">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <UserPlus size={19} />
            </span>

            <div>
              <h2 className="font-black text-slate-900">
                {user ? 'Editar usuário' : 'Adicionar usuário'}
              </h2>

              <p className="text-xs text-slate-500">
                Informe os dados e defina o acesso.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </header>

        <form
          id="user-form"
          onSubmit={submit}
          className="flex-1 space-y-5 overflow-y-auto p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Primeiro nome"
              value={form.firstName}
              onChange={(value) =>
                updateField('firstName', value)
              }
              required
            />

            <Input
              label="Último nome"
              value={form.lastName}
              onChange={(value) =>
                updateField('lastName', value)
              }
            />
          </div>

          <Input
            label="E-mail"
            type="email"
            value={form.email}
            onChange={(value) => updateField('email', value)}
            required
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Telefone"
              value={form.phone}
              onChange={(value) => updateField('phone', value)}
            />

            <Input
              label="CPF/CNPJ"
              value={form.document}
              onChange={(value) =>
                updateField('document', value)
              }
            />
          </div>

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-700">
              Empresa ou parceiro
            </span>

            <select
              value={form.company}
              onChange={(event) =>
                updateField('company', event.target.value)
              }
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
            >
              <option value="">Selecione uma empresa</option>

              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-700">
              Perfil
            </span>

            <select
              value={form.role}
              onChange={(event) =>
                updateField('role', event.target.value)
              }
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
            >
              {Object.entries(roleLabels).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                )
              )}
            </select>
          </label>

          <label className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
            <input
              type="checkbox"
              checked={form.sendInvite}
              onChange={(event) =>
                updateField('sendInvite', event.target.checked)
              }
              className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-emerald-600"
            />

            <span>
              <strong className="block text-sm text-slate-800">
                Enviar convite por e-mail
              </strong>

              <span className="mt-1 block text-xs text-slate-500">
                O usuário receberá um link para criar sua senha.
              </span>
            </span>
          </label>
        </form>

        <footer className="flex gap-3 border-t border-slate-200 p-6">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            form="user-form"
            type="submit"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-sm font-bold text-white hover:bg-emerald-700"
          >
            {form.sendInvite ? (
              <Send size={17} />
            ) : (
              <Save size={17} />
            )}

            {user ? 'Salvar alterações' : 'Criar usuário'}
          </button>
        </footer>
      </aside>
    </>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  required = false
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-700">
        {label}
        {required && (
          <span className="ml-1 text-rose-500">*</span>
        )}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
      />
    </label>
  );
}

export default UserFormDrawer;
