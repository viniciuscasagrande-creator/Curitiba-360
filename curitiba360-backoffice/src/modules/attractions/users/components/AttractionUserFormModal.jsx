import React, { useState } from 'react';
import {
  X,
  Upload,
  Trash2,
  KeyRound,
  Check,
  User,
  Mail,
  Phone,
  FileText,
  Building,
  ShieldCheck,
  Globe,
  Lock
} from 'lucide-react';
import { USER_ROLES } from '../data/attractionUsersMock';

export function AttractionUserFormModal({ user, mode = 'create', attractionName = 'Parque Jaime Lerner', onClose, onSave }) {
  const [form, setForm] = useState({
    firstName: user?.firstName || (user?.name ? user.name.split(' ')[0] : ''),
    lastName: user?.lastName || (user?.name ? user.name.split(' ').slice(1).join(' ') : ''),
    email: user?.email || '',
    document: user?.document || '',
    phone: user?.phone || '',
    role: user?.role || 'Editor',
    defaultLanguage: user?.defaultLanguage || 'pt-BR',
    status: user?.status || 'active',
    avatar: user?.avatar || null,
    password: ''
  });

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [resetMessage, setResetMessage] = useState('');
  const [errors, setErrors] = useState({});

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('A foto deve ter no máximo 15 MB.');
      return;
    }

    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      alert('Formato inválido. Selecione uma imagem PNG ou JPEG.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function handleRemoveAvatar() {
    setAvatarPreview(null);
    setForm((prev) => ({ ...prev, avatar: null }));
  }

  function handleResetPassword() {
    if (!form.email) {
      alert('Informe o e-mail do usuário para enviar o link de redefinição.');
      return;
    }
    setResetMessage(`E-mail de redefinição de senha enviado para ${form.email}!`);
  }

  function formatCPFOrCNPJ(value) {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 11) {
      return digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  }

  function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 10) {
      return digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = 'Informe o primeiro nome.';
    if (!form.lastName.trim()) nextErrors.lastName = 'Informe o último nome.';
    if (!form.email.trim() || !form.email.includes('@')) nextErrors.email = 'Informe um e-mail válido.';
    if (!form.document.trim()) nextErrors.document = 'Informe o CPF ou CNPJ.';
    if (mode === 'create' && !form.password) nextErrors.password = 'Defina uma senha inicial.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      ...user,
      ...form,
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      attractionName,
      createdAt: user?.createdAt || new Date().toISOString(),
      lastLogin: user?.lastLogin || 'Nunca acessou'
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-xs text-left animate-fade-in">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/50 bg-white shadow-2xl">
        {/* Cabeçalho */}
        <header className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              {mode === 'create' ? 'Novo Usuário da Atração' : 'Editar Usuário da Atração'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure as permissões de acesso e dados cadastrais do membro da equipe.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
          >
            <X size={18} />
          </button>
        </header>

        {/* Formulário Scrollável */}
        <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto p-6 space-y-6">
          {/* Sessão Foto de Perfil */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white text-slate-400 overflow-hidden shadow-xs">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <User size={32} />
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-black text-slate-800 block">Foto de perfil</span>
              <p className="text-[11px] text-slate-500">Aceita arquivos PNG ou JPEG até 15 MB.</p>
              <div className="flex flex-wrap gap-2">
                <label className="inline-flex h-9 items-center gap-2 rounded-xl bg-slate-900 px-3 text-xs font-bold text-white cursor-pointer hover:bg-slate-800 transition">
                  <Upload size={14} />
                  Carregar nova foto
                  <input type="file" accept="image/png, image/jpeg" onChange={handleAvatarChange} className="hidden" />
                </label>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 text-xs font-bold text-rose-600 hover:bg-rose-100 transition"
                  >
                    <Trash2 size={14} />
                    Apagar foto
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Grid de Campos */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Atração (Read Only) */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">Atração Vinculada</label>
              <div className="flex h-11 w-full items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-100 px-4 text-xs font-extrabold text-slate-600">
                <Building size={16} className="text-slate-400" />
                {attractionName}
              </div>
            </div>

            {/* Perfil */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">Perfil de Acesso *</label>
              <div className="relative">
                <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={form.role}
                  onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                >
                  {USER_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Primeiro Nome */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">Primeiro Nome *</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                placeholder="Ex: Carlos"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500"
              />
              {errors.firstName && <span className="mt-1 text-[10px] font-bold text-rose-500 block">{errors.firstName}</span>}
            </div>

            {/* Último Nome */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">Último Nome *</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                placeholder="Ex: Eduardo"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500"
              />
              {errors.lastName && <span className="mt-1 text-[10px] font-bold text-rose-500 block">{errors.lastName}</span>}
            </div>

            {/* CPF / CNPJ */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">CPF ou CNPJ *</label>
              <div className="relative">
                <FileText size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={form.document}
                  onChange={(e) => setForm((prev) => ({ ...prev, document: formatCPFOrCNPJ(e.target.value) }))}
                  placeholder="000.000.000-00"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>
              {errors.document && <span className="mt-1 text-[10px] font-bold text-rose-500 block">{errors.document}</span>}
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">E-mail de Acesso *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="usuario@exemplo.com.br"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>
              {errors.email && <span className="mt-1 text-[10px] font-bold text-rose-500 block">{errors.email}</span>}
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">Telefone / Celular</label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: formatPhone(e.target.value) }))}
                  placeholder="(41) 99999-9999"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Idioma Padrão */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">Idioma Padrão</label>
              <div className="relative">
                <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={form.defaultLanguage}
                  onChange={(e) => setForm((prev) => ({ ...prev, defaultLanguage: e.target.value }))}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
            </div>
          </div>

          {/* Senha & Reset de Senha */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-900 flex items-center gap-2">
                <Lock size={15} className="text-amber-600" />
                Credenciais e Segurança
              </span>
              {mode === 'edit' && (
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 text-xs font-bold text-amber-800 hover:bg-amber-100 transition shadow-2xs"
                >
                  <KeyRound size={14} />
                  Resetar Senha
                </button>
              )}
            </div>

            {mode === 'create' ? (
              <div>
                <label className="block text-[11px] font-bold text-amber-900 mb-1">Senha Inicial *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  className="h-10 w-full rounded-xl border border-amber-300 bg-white px-3 text-xs font-semibold text-slate-800 outline-none focus:border-amber-500"
                />
                {errors.password && <span className="mt-1 text-[10px] font-bold text-rose-600 block">{errors.password}</span>}
              </div>
            ) : (
              <p className="text-[11px] text-amber-800 font-medium">
                Por motivos de segurança, a senha atual é protegida. Utilize o botão <strong>Resetar Senha</strong> para enviar um link de alteração por e-mail.
              </p>
            )}

            {resetMessage && (
              <p className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                {resetMessage}
              </p>
            )}
          </div>

          {/* Somente Leitura (Data de Criação & Último Login) */}
          {mode === 'edit' && (
            <div className="grid gap-4 sm:grid-cols-2 p-4 rounded-2xl bg-slate-100/70 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Data de Criação</span>
                <span className="font-extrabold text-slate-700">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleString('pt-BR') : 'Indisponível'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Último Acesso</span>
                <span className="font-extrabold text-slate-700">
                  {user?.lastLogin && user.lastLogin !== 'Nunca acessou'
                    ? new Date(user.lastLogin).toLocaleString('pt-BR')
                    : 'Nunca acessou'}
                </span>
              </div>
            </div>
          )}

          {/* Status Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-white">
            <div>
              <span className="text-xs font-black text-slate-900 block">Status da Conta</span>
              <p className="text-[11px] text-slate-500">Usuários inativos perdem o acesso imediato ao painel.</p>
            </div>
            <select
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
              className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-extrabold text-slate-800 outline-none focus:border-emerald-500"
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </form>

        {/* Rodapé */}
        <footer className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-5 text-xs font-black text-slate-600 hover:bg-slate-100 transition"
          >
            Descartar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-6 text-xs font-black text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
          >
            <Check size={16} />
            {mode === 'create' ? 'Salvar Usuário' : 'Salvar Alterações'}
          </button>
        </footer>
      </div>
    </div>
  );
}

export default AttractionUserFormModal;
