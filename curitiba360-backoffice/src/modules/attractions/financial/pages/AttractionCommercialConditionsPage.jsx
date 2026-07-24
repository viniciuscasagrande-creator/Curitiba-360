import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FileText,
  DollarSign,
  Percent,
  Calendar,
  CreditCard,
  Building,
  Save,
  Check,
  AlertCircle,
  HelpCircle,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { AttractionSidebar } from '../../components/AttractionSidebar';

export function AttractionCommercialConditionsPage() {
  const { attractionId = 'attraction-001' } = useParams();

  const [form, setForm] = useState({
    nickname: 'Padrão 10% - Contrato 2026',
    calculationType: 'percentage',
    value: 10.0,
    creditCashFee: 1.5,
    creditInstallmentFee: 2.2,
    pixFee: 0.9,
    anticipationFee: 1.8,
    internationalFee: 3.5,
    paymentTermDays: 15,
    maxInstallments: 12,
    installmentFee: 0.5,
    feeResponsible: 'parceiro', // 'parceiro' ou 'cliente'
    adminFee: 2.0,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'active',
    notes: 'Condição comercial repassada com taxa fixa de intermediação negociada no contrato anual.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AttractionSidebar attractionId={attractionId} />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-6 text-left">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
              <FileText size={15} />
              Gestão Financeira &bull; Negociação
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Condições Comerciais
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Configure as taxas de intermediação, cartões, PIX, prazos de repasse e vigência do contrato da atração.
            </p>
          </div>

          <button
            type="submit"
            form="commercial-form"
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-6 text-xs font-black text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
          >
            <Save size={16} />
            Salvar Condições
          </button>
        </header>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-fade-in">
            <Check size={18} className="text-emerald-600" />
            Condições comerciais salvas e aplicadas com sucesso ao contrato da atração!
          </div>
        )}

        <form id="commercial-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1 — Configuração Principal */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Building size={16} className="text-emerald-600" />
                Dados do Acordo e Vigência
              </h3>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Apelido do Acordo *</label>
                <input
                  type="text"
                  value={form.nickname}
                  onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Tipo de Cálculo *</label>
                <select
                  value={form.calculationType}
                  onChange={(e) => setForm({ ...form, calculationType: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                >
                  <option value="percentage">Porcentagem (%) sobre a venda</option>
                  <option value="fixed">Valor Fixo (R$) por ingresso</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">
                  Valor Principal ({form.calculationType === 'percentage' ? '%' : 'R$'}) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-extrabold text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Início da Vigência</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Fim da Vigência</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Status do Contrato</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                >
                  <option value="active">Ativo e Vigente</option>
                  <option value="pending">Em Negociação</option>
                  <option value="suspended">Suspenso</option>
                </select>
              </div>
            </div>
          </section>

          {/* Card 2 — Taxas por Meio de Pagamento */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <CreditCard size={16} className="text-emerald-600" />
                Taxas Financeiras e Gateway
              </h3>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Taxa Crédito à Vista (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.creditCashFee}
                  onChange={(e) => setForm({ ...form, creditCashFee: Number(e.target.value) })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Taxa Crédito Parcelado (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.creditInstallmentFee}
                  onChange={(e) => setForm({ ...form, creditInstallmentFee: Number(e.target.value) })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Taxa PIX (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.pixFee}
                  onChange={(e) => setForm({ ...form, pixFee: Number(e.target.value) })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Taxa de Antecipação (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.anticipationFee}
                  onChange={(e) => setForm({ ...form, anticipationFee: Number(e.target.value) })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Taxa Internacional (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.internationalFee}
                  onChange={(e) => setForm({ ...form, internationalFee: Number(e.target.value) })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Taxa Administrativa Geral (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.adminFee}
                  onChange={(e) => setForm({ ...form, adminFee: Number(e.target.value) })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </section>

          {/* Card 3 — Prazos e Parcelamento */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Clock size={16} className="text-emerald-600" />
                Prazos de Liquidação & Regras de Parcelamento
              </h3>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Prazo para Pagamento (Dias)</label>
                <input
                  type="number"
                  value={form.paymentTermDays}
                  onChange={(e) => setForm({ ...form, paymentTermDays: Number(e.target.value) })}
                  placeholder="15"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Máximo de Parcelas Permitido</label>
                <select
                  value={form.maxInstallments}
                  onChange={(e) => setForm({ ...form, maxInstallments: Number(e.target.value) })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                >
                  {[1, 2, 3, 6, 10, 12].map((n) => (
                    <option key={n} value={n}>
                      Até {n}x
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Responsável pelas Taxas</label>
                <select
                  value={form.feeResponsible}
                  onChange={(e) => setForm({ ...form, feeResponsible: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                >
                  <option value="parceiro">Parceiro (Descontado do Repasse)</option>
                  <option value="cliente">Cliente Final (Adicionado no Checkout)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">Observações da Negociação Comercial</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-800 outline-none focus:border-emerald-500"
              />
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}

export default AttractionCommercialConditionsPage;
