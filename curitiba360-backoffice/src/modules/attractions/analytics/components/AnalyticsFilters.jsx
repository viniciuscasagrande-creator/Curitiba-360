import { useEffect, useRef, useState } from 'react';
import {
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  FileJson,
  FileSpreadsheet,
  Printer,
  RefreshCw,
  X,
} from 'lucide-react';

const PERIOD_OPTIONS = [
  {
    value: 'all',
    label: 'Tudo',
  },
  {
    value: 'today',
    label: 'Hoje',
  },
  {
    value: '7days',
    label: '7 dias',
  },
  {
    value: '30days',
    label: '30 dias',
  },
];

export default function AnalyticsFilters({
  period = 'all',
  customPeriod = {
    startDate: '',
    endDate: '',
  },
  loading = false,
  onPeriodChange,
  onCustomPeriodChange,
  onRefresh,
  onExportCsv,
  onExportJson,
  onPrint,
}) {
  const periodRef = useRef(null);
  const exportRef = useRef(null);

  const [showCustomPeriod, setShowCustomPeriod] =
    useState(false);

  const [showExportMenu, setShowExportMenu] =
    useState(false);

  const [temporaryPeriod, setTemporaryPeriod] =
    useState(customPeriod);

  useEffect(() => {
    setTemporaryPeriod(customPeriod);
  }, [customPeriod]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        periodRef.current &&
        !periodRef.current.contains(event.target)
      ) {
        setShowCustomPeriod(false);
      }

      if (
        exportRef.current &&
        !exportRef.current.contains(event.target)
      ) {
        setShowExportMenu(false);
      }
    }

    document.addEventListener(
      'mousedown',
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick,
      );
    };
  }, []);

  function applyCustomPeriod() {
    if (
      !temporaryPeriod.startDate ||
      !temporaryPeriod.endDate
    ) {
      return;
    }

    if (
      new Date(temporaryPeriod.startDate) >
      new Date(temporaryPeriod.endDate)
    ) {
      return;
    }

    onCustomPeriodChange?.(temporaryPeriod);
    onPeriodChange?.('custom');
    setShowCustomPeriod(false);
  }

  function clearCustomPeriod() {
    const emptyPeriod = {
      startDate: '',
      endDate: '',
    };

    setTemporaryPeriod(emptyPeriod);
    onCustomPeriodChange?.(emptyPeriod);
    onPeriodChange?.('all');
    setShowCustomPeriod(false);
  }

  return (
    <section className="flex flex-col gap-4 rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-sm xl:flex-row xl:items-center xl:justify-between text-left">
      <div className="flex flex-wrap items-center gap-2">
        {PERIOD_OPTIONS.map((option) => {
          const active = period === option.value;

          return (
            <button
              key={option.value}
              type="button"
              disabled={loading}
              onClick={() =>
                onPeriodChange?.(option.value)
              }
              className={[
                'inline-flex h-10 items-center justify-center rounded-2xl px-4 text-xs font-black transition',
                active
                  ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/10'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800',
                loading
                  ? 'cursor-not-allowed opacity-60'
                  : '',
              ].join(' ')}
            >
              {option.label}
            </button>
          );
        })}

        <div
          ref={periodRef}
          className="relative"
        >
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              setShowCustomPeriod(
                (current) => !current,
              )
            }
            className={[
              'inline-flex h-10 items-center gap-2 rounded-2xl border px-4 text-xs font-black transition',
              period === 'custom'
                ? 'border-amber-300 bg-amber-50 text-amber-700'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
              loading
                ? 'cursor-not-allowed opacity-60'
                : '',
            ].join(' ')}
          >
            <CalendarDays size={16} />

            {period === 'custom'
              ? formatPeriodLabel(customPeriod)
              : 'Período'}

            <ChevronDown size={14} />
          </button>

          {showCustomPeriod && (
            <CustomPeriodPopover
              period={temporaryPeriod}
              onChange={setTemporaryPeriod}
              onApply={applyCustomPeriod}
              onClear={clearCustomPeriod}
              onClose={() =>
                setShowCustomPeriod(false)
              }
            />
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={onRefresh}
          className="inline-flex h-10 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={
              loading ? 'animate-spin' : ''
            }
          />

          Atualizar
        </button>

        <div
          ref={exportRef}
          className="relative"
        >
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              setShowExportMenu(
                (current) => !current,
              )
            }
            className="inline-flex h-10 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={16} />
            Exportar
            <ChevronDown size={14} />
          </button>

          {showExportMenu && (
            <ExportMenu
              onExportCsv={() => {
                onExportCsv?.();
                setShowExportMenu(false);
              }}
              onExportJson={() => {
                onExportJson?.();
                setShowExportMenu(false);
              }}
              onPrint={() => {
                onPrint?.();
                setShowExportMenu(false);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function CustomPeriodPopover({
  period,
  onChange,
  onApply,
  onClear,
  onClose,
}) {
  const invalidRange =
    period.startDate &&
    period.endDate &&
    new Date(period.startDate) >
      new Date(period.endDate);

  const canApply =
    Boolean(period.startDate) &&
    Boolean(period.endDate) &&
    !invalidRange;

  return (
    <div className="absolute left-0 top-12 z-50 w-[340px] rounded-[24px] border border-slate-200 bg-white p-5 shadow-2xl text-left">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-black text-slate-900">
            Período personalizado
          </h3>

          <p className="mt-1 text-[11px] leading-5 text-slate-500">
            Selecione as datas inicial e final.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
        >
          <X size={15} />
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <DateField
          label="Data inicial"
          value={period.startDate}
          onChange={(value) =>
            onChange((current) => ({
              ...current,
              startDate: value,
            }))
          }
        />

        <DateField
          label="Data final"
          value={period.endDate}
          onChange={(value) =>
            onChange((current) => ({
              ...current,
              endDate: value,
            }))
          }
        />
      </div>

      {invalidRange && (
        <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-[11px] font-bold text-rose-600">
          A data final deve ser posterior à data
          inicial.
        </p>
      )}

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={onClear}
          className="h-10 flex-1 rounded-2xl border border-slate-200 text-xs font-black text-slate-600 transition hover:bg-slate-50"
        >
          Limpar
        </button>

        <button
          type="button"
          disabled={!canApply}
          onClick={onApply}
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl bg-amber-500 text-xs font-black text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Check size={15} />
          Aplicar
        </button>
      </div>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
}) {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
        {label}
      </span>

      <input
        type="date"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10"
      />
    </label>
  );
}

function ExportMenu({
  onExportCsv,
  onExportJson,
  onPrint,
}) {
  return (
    <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl text-left">
      <ExportButton
        icon={FileSpreadsheet}
        label="Exportar CSV"
        description="Dados para Excel"
        onClick={onExportCsv}
      />

      <ExportButton
        icon={FileJson}
        label="Exportar JSON"
        description="Dados estruturados"
        onClick={onExportJson}
      />

      <div className="my-2 border-t border-slate-100" />

      <ExportButton
        icon={Printer}
        label="Imprimir / PDF"
        description="Usar impressão do navegador"
        onClick={onPrint}
      />
    </div>
  );
}

function ExportButton({
  icon: Icon,
  label,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-100"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <Icon size={16} />
      </span>

      <span>
        <strong className="block text-xs font-black text-slate-800">
          {label}
        </strong>

        <span className="mt-0.5 block text-[10px] text-slate-400">
          {description}
        </span>
      </span>
    </button>
  );
}

function formatPeriodLabel(period) {
  if (!period?.startDate || !period?.endDate) {
    return 'Período';
  }

  return `${formatDate(
    period.startDate,
  )} – ${formatDate(period.endDate)}`;
}

function formatDate(value) {
  const [year, month, day] = value.split('-');

  return `${day}/${month}/${year}`;
}
