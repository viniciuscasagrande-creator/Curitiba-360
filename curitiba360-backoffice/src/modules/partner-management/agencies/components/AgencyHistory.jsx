import { History } from 'lucide-react';
import { formatDateTime } from '../../shared/utils/partnerFormatters';

export default function AgencyHistory({ agency }) {
  if (!agency) return null;

  return (
    <div className="space-y-3 text-xs text-left">
      <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
        <History size={13} className="text-slate-600" />
        Histórico de Auditoria & Alterações
      </h4>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
          <span>SISTEMA</span>
          <span>{formatDateTime(agency.createdAt)}</span>
        </div>
        <p className="text-slate-700 font-medium">Registro criado no sistema Curitiba 360 Backoffice com status inicial <strong>{agency.status}</strong>.</p>
      </div>
    </div>
  );
}
