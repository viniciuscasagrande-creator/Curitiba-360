import React, { useState } from 'react';
import { X, FileText, Send, Check } from 'lucide-react';
import { partnerTypeLabels } from '../data/contractsMock';

export function ContractCreateDrawer({ isOpen, onClose, onContractCreated }) {
  const [form, setForm] = useState({
    partnerName: '',
    partnerType: 'commercial_partner',
    attractionName: 'Parque Jaime Lerner',
    title: '',
    startDate: '2026-08-01',
    expirationDate: '2027-08-01',
    automaticRenewal: true,
    sendDocuSign: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.partnerName || !form.title) return;

    const newContract = {
      id: `CTR-${Math.floor(1000 + Math.random() * 9000)}`,
      partnerId: `partner-${Date.now()}`,
      partnerName: form.partnerName,
      partnerType: form.partnerType,
      attractionId: 'att-101',
      attractionName: form.attractionName,
      title: form.title,
      status: form.sendDocuSign ? 'pending_signature' : 'draft',
      startDate: form.startDate,
      expirationDate: form.expirationDate,
      automaticRenewal: form.automaticRenewal,
      commercialConditionId: 'cond-101',
      documentUrl: '/docs/contrato-modelo.pdf',
      signedDocumentUrl: null,
      signature: {
        provider: 'docusign',
        envelopeId: form.sendDocuSign ? `ENV-${Math.floor(100000 + Math.random() * 900000)}` : null,
        status: form.sendDocuSign ? 'pending' : 'draft',
        sentAt: form.sendDocuSign ? new Date().toISOString() : null,
        signedAt: null
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onContractCreated(newContract);
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
              <FileText size={19} />
            </span>
            <div>
              <h2 className="font-black text-slate-900">Novo Contrato Operacional</h2>
              <p className="text-xs text-slate-500 font-medium">Vincula um parceiro e atração ao contrato.</p>
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Razão Social do Parceiro / Contratante *</label>
              <input
                type="text"
                required
                value={form.partnerName}
                onChange={(e) => setForm({ ...form, partnerName: e.target.value })}
                placeholder="Ex: Parque Jaime Lerner S/A"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Contratante</label>
                <select
                  value={form.partnerType}
                  onChange={(e) => setForm({ ...form, partnerType: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500"
                >
                  {Object.entries(partnerTypeLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Atração Vinculada</label>
                <input
                  type="text"
                  value={form.attractionName}
                  onChange={(e) => setForm({ ...form, attractionName: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Título / Objeto do Contrato *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ex: Contrato de Bilhetagem Eletrônica e Concessão"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Data de Início</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Data de Vencimento</label>
                <input
                  type="date"
                  value={form.expirationDate}
                  onChange={(e) => setForm({ ...form, expirationDate: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 cursor-pointer">
              <input
                type="checkbox"
                checked={form.automaticRenewal}
                onChange={(e) => setForm({ ...form, automaticRenewal: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
              />
              <span className="text-xs font-bold text-slate-800">Renovação Automática por igual período</span>
            </label>

            <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.sendDocuSign}
                  onChange={(e) => setForm({ ...form, sendDocuSign: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
                />
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-2">
                  <Send size={15} />
                  Enviar envelope DocuSign imediatamente para assinatura
                </span>
              </label>
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
              Criar Contrato
            </button>
          </footer>
        </form>
      </aside>
    </>
  );
}

export default ContractCreateDrawer;
