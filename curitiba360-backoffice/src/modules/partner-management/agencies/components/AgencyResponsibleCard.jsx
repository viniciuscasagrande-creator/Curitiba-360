import { Mail, Phone, User, Users } from 'lucide-react';

export default function AgencyResponsibleCard({ agency }) {
  if (!agency) return null;

  return (
    <div className="space-y-4 text-xs text-left">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <h4 className="font-black text-slate-800 flex items-center gap-2">
          <User size={15} className="text-emerald-600" />
          Responsável Legal
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="block text-[10px] font-black uppercase text-slate-400">Nome</span>
            <strong className="text-slate-900">{agency.responsibleName}</strong>
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase text-slate-400">CPF</span>
            <strong className="text-slate-900">{agency.responsibleCpf}</strong>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <Mail size={13} className="text-slate-400" />
            <span className="text-slate-700"><strong>E-mail:</strong> {agency.email || agency.responsibleEmail}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <Phone size={13} className="text-slate-400" />
            <span className="text-slate-700"><strong>Celular:</strong> {agency.responsiblePhone}</span>
          </div>
        </div>
      </div>

      {agency.managers?.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
            <Users size={13} />
            Gestores Adicionais ({agency.managers.length})
          </h4>
          <div className="grid gap-2">
            {agency.managers.map((m) => (
              <div key={m.id || m.email} className="rounded-xl border border-slate-200 bg-white p-3 space-y-1">
                <strong className="block text-slate-900">{m.name}</strong>
                <p className="text-slate-500">{m.email} &bull; {m.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
