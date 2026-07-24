import {
  Download,
  FileSpreadsheet,
  Printer,
} from 'lucide-react';

export default function ReportHeader({
  title,
  description,
  onPrint,
  onExportXlsx,
  onExportPdf,
}) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between text-left">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
          Relatórios da atração
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 print:hidden">
        <HeaderButton
          icon={Printer}
          label="Imprimir"
          onClick={onPrint}
        />

        <HeaderButton
          icon={FileSpreadsheet}
          label="Download XLSX"
          onClick={onExportXlsx}
        />

        <HeaderButton
          icon={Download}
          label="Download PDF"
          primary
          onClick={onExportPdf}
        />
      </div>
    </header>
  );
}

function HeaderButton({
  icon: Icon,
  label,
  onClick,
  primary = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex h-11 items-center gap-2 rounded-2xl border px-4 text-xs font-black transition',
        primary
          ? 'border-slate-950 bg-slate-950 text-white hover:bg-slate-800'
          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
      ].join(' ')}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}
