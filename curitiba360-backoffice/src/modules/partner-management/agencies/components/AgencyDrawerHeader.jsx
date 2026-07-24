import { X } from 'lucide-react';
import AgencyStatusBadge from './AgencyStatusBadge';

export default function AgencyDrawerHeader({ agency, onClose }) {
  if (!agency) return null;

  return (
    <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5 bg-slate-50 text-left">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 font-black text-white text-base shadow-sm">
          {agency.tradeName ? agency.tradeName[0] : 'A'}
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-slate-900">{agency.tradeName}</h2>
            <AgencyStatusBadge status={agency.status} />
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            {agency.corporateName || agency.companyName} &bull; CNPJ: {agency.cnpj || agency.document}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
      >
        <X size={20} />
      </button>
    </header>
  );
}
