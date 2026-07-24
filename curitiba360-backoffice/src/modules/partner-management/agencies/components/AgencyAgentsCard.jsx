import { Users } from 'lucide-react';

export default function AgencyAgentsCard({ agency }) {
  if (!agency) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 text-xs text-left">
      <div className="flex items-center justify-between">
        <h4 className="font-black text-slate-900 flex items-center gap-2">
          <Users size={15} className="text-indigo-600" />
          Agentes Vinculados
        </h4>
        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-black text-indigo-700">
          {agency.agentsCount || 0} agentes
        </span>
      </div>

      <p className="text-slate-500 font-medium">
        Esta agência possui <strong>{agency.agentsCount || 0} agentes</strong> cadastrados operando emitindo ingressos no Curitiba 360.
      </p>
    </div>
  );
}
