import React, { useState, useEffect } from 'react';
import { X, Percent, DollarSign, Check } from 'lucide-react';
import { COMMERCIAL_CONDITION_TYPES } from '../data/commercialMock';

export function ConditionFormDrawer({ isOpen, onClose, onSave, editingCondition }) {
  const [form, setForm] = useState({
    nickname: '',
    type: COMMERCIAL_CONDITION_TYPES.PERCENTAGE,
    value: 10.0,
    creditCash: 1.5,
    creditInstallment: 1.35,
    pix: 0.95,
    anticipation: 0.25,
    international: 0.25,
    paymentTermDays: 10,
    status: 'active'
  });

  useEffect(() => {
    if (editingCondition) {
      setForm({
        nickname: editingCondition.nickname || '',
        type: editingCondition.type || COMMERCIAL_CONDITION_TYPES.PERCENTAGE,
        value: editingCondition.value || 10.0,
        creditCash: editingCondition.fees?.creditCash || 1.5,
        creditInstallment: editingCondition.fees?.creditInstallment || 1.35,
        pix: editingCondition.fees?.pix || 0.95,
        anticipation: editingCondition.fees?.anticipation || 0.25,
        international: editingCondition.fees?.international || 0.25,
        paymentTermDays: editingCondition.paymentTermDays || 10,
        status: editingCondition.status || 'active'
      });
    } else {
      setForm({
        nickname: '',
        type: COMMERCIAL_CONDITION_TYPES.PERCENTAGE,
        value: 10.0,
        creditCash: 1.5,
        creditInstallment: 1.35,
        pix: 0.95,
        anticipation: 0.25,
        international: 0.25,
        paymentTermDays: 10,
        status: 'active'
      });
    }
  }, [editingCondition, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nickname) return;

    const payload = {
      id: editingCondition?.id || `condition-${Math.floor(100 + Math.random() * 900)}`,
      nickname: form.nickname,
      type: form.type,
      value: Number(form.value),
      status: form.status,
      fees: {
        creditCash: Number(form.creditCash),
        creditInstallment: Number(form.creditInstallment),
        pix: Number(form.pix),
        anticipation: Number(form.anticipation),
        international: Number(form.international)
      },
      paymentTermDays: Number(form.paymentTermDays),
      updatedAt: new Date().toISOString(),
      createdAt: editingCondition?.createdAt || new Date().toISOString()
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
              <Percent size={19} />
            </span>
            <div>
              <h2 className="font-black text-slate-900">
                {editingCondition ? 'Editar Condição Comercial' : 'Nova Condição Comercial'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">Defina comissões, taxas e prazos de repasse.</p>
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Apelido / Nome da Condição *</label>
              <input
                type="text"
                required
                value={form.nickname}
                onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                placeholder="Ex: Padrão 10% ou Parceiro Premium"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Cobrança</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500"
                >
                  <option value="percentage">Porcentagem (%)</option>
                  <option value="fixed_value">Valor Fixo (R$)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Valor / Taxa Base ({form.type === 'percentage' ? '%' : 'R$'}) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Taxas de Meios de Pagamento (%)</h3>

              <div className="grid grid-cols-2 gap-3 text-xs font-medium">
                <div>
                  <span className="text-slate-600">Crédito à Vista (%)</span>
                  <input
                    type="number"
                    step="0.01"
                    value={form.creditCash}
                    onChange={(e) => setForm({ ...form, creditCash: e.target.value })}
                    className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <span className="text-slate-600">Crédito Parcelado (%)</span>
                  <input
                    type="number"
                    step="0.01"
                    value={form.creditInstallment}
                    onChange={(e) => setForm({ ...form, creditInstallment: e.target.value })}
                    className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <span className="text-slate-600">Taxa PIX (%)</span>
                  <input
                    type="number"
                    step="0.01"
                    value={form.pix}
                    onChange={(e) => setForm({ ...form, pix: e.target.value })}
                    className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <span className="text-slate-600">Antecipação (%)</span>
                  <input
                    type="number"
                    step="0.01"
                    value={form.anticipation}
                    onChange={(e) => setForm({ ...form, anticipation: e.target.value })}
                    className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 font-bold text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Prazo de Pagamento (dias)</label>
                <input
                  type="number"
                  value={form.paymentTermDays}
                  onChange={(e) => setForm({ ...form, paymentTermDays: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-900 outline-none focus:border-emerald-500"
                />
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
              {editingCondition ? 'Salvar Alterações' : 'Criar Condição'}
            </button>
          </footer>
        </form>
      </aside>
    </>
  );
}

export default ConditionFormDrawer;
