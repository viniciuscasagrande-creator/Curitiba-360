import { Clock } from 'lucide-react';
import { formatDateTime } from '../../shared/utils/partnerFormatters';

export default function AgencyTimeline({ agency }) {
  if (!agency) return null;

  const events = [
    { title: 'Credenciamento Solicitado', date: agency.createdAt, status: 'Pendente' },
    ...(agency.updatedAt !== agency.createdAt ? [{ title: 'Última Atualização', date: agency.updatedAt, status: agency.status }] : []),
  ];

  return (
    <div className="space-y-4 text-xs text-left">
      <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
        <Clock size={13} className="text-slate-600" />
        Timeline de Atividades
      </h4>

      <div className="relative border-l-2 border-slate-200 ml-3 pl-4 space-y-4">
        {events.map((ev, index) => (
          <div key={index} className="relative">
            <span className="absolute -left-[23px] top-1 h-3 w-3 rounded-full bg-slate-900 border-2 border-white" />
            <strong className="block text-slate-900 font-bold">{ev.title}</strong>
            <span className="text-[10px] text-slate-500">{formatDateTime(ev.date)} &bull; Status: {ev.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
