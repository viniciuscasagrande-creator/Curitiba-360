import React, { useState } from 'react';
import {
  Percent,
  Search,
  Sliders,
  Check,
  CreditCard,
  QrCode,
  Building2,
  Save,
  ArrowRightLeft
} from 'lucide-react';

const mockPartnersConditions = [
  {
    id: 'par-01',
    partnerName: 'Jardim Botânico Curitiba',
    category: 'Parque Público',
    feePercentage: 5.5, // 5.5%
    payoutDays: 1, // D+1
    pixFee: 0.99, // R$ 0.99
    cardFee: 2.49, // 2.49%
    boletoFee: 2.15, // R$ 2.15
    anticipationEnabled: true,
    splitGateway: 'Asaas / Pagar.me',
    status: 'active'
  },
  {
    id: 'par-02',
    partnerName: 'Ópera de Arame & Pedreira',
    category: 'Teatro & Cultura',
    feePercentage: 8.0,
    payoutDays: 2, // D+2
    pixFee: 0.99,
    cardFee: 2.89,
    boletoFee: 2.50,
    anticipationEnabled: true,
    splitGateway: 'Pagar.me',
    status: 'active'
  },
  {
    id: 'par-03',
    partnerName: 'Museu Oscar Niemeyer (MON)',
    category: 'Museu & Arte',
    feePercentage: 4.0,
    payoutDays: 1,
    pixFee: 0.50,
    cardFee: 1.99,
    boletoFee: 1.99,
    anticipationEnabled: false,
    splitGateway: 'Asaas',
    status: 'active'
  }
];

export function CommercialConditionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  const filtered = mockPartnersConditions.filter((item) =>
    item.partnerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Parametrização & Split de Pagamentos
          </p>
          <h1 className="text-2xl font-black text-slate-950">
            Condições Comerciais
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por atração ou parceiro..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Partner Cards with Conditions Grid */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 font-bold">
                  <Building2 size={20} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{item.partnerName}</h3>
                  <span className="text-xs text-slate-500">{item.category} • Gateway: {item.splitGateway}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Salvando parâmetros de ${item.partnerName}`)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
              >
                <Save size={15} />
                Salvar Regras Comerciais
              </button>
            </div>

            {/* Grid of Commercial Parameters */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="block text-[10px] font-bold uppercase text-slate-400">Taxa 360 (%)</span>
                <input
                  type="number"
                  step="0.1"
                  defaultValue={item.feePercentage}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-black text-slate-900 text-center outline-none focus:border-emerald-500"
                />
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="block text-[10px] font-bold uppercase text-slate-400">Prazo Repasse</span>
                <select
                  defaultValue={item.payoutDays}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs font-black text-slate-900 outline-none focus:border-emerald-500"
                >
                  <option value={1}>D+1 útil</option>
                  <option value={2}>D+2 úteis</option>
                  <option value={7}>D+7 dias</option>
                  <option value={30}>D+30 dias</option>
                </select>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="block text-[10px] font-bold uppercase text-slate-400">Taxa PIX</span>
                <input
                  type="text"
                  defaultValue={`R$ ${item.pixFee.toFixed(2)}`}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-black text-slate-900 text-center outline-none focus:border-emerald-500"
                />
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="block text-[10px] font-bold uppercase text-slate-400">Taxa Cartão (%)</span>
                <input
                  type="text"
                  defaultValue={`${item.cardFee}%`}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-black text-slate-900 text-center outline-none focus:border-emerald-500"
                />
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="block text-[10px] font-bold uppercase text-slate-400">Antecipação</span>
                <div className="mt-2 flex items-center justify-center gap-1">
                  <input
                    type="checkbox"
                    defaultChecked={item.anticipationEnabled}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-slate-700">Habilitada</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <span className="block text-[10px] font-bold uppercase text-slate-400">Split Automático</span>
                <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-black text-emerald-700">
                  <ArrowRightLeft size={14} />
                  Ativo (Split)
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommercialConditionsPage;
