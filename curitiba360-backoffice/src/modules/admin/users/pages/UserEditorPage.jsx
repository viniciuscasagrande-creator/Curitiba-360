import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Camera,
  Check,
  Eye,
  EyeOff,
  Fingerprint,
  KeyRound,
  Link2,
  Mail,
  Phone,
  Plus,
  Save,
  Trash2,
  UserRound,
  Users,
  X
} from 'lucide-react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';

import { ROUTES } from '../../../../routes/routePaths';
import {
  roleLabels,
  usersMock
} from '../data/usersMock';

const ROLE_OPTIONS = [
  {
    value: 'administrator',
    label: 'Administrador'
  },
  {
    value: 'manager',
    label: 'Gestor'
  },
  {
    value: 'financial',
    label: 'Financeiro'
  },
  {
    value: 'supervisor',
    label: 'Supervisor'
  },
  {
    value: 'operator',
    label: 'Operador'
  },
  {
    value: 'support',
    label: 'Atendimento'
  },
  {
    value: 'check-in',
    label: 'Check-in'
  },
  {
    value: 'commercial_partner',
    label: 'Parceiro Comercial'
  }
];

const LANGUAGE_OPTIONS = [
  {
    value: 'pt-BR',
    label: 'Português Brasil'
  },
  {
    value: 'en-US',
    label: 'English'
  },
  {
    value: 'es-ES',
    label: 'Español'
  }
];

const initialForm = {
  id: '',
  photoUrl: '',

  firstName: '',
  lastName: '',
  document: '',

  emails: [''],
  phones: [''],

  language: 'pt-BR',

  role: 'operator',
  status: 'active',

  createdAt: '',
  lastLoginAt: '',

  manager: {
    firstName: '',
    lastName: '',
    emails: [''],
    phones: ['']
  },

  company: {
    legalName: '',
    tradeName: '',
    cnpj: '',
    stateRegistration: '',
    stateRegistrationExempt: false
  },

  integrations: {
    googleAnalytics: {
      connected: false,
      accountId: ''
    }
  }
};

function normalizeUser(user) {
  if (!user) {
    return initialForm;
  }

  return {
    ...initialForm,

    id: user.id || '',

    firstName: user.firstName || '',
    lastName: user.lastName || '',
    document: user.document || '',

    emails: user.emails?.length
      ? user.emails
      : [user.email || ''],

    phones: user.phones?.length
      ? user.phones
      : [user.phone || ''],

    language: user.language || 'pt-BR',

    role: user.role || 'operator',
    status: user.status || 'active',

    createdAt: user.createdAt || '',
    lastLoginAt: user.lastLoginAt || '',

    manager: {
      ...initialForm.manager,
      ...(user.manager || {})
    },

    company: {
      ...initialForm.company,
      legalName: user.company?.legalName || '',
      tradeName:
        user.company?.tradeName ||
        user.company ||
        '',
      cnpj: user.company?.cnpj || '',
      stateRegistration:
        user.company?.stateRegistration || '',
      stateRegistrationExempt:
        user.company?.stateRegistrationExempt ||
        false
    },

    integrations: {
      googleAnalytics: {
        ...initialForm.integrations.googleAnalytics,
        ...(user.integrations?.googleAnalytics || {})
      }
    }
  };
}

export function UserEditorPage() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const editing = Boolean(userId);

  const currentUser = useMemo(
    () =>
      editing
        ? usersMock.find(
            (user) => String(user.id) === String(userId)
          )
        : null,
    [editing, userId]
  );

  const [form, setForm] = useState(() =>
    normalizeUser(currentUser)
  );

  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [showPasswordState, setShowPasswordState] =
    useState(false);

  const isCommercialPartner =
    form.role === 'commercial_partner' ||
    form.role === 'partner';

  useEffect(() => {
    setForm(normalizeUser(currentUser));
    setDirty(false);
    setSaved(false);
  }, [currentUser]);

  function updateField(field, value) {
    setDirty(true);
    setSaved(false);

    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function updateNested(section, field, value) {
    setDirty(true);
    setSaved(false);

    setForm((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value
      }
    }));
  }

  function updateIntegration(field, value) {
    setDirty(true);
    setSaved(false);

    setForm((current) => ({
      ...current,
      integrations: {
        ...current.integrations,
        googleAnalytics: {
          ...current.integrations.googleAnalytics,
          [field]: value
        }
      }
    }));
  }

  function updateArray(field, index, value) {
    setDirty(true);
    setSaved(false);

    setForm((current) => ({
      ...current,
      [field]: current[field].map((item, itemIndex) =>
        itemIndex === index ? value : item
      )
    }));
  }

  function addArrayItem(field) {
    setDirty(true);

    setForm((current) => ({
      ...current,
      [field]: [...current[field], '']
    }));
  }

  function removeArrayItem(field, index) {
    setDirty(true);

    setForm((current) => {
      const nextItems = current[field].filter(
        (_, itemIndex) => itemIndex !== index
      );

      return {
        ...current,
        [field]: nextItems.length
          ? nextItems
          : ['']
      };
    });
  }

  function updateManagerArray(field, index, value) {
    setDirty(true);

    setForm((current) => ({
      ...current,
      manager: {
        ...current.manager,
        [field]: current.manager[field].map(
          (item, itemIndex) =>
            itemIndex === index ? value : item
        )
      }
    }));
  }

  function addManagerArrayItem(field) {
    setDirty(true);

    setForm((current) => ({
      ...current,
      manager: {
        ...current.manager,
        [field]: [
          ...current.manager[field],
          ''
        ]
      }
    }));
  }

  function removeManagerArrayItem(field, index) {
    setDirty(true);

    setForm((current) => {
      const nextItems =
        current.manager[field].filter(
          (_, itemIndex) => itemIndex !== index
        );

      return {
        ...current,
        manager: {
          ...current.manager,
          [field]: nextItems.length
            ? nextItems
            : ['']
        }
      };
    });
  }

  function validateForm() {
    if (!form.firstName.trim()) {
      window.alert('Informe o primeiro nome.');
      return false;
    }

    if (!form.lastName.trim()) {
      window.alert('Informe o último nome.');
      return false;
    }

    if (!form.emails[0]?.trim()) {
      window.alert('Informe o e-mail principal.');
      return false;
    }

    if (
      isCommercialPartner &&
      !form.company.legalName.trim()
    ) {
      window.alert(
        'Informe a razão social do parceiro comercial.'
      );

      return false;
    }

    if (
      isCommercialPartner &&
      !form.company.cnpj.trim()
    ) {
      window.alert(
        'Informe o CNPJ do parceiro comercial.'
      );

      return false;
    }

    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      ...form,
      email: form.emails[0],
      phone: form.phones[0],
      updatedAt: new Date().toISOString()
    };

    console.log(
      editing
        ? 'Atualizando usuário'
        : 'Criando usuário',
      payload
    );

    setSaved(true);
    setDirty(false);

    window.setTimeout(() => {
      navigate(ROUTES.admin.users);
    }, 700);
  }

  function handleDiscard() {
    if (
      dirty &&
      !window.confirm(
        'Existem alterações não salvas. Deseja descartá-las?'
      )
    ) {
      return;
    }

    navigate(ROUTES.admin.users);
  }

  function handleResetPassword() {
    const confirmed = window.confirm(
      'Deseja enviar um e-mail de redefinição de senha para este usuário?'
    );

    if (!confirmed) {
      return;
    }

    window.alert(
      'Solicitação de redefinição de senha enviada.'
    );
  }

  return (
    <div className="mx-auto max-w-6xl text-left">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <PageHeader
          editing={editing}
          dirty={dirty}
          saved={saved}
          onBack={handleDiscard}
          onDiscard={handleDiscard}
        />

        <FormSection
          title="Foto de perfil"
          description="Imagem utilizada para identificação do usuário."
          icon={Camera}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-slate-100 bg-slate-50 text-slate-400">
              {form.photoUrl ? (
                <img
                  src={form.photoUrl}
                  alt="Foto do usuário"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={35} />
              )}
            </span>

            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800">
                Carregar nova foto
              </p>

              <p className="mt-1 text-xs text-slate-500 font-medium">
                PNG ou JPEG com tamanho máximo de 5 MB.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800">
                  <Camera size={16} />
                  Selecionar foto

                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={(event) => {
                      const file =
                        event.target.files?.[0];

                      if (!file) {
                        return;
                      }

                      if (
                        file.size >
                        5 * 1024 * 1024
                      ) {
                        window.alert(
                          'A imagem deve ter no máximo 5 MB.'
                        );

                        return;
                      }

                      const reader = new FileReader();

                      reader.onload = () => {
                        updateField(
                          'photoUrl',
                          String(reader.result)
                        );
                      };

                      reader.readAsDataURL(file);
                    }}
                  />
                </label>

                <button
                  type="button"
                  onClick={() =>
                    updateField('photoUrl', '')
                  }
                  disabled={!form.photoUrl}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 size={16} />
                  Remover
                </button>
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Dados pessoais"
          description="Informações básicas de identificação."
          icon={UserRound}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <TextField
              label="Primeiro nome"
              value={form.firstName}
              onChange={(value) =>
                updateField('firstName', value)
              }
              required
            />

            <TextField
              label="Último nome"
              value={form.lastName}
              onChange={(value) =>
                updateField('lastName', value)
              }
              required
            />

            <TextField
              label="CPF/CNPJ"
              icon={Fingerprint}
              value={form.document}
              onChange={(value) =>
                updateField('document', value)
              }
              placeholder="999.999.999-99"
            />
          </div>
        </FormSection>

        <FormSection
          title="Contato"
          description="E-mails e telefones utilizados para comunicação."
          icon={Mail}
        >
          <DynamicFieldList
            label="E-mails"
            values={form.emails}
            icon={Mail}
            type="email"
            placeholder="email@empresa.com"
            addLabel="Adicionar outro e-mail"
            onChange={(index, value) =>
              updateArray('emails', index, value)
            }
            onAdd={() => addArrayItem('emails')}
            onRemove={(index) =>
              removeArrayItem('emails', index)
            }
          />

          <div className="mt-6">
            <DynamicFieldList
              label="Telefones"
              values={form.phones}
              icon={Phone}
              placeholder="(41) 99999-9999"
              addLabel="Adicionar outro telefone"
              onChange={(index, value) =>
                updateArray('phones', index, value)
              }
              onAdd={() => addArrayItem('phones')}
              onRemove={(index) =>
                removeArrayItem('phones', index)
              }
            />
          </div>
        </FormSection>

        <FormSection
          title="Preferências"
          description="Configurações pessoais do usuário."
          icon={Users}
        >
          <SelectField
            label="Idioma padrão"
            value={form.language}
            options={LANGUAGE_OPTIONS}
            onChange={(value) =>
              updateField('language', value)
            }
          />
        </FormSection>

        <FormSection
          title="Acesso e segurança"
          description="Controle de senha, criação e último acesso."
          icon={KeyRound}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <span className="mb-2 block text-xs font-bold text-slate-700">
                Senha
              </span>

              <div className="relative">
                <input
                  type={
                    showPasswordState
                      ? 'text'
                      : 'password'
                  }
                  readOnly
                  value={
                    editing
                      ? 'senha-configurada'
                      : 'senha-definida-por-convite'
                  }
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-4 pr-11 text-sm text-slate-600 outline-none font-medium"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordState(
                      (current) => !current
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label="Exibir estado da senha"
                >
                  {showPasswordState ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              <p className="mt-2 text-[11px] text-slate-500 font-medium">
                A senha real nunca é exibida no painel.
              </p>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleResetPassword}
                disabled={!editing}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <KeyRound size={16} />
                Enviar redefinição de senha
              </button>
            </div>

            <ReadOnlyField
              label="Data de criação"
              value={formatDate(form.createdAt)}
            />

            <ReadOnlyField
              label="Último acesso"
              value={formatDate(form.lastLoginAt)}
            />
          </div>
        </FormSection>

        <FormSection
          title="Perfil e status"
          description="Defina o nível de acesso e a situação do usuário."
          icon={Users}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              label="Perfil"
              value={form.role}
              options={ROLE_OPTIONS}
              onChange={(value) =>
                updateField('role', value)
              }
            />

            <div>
              <span className="mb-2 block text-xs font-bold text-slate-700">
                Situação do usuário
              </span>

              <StatusSwitch
                active={form.status === 'active'}
                onChange={(active) =>
                  updateField(
                    'status',
                    active
                      ? 'active'
                      : 'inactive'
                  )
                }
              />
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500 font-medium">
              Perfil selecionado:
            </p>

            <strong className="mt-1 block text-sm text-slate-800">
              {roleLabels[form.role] ||
                ROLE_OPTIONS.find(
                  (option) =>
                    option.value === form.role
                )?.label ||
                form.role}
            </strong>
          </div>
        </FormSection>

        {isCommercialPartner && (
          <>
            <FormSection
              title="Gestor responsável"
              description="Responsável principal pela conta do parceiro comercial."
              icon={UserRound}
              highlighted
            >
              <div className="grid gap-5 md:grid-cols-2">
                <TextField
                  label="Primeiro nome"
                  value={form.manager.firstName}
                  onChange={(value) =>
                    updateNested(
                      'manager',
                      'firstName',
                      value
                    )
                  }
                />

                <TextField
                  label="Último nome"
                  value={form.manager.lastName}
                  onChange={(value) =>
                    updateNested(
                      'manager',
                      'lastName',
                      value
                    )
                  }
                />
              </div>

              <div className="mt-6">
                <DynamicFieldList
                  label="E-mails do gestor"
                  values={form.manager.emails}
                  icon={Mail}
                  type="email"
                  placeholder="gestor@empresa.com"
                  addLabel="Adicionar outro e-mail"
                  onChange={(index, value) =>
                    updateManagerArray(
                      'emails',
                      index,
                      value
                    )
                  }
                  onAdd={() =>
                    addManagerArrayItem('emails')
                  }
                  onRemove={(index) =>
                    removeManagerArrayItem(
                      'emails',
                      index
                    )
                  }
                />
              </div>

              <div className="mt-6">
                <DynamicFieldList
                  label="Telefones do gestor"
                  values={form.manager.phones}
                  icon={Phone}
                  placeholder="(41) 99999-9999"
                  addLabel="Adicionar outro telefone"
                  onChange={(index, value) =>
                    updateManagerArray(
                      'phones',
                      index,
                      value
                    )
                  }
                  onAdd={() =>
                    addManagerArrayItem('phones')
                  }
                  onRemove={(index) =>
                    removeManagerArrayItem(
                      'phones',
                      index
                    )
                  }
                />
              </div>
            </FormSection>

            <FormSection
              title="Dados da empresa"
              description="Informações jurídicas do parceiro comercial."
              icon={Building2}
              highlighted
            >
              <div className="grid gap-5 md:grid-cols-2">
                <TextField
                  label="Razão social"
                  icon={Building2}
                  value={form.company.legalName}
                  onChange={(value) =>
                    updateNested(
                      'company',
                      'legalName',
                      value
                    )
                  }
                  required
                />

                <TextField
                  label="Nome fantasia"
                  icon={Building2}
                  value={form.company.tradeName}
                  onChange={(value) =>
                    updateNested(
                      'company',
                      'tradeName',
                      value
                    )
                  }
                />

                <TextField
                  label="CNPJ"
                  icon={Fingerprint}
                  value={form.company.cnpj}
                  onChange={(value) =>
                    updateNested(
                      'company',
                      'cnpj',
                      value
                    )
                  }
                  placeholder="00.000.000/0000-00"
                  required
                />

                <TextField
                  label="Inscrição estadual"
                  value={
                    form.company.stateRegistration
                  }
                  onChange={(value) =>
                    updateNested(
                      'company',
                      'stateRegistration',
                      value
                    )
                  }
                  disabled={
                    form.company
                      .stateRegistrationExempt
                  }
                />
              </div>

              <label className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
                <input
                  type="checkbox"
                  checked={
                    form.company
                      .stateRegistrationExempt
                  }
                  onChange={(event) =>
                    updateNested(
                      'company',
                      'stateRegistrationExempt',
                      event.target.checked
                    )
                  }
                  className="mt-0.5 h-4 w-4 accent-emerald-600"
                />

                <span>
                  <strong className="block text-sm text-slate-800">
                    Empresa isenta de inscrição estadual
                  </strong>

                  <span className="mt-1 block text-xs text-slate-500">
                    O campo de inscrição estadual será
                    desabilitado.
                  </span>
                </span>
              </label>
            </FormSection>

            <FormSection
              title="Integrações da conta"
              description="Serviços conectados ao parceiro comercial."
              icon={Link2}
              highlighted
            >
              <IntegrationCard
                title="Google Analytics"
                description="Métricas e acompanhamento da conta."
                icon={BarChart3}
                connected={
                  form.integrations.googleAnalytics
                    .connected
                }
                onToggle={() =>
                  updateIntegration(
                    'connected',
                    !form.integrations
                      .googleAnalytics.connected
                  )
                }
              />
            </FormSection>
          </>
        )}

        <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl sm:flex-row sm:items-center">
          <div className="mr-auto">
            <p className="text-sm font-bold text-slate-800">
              {dirty
                ? 'Existem alterações não salvas'
                : saved
                  ? 'Alterações salvas'
                  : 'Formulário atualizado'}
            </p>

            <p className="text-xs text-slate-500">
              Revise os dados antes de concluir.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDiscard}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <X size={17} />
            Descartar
          </button>

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 text-sm font-bold text-white transition hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20"
          >
            {saved ? (
              <Check size={17} />
            ) : (
              <Save size={17} />
            )}

            {saved
              ? 'Salvo'
              : editing
                ? 'Salvar alterações'
                : 'Criar usuário'}
          </button>
        </div>
      </form>
    </div>
  );
}

function PageHeader({
  editing,
  dirty,
  saved,
  onBack,
  onDiscard
}) {
  return (
    <header className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end border-b border-slate-200 pb-5">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Voltar para usuários
        </button>

        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
          Gestão de usuários
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          {editing
            ? 'Editar usuário'
            : 'Novo usuário'}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Preencha os dados obrigatórios e configure o
          acesso ao Backoffice.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {dirty && (
          <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-700">
            Alterações pendentes
          </span>
        )}

        {saved && (
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
            Salvo com sucesso
          </span>
        )}

        <button
          type="button"
          onClick={onDiscard}
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
        >
          <Trash2 size={17} />
          Descartar
        </button>

        <button
          type="submit"
          className="inline-flex h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700"
        >
          <Save size={17} />
          Salvar
        </button>
      </div>
    </header>
  );
}

function FormSection({
  title,
  description,
  icon: Icon,
  children,
  highlighted = false
}) {
  return (
    <section
      className={[
        'rounded-3xl border bg-white p-5 shadow-sm sm:p-7',
        highlighted
          ? 'border-emerald-200'
          : 'border-slate-200'
      ].join(' ')}
    >
      <div className="mb-6 flex items-start gap-3">
        <span
          className={[
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl',
            highlighted
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-slate-100 text-slate-600'
          ].join(' ')}
        >
          <Icon size={19} />
        </span>

        <div>
          <h2 className="text-base font-black text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  icon: Icon,
  type = 'text',
  placeholder = '',
  required = false,
  disabled = false
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-rose-500">
            *
          </span>
        )}
      </span>

      <span className="relative block">
        {Icon && (
          <Icon
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          type={type}
          value={value}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={[
            'h-11 w-full rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 outline-none transition font-medium',
            'focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10',
            'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400',
            Icon ? 'pl-10 pr-4' : 'px-4'
          ].join(' ')}
        />
      </span>
    </label>
  );
}

function ReadOnlyField({
  label,
  value
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </span>

      <input
        readOnly
        value={value}
        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500 outline-none font-medium"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange
}) {
  return (
    <label className="block max-w-md">
      <span className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-bold"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function DynamicFieldList({
  label,
  values,
  icon: Icon,
  type = 'text',
  placeholder,
  addLabel,
  onChange,
  onAdd,
  onRemove
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-xs font-bold text-slate-700">
          {label}
        </span>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50"
        >
          <Plus size={14} />
          {addLabel}
        </button>
      </div>

      <div className="space-y-3">
        {values.map((value, index) => (
          <div
            key={`${label}-${index}`}
            className="flex gap-2"
          >
            <span className="relative flex-1">
              <Icon
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(event) =>
                  onChange(
                    index,
                    event.target.value
                  )
                }
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
              />
            </span>

            <button
              type="button"
              onClick={() => onRemove(index)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
              aria-label={`Remover item ${index + 1}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusSwitch({
  active,
  onChange
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      className="flex h-11 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4"
    >
      <span>
        <strong className="block text-left text-sm text-slate-800">
          {active
            ? 'Usuário ativo'
            : 'Usuário inativo'}
        </strong>

        <span className="block text-left text-[10px] text-slate-400">
          {active
            ? 'Pode acessar o sistema'
            : 'Acesso temporariamente bloqueado'}
        </span>
      </span>

      <span
        className={[
          'relative h-6 w-11 rounded-full transition',
          active
            ? 'bg-emerald-600'
            : 'bg-slate-300'
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition',
            active ? 'left-6' : 'left-1'
          ].join(' ')}
        />
      </span>
    </button>
  );
}

function IntegrationCard({
  title,
  description,
  icon: Icon,
  connected,
  onToggle
}) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
          <Icon size={20} />
        </span>

        <div>
          <strong className="block text-sm text-slate-800">
            {title}
          </strong>

          <span className="mt-1 block text-xs text-slate-500 font-medium">
            {description}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className={[
          'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition',
          connected
            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            : 'bg-slate-950 text-white hover:bg-slate-800'
        ].join(' ')}
      >
        <Link2 size={16} />

        {connected
          ? 'Conectado'
          : 'Conectar'}
      </button>
    </div>
  );
}

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium'
  }).format(new Date(value));
}

export default UserEditorPage;
