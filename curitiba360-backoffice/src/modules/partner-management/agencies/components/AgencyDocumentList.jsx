import {
  Download,
  Eye,
  FileText,
} from 'lucide-react';

export default function AgencyDocumentList({
  documents = [],
}) {
  if (!documents.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center">
        <FileText
          size={24}
          className="mx-auto text-slate-300"
        />

        <strong className="mt-3 block text-sm font-black text-slate-600">
          Nenhum documento enviado
        </strong>

        <p className="mt-1 text-xs font-medium text-slate-400">
          Os documentos enviados pela
          agência aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 text-left">
      {documents.map((document) => (
        <article
          key={document.id}
          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm">
              <FileText size={18} />
            </span>

            <div className="min-w-0">
              <strong className="block truncate text-sm font-black text-slate-700">
                {document.name}
              </strong>

              <span className="mt-1 block text-xs font-medium text-slate-400">
                {document.type}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={!document.url}
              onClick={() => {
                if (document.url) {
                  window.open(
                    document.url,
                    '_blank',
                    'noopener,noreferrer',
                  );
                }
              }}
              className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Eye size={14} />
              Visualizar
            </button>

            <a
              href={document.url || undefined}
              download
              className={[
                'flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-600 transition',
                document.url
                  ? 'hover:bg-slate-100'
                  : 'pointer-events-none opacity-40',
              ].join(' ')}
            >
              <Download size={14} />
              Baixar
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
