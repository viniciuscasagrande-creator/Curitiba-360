import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DollarSign,
  Wallet,
  Check,
  Save,
  Lock,
  History,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { AttractionSidebar } from '../../components/AttractionSidebar';

export function AttractionFinancialInformationPage() {
  const { attractionId = 'attraction-001' } = useParams();

  const [form, setForm] = useState({
    nickname: 'Padrão 10% - Regras de Saque',
    withdrawalEnabled: true,
    withdrawalPercentage: 10,
    withdrawalLimit: 10000.0,
    minimumWithdrawalDays: 15,
    pixDiscountEnabled: true,
    pixDiscountValue: 0.15,
    tedDiscountEnabled: true,
    tedDiscountValue: 0.15
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const auditHistory = [
    { id: 1, date: '2026-07-10 14:30', user: 'Carlos Eduardo (Admin)', action: 'Alterou Tempo Mínimo para Saque de 30 para 15 dias.' },
    { id: 2, date: '2026-05-01 09:15', user: 'Fernanda Lima (Financeiro)', action: 'Habilitou Desconto Pix de R$ 0,15 por transação.' },
    { id: 3, date: '2026-01-15 11:00', user: 'Sistema', action: 'Criação inicial das regras financeiras da atração.' }
  ];

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
              <Wallet size={15} />
              Gestão Financeira &bull; Regras de Saque
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Informações Financeiras
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Configure as condições de liberação para saque, descontos bancários e consulte o histórico de auditoria.
            </p>
          </div>

          <button
            type="submit"
            form="financial-info-form"
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-6 text-xs font-black text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
          >
            <Save size={16} />
            Salvar Regras
          </button>
        </header>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-fade-in">
            <Check size={18} className="text-emerald-600" />
            Informações financeiras salvas e registradas no histórico de auditoria!
          </div>
        )}

        <form id="financial-info-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1 — Regras de Saque */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <DollarSign size={16} className="text-emerald-600" />
                  Regras de Liberação para Saque
                </h3>
                <p className="text-[11px] text-slate-500">Defina se a atração possui liberação antecipada de repasses.</p>
              </div>

              {/* Toggle Liberado para Saque */}
              <label className="flex items-center gap-3 cursor-pointer">
                <span className="text-xs font-bold text-slate-700">Liberado para Saque</span>
                <div
                  onClick={() => setForm((prev) => ({ ...prev, withdrawalEnabled: !prev.withdrawalEnabled }))}
                  className={`h-6 w-11 rounded-full p-1 transition ${form.withdrawalEnabled ? 'bg-emerald-600' : 'bg-slate-300'}`}
                >
                  <div className={`h-4 w-4 rounded-full bg-white transition ${form.withdrawalEnabled ? 'translate-x-5' : ''}`} />
                </div>
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Apelido das Regras</label>
                <input
                  type="text"
                  value={form.nickname}
                  onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Percentual Liberado (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    disabled={!form.withdrawalEnabled}
                    value={form.withdrawalPercentage}
                    onChange={(e) => setForm({ ...form, withdrawalPercentage: Number(e.target.value) })}
                    className={`h-11 w-full rounded-2xl border px-4 text-xs font-bold outline-none transition ${
                      form.withdrawalEnabled ? 'border-slate-200 bg-white text-slate-900 focus:border-emerald-500' : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  />
                  {!form.withdrawalEnabled && <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Valor Máximo Liberado (R$)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    disabled={!form.withdrawalEnabled}
                    value={form.withdrawalLimit}
                    onChange={(e) => setForm({ ...form, withdrawalLimit: Number(e.target.value) })}
                    className={`h-11 w-full rounded-2xl border px-4 text-xs font-bold outline-none transition ${
                      form.withdrawalEnabled ? 'border-slate-200 bg-white text-slate-900 focus:border-emerald-500' : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  />
                  {!form.withdrawalEnabled && <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">Tempo Mínimo para Saque (Dias)</label>
                <input
                  type="number"
                  value={form.minimumWithdrawalDays}
                  onChange={(e) => setForm({ ...form, minimumWithdrawalDays: Number(e.target.value) })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </section>

          {/* Card 2 — Descontos de Transferência (PIX & TED) */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <TrendingDown size={16} className="text-emerald-600" />
                Descontos de Tarifas Bancárias (PIX & TED)
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Box PIX */}
              <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">Desconto por Transação PIX</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => setForm((prev) => ({ ...prev, pixDiscountEnabled: !prev.pixDiscountEnabled }))}
                      className={`h-5 w-9 rounded-full p-0.5 transition ${form.pixDiscountEnabled ? 'bg-emerald-600' : 'bg-slate-300'}`}
                    >
                      <div className={`h-4 w-4 rounded-full bg-white transition ${form.pixDiscountEnabled ? 'translate-x-4' : ''}`} />
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Valor de Desconto PIX (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    disabled={!form.pixDiscountEnabled}
                    value={form.pixDiscountValue}
                    onChange={(e) => setForm({ ...form, pixDiscountValue: Number(e.target.value) })}
                    className={`h-10 w-full rounded-xl border px-3 text-xs font-bold outline-none ${
                      form.pixDiscountEnabled ? 'border-slate-200 bg-white text-slate-900 focus:border-emerald-500' : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              {/* Box TED */}
              <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">Desconto por Transação TED</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => setForm((prev) => ({ ...prev, tedDiscountEnabled: !prev.tedDiscountEnabled }))}
                      className={`h-5 w-9 rounded-full p-0.5 transition ${form.tedDiscountEnabled ? 'bg-emerald-600' : 'bg-slate-300'}`}
                    >
                      <div className={`h-4 w-4 rounded-full bg-white transition ${form.tedDiscountEnabled ? 'translate-x-4' : ''}`} />
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Valor de Desconto TED (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    disabled={!form.tedDiscountEnabled}
                    value={form.tedDiscountValue}
                    onChange={(e) => setForm({ ...form, tedDiscountValue: Number(e.target.value) })}
                    className={`h-10 w-full rounded-xl border px-3 text-xs font-bold outline-none ${
                      form.tedDiscountEnabled ? 'border-slate-200 bg-white text-slate-900 focus:border-emerald-500' : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Card 3 — Histórico de Auditoria */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <History size={16} className="text-emerald-600" />
                Histórico de Auditoria & Vigência
              </h3>
            </div>

            <div className="space-y-3">
              {auditHistory.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-slate-900">{item.action}</span>
                    <p className="text-[11px] text-slate-500">
                      Modificado por <strong className="text-slate-700">{item.user}</strong> em {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}

export default AttractionFinancialInformationPage;
