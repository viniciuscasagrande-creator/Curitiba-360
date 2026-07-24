import React from 'react';
import { Save } from 'lucide-react';

export function AttractionStepThree({ form, setForm, onPrev, onFinish, onSaveDraft }) {
  function updateTicket(field, value) {
    setForm((current) => ({
      ...current,
      ticket: {
        ...current.ticket,
        [field]: value
      }
    }));
  }

  return (
    <div className="space-y-6 text-left">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">Primeira Categoria de Ingresso</h3>

        <div className="space-y-4">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer">
              <input
                type="radio"
                name="ticketMode"
                checked={form.ticket.enabled}
                onChange={() => updateTicket('enabled', true)}
                className="h-4 w-4 accent-emerald-600"
              />
              Criar primeira categoria agora
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="ticketMode"
                checked={!form.ticket.enabled}
                onChange={() => updateTicket('enabled', false)}
                className="h-4 w-4 accent-emerald-600"
              />
              Configurar ingressos depois (Atração Gratuita / Em Implantação)
            </label>
          </div>

          {form.ticket.enabled && (
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200 grid gap-4 sm:grid-cols-2 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Categoria *</label>
                <input
                  type="text"
                  value={form.ticket.categoryName}
                  onChange={(e) => updateTicket('categoryName', e.target.value)}
                  placeholder="Ex: Adulto (Inteira) ou Estudante"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status da Categoria</label>
                <select
                  value={form.ticket.status}
                  onChange={(e) => updateTicket('status', e.target.value)}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Valor (R$)</label>
                <input
                  type="number"
                  step="0.50"
                  value={form.ticket.price}
                  onChange={(e) => updateTicket('price', e.target.value)}
                  placeholder="20.00"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-emerald-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quantidade de Ingressos</label>
                <input
                  type="number"
                  value={form.ticket.quantity}
                  onChange={(e) => updateTicket('quantity', e.target.value)}
                  placeholder="1000"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Código do Lote</label>
                <input
                  type="text"
                  value={form.ticket.batchCode}
                  onChange={(e) => updateTicket('batchCode', e.target.value)}
                  placeholder="001"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Expiração do Pedido (Horas)</label>
                <input
                  type="number"
                  value={form.ticket.orderExpirationHours}
                  onChange={(e) => updateTicket('orderExpirationHours', e.target.value)}
                  placeholder="48"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Mensagem Customizada no Ingresso</label>
                <input
                  type="text"
                  value={form.ticket.customMessage}
                  onChange={(e) => updateTicket('customMessage', e.target.value)}
                  placeholder="Ex: Apresentar comprovante de residência na entrada."
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Buttons */}
      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="h-11 rounded-2xl border border-slate-200 bg-white px-6 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          &larr; Voltar (Etapa 2)
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSaveDraft}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            Salvar Rascunho
          </button>

          <button
            type="button"
            onClick={onFinish}
            className="inline-flex items-center gap-2 h-11 rounded-2xl bg-emerald-600 px-7 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
          >
            <Save size={16} />
            Finalizar Cadastro
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttractionStepThree;
