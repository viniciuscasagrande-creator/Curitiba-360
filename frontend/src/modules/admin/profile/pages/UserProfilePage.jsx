import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Lock,
  Globe,
  Plus,
  Save,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Camera,
  Key,
  Smartphone,
  Cpu,
  Sliders,
  DollarSign
} from 'lucide-react';

import AdminPageHeader from '../../../../components/admin/AdminPageHeader';
import PageContainer from '../../../../components/admin/PageContainer';
import KpiCard from '../../../../components/admin/KpiCard';
import { useAuth } from '../../../auth/hooks/useAuth';

export function UserProfilePage() {
  const { user } = useAuth();
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: user?.displayName?.split(' ')[0] || 'Carlos',
    lastName: user?.displayName?.split(' ').slice(1).join(' ') || 'Eduardo Silva',
    document: '123.456.789-00',
    primaryEmail: user?.email || 'operador@curitiba360.com.br',
    secondaryEmails: ['financeiro@curitiba360.com.br'],
    phone: '(41) 99884-1234',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo (UTC-3)',
    dateFormat: 'DD/MM/YYYY',
    currencyFormat: 'BRL (R$)',
    theme: 'system',
    // Integrations
    googleAnalyticsId: 'G-360CURITIBA',
    metaPixelId: '1092837465',
    firebaseProjectId: 'curitiba360-enterprise',
    mercadoPagoToken: 'APP_USR-7890123-RELEASE',
    pixKey: '12.345.678/0001-90',
    whatsappApiNumber: '+5541998841234'
  });

  const [newEmailInput, setNewEmailInput] = useState('');

  const handleAddEmail = () => {
    if (!newEmailInput.trim() || !newEmailInput.includes('@')) return;
    setFormData((prev) => ({
      ...prev,
      secondaryEmails: [...prev.secondaryEmails, newEmailInput.trim()]
    }));
    setNewEmailInput('');
  };

  const handleRemoveEmail = (index) => {
    setFormData((prev) => ({
      ...prev,
      secondaryEmails: prev.secondaryEmails.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setToastMessage('Alterações salvas com sucesso no perfil!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <PageContainer>
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-xl animate-bounce">
          <CheckCircle2 size={16} />
          {toastMessage}
        </div>
      )}

      {/* Page Header */}
      <AdminPageHeader
        breadcrumbItems={[
          { label: 'Minha Conta', path: '/admin/perfil' },
          { label: 'Perfil & Configurações' }
        ]}
        icon="👤"
        title="Minha Conta"
        description="Gerencie suas informações pessoais, credenciais, segurança, preferências e integrações."
        actions={
          <>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
            >
              <Save size={15} />
              Salvar Alterações
            </button>
          </>
        }
      />

      {/* Account Overview KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard
          title="Status da Conta"
          value="Ativa (Operador)"
          subtext="Permissão Administrador Master"
          change="Verificado"
          type="positive"
          icon={ShieldCheck}
        />
        <KpiCard
          title="Nível de Segurança"
          value="Forte (2FA Ativo)"
          subtext="Autenticação em 2 etapas"
          change="Protegido"
          type="positive"
          icon={Lock}
        />
        <KpiCard
          title="Integrações Conectadas"
          value="5 de 6 Ativas"
          subtext="Firebase, Mercado Pago, PIX"
          change="Operacional"
          type="positive"
          icon={Cpu}
        />
      </div>

      {/* Profile Cards Form */}
      <form onSubmit={handleSave} className="space-y-6 text-left">
        {/* CARD 1: Dados Pessoais & Foto */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-950">Dados Pessoais</h3>
            <p className="text-xs text-slate-500 font-medium">Informações básicas da sua conta de operador.</p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar Uploader */}
            <div className="relative group flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-3xl font-black text-white shadow-md">
              {user?.displayName?.charAt(0) || 'C'}
              <button
                type="button"
                onClick={() => alert('Selecionar imagem de perfil...')}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition text-[10px] font-bold"
              >
                <Camera size={18} className="mb-1" />
                Alterar Foto
              </button>
            </div>

            {/* Fields */}
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Sobrenome
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  CPF / CNPJ
                </label>
                <input
                  type="text"
                  value={formData.document}
                  onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-mono font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: Contato & Múltiplos E-mails */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-950">Contato & Comunicação</h3>
            <p className="text-xs text-slate-500 font-medium">Canais para alertas operacionais e relatórios.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                E-mail Principal (Login)
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={formData.primaryEmail}
                  onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Telefone / WhatsApp
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Múltiplos E-mails Reutilizável */}
          <div className="pt-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              E-mails Secundários para Notificações Financeiras
            </label>

            <div className="space-y-2">
              {formData.secondaryEmails.map((email, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-xs font-bold text-slate-800">{email}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(idx)}
                    className="text-slate-400 hover:text-rose-600 transition p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={newEmailInput}
                  onChange={(e) => setNewEmailInput(e.target.value)}
                  placeholder="Adicionar novo e-mail..."
                  className="h-9 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleAddEmail}
                  className="flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
                >
                  <Plus size={14} />
                  Adicionar outro e-mail
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Preferências & Localização */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-950">Preferências Operacionais & Região</h3>
            <p className="text-xs text-slate-500 font-medium">Idioma, fuso horário e exibição de valores.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Idioma
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (United States)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Fuso Horário
              </label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500"
              >
                <option value="America/Sao_Paulo (UTC-3)">America/Sao_Paulo (UTC-3)</option>
                <option value="UTC">UTC (Tempo Universal)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Formato de Data
              </label>
              <select
                value={formData.dateFormat}
                onChange={(e) => setFormData({ ...formData, dateFormat: e.target.value })}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY (23/07/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (2026-07-23)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Tema de Cores
              </label>
              <select
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500"
              >
                <option value="system">Modo Sistema (Auto)</option>
                <option value="light">Modo Claro Operacional</option>
                <option value="dark">Modo Escuro (Dark)</option>
              </select>
            </div>
          </div>
        </div>

        {/* CARD 4: Integrações & Conexões */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-950">Integrações & Chaves de API</h3>
            <p className="text-xs text-slate-500 font-medium">Conectores com Google, Meta, Firebase e Gateways.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Google Analytics ID
              </label>
              <input
                type="text"
                value={formData.googleAnalyticsId}
                onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-mono font-bold text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Meta Pixel ID
              </label>
              <input
                type="text"
                value={formData.metaPixelId}
                onChange={(e) => setFormData({ ...formData, metaPixelId: e.target.value })}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-mono font-bold text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Firebase Project ID
              </label>
              <input
                type="text"
                value={formData.firebaseProjectId}
                onChange={(e) => setFormData({ ...formData, firebaseProjectId: e.target.value })}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-mono font-bold text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Mercado Pago Token
              </label>
              <input
                type="password"
                value={formData.mercadoPagoToken}
                onChange={(e) => setFormData({ ...formData, mercadoPagoToken: e.target.value })}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-mono font-bold text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Chave PIX Oficial Repasse
              </label>
              <input
                type="text"
                value={formData.pixKey}
                onChange={(e) => setFormData({ ...formData, pixKey: e.target.value })}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-mono font-bold text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                WhatsApp API Notificações
              </label>
              <input
                type="text"
                value={formData.whatsappApiNumber}
                onChange={(e) => setFormData({ ...formData, whatsappApiNumber: e.target.value })}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-mono font-bold text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* CARD 5: Segurança & Autenticação */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-950">Segurança & Autenticação</h3>
            <p className="text-xs text-slate-500 font-medium">Controle de credenciais, senha e segundo fator.</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-slate-50 p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Key size={18} />
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Alterar Senha de Acesso</h4>
                <p className="text-[11px] text-slate-500">Última alteração há 45 dias.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert('Solicitar redefinição de senha via e-mail')}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 transition shadow-xs"
            >
              Redefinir Senha
            </button>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-emerald-50 p-4 border border-emerald-200">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Smartphone size={18} />
              </span>
              <div>
                <h4 className="text-xs font-bold text-emerald-950">Autenticação em Duas Etapas (2FA)</h4>
                <p className="text-[11px] text-emerald-700">Proteção ativa por aplicativo autenticador.</p>
              </div>
            </div>

            <span className="inline-flex rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold text-white">
              Habilitado
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
          >
            <Save size={15} />
            Salvar Alterações do Perfil
          </button>
        </div>
      </form>
    </PageContainer>
  );
}

export default UserProfilePage;
