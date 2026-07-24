import { FileText, Download } from 'lucide-react';

export default function AgencyDocumentsCard({ agency }) {
  if (!agency) return null;

  const docs = agency.documents || [];

  return (
    <div className="space-y-3 text-xs text-left">
      <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-wider">
        Documentação e Anexos Digitais ({docs.length})
      </h4>

      {docs.length > 0 ? (
        <div className="grid gap-2">
          {docs.map((doc) => (
            <div key={doc.id || doc.name} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-emerald-600" />
                <div>
                  <strong className="block text-slate-800 font-bold">{doc.name}</strong>
                  <span className="text-[10px] text-slate-400">Tipo: {doc.type}</span>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 hover:underline"
              >
                <Download size={13} />
                Baixar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 font-medium italic">Nenhum documento digital anexado.</p>
      )}
    </div>
  );
}
