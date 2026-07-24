import React, { useState } from 'react';
import { X, Plus, Ticket, DollarSign, Layers, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';

export function TicketFormDrawer({ isOpen, onClose, onSave, categories = [] }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    categoryName: categories[0]?.name || 'Ingresso Geral',
    price: '25.00',
    batchCode: 'LOTE-01',
    quantity: '500',
    expirationHours: '48',
    customMessage: 'Apresentar documento de identidade com foto na entrada.',
    status: 'active'
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...formData,
        id: `cat-${Date.now()}`,
        price: parseFloat(formData.price || 0),
        quantity: parseInt(formData.quantity || 0, 10)
      });
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs transition-opacity animate-fade-in text-left">
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Ticket size={20} />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">WF-020 &bull; Gestão de Ingressos</p>
              <h2 className="text-lg font-black tracking-tight text-white">Novo Lote / Ingresso</h2>
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
        <form id="ticket-form" onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Categoria *</label>
            <input
              type="text"
              required
              value={formData.categoryName}
              onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
              placeholder="Ex: Morador Curitiba, Meia Entrada, Inteira VIP..."
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-semibold outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Valor Unitário (R$) *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 p-3 pl-9 text-xs font-bold outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lote / Identificador *</label>
              <input
                type="text"
                required
                value={formData.batchCode}
                onChange={(e) => setFormData({ ...formData, batchCode: e.target.value })}
                placeholder="Ex: LOTE-01"
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Quantidade Total Disponível *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Expiração do Pedido (Horas)</label>
              <input
                type="number"
                value={formData.expirationHours}
                onChange={(e) => setFormData({ ...formData, expirationHours: e.target.value })}
                placeholder="Ex: 48"
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Mensagem Customizada no Ingresso</label>
            <textarea
              rows={3}
              value={formData.customMessage}
              onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
              placeholder="Instruções adicionais impressas no voucher do cliente..."
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-medium outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Status Inicial</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
            >
              <option value="active">Ativo (Disponível para venda)</option>
              <option value="inactive">Inativo (Oculto no checkout)</option>
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
            form="ticket-form"
            className="flex-1 h-11 rounded-2xl bg-emerald-600 text-xs font-extrabold text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
          >
            Salvar Ingresso
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketFormDrawer;
