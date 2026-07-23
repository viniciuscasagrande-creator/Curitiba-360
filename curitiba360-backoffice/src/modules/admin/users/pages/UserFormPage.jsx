import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  Mail,
  Phone,
  Shield,
  Building2,
  UserCheck,
  KeyRound,
  BarChart3,
  Check,
  Camera,
  RotateCcw,
  Link2,
  AlertCircle
} from 'lucide-react';

import AdminPageHeader from '../../../../components/admin/AdminPageHeader';
import PageContainer from '../../../../components/admin/PageContainer';
import { ROUTES } from '../../../../routes/routePaths';
import { usersMock } from '../data/usersMock';

const USER_PROFILE_OPTIONS = [
  { value: 'administrator', label: 'Administrador' },
  { value: 'manager', label: 'Gestor' },
  { value: 'financial', label: 'Financeiro' },
  { value: 'operator', label: 'Operador' },
  { value: 'check_in', label: 'Check-in' },
  { value: 'commercial_partner', label: 'Parceiro Comercial' }
];

const emptyFormState = {
  id: '',
  personal: {
    photoUrl: '',
    firstName: '',
    lastName: '',
    document: '',
    emails: [''],
    phones: [''],
    language: 'pt-BR'
  },
  access: {
    role: 'operator',
    status: 'active',
    createdAt: new Date().toISOString(),
    lastLoginAt: null,
    twoFactorEnabled: false
  },
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
    stateRegistrationExempt: true
  },
  integrations: {
    googleAnalytics: {
      connected: false,
      accountId: ''
    }
  }
};

export function UserFormPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(userId && userId !== 'novo');

  const [form, setForm] = useState(emptyFormState);
  const [saved, setSaved] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const found = usersMock.find((u) => u.id === userId);
      if (found) {
        setForm({
          id: found.id,
          personal: {
            photoUrl: '',
            firstName: found.firstName || '',
            lastName: found.lastName || '',
            document: found.document || '',
            emails: [found.email || ''],
            phones: [found.phone || ''],
            language: 'pt-BR'
          },
          access: {
            role: found.role === 'partner' ? 'commercial_partner' : found.role,
            status: found.status || 'active',
            createdAt: found.createdAt || new Date().toISOString(),
            lastLoginAt: found.lastLoginAt || null,
            twoFactorEnabled: found.twoFactorEnabled || false
          },
          manager: {
            firstName: found.firstName || '',
            lastName: found.lastName || '',
            emails: [found.email || ''],
            phones: [found.phone || '']
          },
          company: {
            legalName: found.company ? `${found.company} Ltda` : '',
            tradeName: found.company || '',
            cnpj: '72.096.639/0001-23',
            stateRegistration: '',
            stateRegistrationExempt: true
          },
          integrations: {
            googleAnalytics: {
              connected: true,
              accountId: 'UA-99887766-1'
            }
          }
        });
      }
    }
  }, [userId, isEditing]);

  const isCommercialPartner = form.access.role === 'commercial_partner';

  // Dynamic Array Handlers
  const handleAddEmail = () => {
    setForm((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        emails: [...prev.personal.emails, '']
      }
    }));
  };

  const handleUpdateEmail = (index, value) => {
    const nextEmails = [...form.personal.emails];
    nextEmails[index] = value;
    setForm((prev) => ({
      ...prev,
      personal: { ...prev.personal, emails: nextEmails }
    }));
  };

  const handleRemoveEmail = (index) => {
    if (form.personal.emails.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        emails: prev.personal.emails.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddPhone = () => {
    setForm((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        phones: [...prev.personal.phones, '']
      }
    }));
  };

  const handleUpdatePhone = (index, value) => {
    const nextPhones = [...form.personal.phones];
    nextPhones[index] = value;
    setForm((prev) => ({
      ...prev,
      personal: { ...prev.personal, phones: nextPhones }
    }));
  };

  const handleRemovePhone = (index) => {
    if (form.personal.phones.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        phones: prev.personal.phones.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      navigate(ROUTES.admin.users);
    }, 800);
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-5xl mx-auto">
        {/* Header with Back, Discard and Save Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(ROUTES.admin.users)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition shadow-xs"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
                Administração &bull; ADM-USR-002
              </p>
              <h1 className="text-2xl font-black tracking-tight text-slate-950">
                {isEditing ? `Editar Usuário #${userId}` : 'Novo Usuário do Backoffice'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(ROUTES.admin.users)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              Descartar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
            >
              {saved ? <Check size={16} /> : <Save size={16} />}
              {saved ? 'Salvo com sucesso!' : 'Salvar Usuário'}
            </button>
          </div>
        </div>

        {/* Section 1: Dados Pessoais */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-950 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                👤
              </span>
              Dados Pessoais
            </h2>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-slate-100 bg-emerald-50 font-black text-emerald-800 text-2xl shadow-xs">
              {form.personal.firstName ? form.personal.firstName.charAt(0) : '?'}
              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white shadow-md hover:bg-emerald-600 transition"
              >
                <Camera size={14} />
              </button>
            </div>

            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primeiro Nome *</label>
                <input
                  type="text"
                  required
                  value={form.personal.firstName}
                  onChange={(e) => setForm({ ...form, personal: { ...form.personal, firstName: e.target.value } })}
                  placeholder="Ex: João"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sobrenome</label>
                <input
                  type="text"
                  value={form.personal.lastName}
                  onChange={(e) => setForm({ ...form, personal: { ...form.personal, lastName: e.target.value } })}
                  placeholder="Ex: da Silva"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">CPF / CNPJ</label>
                <input
                  type="text"
                  value={form.personal.document}
                  onChange={(e) => setForm({ ...form, personal: { ...form.personal, document: e.target.value } })}
                  placeholder="000.000.000-00"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-mono font-medium outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Idioma Padrão</label>
                <select
                  value={form.personal.language}
                  onChange={(e) => setForm({ ...form, personal: { ...form.personal, language: e.target.value } })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Contato (E-mails & Telefones dinâmicos) */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-950 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <Mail size={16} />
              </span>
              Canais de Contato
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Dynamic Emails */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">E-mails de Acesso & Comunicação</label>
                <button
                  type="button"
                  onClick={handleAddEmail}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  <Plus size={14} /> Adicionar outro e-mail
                </button>
              </div>

              {form.personal.emails.map((email, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="email"
                    required={idx === 0}
                    value={email}
                    onChange={(e) => handleUpdateEmail(idx, e.target.value)}
                    placeholder={idx === 0 ? "email.principal@empresa.com" : "email.adicional@empresa.com"}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:bg-white"
                  />
                  {form.personal.emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(idx)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Dynamic Phones */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Telefones / WhatsApp</label>
                <button
                  type="button"
                  onClick={handleAddPhone}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  <Plus size={14} /> Adicionar outro telefone
                </button>
              </div>

              {form.personal.phones.map((phone, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => handleUpdatePhone(idx, e.target.value)}
                    placeholder="(41) 99999-0000"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:bg-white"
                  />
                  {form.personal.phones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhone(idx)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Acesso, Perfil & Segurança */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-base font-black text-slate-950 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <Shield size={16} />
              </span>
              Perfil de Acesso & Segurança
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Perfil de Usuário (Role) *</label>
              <select
                value={form.access.role}
                onChange={(e) => setForm({ ...form, access: { ...form.access, role: e.target.value } })}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-900 outline-none focus:border-emerald-500"
              >
                {USER_PROFILE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
                {isCommercialPartner
                  ? '⚠️ O perfil Parceiro Comercial ativa os blocos de Gestor, Empresa e Integrações da Conta.'
                  : 'Define as permissões operacionais do usuário dentro do Backoffice.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Status da Conta</label>
              <select
                value={form.access.status}
                onChange={(e) => setForm({ ...form, access: { ...form.access, status: e.target.value } })}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-900 outline-none focus:border-emerald-500"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="pending">Convite Pendente</option>
                <option value="blocked">Bloqueado</option>
              </select>
            </div>
          </div>

          {/* Password Reset Card */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700">
                <KeyRound size={18} />
              </span>
              <div>
                <strong className="block text-sm font-bold text-slate-900">Segurança da Senha</strong>
                <span className="text-xs text-slate-500">
                  {passwordResetSent
                    ? 'E-mail de redefinição enviado para o endereço principal!'
                    : 'A senha atual não é legível por administradores. Envie um e-mail de redefinição.'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPasswordResetSent(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-xs"
            >
              <RotateCcw size={14} />
              {passwordResetSent ? 'Reenviar Redefinição' : 'Enviar Redefinição de Senha'}
            </button>
          </div>
        </section>

        {/* Dynamic CONDITIONAL Sections for Commercial Partner */}
        {isCommercialPartner && (
          <>
            {/* Section 4: Gestor Responsável */}
            <section className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
                <h2 className="text-base font-black text-slate-950 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                    👔
                  </span>
                  Gestor Responsável (Exclusivo Parceiro Comercial)
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Gestor</label>
                  <input
                    type="text"
                    value={form.manager.firstName}
                    onChange={(e) => setForm({ ...form, manager: { ...form.manager, firstName: e.target.value } })}
                    placeholder="Ex: Carlos"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sobrenome do Gestor</label>
                  <input
                    type="text"
                    value={form.manager.lastName}
                    onChange={(e) => setForm({ ...form, manager: { ...form.manager, lastName: e.target.value } })}
                    placeholder="Ex: Eduardo"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </section>

            {/* Section 5: Dados da Empresa */}
            <section className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
                <h2 className="text-base font-black text-slate-950 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                    <Building2 size={16} />
                  </span>
                  Dados da Empresa (Exclusivo Parceiro Comercial)
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Razão Social *</label>
                  <input
                    type="text"
                    value={form.company.legalName}
                    onChange={(e) => setForm({ ...form, company: { ...form.company, legalName: e.target.value } })}
                    placeholder="Ex: Instituto Jaime Lerner S/A"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome Fantasia *</label>
                  <input
                    type="text"
                    value={form.company.tradeName}
                    onChange={(e) => setForm({ ...form, company: { ...form.company, tradeName: e.target.value } })}
                    placeholder="Ex: Parque Jaime Lerner"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CNPJ da Empresa *</label>
                  <input
                    type="text"
                    value={form.company.cnpj}
                    onChange={(e) => setForm({ ...form, company: { ...form.company, cnpj: e.target.value } })}
                    placeholder="72.096.639/0001-23"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-mono font-medium outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inscrição Estadual</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      disabled={form.company.stateRegistrationExempt}
                      value={form.company.stateRegistration}
                      onChange={(e) => setForm({ ...form, company: { ...form.company, stateRegistration: e.target.value } })}
                      placeholder={form.company.stateRegistrationExempt ? "ISENTO" : "12345678-9"}
                      className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none disabled:bg-slate-100 disabled:text-slate-400"
                    />
                    <label className="flex items-center gap-1.5 shrink-0 px-3 border border-slate-200 bg-white rounded-2xl text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.company.stateRegistrationExempt}
                        onChange={(e) => setForm({ ...form, company: { ...form.company, stateRegistrationExempt: e.target.checked } })}
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      Isento
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Integrações */}
            <section className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
                <h2 className="text-base font-black text-slate-950 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                    <BarChart3 size={16} />
                  </span>
                  Integrações da Conta (Exclusivo Parceiro Comercial)
                </h2>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                    <BarChart3 size={20} />
                  </span>
                  <div>
                    <strong className="block text-sm font-bold text-slate-900">Google Analytics 4 (GA4)</strong>
                    <span className="text-xs text-slate-500">Métricas de tráfego e conversão de vendas da atração</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${form.integrations.googleAnalytics.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                    <Link2 size={12} />
                    {form.integrations.googleAnalytics.connected ? 'Conectado' : 'Desconectado'}
                  </span>

                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({
                      ...prev,
                      integrations: {
                        googleAnalytics: {
                          ...prev.integrations.googleAnalytics,
                          connected: !prev.integrations.googleAnalytics.connected
                        }
                      }
                    }))}
                    className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    {form.integrations.googleAnalytics.connected ? 'Desconectar' : 'Conectar Conta'}
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={() => navigate(ROUTES.admin.users)}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            Descartar Alterações
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
          >
            {saved ? <Check size={16} /> : <Save size={16} />}
            {saved ? 'Salvo com sucesso!' : 'Salvar Usuário'}
          </button>
        </div>
      </form>
    </PageContainer>
  );
}

export default UserFormPage;
