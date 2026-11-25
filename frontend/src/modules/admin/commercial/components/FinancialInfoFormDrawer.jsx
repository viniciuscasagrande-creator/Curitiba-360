import React, { useState, useEffect } from 'react';
import { X, Landmark, Check } from 'lucide-react';

export function FinancialInfoFormDrawer({ isOpen, onClose, onSave, editingItem }) {
  const [form, setForm] = useState({
    name: '',
    paymentFrequency: 'biweekly',
    paymentTermDays: 15,
    paymentMethod: 'pix',
    bankAccount: '',
    pixKey: '',
    responsibleName: '',
    description: '',
    status: 'active'
  });

  useEffect(() => {
    if (editingItem) {
      setForm({
        name: editingItem.name || '',
        paymentFrequency: editingItem.paymentFrequency || 'biweekly',
        paymentTermDays: editingItem.paymentTermDays || 15,
        paymentMethod: editingItem.paymentMethod || 'pix',
        bankAccount: editingItem.bankAccount || '',
        pixKey: editingItem.pixKey || '',
        responsibleName: editingItem.responsibleName || '',
        description: editingItem.description || '',
        status: editingItem.status || 'active'
      });
    } else {
      setForm({
        name: '',
        paymentFrequency: 'biweekly',
        paymentTermDays: 15,
        paymentMethod: 'pix',
        bankAccount: '',
        pixKey: '',
        responsibleName: '',
        description: '',
        status: 'active'
      });
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return;

    const payload = {
      id: editingItem?.id || `financial-${Math.floor(100 + Math.random() * 900)}`,
      name: form.name,
      paymentFrequency: form.paymentFrequency,
      paymentTermDays: Number(form.paymentTermDays),
      paymentMethod: form.paymentMethod,
      bankAccount: form.bankAccount,
      pixKey: form.pixKey,
      responsibleName: form.responsibleName,
      description: form.description,
      status: form.status
    };

    onSave(payload);
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-xs transition-opacity"
      />

      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-slate-200 bg-white shadow-2xl text-left">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Landmark size={19} />
            </span>
            <div>
              <h2 className="font-black text-slate-900">
                {editingItem ? 'Editar Informação Financeira' : 'Nova Informação Financeira'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">Configure periodicidade, repasses e dados bancários.</p>
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

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nome / Identificador do Repasse *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Repasse Quinzenal Padrão"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Periodicidade</label>
                <select
                  value={form.paymentFrequency}
                  onChange={(e) => setForm({ ...form, paymentFrequency: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500"
                >
                  <option value="weekly">Semanal</option>
                  <option value="biweekly">Quinzenal</option>
                  <option value="monthly">Mensal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Prazo de Pagamento (dias)</label>
                <input
                  type="number"
                  value={form.paymentTermDays}
                  onChange={(e) => setForm({ ...form, paymentTermDays: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Método de Repasse</label>
                <select
                  value={form.paymentMethod}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500"
                >
                  <option value="pix">PIX Instantâneo</option>
                  <option value="ted">Transferência TED</option>
                  <option value="boleto">Boleto Bancário</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chave PIX Oficial</label>
              <input
                type="text"
                value={form.pixKey}
                onChange={(e) => setForm({ ...form, pixKey: e.target.value })}
                placeholder="CNPJ, E-mail ou Chave Aleatória"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-mono font-medium outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Dados Bancários / Conta</label>
              <input
                type="text"
                value={form.bankAccount}
                onChange={(e) => setForm({ ...form, bankAccount: e.target.value })}
                placeholder="Ex: Banco do Brasil - Ag: 1234-5 / C: 98765-4"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Responsável Financeiro</label>
              <input
                type="text"
                value={form.responsibleName}
                onChange={(e) => setForm({ ...form, responsibleName: e.target.value })}
                placeholder="Ex: Carlos Eduardo Santos"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Descrição das Regras de Repasse</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <footer className="flex gap-3 border-t border-slate-200 p-6 bg-slate-50/80">
            <button
              type="button"
              onClick={onClose}
              className="h-11 flex-1 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-sm font-bold text-white hover:bg-emerald-700"
            >
              <Check size={17} />
              {editingItem ? 'Salvar Alterações' : 'Criar Informação'}
            </button>
          </footer>
        </form>
      </aside>
    </>
  );
}

export default FinancialInfoFormDrawer;
