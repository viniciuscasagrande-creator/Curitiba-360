import React, { useState } from 'react';
import { X, Tag, Users, Building2, Calendar, DollarSign, Percent, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export function CouponFormDrawer({ isOpen, onClose, onSave, type = 'user', initialData = null }) {
  if (!isOpen) return null;

  const isAgency = type === 'agency';

  const [formData, setFormData] = useState(initialData || {
    name: isAgency ? 'CWB-AGENCIA-VIP' : 'CURITIBA10',
    targetEntity: isAgency ? 'Agência CWB Tour' : 'Todos os Usuários',
    discountType: 'percent',
    discountPercent: '10',
    discountValue: '0',
    quantity: '100',
    showOnCheckout: true,
    startDate: '2026-07-01',
    endDate: '2026-12-31',
    applicableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    categories: ['Todas as categorias'],
    status: 'active',
    limitPerCustomer: '1',
    limitPerCpf: '1',
    minOrderValue: '30.00',
    maxDiscountAmount: '50.00',
    dailyLimit: '20'
  });

  const weekDaysList = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  function toggleDay(day) {
    setFormData((current) => {
      const days = current.applicableDays.includes(day)
        ? current.applicableDays.filter((d) => d !== day)
        : [...current.applicableDays, day];
      return { ...current, applicableDays: days };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...formData,
        id: initialData?.id || `cup-${Date.now()}`,
        type
      });
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs transition-opacity animate-fade-in text-left">
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {isAgency ? <Building2 size={20} /> : <Tag size={20} />}
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isAgency ? 'WF-024 • Cupom para Agência Comercial' : 'WF-023 • Novo Cupom Promocional'}
              </p>
              <h2 className="text-lg font-black tracking-tight text-white">
                {isAgency ? 'Cadastrar Cupom Agência' : 'Cadastrar Cupom de Desconto'}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form id="coupon-form" onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Main Info */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Identificação</span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Código do Cupom *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
                  placeholder="Ex: PROMO2026"
                  className="w-full rounded-2xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-emerald-700 uppercase outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  {isAgency ? 'Agência Comercial *' : 'Usuário / Destinatário *'}
                </label>
                {isAgency ? (
                  <select
                    value={formData.targetEntity}
                    onChange={(e) => setFormData({ ...formData, targetEntity: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                  >
                    <option value="Agência CWB Tour">Agência CWB Tour</option>
                    <option value="Curitiba Receptivo LTDA">Curitiba Receptivo LTDA</option>
                    <option value="Paraná Turismo Operadora">Paraná Turismo Operadora</option>
                    <option value="Todas as Agências Parceiras">Todas as Agências Parceiras</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    required
                    value={formData.targetEntity}
                    onChange={(e) => setFormData({ ...formData, targetEntity: e.target.value })}
                    placeholder="Ex: Todos os Usuários ou email específico"
                    className="w-full rounded-2xl border border-slate-200 bg-white p-2.5 text-xs font-medium outline-none focus:border-emerald-500"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Discount Rules */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Regra de Desconto</span>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Tipo de Desconto</label>
                <select
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white p-2.5 text-xs font-bold outline-none focus:border-emerald-500"
                >
                  <option value="percent">Porcentagem (%)</option>
                  <option value="fixed">Valor Fixo (R$)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  {formData.discountType === 'percent' ? 'Desconto (%) *' : 'Desconto (R$) *'}
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.discountType === 'percent' ? formData.discountPercent : formData.discountValue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [formData.discountType === 'percent' ? 'discountPercent' : 'discountValue']: e.target.value
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Qtd. Emitida Total *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white p-2.5 text-xs font-bold outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Display toggle */}
            <div className="flex items-center justify-between border-t border-slate-200/80 pt-3">
              <span className="font-bold text-slate-700 text-xs">Exibir no Checkout / Vitrine</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showOnCheckout}
                  onChange={(e) => setFormData({ ...formData, showOnCheckout: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          {/* Business Rules & Controls (User Enhancements) */}
          <div className="space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" />
              Limites & Controles de Segurança
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Limite por Cliente</label>
                <input
                  type="number"
                  value={formData.limitPerCustomer}
                  onChange={(e) => setFormData({ ...formData, limitPerCustomer: e.target.value })}
                  placeholder="Ex: 1"
                  className="w-full rounded-2xl border border-slate-200 bg-white p-2 text-xs font-bold outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Limite por CPF</label>
                <input
                  type="number"
                  value={formData.limitPerCpf}
                  onChange={(e) => setFormData({ ...formData, limitPerCpf: e.target.value })}
                  placeholder="Ex: 1"
                  className="w-full rounded-2xl border border-slate-200 bg-white p-2 text-xs font-bold outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Valor Mínimo do Pedido (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.minOrderValue}
                  onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                  placeholder="Ex: 50.00"
                  className="w-full rounded-2xl border border-slate-200 bg-white p-2 text-xs font-bold outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Desconto Máx. Teto (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.maxDiscountAmount}
                  onChange={(e) => setFormData({ ...formData, maxDiscountAmount: e.target.value })}
                  placeholder="Ex: 100.00"
                  className="w-full rounded-2xl border border-slate-200 bg-white p-2 text-xs font-bold outline-none focus:border-emerald-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Limite Diário de Utilizações</label>
                <input
                  type="number"
                  value={formData.dailyLimit}
                  onChange={(e) => setFormData({ ...formData, dailyLimit: e.target.value })}
                  placeholder="Ex: 20 usos por dia"
                  className="w-full rounded-2xl border border-slate-200 bg-white p-2 text-xs font-bold outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Dates & Days */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Vigência & Dias Válidos</span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Data Inicial</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white p-2.5 text-xs font-bold outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Data Final</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white p-2.5 text-xs font-bold outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-2">Dias da Semana Aplicáveis</label>
              <div className="flex flex-wrap gap-1.5">
                {weekDaysList.map((day) => {
                  const selected = formData.applicableDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={[
                        'h-8 px-3 rounded-xl text-[11px] font-extrabold transition',
                        selected
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                      ].join(' ')}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Status do Cupom</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
            >
              <option value="active">Ativo (Pronto para uso)</option>
              <option value="inactive">Inativo (Desabilitado)</option>
            </select>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="coupon-form"
            className="flex-1 h-11 rounded-2xl bg-emerald-600 text-xs font-extrabold text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
          >
            Salvar Cupom
          </button>
        </div>
      </div>
    </div>
  );
}

export default CouponFormDrawer;
