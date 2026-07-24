import { Ticket } from 'lucide-react';

export default function AgencyAttractionsCard({ agency }) {
  if (!agency) return null;

  const attractions = agency.attractions || [];

  return (
    <div className="space-y-3 text-xs text-left">
      <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
        <Ticket size={13} className="text-emerald-600" />
        Atrações Habilitadas para Venda ({attractions.length})
      </h4>

      {attractions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {attractions.map((att) => (
            <span key={att.id || att.name} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-bold text-slate-700">
              {att.name}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 font-medium italic">Todas as atrações ativas do sistema estão liberadas por padrão.</p>
      )}
    </div>
  );
}
