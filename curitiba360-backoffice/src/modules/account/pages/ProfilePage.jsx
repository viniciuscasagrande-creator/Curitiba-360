import React, { useState } from 'react';
import {
  BarChart3,
  Camera,
  Check,
  Fingerprint,
  Link2,
  Mail,
  Phone,
  Save,
  Trash2,
  UserRound
} from 'lucide-react';

const initialProfile = {
  firstName: 'João',
  lastName: 'da Silva',
  document: '999.999.999-99',
  email: 'email@email.com',
  phone: '(41) 99999-9999',
  language: 'pt-BR'
};

function Field({
  label,
  icon: Icon,
  ...inputProps
}) {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </span>

      <span className="relative block">
        {Icon && (
          <Icon
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          {...inputProps}
          className={[
            'h-11 w-full rounded-2xl border border-slate-200 bg-white',
            'text-sm text-slate-900 outline-none transition font-medium',
            'focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10',
            Icon ? 'pl-10 pr-4' : 'px-4'
          ].join(' ')}
        />
      </span>
    </label>
  );
}

export function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  function updateField(field, value) {
    setSaved(false);

    setProfile((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-5xl text-left">
      <form onSubmit={handleSubmit} className="space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
              Minha conta
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Perfil
            </h1>

            <p className="mt-2 text-sm text-slate-500 font-medium">
              Gerencie seus dados pessoais, contato e integrações.
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20"
          >
            {saved ? <Check size={18} /> : <Save size={18} />}
            {saved ? 'Alterações salvas' : 'Salvar alterações'}
          </button>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-slate-100 bg-slate-50 text-slate-400">
              <UserRound size={34} />
            </span>

            <div className="flex-1">
              <h2 className="text-base font-black text-slate-900">
                Foto de perfil
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                PNG ou JPEG com tamanho máximo de 5 MB.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white"
                >
                  <Camera size={16} />
                  Carregar nova foto
                </button>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  <Trash2 size={16} />
                  Remover
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h2 className="text-base font-black text-slate-900">
              Dados pessoais
            </h2>

            <p className="mt-1 text-xs text-slate-500 font-medium">
              Informações utilizadas na identificação da sua conta.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Primeiro nome"
              value={profile.firstName}
              onChange={(event) =>
                updateField('firstName', event.target.value)
              }
            />

            <Field
              label="Último nome"
              value={profile.lastName}
              onChange={(event) =>
                updateField('lastName', event.target.value)
              }
            />

            <Field
              label="CPF/CNPJ"
              icon={Fingerprint}
              value={profile.document}
              onChange={(event) =>
                updateField('document', event.target.value)
              }
            />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h2 className="text-base font-black text-slate-900">
              Contato
            </h2>

            <p className="mt-1 text-xs text-slate-500 font-medium">
              Canais utilizados para comunicação e recuperação da conta.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="E-mail"
              type="email"
              icon={Mail}
              value={profile.email}
              onChange={(event) =>
                updateField('email', event.target.value)
              }
            />

            <Field
              label="Telefone"
              icon={Phone}
              value={profile.phone}
              onChange={(event) =>
                updateField('phone', event.target.value)
              }
            />
          </div>

          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            <Mail size={16} />
            Adicionar outro e-mail
          </button>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h2 className="text-base font-black text-slate-900">
              Preferências
            </h2>

            <p className="mt-1 text-xs text-slate-500 font-medium">
              Personalize idioma e experiência de uso.
            </p>
          </div>

          <label className="block max-w-md">
            <span className="mb-2 block text-xs font-bold text-slate-700">
              Idioma padrão
            </span>

            <select
              value={profile.language}
              onChange={(event) =>
                updateField('language', event.target.value)
              }
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="pt-BR">Português Brasil</option>
              <option value="en-US">English</option>
              <option value="es-ES">Español</option>
            </select>
          </label>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5">
            <h2 className="text-base font-black text-slate-900">
              Integrações da conta
            </h2>

            <p className="mt-1 text-xs text-slate-500 font-medium">
              Serviços conectados ao seu perfil.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                <BarChart3 size={19} />
              </span>

              <div>
                <strong className="block text-sm text-slate-800">
                  Google Analytics
                </strong>

                <span className="text-xs text-slate-400">
                  Integração ativa
                </span>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700"
            >
              <Link2 size={16} />
              Conectado
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

export default ProfilePage;
