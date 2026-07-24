import React, { useState } from 'react';
import { Calendar, Filter, X, Check } from 'lucide-react';

export function AnalyticsPeriodFilter({ period, onChangePeriod, customRange, onApplyCustomRange }) {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [startDate, setStartDate] = useState(customRange?.startDate || '2026-07-01');
  const [endDate, setEndDate] = useState(customRange?.endDate || '2026-07-23');

  const options = [
    { value: 'all', label: 'Tudo' },
    { value: 'today', label: 'Hoje' },
    { value: '7d', label: '7 Dias' },
    { value: '30d', label: '30 Dias' }
  ];

  function handleApplyCustom() {
    onApplyCustomRange({ startDate, endDate });
    onChangePeriod('custom');
    setShowCustomModal(false);
  }

  function handleClearCustom() {
    setStartDate('2026-07-01');
    setEndDate('2026-07-23');
    onApplyCustomRange(null);
    onChangePeriod('7d');
    setShowCustomModal(false);
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-left">
      <div className="flex rounded-2xl border border-slate-200 bg-slate-100 p-1">
        {options.map((opt) => {
          const active = period === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChangePeriod(opt.value)}
              className={[
                'h-9 rounded-xl px-3.5 text-xs font-extrabold transition',
                active
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              ].join(' ')}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setShowCustomModal(true)}
        className={[
          'inline-flex h-11 items-center gap-2 rounded-2xl border px-4 text-xs font-extrabold transition',
          period === 'custom'
            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
        ].join(' ')}
      >
        <Calendar size={15} className="text-emerald-600" />
        {period === 'custom' && customRange
          ? `${customRange.startDate} até ${customRange.endDate}`
          : 'Período Personalizado'}
      </button>

      {/* Custom Period Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Calendar size={18} className="text-emerald-600" />
                Selecione o Período
              </h3>
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Data Inicial</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 p-2.5 font-semibold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Data Final</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 p-2.5 font-semibold text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleClearCustom}
                className="flex-1 h-10 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={handleApplyCustom}
                className="flex-1 h-10 rounded-2xl bg-emerald-600 text-xs font-extrabold text-white hover:bg-emerald-700 shadow-sm"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsPeriodFilter;
